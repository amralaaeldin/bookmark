import express from 'express';
import { AuthController } from '../controllers';

const routes = express.Router();
const authController = new AuthController();

routes.post('/signup', authController.signup);
routes.post('/login', authController.login);

routes.get('/auth/google', authController.handleGoogleRedirect);
routes.get('/auth/google/callback', authController.handleGoogleCallback, authController.handleGoogleCallbackNext);
routes.get('/login/success', authController.getData);

routes.post('/refreshToken', authController.refreshToken);
routes.get('/logout', authController.logout);

export { routes as authRoutes };
