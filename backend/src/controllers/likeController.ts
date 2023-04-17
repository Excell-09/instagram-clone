import { Request, Response } from 'express';

export const getLikes = async (req: Request, res: Response) => {
  res.send('get likes');
};
export const like = async (req: Request, res: Response) => {
  res.send('like');
};
export const dislike = async (req: Request, res: Response) => {
  res.send('dislike');
};
