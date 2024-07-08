import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { AuthType, JwtPayload, AuthRequest } from './../utils/types';
import { signRefreshToken, signAccessToken, storeSession } from './../utils/auth-helpers';
import { User } from './../models';

dotenv.config();

export class AuthController {
  public async signup(req: AuthRequest, res: Response) {
    try {
      let user = await User.findOne({ email: req.body.email }).exec();
      if (user) return res.status(400).json({ message: `Error: email ${req.body.email} is already exist` });

      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar ?? 'uploads/default-avatar.jpg',
      });

      const jwtPayload = {
        user: {
          id: String(user._id),
          name: req.body.name,
          email: req.body.email,
          role: req.body.email === process.env.ADMIN_EMAIL ? 'admin' : 'user',
          avatar: req.body.avatar ?? 'uploads/default-avatar.jpg',
        },
      };

      const accessToken = signAccessToken(jwtPayload);
      const refreshToken = signRefreshToken(jwtPayload);

      user.refreshToken = refreshToken;
      await user.save();

      storeSession(req, jwtPayload);

      return res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  public async login(req: AuthRequest, res: Response) {
    try {
      const user = await User.findOne({ email: req.body.email }).select('name email password').exec();

      if (!user)
        return res.status(400).json({ message: `Error: email ${req.body.email} is not exist! Sign up a new account` });

      if (!user.password)
        return res.status(400).json({ message: 'Oops: you may have signed up with social media account!' });

      if (!bcrypt.compareSync(req.body.password + (process.env.PEPPER as string), user.password))
        return res.status(400).json({ message: 'Error: Wrong credentials' });

      const jwtPayload = {
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: req.body.email === process.env.ADMIN_EMAIL ? 'admin' : 'user',
        },
      };

      const accessToken = signAccessToken(jwtPayload);
      const refreshToken = signRefreshToken(jwtPayload);

      user.refreshToken = refreshToken;
      await user.save();

      storeSession(req, jwtPayload);

      return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  public handleGoogleRedirect(req: Request, res: Response) {
    const type = Object.keys(req.query)[0].trim().toLowerCase();
    if (!type || [AuthType.LOGIN as string, AuthType.SIGNUP as string].indexOf(type) === -1)
      return res.status(400).json({ message: 'Missed parameters' });

    const state = Buffer.from(JSON.stringify({ type })).toString('base64');
    const authenticator = passport.authenticate('google', {
      scope: ['profile', 'email'],
      state,
    });

    authenticator(req, res);
  }

  public handleGoogleCallback = passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  });

  public async handleGoogleCallbackNext(req: AuthRequest, res: Response) {
    const { state } = req.query;
    const { type } = JSON.parse(Buffer.from(state as string, 'base64').toString());
    if (!req.user) return res.status(400).json({ message: 'Authentication failed' });

    let user = null;
    if (type === AuthType.LOGIN) {
      user = await User.findOne({ email: req.user.emails?.[0].value }).select('email password').lean().exec();
      if (!user) return res.status(400).json({ message: 'Error: Account not exist! Sign up a new account' });
    }

    if (type === AuthType.SIGNUP) {
      user = await User.findOne({ email: req.user.emails?.[0].value }).exec();
      if (user) return res.status(400).json({ message: `Error: Account is already exist! Login to your account` });
      user = await new User({
        name: req.user.displayName,
        email: req.user.emails?.[0].value,
        avatar: req.user.photos?.[0].value,
      }).save();
    }

    if (!user) return res.status(500).json({ message: 'Error: Something went wrong' });

    storeSession(req, {
      user: {
        id: String(user._id),
        name: req.user.displayName,
        email: req.user.emails?.[0].value,
        avatar: req.user.photos?.[0].value,
        role: req.body.email === process.env.ADMIN_EMAIL ? 'admin' : 'user',
      },
    });

    return res.redirect(process.env.CLIENT_URL as string);
  }

  public getData(req: AuthRequest, res: Response) {
    if (!req.session.loggedin) return res.status(401).json({ message: 'Access denied' });
    return res.json(req.session.userData);
  }

  public async logout(req: AuthRequest, res: Response) {
    if (req.session.loggedin) req.session.destroy(() => 0);
    else {
      const { refreshToken } = req.body;
      if (!refreshToken) return res.status(400).json({ message: 'Bad request' });

      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
      const user = await User.findOne({ email: payload.user.email }).select('email').exec();
      if (!user) return res.status(401).json({ message: 'Access denied' });

      user.refreshToken = '';
      await user.save();
    }
    return res.redirect(process.env.CLIENT_URL as string);
  }

  public async refreshToken(req: Request, res: Response) {
    try {
      let { refreshToken } = req.body;
      if (!refreshToken) return res.status(400).json({ message: 'Provide refresh token' });

      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
      const user = await User.findOne({ email: payload.user.email }).select('email').exec();
      if (!user) return res.status(401).json({ message: 'Access denied' });

      const accessToken = signAccessToken({
        user: { ...payload.user, role: req.body.email === process.env.ADMIN_EMAIL ? 'admin' : 'user' },
      });
      refreshToken = signRefreshToken({
        user: { ...payload.user, role: req.body.email === process.env.ADMIN_EMAIL ? 'admin' : 'user' },
      });
      user.refreshToken = refreshToken;
      await user.save();

      return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (err) {
      return res.status(401).json(err);
    }
  }
}
