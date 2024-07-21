"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users, Posts, Comments, Followers, Characters, Planets, Species, CharacterFavorites, PlanetFavorites
import requests

api = Blueprint('api', __name__)
CORS(api) # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body ['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)
    user = Users()
    user.email = email
    user.password = password
    user.is_active = True
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity={ 'user_id': user.id})
    response_body['message'] = 'User Signed Up'
    response_body['access_token'] = access_token
    response_body['results']=user.serialize()
    return response_body, 200


@api.route('/login', methods=['POST'])
def login(): 
    response_body = {}
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True, )).scalar()
    print(user)
    if user: 
        access_token = create_access_token(identity={ 'user_id': user.id})
        response_body['message'] = 'User logged in'
        response_body['access_token'] = access_token
        response_body['results'] = user.serialize()
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
            user.first_name = data['first_name']
            user.last_name = data['last_name']
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

@api.route('/post', methods=['GET', 'POST'])
def handle_post():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Post list'
        return response_body, 200
    if request.method == 'POST':
        user_id = request.json.get ("user_id", None)
        title = request.json.get ("title", None)
        description = request.json.get ("description", None)
        body = request.json.get ("body", None)
        image_url = request.json.get ("image_url", None)
        posts = Posts()
        posts.user_id = user_id
        posts.title = title
        posts.description = description
        posts.body = body
        posts.image_url = image_url
        db.session.add (posts)
        db.session.commit()
        response_body['message'] = 'Created post'
        return response_body, 200
    response_body['message'] = 'Post not found'
    response_body['results'] = {}
    return response_body, 404

@api.route('/comments', methods = ['GET', 'POST'])
def handle_comment ():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Comments)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Comments list'
        return response_body, 200
    if request.method == 'POST': 
        post_id = request.json.get ("post_id", None)
        user_id = request.json.get("user_id", None)
        body = request.json.get("body", None)
        date = request.json.get("date", None)
        comment = Comments()
        comment.post_id = post_id
        comment.user_id = user_id
        comment.body = body
        comment.date = date
        db.session.add(comment)
        db.session.commit()
        response_body['message'] = 'created Comment'
        return response_body, 200

@api.route('/followers', methods=['GET', 'POST'])
def handle_followers (): 
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Followers)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Followers list'
        return response_body, 200
    if request.method == 'POST': 
        user_id_from_favorite = request.json.get("user_id_from_favorite", None)
        user_id_to_favorite = request.json.get("user_id_to_favorite", None)
        follower = Followers()
        follower.user_id_from_favorite = user_id_from_favorite
        follower.user_id_to_favorite = user_id_to_favorite
        db.session.add(follower)
        db.session.commit()
        response_body['message'] = 'created follower'
        return response_body, 200    

@api.route('/characters', methods=['GET'])
def handle_characters():
    response_body = {}
    data = []
    character = 1

    while True:
        response = requests.get(f'https://www.swapi.tech/api/people/{character}')
        if response.status_code != 200:
            break
        data = response.json()
        if 'result' not in data or 'properties' not in data['result']:
            break
        properties = data['result']['properties']
        characters = Characters()
        characters.name = properties['name']
        characters.birth_year = properties['birth_year']
        characters.height = properties['height']
        characters.skin_color = properties['skin_color']
        characters.gender = properties['gender']
        db.session.add(characters)
        db.session.commit()
        character +=1
        response_body ['results'] = data
    return response_body, 200

@api.route('/planets', methods=['GET'])
def handle_planets():
    response_body = {}
    data = []
    planet = 1

    while True:
        response = requests.get(f'https://www.swapi.tech/api/planets/{planet}')
        if response.status_code != 200:
            break
        data = response.json()
        if 'result' not in data or 'properties' not in data['result']:
            break
        properties = data['result']['properties']
        planets = Planets()
        planets.name = properties['name']
        planets.diameter = str(properties['diameter'])
        planets.population = str(properties['population'])
        planets.climate = properties['climate']
        planets.terrain = properties['terrain']
        planets.rotation_period = properties['rotation_period']
        db.session.add(planets)
        db.session.commit()
        planet += 1
        response_body ['results'] = data
    return response_body, 200

@api.route('/species', methods=['GET'])
def handle_species():
    response_body = {}
    data = []
    specie = 1

    while True:
        response = requests.get(f'https://www.swapi.tech/api/species/{specie}')
        if response.status_code != 200:
            break
        data = response.json()
        if 'result' not in data or 'properties' not in data['result']:
            break
        properties = data['result']['properties']
        species = Species()
        species.name = properties['name']
        species.classification= properties['classification']
        species.designation = properties['designation']
        species.average_height = str(properties['average_height'])
        species.average_lifespan = str(properties['average_lifespan'])
        species.language = properties['language']
        db.session.add(species)
        db.session.commit()
        specie += 1
        response_body ['results'] = data
    return response_body, 200

@api.route('/favorites-planets', methods=['GET','POST']) 
def handle_favorite_planets():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(PlanetFavorites))
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Favorites planets'
        return response_body, 200
    if request.method == 'POST':
        response_body = {}
        planet_id = request.json.get ("planet_id", None)
        user_id = request.json.get ("user_id", None)
        favorite_planet = PlanetFavorites()
        favorite_planet.planet_id = planet_id
        favorite_planet.user_id  = user_id
        db.session.add(favorite_planet)
        db.session.commit()
        response_body['message'] = 'Favorite planet'
        response_body['results'] = favorite_planet.serialize()
        return response_body, 200

@api.route('/favorites-character', methods=['GET','POST']) 
def handle_favorite_character():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(CharacterFavorites))
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Favorites characters'
        return response_body, 200
    if request.method == 'POST':
        response_body = {}
        character_id = request.json.get ("character_id", None)
        user_id = request.json.get ("user_id", None)
        favorite_character = PlanetFavorites()
        favorite_character.character_id = character_id
        favorite_character.user_id  = user_id
        db.session.add(favorite_character)
        db.session.commit()
        response_body['message'] = 'Favorite character'
        response_body['results'] = favorite_character.serialize()
        return response_body, 200

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
    results = [row.serialize() for row in saved_favorites_planets]
    response_body['results'] = results 
    response_body['message'] = 'Saved favorites Planets'
    return response_body, 200