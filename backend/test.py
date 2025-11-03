from sqlalchemy import create_engine
engine = create_engine("postgresql+psycopg2://postgres:1234@localhost:5432/chatai")
conn = engine.connect()
print("Connected:", conn)
conn.close()
