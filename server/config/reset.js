import { pool } from './database.js';
import './dotenv.js';
import songData from '../data/songs.js';
import playlistData from '../data/playlists.js';
import userData from '../data/users.js';



// Create Songs Table
const createSongsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS songs;

        CREATE TABLE IF NOT EXISTS songs (
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            artist VARCHAR(100) NOT NULL,
            genre VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL,
            summary TEXT NOT NULL
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 songs table created successfully');
    } catch (err) {
        console.error('⚠️ Error creating songs table:', err);
    }
};

// Seed Songs Table
const seedSongsTable = async () => {
    try {
        for (const song of songData) {
            const insertQuery = `
                INSERT INTO songs (title, artist, genre, created_at, summary) 
                VALUES ($1, $2, $3, $4, $5)
            `;
            const values = [song.title, song.artist, song.genre, song.created_at, song.summary];

            await pool.query(insertQuery, values);
            console.log(`✅ Song '${song.title}' added successfully`);
        }
    } catch (err) {
        console.error('⚠️ Error seeding songs table:', err);
    }
};

// Create Playlists Table
const createPlaylistsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS playlists;

        CREATE TABLE IF NOT EXISTS playlists (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            user_id INTEGER REFERENCES users(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 playlists table created successfully');
    } catch (err) {
        console.error('⚠️ Error creating playlists table:', err);
    }
};

// Seed Playlists Table
const seedPlaylistsTable = async () => {
    try {
        for (const playlist of playlistData) {
            const insertQuery = `
                INSERT INTO playlists (name, user_id) 
                VALUES ($1, $2)
            `;
            const values = [playlist.name, playlist.user_id];

            await pool.query(insertQuery, values);
            console.log(`✅ Playlist '${playlist.name}' added successfully`);
        }
    } catch (err) {
        console.error('⚠️ Error seeding playlists table:', err);
    }
};

const createUsersTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS users CASCADE;

        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user')),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 users table created successfully');
    } catch (err) {
        console.error('⚠️ Error creating users table:', err);
    }
};


const seedUsersTable = async () => {
    try {
        for (const user of userData) {
            const insertQuery = `
                INSERT INTO users (username, email, role)
                VALUES ($1, $2, $3)
            `;
            const values = [user.username, user.email, user.role];

            await pool.query(insertQuery, values);
            console.log(`✅ User '${user.username}' added successfully`);
        }
    } catch (err) {
        console.error('⚠️ Error seeding users table:', err);
    }
};




// Reset Function
const resetDatabase = async () => {
    console.log('🔄 Resetting database...');
    try {
        await createUsersTable(); // Create users table first
        await seedUsersTable(); // Seed users
        await createPlaylistsTable(); // Create playlists table
        await seedPlaylistsTable(); // Seed playlists
        await createSongsTable(); // Create songs table
        await seedSongsTable(); // Seed songs
        console.log('✅ Database reset complete');
    } catch (err) {
        console.error('⚠️ Error resetting database:', err);
    } finally {
        pool.end();
    }
};


// Run Reset
resetDatabase();
