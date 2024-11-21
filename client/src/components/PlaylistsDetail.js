import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PlaylistDetail.css'; // Import CSS for the container/grid styles

const PlaylistsDetail = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState('');
  const [artists, setArtists] = useState([]);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/playlist-songs/${playlistId}`);
        if (!response.ok) throw new Error('Failed to fetch playlist');

        const data = await response.json();
        if (isMounted) {
          setPlaylist(data);
          setIsLoading(false);
          
          // Extract unique artists
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

    // Cleanup on unmount
    return () => {
      isMounted = false;
    };
  }, [playlistId]);

  const filteredSongs = selectedArtist
    ? playlist.filter((song) => song.artist === selectedArtist)
    : playlist;

  const handleAddSong = async () => {
    if (newSongTitle && newSongArtist) {
      try {
        const response = await fetch(`http://localhost:3001/api/playlist-songs/${playlistId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newSongTitle,
            artist: newSongArtist,
            userId: 1, // Replace with actual user ID
          }),
        });

        if (!response.ok) throw new Error('Failed to add song');
        const data = await response.json();

        setPlaylist((prevPlaylist) => [...prevPlaylist, data]); // Add new song to playlist
        setNewSongTitle('');
        setNewSongArtist('');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleDeleteSong = async (songId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/playlist-songs/${playlistId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songId }),
      });

      if (!response.ok) throw new Error('Failed to delete song');
      setPlaylist((prevPlaylist) => prevPlaylist.filter((song) => song.id !== songId));
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) return <div>Loading playlist...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!playlist) return <div>No playlist found</div>;

  return (
    <div className="playlist-detail">
      {/* Playlist Header */}
      <h2 className="h2-color">Playlist {playlistId} Details</h2>

      {/* Add a New Song Form */}
      <section className="add-song-form">
        <h3>Add a New Song</h3>
        <input
          type="text"
          placeholder="Song Title"
          value={newSongTitle}
          onChange={(e) => setNewSongTitle(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Artist"
          value={newSongArtist}
          onChange={(e) => setNewSongArtist(e.target.value)}
          className="input-field"
        />
        <button onClick={handleAddSong} className="btn-primary">
          Add Song
        </button>
      </section>

      {/* Artist Dropdown */}
      <section className="filter-section">
        <label htmlFor="artist-select">Filter by Artist:</label>
        <select
          id="artist-select"
          value={selectedArtist}
          onChange={(e) => setSelectedArtist(e.target.value)}
          className="select-dropdown"
        >
          <option value="">All Artists</option>
          {artists.map((artist) => (
            <option key={artist} value={artist}>
              {artist}
            </option>
          ))}
        </select>
      </section>

      {/* Display filtered songs */}
      <section className="song-list">
        {filteredSongs.length === 0 ? (
          <p>No songs found for this artist.</p>
        ) : (
          filteredSongs.map((song) => (
            <div key={song.id} className="song-card">
              <h3>{song.title}</h3>
              <p>Artist: {song.artist}</p>
              <p>Duration: {song.duration || 'Unknown'}</p>
              <p>Created At: {new Date(song.created_at).toLocaleString()}</p>
              <button
                onClick={() => handleDeleteSong(song.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default PlaylistsDetail;
