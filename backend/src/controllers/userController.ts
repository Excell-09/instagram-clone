import { Request, Response } from 'express';
import User from '../models/user';

interface IRequestSetUser {
  username: string;
  email: string;
  userImage: string;
}

export const setUser = async (req: Request, res: Response): Promise<Response> => {
  const { username, email, userImage }: IRequestSetUser = req.body;
  console.log(userImage);

  if (!username || !email || !userImage) {
    return res.status(200).json('Need Login');
  }
  const user = await User.findOne({ email });

  if (user) {
    return res.status(200).json('User Already Created');
  }

  await User.create({ username, email, userImage: userImage });
  return res.status(201).json('set User');
};
