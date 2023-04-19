import express from 'express';
const router = express.Router();

import { sendPost, getPost } from '../controllers/postController';

router.route('/:email').get(getPost);
router.route('/').post(sendPost);

export default router;
