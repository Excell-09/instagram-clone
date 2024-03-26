import prisma from "@/lib/prisma";

class LikeService {
  static async like(userId: string, postId: string) {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          create: { user_id: userId },
        },
      },
    });
  }

  static async unlike(likeId: string) {
    await prisma.like.delete({ where: { id: likeId } });
  }
}

export default LikeService;
