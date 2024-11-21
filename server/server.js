import express from 'express';
import './config/dotenv.js'; // Loads environment variables
import cors from 'cors'
import songRoutes from './routes/songs.js'; // Songs router
import playlistRoutes from './routes/playlists.js'; // Import the playlists router
import userRoutes from './routes/users.js';
import session from 'express-session';
import passport from './config/auth.js'; // Import Passport configuration
import { pool } from './config/database.js'; // Database connection


const app = express();
app.use(express.json())
app.use(
    cors({
      origin: 'http://localhost:3000', // Frontend origin
      methods: 'GET,POST,PUT,DELETE',
      credentials: true,
    })
);
app.use(
    session({
      secret: 'melodymix_secret',
      resave: false,
      saveUninitialized: true,
    })
  );
  
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use('/public', express.static('./public'));
app.use('/scripts', express.static('./public/scripts'));

// Use the songs, playlists, users router with the /api prefix
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/users', userRoutes);

// Home route
app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">MelodyMix API</h1>');
});

app.get(
    '/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: 'http://localhost:3000', // Redirect to frontend
      failureRedirect: 'http://localhost:3000/login', // Redirect to login page
    })
  );
  
  app.get('/auth/login/success', (req, res) => {
    if (req.user) {
      res.status(200).json({ success: true, user: req.user });
    } else {
      res.status(401).json({ success: false, message: 'Not authenticated' });
    }
  });
  
  app.get('/auth/logout', (req, res) => {
    req.logout(() => {
      req.session.destroy((err) => {
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, message: 'Logged out' });
      });
    });
  });

// Start the server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
