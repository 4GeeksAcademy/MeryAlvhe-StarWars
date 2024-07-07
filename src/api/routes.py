"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users

api = Blueprint('api', __name__)
CORS(api) # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body ['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route('/signup', methods=['GET', 'POST'])
def signup():
    response_body = {}
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)
    user = Users()
    user.email = email
    user.password = password
    user.is_active = True
    user.is_admin = False
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity={ 'user_id': user.id,
                                                  'user_is_admin': user.is_admin})
    response_body['message'] = 'User Signed Up'
    response_body['access_token'] = access_token
    response_body['results']=user.serialize()
    return response_body, 200


@api.route('/login', methods=['POST'])
def login(): 
    response_body = {}
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    print(user)
    if user: 
        access_token = create_access_token(identity={ 'user_id': user.id,
                                                      'user_is_admin': user.is_admin})
        response_body['message'] = 'User logged in'
        response_body['access_token'] = access_token
        response_body['results'] = user.serialize()
        # Nos hace falta devolver los favoritos del usuario. Incluyendo el ID del favorito y el ID del criminal.
        rows = db.session.execute(db.select(SavedCriminals).where(SavedCriminals.user_id == user.id)).scalars()
        results = [row.public_serialize() for row in rows]
        response_body['saved_criminals'] = results
        return response_body, 200
    response_body['message'] = 'Wrong Username Or Password'
    return response_body, 401


@api.route('/users', methods=['GET'])
def handle_users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    results = [row.serialize() for row in rows]
    response_body['results'] = results
    response_body['message'] = 'User List'
    return response_body, 200


@api.route('/users/<int:user_id>', methods=['GET', 'DELETE', 'PUT'])
def handle_users_id(user_id):
    response_body = {}
    if request.method == 'GET':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            response_body['results'] = user.serialize()
            response_body['message'] = 'User Found'
            return response_body, 200
        response_body['message'] = 'User Not Found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            user.email = data['email']
            user.is_active = data['is_active']
            user.name = data['name']
            user.surname = data['surname']
            user.description = data['description']
            user.avatar = data['avatar']
            db.session.commit()
            response_body['message'] = 'Datos del usuario actualizados'
            response_body['results'] = user.serialize()
            return response_body, 200
        response_body['message'] = 'User Profile Updated'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            db.session.delete(user)
            db.session.commit()
            response_body['message'] = 'User Deleted'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'User Not Found'
        response_body['results'] = {}
        return response_body, 404  

@api.route('/users/<int:user_id>/favorites-Characters', methods=['GET'])
def handle_users_favorites_Characters(user_id):
    response_body = {}
    saved_favorites_characters = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == user_id)).scalars()
    results = [row.serialize() for row in saved_favorites_characters]
    response_body['results'] = results
    response_body['message'] = 'Saved favorites characters'
    return response_body, 200

@api.route('/users/<int:user_id>/favorites-planets', methods=['GET'])
def handle_users_favorites_planets(user_id):
    response_body = {}
    saved_favorites_planets = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == user_id)).scalars()
    results = [row.serialize() for row in saved_favorites_characters]
    response_body['results'] = results 
    response_body['message'] = 'Saved favorites Planets'
    return response_body, 200




# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_user)
    response_body['message'] = f"user logueado: {current_user}"
    return response_body, 200