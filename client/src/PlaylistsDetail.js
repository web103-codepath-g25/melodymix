import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get dynamic route params

const PlaylistsDetail = () => {
  const { playlistId } = useParams(); // Extract playlistId from the URL
  const [playlist, setPlaylist] = useState(null); // State for a single playlist
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/playlists/${playlistId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch playlist');
        }

        const data = await response.json();

        // Only update state if the component is still mounted
        if (isMounted) {
          setPlaylist(data); // Set the single playlist data
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    fetchPlaylist();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [playlistId]); // Re-fetch when playlistId changes

  if (isLoading) {
    return <div>Loading playlist...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!playlist) {
    return <div>No playlist found</div>;
  }

  return (
    <div className="playlist-detail">
      <h2>{playlist.name}</h2>
      <p>User ID: {playlist.user_id}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default PlaylistsDetail;
