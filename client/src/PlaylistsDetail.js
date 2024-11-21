import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
        if (!response.ok) {
          throw new Error('Failed to fetch playlist');
        }
        const data = await response.json();
        if (isMounted) {
          setPlaylist(data);
          setIsLoading(false);
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
        if (!response.ok) {
          throw new Error('Failed to add song');
        }
        const data = await response.json();
        setPlaylist((prevPlaylist) => [...prevPlaylist, data]); // Add new song to playlist
        setNewSongTitle('');
        setNewSongArtist('');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (isLoading) return <div>Loading playlist...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!playlist) return <div>No playlist found</div>;

  return (
    <div className="playlist-detail">
      <h2>Playlist {playlistId} Details</h2>

      {/* Add a New Song Form */}
      <div>
        <h3>Add a New Song</h3>
        <input
          type="text"
          placeholder="Song Title"
          value={newSongTitle}
          onChange={(e) => setNewSongTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist"
          value={newSongArtist}
          onChange={(e) => setNewSongArtist(e.target.value)}
        />
        <button onClick={handleAddSong}>Add Song</button>
      </div>

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
