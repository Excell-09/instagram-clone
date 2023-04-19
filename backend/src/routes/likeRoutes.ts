import express from 'express';
const router = express.Router();

import { like, dislike } from '../controllers/likeController';

router.route('/:id').post(like).put(dislike);

export default router;
