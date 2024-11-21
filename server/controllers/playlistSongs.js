import { pool } from '../config/database.js';

// Get songs in a playlist with optional genre filter
export const getPlaylistSongs = async (req, res) => {
    const { playlistId } = req.params;
    const { genre } = req.query;

    try {
        let query = `
            SELECT s.* 
            FROM songs s
            INNER JOIN playlist_songs ps ON s.id = ps.song_id
            WHERE ps.playlist_id = $1
        `;
        const values = [playlistId];

        if (genre) {
            query += ` AND s.genre = $2`;
            values.push(genre);
        }

        const result = await pool.query(query, values);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a song to a playlist
export const addSongToPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { songId, userId } = req.body;
    console.log("hi")

    try {
        const query = `
            INSERT INTO playlist_songs (playlist_id, song_id, added_by)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [playlistId, songId, userId];

        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove a song from a playlist
export const removeSongFromPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { songId } = req.body;

    try {
        const query = `
            DELETE FROM playlist_songs
            WHERE playlist_id = $1 AND song_id = $2
            RETURNING *;
        `;
        const values = [playlistId, songId];

        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Song not found in playlist' });
        }
        res.status(200).json({ message: 'Song removed from playlist' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Export all functions together
export default {
    getPlaylistSongs,
    addSongToPlaylist,
    removeSongFromPlaylist,
};
