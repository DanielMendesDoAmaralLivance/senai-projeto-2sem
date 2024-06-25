from db import db
from typing import List
from sqlalchemy import Enum
from enums.service_order_status import ServiceOrderStatusEnum

class ServiceOrderModel(db.Model):
    __tablename__ = "service_order"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False, unique=False)
    description = db.Column(db.String(512), nullable=False, unique=False)
    status = db.Column(Enum(ServiceOrderStatusEnum))
    start_date = db.Column(db.DateTime, nullable=False, unique=False)
    end_date = db.Column(db.DateTime, nullable=False, unique=False)
    created_at = db.Column(db.DateTime, nullable=False, unique=False)
    updated_at = db.Column(db.DateTime, nullable=True, unique=False)
    
    def __init__(self, title, description, status, start_date, end_date):
        self.title = title
        self.description = description
        self.status = status
        self.start_date = start_date
        self.end_date = end_date

    @classmethod
    def get_all(cls) -> List["ServiceOrderModel"]:
        return cls.query.all()

    @classmethod
    def find_by_id(cls, _id) -> "ServiceOrderModel":
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
        
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status.value,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }