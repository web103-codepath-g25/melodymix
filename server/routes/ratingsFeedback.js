import express from 'express';
import { addRatingFeedback, getSongRatingsFeedback } from '../controllers/ratingsFeedback.js';

const router = express.Router();

// Add a rating or feedback
router.post('/', addRatingFeedback);

// Get all ratings and feedback for a song
router.get('/:songId', getSongRatingsFeedback);

export default router;
