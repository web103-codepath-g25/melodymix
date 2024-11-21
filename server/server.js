import express from 'express';
import './config/dotenv.js'; // Loads environment variables
import cors from 'cors';
import session from 'express-session';
import passport from './config/auth.js'; // Import Passport configuration
import { pool } from './config/database.js'; // Database connection
import songRoutes from './routes/songs.js'; // Songs router
import playlistRoutes from './routes/playlists.js'; // Playlists router
import userRoutes from './routes/users.js'; // Users router
import playlistSongsRoutes from './routes/playlistSongs.js'; // Playlist-Songs router

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Allow credentials (cookies, sessions)
  })
);
app.use(
  session({
    secret: 'melodymix_secret', // Replace with a secure, env-based secret for production
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use('/public', express.static('./public'));
app.use('/scripts', express.static('./public/scripts'));

// Routes
app.use('/api/songs', songRoutes); // Songs-related routes
app.use('/api/playlists', playlistRoutes); // Playlists-related routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/playlist-songs', playlistSongsRoutes); // Playlist-Songs-related routes

// Authentication Routes
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
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Session destruction failed' });
      }
      res.clearCookie('connect.sid'); // Clear session cookie
      res.status(200).json({ success: true, message: 'Logged out' });
    });
  });
});

// Home route
app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">MelodyMix API</h1>');
});

// Start the server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
