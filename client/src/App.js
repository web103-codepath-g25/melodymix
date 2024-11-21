import React from 'react';
import PlaylistsDetail from './components/PlaylistsDetail';
import Playlists from './components/Playlists';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:playlistId" element={<PlaylistsDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
