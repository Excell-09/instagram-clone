import express from 'express';
const router = express.Router();

import { setUser } from '../controllers/userController';

router.route('/').post(setUser);

export default router;
