import React from 'react';
import { Link } from 'react-router-dom';

const Playlists = ({ data }) => {
  return (
    <div>
      <h1>Playlists</h1>
      <ul>
        {data.length > 0 ? (
          data.map((playlist) => (
            <li key={playlist.id}>
              <h2>{playlist.name}</h2>
              <p>User ID: {playlist.user_id}</p>
              {/* Link to playlist details page */}
              <Link to={`/playlist/${playlist.id}`}>View Details</Link>
            </li>
          ))
        ) : (
          <p>No playlists available</p>
        )}
      </ul>
    </div>
  );
}

export default Playlists;
