// src/components/Playlists.js
import React, { useState, useEffect } from 'react';
import PlaylistCard from './PlaylistCard'; // Import PlaylistCard
import './playlists.css'; // Import CSS for the container/grid styles

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPlaylists = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/playlists', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch playlists');
        }

        const data = await response.json();

        if (isMounted) {
          const uniquePlaylists = Array.from(
            new Map(data.map(playlist => [playlist.user_id, playlist])).values()
          );

          setPlaylists(uniquePlaylists);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    fetchPlaylists();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <div>Loading playlists...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="playlists-container">
      {playlists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        <div className="playlists-grid">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.user_id} playlist={playlist} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlists;
