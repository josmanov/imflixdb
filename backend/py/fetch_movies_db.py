import requests
import json
import os
from dotenv import load_dotenv

# To do: Fix movie request limit (20).

load_dotenv()

TOKEN = os.getenv("TMDB_TOKEN")

url = "https://api.themoviedb.org/3/discover/movie"

params = {
    "with_watch_providers": "8",
    "watch_region": "FI",
    "with_watch_monetization_types": "flatrate",
    "sort_by": "popularity.desc"
}

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "accept": "application/json"
}

response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    data = response.json()
    try:
        with open("../../frontend/data/data.json", "r") as f:
            existing_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existing_data = {"movies": []}
    next_id = len(existing_data["movies"]) + 1
    for i, movie in enumerate(data.get("results", [])):
        if i >= 50:
            break
        movie_data = {
            "id": next_id,
            "title": movie["title"],
            "rating": round(movie["vote_average"], 1), # Maybe adding a imdb api is more up to date
            "image": f"https://image.tmdb.org/t/p/w500{movie['poster_path']}",
            "genre": [], # Will add later
            "year": int(movie["release_date"].split("-")[0]) if "release_date" in movie else None,
            "link": f"https://www.themoviedb.org/movie/{movie['id']}"
        }
        existing_data["movies"].append(movie_data)
        next_id += 1
    with open("../../frontend/data/data.json", "w") as f:
        json.dump(existing_data, f, indent=4)
    print("New data successfully added.")
else:
    print("Failed to fetch data:", response.status_code, response.text)
