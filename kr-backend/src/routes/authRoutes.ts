import express from 'express';
import passport from 'passport';
import { register, login, googleCallback, githubCallback, verifyJwt, logout } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout',logout)

router.get('/verify-token',verifyJwt)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  googleCallback
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  githubCallback
);

export default router;
