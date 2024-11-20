import express from 'express';
import path from 'path';
import SongsController from '../controllers/songs.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Route to fetch all songs
router.get('/songs', SongsController.getSongs);

// Route to serve a static HTML page for a specific song
router.get('/:songId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/song.html'));
});

export default router;
