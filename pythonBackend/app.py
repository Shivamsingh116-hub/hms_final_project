from flask import Flask,jsonify
from flask_cors import CORS
from controller.billing2route import  medicine_data
app=Flask(__name__)
CORS(app)
app.register_blueprint(medicine_data,url_prefix='/billing2data')
@app.route('/')
def hello():
    return jsonify({"message":"hello"})
if __name__=='__main__':
    app.run(debug=True)
