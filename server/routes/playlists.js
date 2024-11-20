import express from 'express';
import PlaylistsController from '../controllers/playlists.js';

const router = express.Router();

// CRUD routes for playlists
router.get('/', PlaylistsController.getPlaylists); // GET all playlists
router.get('/:id', PlaylistsController.getPlaylist); // GET a single playlist by ID
router.post('/', PlaylistsController.createPlaylist); // POST a new playlist
router.patch('/:id', PlaylistsController.updatePlaylist); // PATCH (update) a playlist
router.delete('/:id', PlaylistsController.deletePlaylist); // DELETE a playlist

export default router;
