from flask import Flask
from flask_cors import CORS
import os

def create_app():
    app=Flask(__name__)
    CORS(app)
    app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')
    
    #registering blueprints
    from routes.genres import genres_bp
    from routes.home import home_bp
    from routes.spotify import spotify_bp
    app.register_blueprint(genres_bp)
    app.register_blueprint(home_bp)
    app.register_blueprint(spotify_bp)

    return app