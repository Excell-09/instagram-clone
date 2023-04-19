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

  const isLiked = post?.likes.find((item) => item.userId?.toString() === user._id.toString());

  if (isLiked) {
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

  const totalLikes = post.likes.length;
  post.likes = post.likes.filter((item) => item.userId?.toString() !== user._id.toString());

  if (totalLikes === post.likes.length) {
    return res.status(400).json('user did not like this post!');
  }
  await post.save();

  return res.status(200).json("Disliked");
};
