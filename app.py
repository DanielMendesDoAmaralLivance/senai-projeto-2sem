from flask import Flask, render_template, request, jsonify
from db import db
from models.service_order import ServiceOrderModel
from datetime import date

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db.init_app(app)

@app.route('/')
def index():
    service_orders = ServiceOrderModel.get_all()
    
    return render_template("index.html", service_orders = service_orders)
    
    # return render_template("index.html", service_orders)

@app.route('/service-order', methods = ['POST'])
def post():
    if request.method == 'POST':
        request_data = request.get_json()
        
        print(request_data['title'])
        
        service_order = ServiceOrderModel(
            request_data['title'],
            request_data['description'],
            date.fromisoformat(request_data['start_date']),
            date.fromisoformat(request_data['end_date'])
        )
        
        service_order.created_at = date.today()
        service_order.updated_at = date.today()
        
        service_order.save_to_db()
        
        return jsonify(success=True)
    else:
        return jsonify(success=False)

with app.app_context():
    db.create_all()