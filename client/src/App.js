import React from 'react';
import PlaylistsDetail from './components/PlaylistsDetail';
import Playlists from './components/Playlists';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 404 NotFound component
function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:playlistId" element={<PlaylistsDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
