from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), unique=False, nullable=True)
    last_name = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'first_name': self.first_name,
                'last_name': self.last_name}

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=True)
    description = db.Column(db.String(), nullable=True)
    body = db.Column(db.String(), nullable=True)
    image_url= db.Column(db.String(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])

    def __repr__(self):
        return f'<Post: {self.title}>'

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'body' : self.body,
                'image_url': self.image_url,
                'user_id': self.user_id}


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id])
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])

    def __repr__(self):
        return f'<comment:{self.body}>'
    
    def serialize(self):
        return{'id': self.id,
               'body': self.body,
               'date': self.date,
               'post_to': post_to,
               'user_to': user_to}


class Followers(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    user_id_from_favorite = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_id_from = db.relationship('Users', foreign_keys=[user_id_from_favorite])
    user_id_to_favorite = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_id_to = db.relationship('Users', foreign_keys=[user_id_to_favorite])

    def __repr__(self):
        return f'<comment:{self.user_id_from}>'    
    
    def serialize(self):
        return{'id': self.id,
               'user_id_from': self.user_id_from_favorite,
               'user_id_to': self. user_id_to_favorite}               


class Planets(db.Model): # Modelado StarWars project
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    diameter = db.Column(db.String, nullable=False)
    population = db.Column(db.String, nullable=False)
    climate = db.Column(db.String(), nullable=False)
    terrain = db.Column(db.String(), nullable=False)
    rotation_period = db.Column(db.Integer, nullable=False)

    def __repr__ (self):
        return f'<name:{self.name}>'
    
    def serialize(self):
        return{'id': self.id,
               'name': self.name,
               'diameter': self.diameter,
               'population': self.population,
               'climate': self.climate,
               'terrain': self.terrain,
               'rotation_period': self.rotation_period}

               
class Characters(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    birth_year = db.Column(db.String, nullable=False)
    height = db.Column(db.String, nullable=False)
    skin_color = db.Column(db.String(), nullable=False)
    gender = db.Column(db.String(), nullable=False)
   # home_world_id = db.Column(db.Integer, db.ForeignKey('planets.id'))
   # home_world_to = db.relationship('Planets', foreign_keys=[home_world_id])
   # specie_id =  db.Column(db.Integer, db.ForeignKey('species.id'))
   # species_to = db.relationship('Species', foreign_keys=[specie_id])   

    def __repr__ (self):
        return f'<name:{self.name}>'

    def serialize(self):
        return{'id': self.id,
               'name': self.name,
               'birth_year': self.birth_year,
               'height': self.height,
               'skin_color': self.skin_color,
               'gender': self.gender,}
              # 'home_world_id': home_world_id}

class Species(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    classification = db.Column(db.String, nullable=False)
    designation = db.Column(db.String, nullable=False)
    average_height = db.Column(db.String, nullable=False)
    average_lifespan = db.Column(db.String, nullable=False)
    language = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<name:{self.name}>'
    
    def serialize(self):
        return{'id':self.id,
               'name': self.name,
               'classification': self.classification,
               'designation': self.designation,
               'average_height': self.average_height,
               'average_lifespan': self.average_lifespan,
               'language': self.language}


class CharacterFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])    
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    character_favorite = db.relationship('Characters', foreign_keys=[character_id])

    def __repr__(self):
        return f'<user:{self.user_to}>'
    
    def serialize(self):
        return{'id': self.id,
               'user_id': self.user_id,
               'character_id': character_id}


class PlanetFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_to = db.relationship('Users', foreign_keys=[user_id])    
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'), nullable=False)
    planet_favorite = db.relationship('Planets', foreign_keys=[planet_id])

    def __repr__(self):
        return f'<name:{self.user_to}>'
    
    def serialize(self):
        return{'id': self.id,
               'user_to': self.user_to,
               'planet_favorite': self.planet_favorite}



