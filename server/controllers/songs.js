import { pool } from '../config/database.js';

// Get all songs
const getSongs = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM songs ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message });
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
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};

// Create a new song
const createSong = async (req, res) => {
    try {
        console.log("reached")
        const { title, artist } = req.body; // Only require title and artist
        const results = await pool.query(
            'INSERT INTO songs (title, artist) VALUES ($1, $2) RETURNING *',
            [title, artist]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};

// Update an existing song
const updateSong = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, artist } = req.body; // Only update title and artist

        // Retrieve the existing song
        const existingSongQuery = 'SELECT * FROM songs WHERE id = $1';
        const existingSongResult = await pool.query(existingSongQuery, [id]);

        if (existingSongResult.rows.length === 0) {
            return res.status(404).json({ error: 'Song not found' });
        }

        const existingSong = existingSongResult.rows[0];

        // Merge the existing data with the new data
        const updatedTitle = title || existingSong.title;
        const updatedArtist = artist || existingSong.artist;

        // Update the song in the database
        const updateQuery = `
            UPDATE songs
            SET title = $1, artist = $2
            WHERE id = $3
            RETURNING *;
        `;
        const updatedValues = [updatedTitle, updatedArtist, id];
        const updatedSongResult = await pool.query(updateQuery, updatedValues);

        res.status(200).json(updatedSongResult.rows[0]);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message });
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
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};

export default {
    getSongs,
    getSong,
    createSong,
    updateSong,
    deleteSong,
};
