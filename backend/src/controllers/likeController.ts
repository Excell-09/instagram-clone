import { Request, Response } from 'express';
import Post from '../models/post';
import User from '../models/user';

type TRequestLike = { email: string };

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

  if (!post) {
    return res.status(400).json('Post Not Found!');
  }

  const indexLikes = post?.likes.findIndex((item) => item.userId === user._id);

  if (indexLikes !== -1) {
    return res.status(400).json('user already like this post!');
  }

  post.likes.push({ userId: user._id });
  await post.save();

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
  if (!post) {
    return res.status(400).json('Post Not Found!');
  }
  const indexLikes = post?.likes.findIndex((item) => item.userId === user._id);
  if (indexLikes) {
    post?.likes.splice(indexLikes, 1);
  }
  await post.save();

  return res.status(200).json(post);
};
