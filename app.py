from flask import Flask, render_template, request, jsonify
from db import db
from models.service_order import ServiceOrderModel
from enums.service_order_status import ServiceOrderStatusEnum
from datetime import date

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db.init_app(app)

@app.route('/')
def index():
    return render_template("index.html")
    
@app.route('/service-order', methods = ['GET'])
def get():
    service_orders = ServiceOrderModel.get_all()
    
    return {'service_orders': [service_order.to_dict() for service_order in service_orders]}

@app.route('/service-order/<id>', methods = ['GET'])
def get_by_id(id):
    service_order = ServiceOrderModel.find_by_id(id)
    
    print(service_order.start_date)
    
    return {'service_order': service_order.to_dict()}

@app.route('/service-order', methods = ['POST'])
def post():
    if request.method == 'POST':
        request_data = request.get_json()
        
        service_order = ServiceOrderModel(
            request_data['title'],
            request_data['description'],
            ServiceOrderStatusEnum.PENDING,
            date.fromisoformat(request_data['start_date']),
            date.fromisoformat(request_data['end_date'])
        )
        
        print(request_data['start_date'])
        
        service_order.created_at = date.today()
        service_order.updated_at = date.today()
        
        service_order.save_to_db()
        
        return jsonify(success=True)
    else:
        return jsonify(success=False)
    
@app.route('/service-order/<id>', methods = ['PUT'])
def put(id):
    if request.method == 'PUT':
        request_data = request.get_json()
        
        service_order = ServiceOrderModel.find_by_id(id)
        service_order.title = request_data['title']
        service_order.description = request_data['description']
        service_order.start_date = date.fromisoformat(request_data['start_date'])
        service_order.end_date = date.fromisoformat(request_data['end_date'])
        service_order.updated_at = date.today()
        
        service_order.save_to_db()
        
        return jsonify(success=True)
    else:
        return jsonify(success=False)

with app.app_context():
    db.create_all()