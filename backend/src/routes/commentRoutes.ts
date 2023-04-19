import express from 'express';
const router = express.Router();

import { sendComment } from '../controllers/commentRoutes';

router.route('/:id').post(sendComment);

export default router;
