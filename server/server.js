import express from 'express';
import './config/dotenv.js'; // Loads environment variables
import router from './routes/songs.js'; // Songs router

const app = express();

// Serve static files
app.use('/public', express.static('./public'));
app.use('/scripts', express.static('./public/scripts'));

// Use the songs router
app.use('/songs', router);

// Home route
app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">MelodyMix API</h1>');
});

// Start the server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
