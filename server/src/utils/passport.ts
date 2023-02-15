import passport from 'passport';
import Strategy from 'passport-google-oauth20';

const GoogleStrategy = Strategy.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
    },
    function (_accessToken, _refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});
