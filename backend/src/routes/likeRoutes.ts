import express from 'express';
const router = express.Router();

import { getLikes, like, dislike } from '../controllers/likeController';

router.route('/').get(getLikes).post(like).put(dislike);

export default router;
