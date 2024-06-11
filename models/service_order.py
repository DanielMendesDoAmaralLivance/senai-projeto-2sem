from db import db
from typing import List


class ServiceOrderModel(db.Model):
    __tablename__ = "service_order"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False, unique=False)
    description = db.Column(db.String(512), nullable=False, unique=False)
    start_date = db.Column(db.DateTime, nullable=False, unique=False)
    end_date = db.Column(db.DateTime, nullable=False, unique=False)
    created_at = db.Column(db.DateTime, nullable=False, unique=False)
    updated_at = db.Column(db.DateTime, nullable=True, unique=False)
    
    def __init__(self, title, description, start_date, end_date):
        self.title = title
        self.description = description
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