import { Response } from 'express';

export const handleError = (error: any, res: Response): void => {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
};

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

  