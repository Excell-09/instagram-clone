import { NextRequest, NextResponse } from "next/server";
import WebResponse from "@/utils/webResponse";
import LikeService from "@/services/Like";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("user_id");
    const postId = params.id;

    if (!postId || !userId) {
      throw new Error("post id or comment id missing");
    }

    await LikeService.like(userId, postId);

    return NextResponse.json(new WebResponse("liked", null), {
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json(new WebResponse(null, error.message), {
      status: 400,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = params.id;

    if (!commentId) {
      throw new Error("comment id  missing");
    }

    await LikeService.unlike(commentId);

    return NextResponse.json(new WebResponse("unliked", null), {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(new WebResponse(null, error.message), {
      status: 400,
    });
  }
}
