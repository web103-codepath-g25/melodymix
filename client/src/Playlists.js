// src/Playlists.js
import React, { useState } from 'react';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([
    { id: 1, name: 'Hiphop', genre: 'Hip-hop' },
    { id: 2, name: 'Rap', genre: 'Rap' },
    { id: 3, name: 'Lofi', genre: 'Lofi' },
    { id: 4, name: 'R&B', genre: 'R&B' },
  ]);
  
  const [newPlaylist, setNewPlaylist] = useState('');
  const [filterGenre, setFilterGenre] = useState('All');

  const addPlaylist = () => {
    if (newPlaylist.trim()) {
      setPlaylists([...playlists, { id: playlists.length + 1, name: newPlaylist, genre: 'Unknown' }]);
      setNewPlaylist('');
    }
  };

  const handleFilterChange = (e) => {
    setFilterGenre(e.target.value);
  };

  const filteredPlaylists = playlists.filter(
    (playlist) => filterGenre === 'All' || playlist.genre === filterGenre
  );

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <button 
          className="text-indigo-600 font-semibold hover:text-indigo-800"
          onClick={addPlaylist}
        >
          + Add Playlist
        </button>
        
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Filter by Genre:</span>
          <select
            value={filterGenre}
            onChange={handleFilterChange}
            className="p-2 border rounded-md"
          >
            <option value="All">All</option>
            <option value="Hip-hop">Hip-hop</option>
            <option value="Rap">Rap</option>
            <option value="Lofi">Lofi</option>
            <option value="R&B">R&B</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaylists.map((playlist) => (
          <div 
            key={playlist.id}
            className="bg-gray-600 text-white rounded-lg p-5 shadow-lg flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold">{playlist.name}</h2>
            <button className="bg-indigo-600 p-2 mt-4 rounded-md hover:bg-indigo-700">
              Play
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <input
          type="text"
          placeholder="New Playlist Name"
          value={newPlaylist}
          onChange={(e) => setNewPlaylist(e.target.value)}
          className="p-3 border rounded-md w-1/2 mr-2"
        />
        <button 
          onClick={addPlaylist}
          className="bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Playlists;
