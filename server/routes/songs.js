import express from 'express';
import SongsController from '../controllers/songs.js';

const router = express.Router();

// CRUD routes for songs
router.get('/', SongsController.getSongs); // GET all songs
router.get('/:id', SongsController.getSong); // GET a song by ID
router.post('/', SongsController.createSong); // POST a new song
router.patch('/:id', SongsController.updateSong); // PATCH (update) a song
router.delete('/:id', SongsController.deleteSong); // DELETE a song

export default router;
