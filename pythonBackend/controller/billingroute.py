from flask import Blueprint,request,jsonify
from database.dbConnection import db_Connection
get_bill_data=Blueprint("get_bill_data",__name__)
@get_bill_data.route('/get_billing_data',methods=["GET"])
def getBillData():
    username=request.args.get("username")
    connection=db_Connection()
    cursor=connection.cursor()
    storeBill=[]
    try:
        cursor.execute("SELECT * FROM billing_data WHERE username = %s",(username,))
        result=cursor.fetchall()
        if result:
            for bill in result:
                data={
                "id":bill[0],
                "name":bill[1],
                "username":bill[2],
                "billArr":bill[3],
                "totalBill":bill[4],
                "dateTime":bill[5],
                "pharmacistShop":bill[7]
                }
                storeBill.append(data)
            return jsonify({"billingData":storeBill})
        else:
            return jsonify({"billingData":False})
    
    except Exception as e:
        print(e)
    return jsonify({"mesage":"good"})