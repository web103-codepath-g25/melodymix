import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get dynamic route params

const PlaylistsDetail = () => {
  const { playlistId } = useParams(); // Extract playlistId from the URL
  const [playlist, setPlaylist] = useState(null); // State for a single playlist
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(''); // State for the selected artist
  const [artists, setArtists] = useState([]); // State to store unique artists

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

          // Extract unique artists from the playlist and set it
          const uniqueArtists = Array.from(new Set(data.map(song => song.artist).filter(artist => artist)));
          setArtists(uniqueArtists);
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

  // Filter songs by selected artist
  const filteredSongs = selectedArtist
    ? playlist.filter((song) => song.artist === selectedArtist)
    : playlist;

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

      {/* Artist Dropdown */}
      <label htmlFor="artist-select">Filter by Artist:</label>
      <select
        id="artist-select"
        value={selectedArtist}
        onChange={(e) => setSelectedArtist(e.target.value)}
      >
        <option value="">All Artists</option>
        {artists.map((artist) => (
          <option key={artist} value={artist}>
            {artist}
          </option>
        ))}
      </select>

      {/* Iterate over filtered playlist songs */}
      {filteredSongs.length === 0 ? (
        <p>No songs found for this artist.</p>
      ) : (
        <div className="song-list">
          {filteredSongs.map((song) => (
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
