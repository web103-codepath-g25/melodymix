
# Music Recommendation Service

This service is a content-based music recommendation system that provides song suggestions based on a user’s input, such as a song they like or keywords. The system is built using natural language processing (NLP) techniques and a similarity-based model trained on music metadata.

## Overview
This music recommender system uses NLP and machine learning to analyze text data, recommend songs, and retrieve relevant album covers. It uses a dataset from Kaggle to train the model on song metadata and descriptions, and provides recommendations based on similarity in song descriptions and other attributes.

## Features
- **Content-Based Filtering**: Recommends songs similar to the user-selected song using content-based filtering techniques.
- **Simple REST API**: Built with Flask, this API allows easy integration with a frontend or other services.

## Dataset
This service is trained on the [Spotify Million Song Dataset](https://www.kaggle.com/datasets/notshrirang/spotify-million-song-dataset) from Kaggle. Download and preprocess the data before using it in the model.

## System Architecture
1. **Data Collection**: Prepares the dataset by loading it into the model.
2. **Text Preprocessing**: Cleans and preprocesses song descriptions.
   - Converts text to lowercase.
   - Removes punctuation and special characters.
   - Tokenizes descriptions and removes stopwords.
3. **Feature Extraction**: Transforms text data into numerical representations using TF-IDF.
4. **Similarity-Based Recommendation**: Uses cosine similarity on song descriptions to recommend music similar to a given song.

## Getting Started

### Prerequisites
1. **Python** (version 3.7 or higher).
2. Install dependencies in a virtual environment using `requirements.txt`.

### Installation

1. **Set Up Virtual Environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the API**:
   ```bash
   python recommend_api.py
   ```
   The API will be available at `http://127.0.0.1:5000`.

## API Usage

### Endpoint
- **POST** `/recommend`
   - **Description**: Recommends songs similar to a given song.
   - **Request Body** (JSON):
     ```json
     {
       "song": "Song Name"
     }
     ```
   - **Response**: A list of recommended songs with their album cover URLs.

### Example Request (Postman)
1. **Method**: `POST`
2. **URL**: `http://127.0.0.1:5000/recommend`
3. **Headers**: `Content-Type: application/json`
4. **Body**:
   ```json
   {
     "song": "Back On Earth"
   }
   ```

## Recommendation Process
1. **User Input**: Users provide a song name they like.
2. **Content-Based Filtering**: The service uses similarity scores between song descriptions to find songs with similar attributes.
3. **Recommendation Display**: The top 5 recommendations are returned as JSON, each with a song title.

## Dependencies
The required Python packages are listed in `requirements.txt`:
- `flask`: To build the REST API.
- `spotipy`: For accessing the Spotify API.
- `pandas`: For handling the dataset.

## Future Enhancements
1. **Collaborative Filtering**: Introduce user-based collaborative filtering for personalized recommendations.
2. **Extended NLP Analysis**: Use embeddings like Word2Vec or GloVe for a richer text-based recommendation system.
3. **User Interaction**: Allow users to provide feedback to improve recommendation quality.
4. **Further Model Training**: For more accuracy, consider fine-tuning the model using additional features from the Spotify dataset or incorporating collaborative filtering.
5. **Running in Production**: For production, use a WSGI server (e.g., `gunicorn`) to serve the Flask app.

