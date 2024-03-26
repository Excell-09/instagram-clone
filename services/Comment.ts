import prisma from "@/lib/prisma";
import { Comment } from "@prisma/client";

interface CommentBody
  extends Pick<Comment, "user_id" | "post_id" | "comment"> {}

class CommentService {
  static async createComment(data: CommentBody) {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: data.user_id,
      },
    });

    const currentPost = await prisma.post.findUnique({
      where: {
        id: data.post_id,
      },
    });

    if (!currentUser || !currentPost) {
      throw new Error("user and post not found!");
    }

    await prisma.comment.create({
      data: {
        user: {
          connect: currentUser,
        },
        post: {
          connect: currentPost,
        },
        comment: data.comment,
      },
    });
  }
}

export default CommentService;
