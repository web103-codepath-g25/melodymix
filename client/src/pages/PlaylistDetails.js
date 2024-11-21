import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlaylistDetails = ({ data }) => {
  const { id } = useParams(); // Get the playlist ID from the URL
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    // Find the playlist that matches the ID from the route
    const selectedPlaylist = data.find(p => p.id === parseInt(id));
    setPlaylist(selectedPlaylist);
  }, [id, data]);

  if (!playlist) return <p>Loading playlist details...</p>;

  return (
    <div>
      <h1>{playlist.name}</h1>
      <p>User ID: {playlist.user_id}</p>
      {/* You can add more details as needed */}
    </div>
  );
}

export default PlaylistDetails;
