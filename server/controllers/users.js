import { pool } from '../config/database.js';

// Get all users
const getUsers = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM users ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const query = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *;`;
        const values = [name, email];
        const result = await pool.query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Update an existing user
const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, email } = req.body;
        const results = await pool.query(
            `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *;`,
            [name, email, id]
        );
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *;', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user: results.rows[0] });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
