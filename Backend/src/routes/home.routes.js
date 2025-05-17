import { Router } from 'express';
import { getFeaturedVideos } from '../controllers/home.controller.js';

const router = Router();

// Public route for featured videos
router.get('/featured-videos', getFeaturedVideos);

export default router;
