import { pool } from './database.js';
import './dotenv.js';
import songsData from '../data/songs.js';
import playlistsData from '../data/playlists.js';
import usersData from '../data/users.js';

// Create Users Table
const createUsersTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS users;

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('🎉 users table created successfully');
  } catch (err) {
    console.error('⚠️ error creating users table', err);
  }
};

// Create Songs Table
const createSongsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS songs;

    CREATE TABLE IF NOT EXISTS songs (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      artist VARCHAR(255) NOT NULL,
      duration INT NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('🎉 songs table created successfully');
  } catch (err) {
    console.error('⚠️ error creating songs table', err);
  }
};

// Create Playlists Table
const createPlaylistsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS playlists;

    CREATE TABLE IF NOT EXISTS playlists (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      user_id INT REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('🎉 playlists table created successfully');
  } catch (err) {
    console.error('⚠️ error creating playlists table', err);
  }
};

// Create Join Table for Many-to-Many Relationship (Songs-Playlists)
const createPlaylistSongsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS playlist_songs;

    CREATE TABLE IF NOT EXISTS playlist_songs (
      song_id INT REFERENCES songs(id) ON DELETE CASCADE,
      playlist_id INT REFERENCES playlists(id) ON DELETE CASCADE,
      PRIMARY KEY (song_id, playlist_id)
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('🎉 playlist_songs join table created successfully');
  } catch (err) {
    console.error('⚠️ error creating playlist_songs table', err);
  }
};

// Seed Users Table
const seedUsersTable = async () => {
  for (const user of usersData) {
    const insertQuery = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id`;
    const values = [user.name, user.email];

    try {
      const res = await pool.query(insertQuery, values);
      console.log(`✅ User ${user.name} added successfully`);
    } catch (err) {
      console.error('⚠️ error inserting user', err);
    }
  }
};

// Seed Songs Table
const seedSongsTable = async () => {
  for (const song of songsData) {
    const insertQuery = `INSERT INTO songs (title, artist, duration) VALUES ($1, $2, $3) RETURNING id`;
    const values = [song.title, song.artist, song.duration];

    try {
      const res = await pool.query(insertQuery, values);
      console.log(`✅ Song ${song.title} added successfully`);
    } catch (err) {
      console.error('⚠️ error inserting song', err);
    }
  }
};

// Seed Playlists Table
const seedPlaylistsTable = async () => {
  for (const playlist of playlistsData) {
    const insertQuery = `INSERT INTO playlists (name, user_id) VALUES ($1, $2) RETURNING id`;
    const values = [playlist.name, playlist.user_id];

    try {
      const res = await pool.query(insertQuery, values);
      console.log(`✅ Playlist ${playlist.name} added successfully`);
    } catch (err) {
      console.error('⚠️ error inserting playlist', err);
    }
  }
};

// Seed Join Table for Songs-Playlists
const seedSongPlaylistTable = async () => {
  try {
    for (const playlist of playlistsData) {
      console.log(`Processing playlist: ${playlist.name}`);

      if (!Array.isArray(playlist.songs)) {
        console.warn(`No songs found for playlist: ${playlist.name}`);
        continue;
      }

      const playlist_id = (await pool.query('SELECT id FROM playlists WHERE name = $1', [playlist.name])).rows[0]?.id;

      if (!playlist_id) {
        console.error(`Playlist not found: ${playlist.name}`);
        continue;
      }

      for (const entry of playlist.songs) {
        if (!entry.song_id) {
          console.error('Invalid song entry:', entry);
          continue;
        }

        const song_id = entry.song_id;

        const values = [song_id, playlist_id];
        console.log("Inserting song:", values);

        await pool.query(
          `INSERT INTO playlist_songs (song_id, playlist_id) VALUES ($1, $2)`,
          values
        );
      }
    }
    console.log("All playlists and songs seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err.message);
  }
};

async function resetDatabase() {
  try {
    // Drop all existing tables
    await pool.query(`DROP TABLE IF EXISTS playlist_songs, ratings_feedback, songs, playlists, users CASCADE;`);

    // Create tables in correct order
    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE playlists (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        user_id INT REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE songs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        artist VARCHAR(255),
        duration INT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Create the join table for songs and playlists
    await createPlaylistSongsTable();

    console.log('Tables created successfully!');

    // Seed data
    await seedUsersTable();
    await seedSongsTable();
    await seedPlaylistsTable();
    await seedSongPlaylistTable();

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error resetting the database:', error);
  } finally {
    pool.end();
  }
}

resetDatabase();
