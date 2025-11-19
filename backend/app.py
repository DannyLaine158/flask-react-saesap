from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

# Instancia de flask:
app = Flask(__name__)
CORS(app)

def extract_song_info(t):
    return {
        "id": t["id"],
        "title": t["title"],
        "artist": t["artist"]["name"],
        "cover": t["album"]["cover_medium"],
        "preview": t["preview"]
    }

# Crear ruta
@app.route("/")
def index():
    return "Hola a todos, bienvenidos"

@app.route("/search")
def search():
    # request sirve para pasar variables en la URL
    query = request.args.get("q")

    if not query:
        return jsonify({ "error": "Falta parámetro requerido" }), 400

    url = f"https://api.deezer.com/search?q={query}"

    # requests sirve para obtener datos de una api
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "Falló la api externa"}), 500

    data = response.json().get("data", [])
    results = []

    # Solo envía 10 canciones
    for song in data[:10]:
        track_id = song["id"]
        track_url = f"https://api.deezer.com/track/{track_id}"
        track_info = requests.get(track_url).json()

        results.append({
            "id": track_id,
            "title": song["title"],
            "artist": song["artist"]["name"],
            "cover": song["album"]["cover_medium"],
            "preview": song["preview"]
        })

    return jsonify(results)

@app.route("/recommend/<int:track_id>")
def recommend(track_id):
    track_data = requests.get(f"https://api.deezer.com/track/{track_id}").json()
    artist_id = track_data["artist"]["id"] # Obtener id de artista

    recommendations = []

    # Top del mismo artista
    top_artist_url = f"https://api.deezer.com/artist/{artist_id}/top?limit=5"
    top_tracks = requests.get(top_artist_url).json().get("data", [])
    for track in top_tracks:
        if track["id"] != track_id:
            info = extract_song_info(track)
            recommendations.append(info)

    # Artistas relacionados
    related_url = f"https://api.deezer.com/artist/{artist_id}/related"
    related_artists = requests.get(related_url).json().get("data", [])

    for ra in related_artists:
        top_related = requests.get(
            f"https://api.deezer.com/artist/{ra['id']}/top?limit=3"
        ).json().get("data", [])

        for track in top_related:
            info = extract_song_info(track)
            recommendations.append(info)

    unique = {t["id"]: t for t in recommendations}
    final = list(unique.values())[:12]

    return jsonify(final)

# Lanzar el servidor
if __name__ == '__main__':
    app.run(port=5001, debug=True)