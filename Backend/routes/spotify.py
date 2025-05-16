from flask import Blueprint, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

spotify_bp = Blueprint("spotify", __name__)

CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

def get_access_token():
    url = "https://accounts.spotify.com/api/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {"grant_type": "client_credentials"}
    response = requests.post(url, headers=headers, data=data, auth=(CLIENT_ID, CLIENT_SECRET))
    if response.status_code == 200:
        return response.json().get("access_token")
    return None

@spotify_bp.route("/spotify/genre-tracks", methods=["GET"])
def get_genre_tracks():
    genre = request.args.get("genre", "").strip().lower()
    if not genre:
        return jsonify({"error": "Genre parameter is required"}), 400

    access_token = get_access_token()
    if not access_token:
        return jsonify({"error": "Failed to get access token"}), 500

    # Step 1: Search for a Playlist
    search_url = "https://api.spotify.com/v1/search"
    headers = {"Authorization": f"Bearer {access_token}"}
    params = {"q": f"{genre} playlist", "type": "playlist", "limit": 1}  

    search_response = requests.get(search_url, headers=headers, params=params)
    
    if search_response.status_code == 200:
        search_data = search_response.json()
        playlists = search_data.get("playlists", {}).get("items", [])

        if not playlists:
            return jsonify({"error": "No playlists found for this genre"}), 404

        playlist_id = playlists[0]["id"]
        playlist_name = playlists[0]["name"]

        # Step 2: Fetch Tracks from the Playlist
        tracks_url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
        tracks_response = requests.get(tracks_url, headers=headers)

        if tracks_response.status_code == 200:
            tracks_data = tracks_response.json()
            tracks = tracks_data.get("items", [])

            track_list = []
            for track in tracks[:10]:  # Get only 10 tracks
                track_info = track.get("track", {})
                track_list.append({
                    "name": track_info.get("name"),
                    "artist": ", ".join([artist["name"] for artist in track_info.get("artists", [])]),
                    "url": track_info.get("external_urls", {}).get("spotify", "")
                })

            return jsonify({"playlist_name": playlist_name, "tracks": track_list})

    return jsonify({"error": search_response.json()}), search_response.status_code
