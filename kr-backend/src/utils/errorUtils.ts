import { Response } from 'express';

export const handleError = (error: any, res: Response): void => {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
};

  