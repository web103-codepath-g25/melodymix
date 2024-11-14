from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

#load model
music = pickle.load(open('./model/df', 'rb'))
similarity = pickle.load(open('./model/similarity', 'rb'))

def recommend(song):
    index = music[music['song'] == song].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended_music_names = []
    for i in distances[1:6]:
        recommended_music_names.append(music.iloc[i[0]].song)
    return recommended_music_names

@app.route('/recommend', methods=['POST'])
def recommend_songs():
    data = request.json
    song_name = data['song']
    recommendations = recommend(song_name)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(port=5000)
