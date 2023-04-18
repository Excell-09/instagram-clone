import { Request, Response } from 'express';
import Post from '../models/post';
import User from '../models/user';

interface IPostRequest {
  postImage: string;
  caption: string;
  email: string;
}

export const sendPost = async (req: Request, res: Response): Promise<Response> => {
  const { postImage, caption, email }: IPostRequest = req.body;

  if (!postImage || !caption || !email) {
    return res.status(400).json('Value Not complete');
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json('No Authentication');
  }

  await Post.create({ postImage, caption, createdBy: user._id });
  return res.status(200).json('Post Created!');
};

export const getPost = async (_: Request, res: Response): Promise<Response> => {
  const posts = await Post.find();
  const result = await Promise.all(
    posts.map(async (post) => {
      const user = await User.findById(post.createdBy.toString());
      return {
        _id: post._id,
        postImage: post.postImage,
        caption: post.caption,
        likes: post.likes,
        comments: post.comments,
        username: user?.username,
        userImage: user?.userImage,
      };
    })
  );
  return res.status(200).json(result);
};
