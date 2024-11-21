import React, { useState, useEffect } from 'react';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;  // Flag to track component mounting

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
        
        // Only update state if component is still mounted
        if (isMounted) {
          // Remove duplicates
          const uniquePlaylists = Array.from(
            new Map(data.map(playlist => [playlist.id, playlist]))
            .values()
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

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array

  if (isLoading) {
    return <div>Loading playlists...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="playlists-container">
      <h1>My Playlists</h1>
      {playlists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        <div className="playlists-grid">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-card">
              <h2>{playlist.name}</h2>
              <p>Created by User ID: {playlist.user_id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlists;