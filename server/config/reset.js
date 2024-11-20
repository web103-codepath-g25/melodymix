import { pool } from './database.js';
import './dotenv.js';
import songData from '../data/songs.js';

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
        console.error('⚠️ error creating songs table', err);
    }
};

const seedSongsTable = async () => {
    await createSongsTable();

    songData.forEach((song) => {
        const insertQuery = `
            INSERT INTO songs (title, artist, genre, created_at, summary) 
            VALUES ($1, $2, $3, $4, $5)
        `;

        const values = [
            song.title,
            song.artist,
            song.genre,
            song.created_at,
            song.summary
        ];

        pool.query(insertQuery, values, (err) => {
            if (err) {
                console.error(`⚠️ error inserting song: ${song.title}`, err);
                return;
            }

            console.log(`✅ ${song.title} added successfully`);
        });
    });
};

seedSongsTable();
