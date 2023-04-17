import express from 'express';
const router = express.Router();

import { sendPost, getPost } from '../controllers/postController';

router.route('/').get(getPost).post(sendPost);

export default router;
