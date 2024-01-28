# seed.py
from faker import Faker
from flask_bcrypt import Bcrypt
from app import app, db
from model import User, Event, Ticket, Review

# Initialize Faker, Bcrypt, Flask-SQLAlchemy
fake = Faker()
bcrypt = Bcrypt(app)

# Function to create sample users
def create_users(num_users=5):
    for _ in range(num_users):
        user = User(
            username=fake.user_name(),
            role='user',
            password=bcrypt.generate_password_hash(fake.password()).decode('utf-8')
        )
        db.session.add(user)
    db.session.commit()

# Function to create sample events
def create_events(num_events=5):
    for _ in range(num_events):
        event = Event(
            title=fake.text(20),
            description=fake.text(),
            date=fake.future_datetime(),
            location=fake.address(),
            organizer_id=fake.random_element(User.query.all()).id,
            image_url=fake.image_url()
        )
        db.session.add(event)
    db.session.commit()

# Function to create sample tickets
def create_tickets(num_tickets=10):
    for _ in range(num_tickets):
        ticket = Ticket(
            event_id=fake.random_element(Event.query.all()).id,
            user_id=fake.random_element(User.query.all()).id,
            quantity=fake.random_int(min=1, max=10),
            ticket_price=fake.pyfloat(left_digits=2, right_digits=2, positive=True, min_value=10, max_value=100),
            image_url=fake.image_url(),
            tickets_available=fake.random_int(min=0, max=100),
            tickets_purchased=fake.random_int(min=0, max=10) 
        )
        db.session.add(ticket)
    db.session.commit()

# Function to create sample reviews
def create_reviews(num_reviews=5):
    for _ in range(num_reviews):
        user = fake.random_element(User.query.all())
        review = Review(
            text=fake.text(50),
            user_id=user.id
        )
        db.session.add(review)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        # Generate and insert sample data
        create_users()
        create_events()
        create_tickets()
        create_reviews()

        print("Sample data added successfully.")
