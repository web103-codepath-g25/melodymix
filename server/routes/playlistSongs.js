import express from 'express';
import PlaylistSongsController from '../controllers/playlistSongs.js';

const router = express.Router();

// Get all songs in a playlist with optional genre filter
router.get('/:playlistId', PlaylistSongsController.getPlaylistSongs);

// Add a song to a playlist
router.post('/:playlistId', PlaylistSongsController.addSongToPlaylist);

// Remove a song from a playlist
router.delete('/:playlistId', PlaylistSongsController.removeSongFromPlaylist);

export default router;
