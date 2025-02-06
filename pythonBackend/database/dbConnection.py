import mysql.connector
from mysql.connector import Error
def db_Connection():
    try:
        connection=mysql.connector.connect(
            host="localhost",
            user="root",
            password="lucky@999239",
            database="hospital_data"
        )
        if connection.is_connected():
            print("Mysql connected")
            return connection
    except Error as e:
        print("Mysql not connected")
        return f"Database not connected {e}"