import requests
import json
import os
from dotenv import load_dotenv

# To do: Fix movie request limit (20).

load_dotenv()

TOKEN = os.getenv("TMDB_TOKEN")

tmdb_url = "https://api.themoviedb.org/3/discover/movie"

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

response = requests.get(tmdb_url, headers=headers, params=params)

if response.status_code == 200:
    api_data = response.json()
    try:
        with open("../../frontend/data/data.json", "r") as data_file:
            existing_data = json.load(data_file)
    except (FileNotFoundError, json.JSONDecodeError):
        existing_data = {"movies": []}
    next_id = len(existing_data["movies"]) + 1
    for i, current_movie in enumerate(api_data.get("results", [])):
        if i >= 50:
            break
        movie_data = {
            "id": next_id,
            "title": current_movie["title"],
            "rating": round(current_movie["vote_average"], 1), # Maybe adding a imdb api is more up to date
            "image": f"https://image.tmdb.org/t/p/w500{current_movie['poster_path']}",
            "genre": [], # Will add later
            "year": int(current_movie["release_date"].split("-")[0]) if "release_date" in current_movie else None,
            "link": f"https://www.themoviedb.org/movie/{current_movie['id']}"
        }
        existing_data["movies"].append(movie_data)
        next_id += 1
    with open("../../frontend/data/data.json", "w") as data_file:
        json.dump(existing_data, data_file, indent=4)
    print("New data successfully added.")
else:
    print("Failed to fetch data:", response.status_code, response.text)
