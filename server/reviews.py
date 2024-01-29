from flask import request
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from model import db, Event, Review

class ReviewResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('text', type=str, required=True, help='Text cannot be blank')

    @jwt_required()  # Requires a valid JWT token, assuming you are using JWT for authentication
    def post(self, event_id):
        try:
            data = self.parser.parse_args()  # Parse the request data using the defined parser
            current_user_id = get_jwt_identity()  # Get the user ID from the JWT token

            event = Event.query.get(event_id)

            if not event:
                return {"message": "Event not found."}, 404

            new_review = Review(text=data['text'], user_id=current_user_id)
            event.reviews.append(new_review)
            db.session.commit()

            return {
                "message": "Review added successfully.",
                "review": {
                    "id": new_review.id,
                    "text": new_review.text,
                    "user_id": current_user_id  # Include the user_id in the response
                }
            }
        except Exception as e:
            return {"error": str(e)}, 500

    def put(self, review_id):
        try:
            review = Review.query.get(review_id)

            if not review:
                return {"message": "Review not found."}, 404

            data = request.get_json()
            review.text = data['text']
            db.session.commit()

            return {
                "message": "Review updated successfully.",
                "review": {
                    "id": review.id,
                    "text": review.text
                }
            }
        except Exception as e:
            return {"error": str(e)}, 500

    def delete(self, review_id):
        review = Review.query.get(review_id)

        if not review:
            return {"message": "Review not found."}, 404

        db.session.delete(review)
        db.session.commit()

        return {"message": "Review deleted successfully."}
