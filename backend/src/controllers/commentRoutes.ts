import { Request, Response } from 'express';
import Post from '../models/post';
import User from '../models/user';

type TRequestComment = { email: string; text: string };

export const sendComment = async (req: Request, res: Response) => {
  const { email, text }: TRequestComment = req.body;
  const { id } = req.params;

  if (!email || !text) {
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

  const dateNow = new Date(Date.now());

  post.comments.push({
    username: user?.username,
    userImage: user?.userImage,
    text,
    createdAt: dateNow,
  });

  await post.save();

  return res.status(200).json("post success");
};
