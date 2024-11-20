import express from 'express';
import './config/dotenv.js'; // Loads environment variables
import songRoutes from './routes/songs.js'; // Songs router
import playlistRoutes from './routes/playlists.js'; // Import the playlists router
import userRoutes from './routes/users.js';


const app = express();

// Serve static files
app.use('/public', express.static('./public'));
app.use('/scripts', express.static('./public/scripts'));

// Use the songs, playlists, users router with the /api prefix
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/users', userRoutes);

// Home route
app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">MelodyMix API</h1>');
});

// Start the server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
