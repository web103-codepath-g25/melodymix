import React from 'react';
import PlaylistsDetail from './PlaylistsDetail';
import Playlists from './Playlists';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/playlistsDetail" element={<PlaylistsDetail />} />
    </Routes>
  </Router>
  );
}

export default App;
