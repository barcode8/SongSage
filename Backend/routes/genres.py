from flask import Blueprint, jsonify
import json

genres_bp=Blueprint("genres",__name__)

#opening JSON file
with open("data/spotify_genres.json","r",encoding="utf-8") as file:
    genres_data=json.load(file)

@genres_bp.route("/genres",methods=['GET'])
def get_genres():
    genres=list(set(item["track_genre"] for item in genres_data if "track_genre" in item))
    return jsonify(genres)