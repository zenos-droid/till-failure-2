import type { Response } from 'express';

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export const ok = <T>(res: Response, data: T, status = 200) => res.status(status).json(data);
