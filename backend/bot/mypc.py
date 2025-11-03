from pinecone import Pinecone, ServerlessSpec, CloudProvider, AwsRegion, Metric
import os
import ollama
import uuid
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("PINECONE_API")
pc = Pinecone(api_key=api_key)

index_name = "filecollection"

# Create index if needed
if not pc.has_index(index_name):
    pc.create_index(
        name=index_name,
        metric=Metric.COSINE,
        dimension=768,
        spec=ServerlessSpec(
            cloud=CloudProvider.AWS,
            region=AwsRegion.US_EAST_1,
        ),
    )

description = pc.describe_index(name=index_name)
index = pc.Index(host=description.host)


def make_chunks(text: str):
    chunks = []
    chunk_size = 500
    overlap = 100

    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start += chunk_size - overlap

    return chunks


async def add_vector(texts: str, username: str, conv_id: str):
    chunks = make_chunks(texts)

    # Embed each chunk
    res = ollama.embed(model="nomic-embed-text:latest", input=chunks)
    embeddings = res["embeddings"]
    
    vectors = []
    for i, chunk in enumerate(chunks):
        vectors.append({
            "id": str(uuid.uuid4()),
            "values": embeddings[i],
            "metadata": {
                "username": str(username),
                "conv_id": str(conv_id),
                "text": chunk.decode("utf-8") if isinstance(chunk, bytes) else str(chunk),
            },
        })

    index.upsert(vectors=vectors)
   

async def get_context(query_text: str, conv_id: str, username: str, top_k: int = 5):
    # Step 1: Embed the query
    query_embed_res = ollama.embed(model="nomic-embed-text", input=[query_text])
    query_embedding = query_embed_res["embeddings"][0]

    # Step 2: Query Pinecone
    results = index.query(
        vector=query_embedding,
        top_k=top_k,
        include_metadata=True,
       # filter={"username": username, "conv_id": conv_id}  # optional, for user-specific context
    )

    # Step 3: Collect relevant texts
    retrieved_texts = []
    for match in results.matches:
        retrieved_texts.append(match.metadata["text"])

    # Step 4: Optionally, combine retrieved chunks for further processing
    context = "\n".join(retrieved_texts)

    # Step 5: Return the retrieved context (or feed it into a model for answer generation)
    return context