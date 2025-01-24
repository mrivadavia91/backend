import express from 'express';
import passport from 'passport';
import UserDTO from '../dtos/user.dto.js';

const router = express.Router();

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  try {
    const userDTO = new UserDTO(req.user);
    res.status(200).json({ status: 'success', user: userDTO });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
