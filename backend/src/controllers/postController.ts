import { Request, Response } from 'express';

export const sendPost = async (req: Request, res: Response) => {
  res.send('send Post');
};
export const getPost = async (req: Request, res: Response) => {
  res.send('send Post');
};
