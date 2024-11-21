import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

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

        // Only update state if component is still mounted
        if (isMounted) {
          // Remove duplicates
          const uniquePlaylists = Array.from(
            new Map(data.map(playlist => [playlist.user_id, playlist]))
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
      {playlists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        <div className="playlists-grid">
          {playlists.map((playlist) => (
            <div key={playlist.user_id} className="playlist-card">
              <h2>
                <Link to={`/playlists/${playlist.user_id}`}>{playlist.name}</Link>
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlists;
