import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
load_dotenv()
def db_Connection():
    try:
        connection=mysql.connector.connect(
            host=os.getenv("DB_HOST","localhost"),
            user=os.getenv("DB_USER","root"),
            password=os.getenv("DB_PASSWORD","luck@999239"),
            database=os.getenv("DB_NAME","hospital_data")
        )
        if connection.is_connected():
            print("Mysql connected")
            return connection
    except Error as e:
        print("Mysql not connected")
        return f"Database not connected {e}"