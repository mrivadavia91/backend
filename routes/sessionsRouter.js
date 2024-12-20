import express from 'express';
import { loginUser, getCurrentUser } from '../controllers/userController.js';
import passport from 'passport';

const router = express.Router();

router.post('/login', loginUser);
router.get('/current', passport.authenticate('jwt', { session: false }), getCurrentUser);

export default router;
