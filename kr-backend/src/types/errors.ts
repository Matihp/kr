export class AuthenticationError extends Error {
    constructor(message: string, public code: string) {
      super(message);
      this.name = 'AuthenticationError';
    }
  }