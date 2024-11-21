import React, { useState, useEffect } from 'react';

const Playlists = () => {
  // State to store the playlists
  const [playlists, setPlaylists] = useState([]);
  // State to manage loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch playlists from the backend
    const fetchPlaylists = async () => {
      try {
        // Make sure to use the full URL if not using a proxy
        const response = await fetch('http://localhost:3001/api/playlists', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Check if the response is ok
        if (!response.ok) {
          throw new Error('Failed to fetch playlists');
        }

        // Parse the JSON response
        const data = await response.json();
        
        // Update state with fetched playlists
        setPlaylists(data);
        setIsLoading(false);
      } catch (err) {
        // Handle any errors
        setError(err.message);
        setIsLoading(false);
      }
    };

    // Call the fetch function
    fetchPlaylists();
  }, []); // Empty dependency array means this effect runs once on mount

  // Render loading state
  if (isLoading) {
    return <div>Loading playlists...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render playlists
  return (
    <div className="playlists-container">
      <h1>My Playlists</h1>
      {playlists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        <ul className="playlists-list">
          {playlists.map((playlist) => (
            <li key={playlist.id} className="playlist-item">
              <div className="playlist-name">{playlist.name}</div>
              <div className="playlist-user">Created by User ID: {playlist.user_id}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Playlists;
