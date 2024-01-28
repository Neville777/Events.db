import os
from flask import Flask
from flask_restful import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from model import db, bcrypt 
from user import UserRegistrationResource, UserLoginResource, UserResource, RefreshTokenResource, LogoutResource
from Events import EventResource, AdminEventResource
from tickets import TicketResource, AdminTicketResource
from reviews import ReviewResource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']
app.config['JWT_COOKIE_SECURE'] = False
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.config['JWT_ACCESS_COOKIE_PATH'] = '/refresh'
app.config['JWT_REFRESH_COOKIE_PATH'] = '/refresh'
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = False

api = Api(app)
jwt = JWTManager(app)

db.init_app(app)
bcrypt.init_app(app)
CORS(app)

migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

api.add_resource(UserRegistrationResource, '/register')
api.add_resource(UserLoginResource, '/login')
api.add_resource(UserResource, '/user')
api.add_resource(LogoutResource, '/logout')
api.add_resource(RefreshTokenResource, '/refresh_token')
api.add_resource(EventResource, '/events', '/events/<int:event_id>')
api.add_resource(AdminEventResource, '/admin/events', '/admin/events/<int:event_id>')
api.add_resource(TicketResource, '/tickets', '/tickets/<int:ticket_id>')
api.add_resource(AdminTicketResource, '/admin/tickets', '/admin/tickets/<int:ticket_id>')
api.add_resource(ReviewResource, '/reviews', '/reviews/<int:review_id>')

with app.app_context():
    db.create_all()
    

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, port=5000 )
