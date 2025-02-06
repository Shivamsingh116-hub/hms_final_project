from flask import Blueprint,jsonify,request
import pandas as pd
import json
from database.dbConnection import db_Connection
medicine_data=Blueprint('medicine_data',__name__)
add_bill=Blueprint("add_bill",__name__)
data=pd.read_csv('./database/A_Z_medicines_dataset_of_India.csv')
data=data.fillna("Unknown")
data.rename(columns={'price(₹)':'price'},inplace=True)
@medicine_data.route('/search_medicine',methods=["GET"])
def get_medicine_data():
    search_medicine=request.args.get("medicineSearch").strip().lower()
    if search_medicine:
       storeData= findMedicine(search_medicine)
       return jsonify({"medicineData":storeData})
    else:
        return jsonify({"medicineData":False})


def findMedicine(search_medicine):
    dictionary=data[data["name"].str.lower().str.contains(search_medicine,na=False)].head(10).to_dict(orient="records")
    return dictionary

@add_bill.route('/add_bill_data',methods=["POST"])
def addBillData():
    data=request.get_json()
    name=data["name"]
    username=data["username"]
    pharmacistShop=data["pharmacistShop"]
    dumpArr=json.dumps(data["billArr"])
    totalBill=data["totalBill"]
    connection=db_Connection()
    cursor=connection.cursor()
    query="INSERT INTO billing_data (name,username,billArr,totalBill,pharmacistShop) VALUES (%s,%s,%s,%s,%s)"
    try:
        cursor.execute(query,(name,username,dumpArr,totalBill,pharmacistShop))
        connection.commit()
        return jsonify({"message":"Bill added succesfully"})
    except Exception as e:
        return jsonify({"message":e})
    finally:
        cursor.close()
        connection.close