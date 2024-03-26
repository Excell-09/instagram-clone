import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";

interface FeedBody extends Pick<Post, "caption" | "image_url" | "author_id"> {}

class FeedService {
  static async createFeed(data: FeedBody) {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: data.author_id,
      },
    });

    if (!currentUser) {
      throw new Error("user not found!");
    }

    await prisma.post.create({
      data: {
        caption: data.caption,
        image_url: data.image_url,
        author: {
          connect: currentUser,
        },
      },
    });
  }

  static async getAllFeed() {
    const feeds = await prisma.post.findMany({
      include: {
        comments: {
          include: {
            user: { select: { username: true, image_url: true } },
          },
        },
        likes: true,
        author: { select: { username: true, image_url: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return feeds;
  }
}

export default FeedService;
