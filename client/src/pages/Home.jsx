import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to MelodyMix</h1>
      <p>Select an option below:</p>
      <Link to="/playlists">
        <button>View Playlists</button>
      </Link>
    </div>
  );
}

export default Home;
