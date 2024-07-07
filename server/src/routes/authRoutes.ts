import express, { Request, Response } from 'express';
import { AuthController } from '../controllers';
import { AuthRequest } from '../utils/types';
import { signupValidator, loginValidator } from '../utils/validators';

const routes = express.Router();
const authController = new AuthController();

routes.post('/signup', signupValidator, (req: Request, res: Response) => authController.signup(req as AuthRequest, res));
routes.post('/login', loginValidator, (req: Request, res: Response) => authController.login(req as AuthRequest, res));

routes.get('/auth/google', authController.handleGoogleRedirect);
routes.get('/auth/google/callback', authController.handleGoogleCallback, (req, res) => authController.handleGoogleCallbackNext(req as AuthRequest, res));
routes.get('/login/success', (req, res) => authController.getData(req as AuthRequest, res));

routes.post('/refresh-token', authController.refreshToken);
routes.post('/logout', (req, res) => authController.logout(req as AuthRequest, res));

export { routes as authRoutes };
