import mysql.connector
from flask import jsonify
from mysql.connector import Error
import os
from dotenv import load_dotenv
load_dotenv()
def db_Connection():
    try:
        connection=mysql.connector.connect(
            host=os.getenv("DB_HOST","localhost"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME"),
            port=int(os.getenv("DB_PORT",3306)),
        )
        if connection.is_connected():
            print("Mysql connected")
            return connection
    except Error as err:
        print("❌ MySQL Connection Failed!")
        print("Error Code:", err.errno)
        print("SQLSTATE:", err.sqlstate)
        print("Message:", err.msg)
        return None