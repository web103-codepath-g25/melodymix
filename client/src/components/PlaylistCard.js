// src/components/PlaylistCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './playlists.css'; // Import the CSS file for styling

const PlaylistCard = ({ playlist }) => {
  return (
    <div className="playlist-card">
      <h2>{playlist.name}</h2>
      <Link to={`/playlists/${playlist.user_id}`}>
        <button className="playlist-button">Play</button>
      </Link>
    </div>
  );
};

export default PlaylistCard;
