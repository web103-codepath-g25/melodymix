# MelodyMix

CodePath WEB103 Final Project

Designed and developed by: Anusha Chinthamaduka, Vinh Le

🔗 Link to deployed app:

## About

### Description and Purpose

This application aims to enhance users' music experience by providing personalized playlist creation based on their unique tastes and preferences. By analyzing user input, it offers tailored music recommendations that encourage exploration of new artists and genres. Additionally, the platform fosters community engagement through collaborative playlists, allowing friends to curate shared musical journeys together.

### Inspiration

Inspired by the joy of discovering new music and sharing it with friends, this platform aims to create a dynamic space where users can explore diverse sounds and connect through shared playlists. The goal is to transform music discovery into a collaborative experience, fostering a sense of community among music lovers.

## Tech Stack

Frontend:
- React.js
- CSS Framework: TailwindCSS or Bootstrap
- Axios (or Fetch API): HTTP requests to the backend to perform CRUD operations (Create, Read, Update, Delete) on user data (like playlists, song preferences, etc.).
- React Context API (or Redux): For managing global state like user data, playlists, and shared preferences.

Backend:
- Node.js with Express.js
- Railway-PostgreSQL
- Deployment: Railway
  
## Features

### ✅ Playlist Management (User Story 1): 
- User Feature: Users can create, edit, and delete playlists to manage their favorite songs.
- Technical Feature: Implement POST/GET requests for playlist creation, PATCH for editing playlists, and DELETE requests for playlist removal.

https://github.com/user-attachments/assets/65537d2b-77d5-4f2a-a393-abf9e9dd1b94

### ✅ Playlist Overview (User Story 2): 
- User Feature: Users can view all playlists at once and view the songs in each playlist by clicking "Play" Button
- Technical Feature: Implement GET requests for playlist retrieval and songs for each playlist retrival

https://github.com/user-attachments/assets/94a5db19-3e5e-450d-8787-1e339d3cfd0d

###  ✅ Personalized Recommendations (User Story 3): 
- User Feature: Recommendations are generated based on the user's past listening habits and preferences.
- Technical Feature: Implement a recommendation algorithm that analyzes user data (listening history or selected genres) and returns recommendations via GET requests.
  
Link to demo: https://imgur.com/a/5whXQ3v

### ✅ Music Filtering System (User Story ): 
- User Feature: Users can filter songs based on artist, genre, etc
- Technical Feature: Implement GET requests with query parameters that filter artist, genre, and more

https://github.com/user-attachments/assets/9503483e-3812-4c84-971a-ed1604c583b9


### [ADDITIONAL FEATURES GO HERE - ADD ALL FEATURES HERE IN THE FORMAT ABOVE; you will check these off and add gifs as you complete them]
Strech: Uses NLP and machine learning to analyze text data, recommend songs, and retrieve relevant album covers. It uses a dataset from Kaggle to train the model on song metadata and descriptions, and provides recommendations based on similarity in song descriptions and other attributes.
- Dataset: Spotify Million Song Dataset](https://www.kaggle.com/datasets/notshrirang/spotify-million-song-dataset) from Kaggle
- Github: [Link model](https://github.com/web103-codepath-g25/melodymix/tree/main/recommendation_service)
- Link demo: https://imgur.com/a/5whXQ3v

## Installation Instructions

[instructions go here]
