import { Request, Response } from 'express';
import User from '../models/user';

interface IRequestSetUser {
  username: string;
  email: string;
}

export const setUser = async (req: Request, res: Response): Promise<Response> => {
  const { username, email }: IRequestSetUser = req.body;

  if (!username && !email) {
    return res.status(200).json('Need Login');
  }
  const user = await User.findOne({ email });

  if (user) {
    return res.status(200).json('User Already Created');
  }

  await User.create({ username, email });
  return res.status(201).json('set User');
};
