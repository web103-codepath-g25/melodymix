import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get dynamic route params

const PlaylistsDetail = () => {
  const { playlistId } = useParams(); // Extract playlistId from the URL
  const [playlist, setPlaylist] = useState(null); // State for a single playlist
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    console.log("Playlist ID:", playlistId);

    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/playlist-songs/${playlistId}`, {
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
      <h2>Playlist {playlistId} Details</h2>
      {/* Iterate over playlist songs */}
      {playlist.length === 0 ? (
        <p>No songs in this playlist.</p>
      ) : (
        <div className="song-list">
          {playlist.map((song) => (
            <div key={song.id} className="song-card">
              <h3>{song.title}</h3>
              <p>Artist: {song.artist}</p>
              <p>Duration: {song.duration || 'Unknown'}</p>
              <p>Created At: {new Date(song.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistsDetail;
