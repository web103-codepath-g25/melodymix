import { pool } from '../config/database.js';

// Get all playlists
const getPlaylists = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM playlists ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Get a single playlist by ID
const getPlaylist = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('SELECT * FROM playlists WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Create a new playlist
const createPlaylist = async (req, res) => {
    try {
        const { name, user_id } = req.body;
        const results = await pool.query(
            'INSERT INTO playlists (name, user_id) VALUES ($1, $2) RETURNING *',
            [name, user_id]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Update an existing playlist
const updatePlaylist = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const results = await pool.query(
            'UPDATE playlists SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Delete a playlist
const deletePlaylist = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('DELETE FROM playlists WHERE id = $1 RETURNING *', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        res.status(200).json({ message: 'Playlist deleted successfully', playlist: results.rows[0] });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    getPlaylists,
    getPlaylist,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
};
