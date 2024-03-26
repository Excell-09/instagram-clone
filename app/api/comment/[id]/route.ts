import { NextRequest, NextResponse } from "next/server";
import WebResponse from "@/utils/webResponse";
import CommentService from "@/services/Comment";

interface CommentBody {
  comment: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = (await req.json()) as CommentBody;

    const postId = params.id;
    const userId = req.headers.get("user_id");

    if (!postId || !userId) {
      throw new Error("post id or comment id missing");
    }

    await CommentService.createComment({
      comment: body.comment,
      post_id: postId,
      user_id: userId,
    });

    return NextResponse.json(new WebResponse("Post Created", null), {
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json(new WebResponse(null, error.message), {
      status: 400,
    });
  }
}
