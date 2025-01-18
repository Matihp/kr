import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2';
import { User } from '../models/userModel';
import { AppDataSource } from './data-source';
import { Role, RoleType } from '../models/roleModel';
import axios from 'axios';
import { AuthProvider } from '../types/userTypes';
import { AuthenticationError } from '../types/errors';
import { EmailService } from '../services/emailService';

const userRepository = AppDataSource.manager.getRepository(User);
const roleRepository = AppDataSource.manager.getRepository(Role);

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
      const user = await userRepository.findOne({
        where: { id: payload.id },
        relations: ['role']
      });
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
          throw new AuthenticationError('No email found from Google', 'NO_EMAIL');
        }

        // Primero buscar por googleId para mayor precisión
        let user = await userRepository.findOne({
          where: [
            { googleId: profile.id },
            { email, authProvider: AuthProvider.GOOGLE }
          ],
          relations: ['role']
        });

        // Si no existe el usuario, verificar que el email no esté en uso con otro proveedor
        if (!user) {
          const existingUser = await userRepository.findOne({
            where: { email }
          });

          if (existingUser) {
            throw new AuthenticationError(
              'Email already in use with another authentication method',
              'EMAIL_IN_USE'
            );
          }

          // Get the default USER role
          const defaultRole = await roleRepository.findOne({
            where: { type: RoleType.USER }
          });

          if (!defaultRole) {
            throw new AuthenticationError('Default role not found', 'ROLE_NOT_FOUND');
          }

          user = userRepository.create({
            email,
            firstName: profile.name?.givenName || '',
            lastName: profile.name?.familyName || '',
            role: defaultRole,
            authProvider: AuthProvider.GOOGLE,
            googleId: profile.id
          });
          await userRepository.save(user);
          await EmailService.sendWelcomeEmail(user);
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

        if (profile.emails && profile.emails.length > 0) {
          email = profile.emails[0].value;
        } else {
          try {
            const response = await axios.get('https://api.github.com/user/emails', {
              headers: {
                Authorization: `token ${accessToken}`,
              },
            });
            if (response.data && response.data.length > 0) {
              email = response.data.find((emailObj: any) => emailObj.primary).email;
            }
          } catch (error) {
            throw new AuthenticationError('Failed to fetch GitHub email', 'GITHUB_EMAIL_FETCH_ERROR');
          }
        }

        if (!email) {
          throw new AuthenticationError('No email found from GitHub', 'NO_EMAIL');
        }

        // Primero buscar por githubId para mayor precisión
        let user = await userRepository.findOne({
          where: [
            { githubId: profile.id },
            { email, authProvider: AuthProvider.GITHUB }
          ],
          relations: ['role']
        });

        // Si no existe el usuario, verificar que el email no esté en uso con otro proveedor
        if (!user) {
          const existingUser = await userRepository.findOne({
            where: { email }
          });

          if (existingUser) {
            throw new AuthenticationError(
              'Email already in use with another authentication method',
              'EMAIL_IN_USE'
            );
          }

          const defaultRole = await roleRepository.findOne({
            where: { type: RoleType.USER }
          });

          if (!defaultRole) {
            throw new AuthenticationError('Default role not found', 'ROLE_NOT_FOUND');
          }

          user = userRepository.create({
            email,
            firstName: profile.displayName || '',
            role: defaultRole,
            authProvider: AuthProvider.GITHUB,
            githubId: profile.id
          });
          await userRepository.save(user);
          await EmailService.sendWelcomeEmail(user);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
