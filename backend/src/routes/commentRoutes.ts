import express from 'express';
const router = express.Router();

import { sendComment } from '../controllers/commentController';

router.route('/:id').post(sendComment);

export default router;
