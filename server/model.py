# model.py
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model, SerializerMixin):
    __tablename__ = 'user'
     
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    role = db.Column(db.String(20), default='user', nullable=False)
    password = db.Column(db.String(60), nullable=False)
    events = relationship('Event', backref='organizer', lazy=True)
    tickets = relationship('Ticket', backref='user', lazy=True)
    bought_tickets = relationship('BoughtTicket', backref='user', lazy=True)
    reviews = relationship('Review', backref='user', lazy=True, cascade='all, delete-orphan')

    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 3:
            raise ValueError("Username must be at least 3 characters long.")
        return username

    @validates('password')
    def validate_password(self, key, password):
        if len(password) < 6:
            raise ValueError("Password must be at least 6 characters long.")
        if not any(char.isdigit() for char in password):
            raise ValueError("Password must contain at least one digit.")
        return bcrypt.generate_password_hash(password).decode('utf-8')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'role': self.role,
            'events': [event.to_dict() for event in self.events],
            'tickets': [ticket.to_dict() for ticket in self.tickets],
            'bought_tickets': [bought_ticket.to_dict() for bought_ticket in self.bought_tickets],
            'reviews': [review.to_dict() for review in self.reviews]
        }

class Event(db.Model, SerializerMixin):
    __tablename__ = 'event'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    image_url = db.Column(db.String(255))
    tickets = relationship('Ticket', backref='event', lazy=True)

    @validates('title')
    def validate_title(self, key, title):
        if len(title) < 5:
            raise ValueError("Event title must be at least 5 characters long.")
        return title

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date': self.date.isoformat(),
            'location': self.location,
            'organizer_id': self.organizer_id,
            'image_url': self.image_url,
            'tickets': [ticket.to_dict() for ticket in self.tickets]
        }

class Ticket(db.Model, SerializerMixin):
    __tablename__ = 'ticket'
    
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    ticket_price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255))
    tickets_available = db.Column(db.Integer, nullable=False, server_default='0')
    bought_tickets = relationship('BoughtTicket', backref='ticket', lazy=True)

    @validates('quantity')
    def validate_quantity(self, key, quantity):
        if quantity <= 0:
            raise ValueError("Quantity must be greater than zero.")
        return quantity

    @validates('ticket_price')
    def validate_ticket_price(self, key, ticket_price):
        if ticket_price <= 0:
            raise ValueError("Ticket price must be greater than zero.")
        return ticket_price

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'user_id': self.user_id,
            'quantity': self.quantity,
            'ticket_price': self.ticket_price,
            'image_url': self.image_url,
            'tickets_available': self.tickets_available,
            'bought_tickets': [bought_ticket.to_dict() for bought_ticket in self.bought_tickets]
        }

class BoughtTicket(db.Model, SerializerMixin):
    __tablename__ = 'bought_ticket'

    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    purchase_date = db.Column(db.DateTime, nullable=False)

    @validates('quantity')
    def validate_quantity(self, key, quantity):
        if quantity <= 0:
            raise ValueError("Quantity must be greater than zero.")
        return quantity

    def to_dict(self):
        return {
            'id': self.id,
            'ticket_id': self.ticket_id,
            'user_id': self.user_id,
            'quantity': self.quantity,
            'total_price': self.total_price,
            'purchase_date': self.purchase_date.isoformat()
        }

class Review(db.Model, SerializerMixin):
    __tablename__ = 'review'
    
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', name='fk_review_user'), nullable=False)

    @validates('text')
    def validate_text(self, key, text):
        if len(text) < 10:
            raise ValueError("Review text must be at least 10 characters long.")
        return text

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'user_id': self.user_id
        }
