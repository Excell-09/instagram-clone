import { Request, Response } from 'express';
import Post from '../models/post';
import User from '../models/user';

type TRequestLike = { email: string };

export const getLikes = async (req: Request, res: Response) => {
  res.send('get likes');
};

export const like = async (req: Request, res: Response) => {
  const { email }: TRequestLike = req.body;
  const { id } = req.params;

  if (!email) {
    return res.status(400).json('need Authentication');
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json('user not found!');
  }

  const post = await Post.findById(id);
  await post?.likes.push({ userId: user._id });

  return res.status(200).json(post);
};
export const dislike = async (req: Request, res: Response) => {
  const { email }: TRequestLike = req.body;
  const { id } = req.params;

  if (!email) {
    return res.status(400).json('need Authentication');
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json('user not found!');
  }

  const post = await Post.findById(id);
  const indexLikes = await post?.likes.findIndex((item) => item.userId === user._id);
  if (indexLikes) {
    await post?.likes.splice(indexLikes, 1);
  }

  return res.status(200).json(post);
};
