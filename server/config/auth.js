import { Strategy as GitHubStrategy } from 'passport-github2';
import passport from 'passport';
import { pool } from './database.js';

const options = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/github/callback',
};

const verify = async (accessToken, refreshToken, profile, done) => {
  const { id, login: username, avatar_url: avatarUrl } = profile._json;

  try {
    const userQuery = `SELECT * FROM users WHERE githubid = $1`;
    const userResult = await pool.query(userQuery, [id]);
    let user = userResult.rows[0];

    if (!user) {
      const insertQuery = `
        INSERT INTO users (githubid, username, avatarurl)
        VALUES ($1, $2, $3) RETURNING *`;
      const insertValues = [id, username, avatarUrl];
      const newUserResult = await pool.query(insertQuery, insertValues);
      user = newUserResult.rows[0];
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

passport.use(new GitHubStrategy(options, verify));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;
