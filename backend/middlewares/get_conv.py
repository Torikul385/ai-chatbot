from db.schema import Conversation, Chat 


async def get_conversations(username: str, db):
    convs = (
        db.query(Conversation)
        .filter(Conversation.username == username)
        .order_by(Conversation.created_at)
        .all()
    )

    result = []

    for conv in convs:
        first_chat = (
            db.query(Chat)
            .filter(Chat.conv_id == conv.id)
            .order_by(Chat.created_at.asc())  # earliest message
            .first()
        )

        result.append({
            "id": conv.id,
            "text": first_chat.text if first_chat else ""
        })

    return result

        



