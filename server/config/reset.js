import { pool } from './database.js';
import './dotenv.js';
import songData from '../data/songs.js';
import playlistData from '../data/playlists.js';
import userData from '../data/users.js';

// Create Users Table
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

// Seed Users Table
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

// Create Playlists Table
const createPlaylistsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS playlists CASCADE;

        CREATE TABLE IF NOT EXISTS playlists (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
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

// Create Songs Table
const createSongsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS songs CASCADE;

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

// Create Playlist Songs Table
const createPlaylistSongsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS playlist_songs CASCADE;

        CREATE TABLE IF NOT EXISTS playlist_songs (
            id SERIAL PRIMARY KEY,
            playlist_id INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
            song_id INTEGER NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
            added_by INTEGER NOT NULL REFERENCES users(id),
            added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 playlist_songs table created successfully');
    } catch (err) {
        console.error('⚠️ Error creating playlist_songs table:', err);
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
        await createPlaylistSongsTable(); // Create playlist_songs table
        console.log('✅ Database reset complete');
    } catch (err) {
        console.error('⚠️ Error resetting database:', err);
    } finally {
        pool.end();
    }
};

// Run Reset
resetDatabase();
