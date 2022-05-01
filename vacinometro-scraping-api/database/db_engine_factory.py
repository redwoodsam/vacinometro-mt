from dotenv import load_dotenv
load_dotenv()

from sqlalchemy import create_engine
import os


def generate_engine():
    return create_engine(f'postgresql+psycopg2://{os.getenv("DB_USER")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}:{os.getenv("DB_PORT")}/{os.getenv("DB_NAME")}',
                            echo=False)