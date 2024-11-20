import { pool } from '../config/database.js';

// Get all songs
const getSongs = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM songs ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Get a single song by ID
const getSong = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('SELECT * FROM songs WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Song not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Create a new song
const createSong = async (req, res) => {
    try {
        const { title, artist, genre, summary } = req.body;
        const results = await pool.query(
            'INSERT INTO songs (title, artist, genre, summary) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, artist, genre, summary]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Update an existing song
const updateSong = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, artist, genre, summary } = req.body;
        const results = await pool.query(
            'UPDATE songs SET title = $1, artist = $2, genre = $3, summary = $4 WHERE id = $5 RETURNING *',
            [title, artist, genre, summary, id]
        );
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Song not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Delete a song
const deleteSong = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('DELETE FROM songs WHERE id = $1 RETURNING *', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Song not found' });
        }
        res.status(200).json({ message: 'Song deleted successfully', song: results.rows[0] });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    getSongs,
    getSong,
    createSong,
    updateSong,
    deleteSong,
};
