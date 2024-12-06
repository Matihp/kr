import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2';
import { User } from '../models/userModel';
import { AppDataSource } from './data-source';
import axios from 'axios';

const userRepository = AppDataSource.manager.getRepository(User);

// Verifica que JWT_SECRET esté definido
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await userRepository.findOne({ where: { id: payload.id } });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: (err: any, user?: any) => void) => {
      try {
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        if (!email) {
          return done(new Error('No email found'), false);
        }

        let user = await userRepository.findOne({ where: { email } });
        if (!user) {
          user = userRepository.create({
            email,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
          });
          await userRepository.save(user);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: '/auth/github/callback',
      scope: ['user:email'],
    },
    async (accessToken: string, refreshToken: string, profile: GitHubProfile, done: (err: any, user?: any) => void) => {
      try {
        let email: string | null = null;

        // Intentar obtener el correo electrónico a través de la API de GitHub
        if (profile.emails && profile.emails.length > 0) {
          email = profile.emails[0].value;
        } else {
          const response = await axios.get('https://api.github.com/user/emails', {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          });
          if (response.data && response.data.length > 0) {
            email = response.data.find((emailObj: any) => emailObj.primary).email;
          }
        }

        if (!email) {
          return done(new Error('No email found'), false);
        }

        let user = await userRepository.findOne({ where: { email } });
        if (!user) {
          user = userRepository.create({
            email,
            firstName: profile.displayName,
          });
          await userRepository.save(user);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;