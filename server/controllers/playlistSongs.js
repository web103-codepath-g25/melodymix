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
    const { title, artist } = req.body; // Frontend will send title and artist
    try {
        // Step 1: Check if the song already exists
        const existingSongQuery = "SELECT id FROM songs WHERE title = $1 AND artist = $2";
        const existingSongValues = [title, artist];
        const existingSongResult = await pool.query(existingSongQuery, existingSongValues);
        let songId;
        if (existingSongResult.rows.length > 0) {
            // Song already exists
            songId = existingSongResult.rows[0].id;
        } else {
            // Step 2: Create a new song if it doesn’t exist
            const createSongQuery = `
                INSERT INTO songs (title, artist)
                VALUES ($1, $2)
                RETURNING id;
            `;
            const createSongValues = [title, artist];
            const createSongResult = await pool.query(createSongQuery, createSongValues);
            songId = createSongResult.rows[0].id;
        }
        // Step 3: Add the song to the playlist
        const addToPlaylistQuery = `
            INSERT INTO playlist_songs (playlist_id, song_id)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const addToPlaylistValues = [playlistId, songId];
        const playlistSongResult = await pool.query(addToPlaylistQuery, addToPlaylistValues);
        res.status(201).json({
            message: "Song added to playlist successfully",
            data: playlistSongResult.rows[0],
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to add song to playlist" });
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
