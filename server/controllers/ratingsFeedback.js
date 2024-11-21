import { pool } from '../config/database.js';

// Add a new rating or feedback
export const addRatingFeedback = async (req, res) => {
  const { songId, userId, rating, feedback } = req.body;

  try {
    const query = `
      INSERT INTO ratings_feedback (song_id, user_id, rating, feedback)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [songId, userId, rating, feedback];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all ratings and feedback for a song
export const getSongRatingsFeedback = async (req, res) => {
  const { songId } = req.params;

  try {
    const query = `
      SELECT rf.*, u.username
      FROM ratings_feedback rf
      INNER JOIN users u ON rf.user_id = u.id
      WHERE rf.song_id = $1;
    `;
    const values = [songId];
    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
