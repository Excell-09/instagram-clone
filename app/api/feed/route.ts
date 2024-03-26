import { NextResponse } from "next/server";
import WebResponse from "@/utils/webResponse";
import FeedService from "@/services/Feed";

interface PostBody {
  image_url: string;
  caption: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PostBody;

    const userId = req.headers.get("user_id");

    if (!userId) {
      throw new Error("post id is missing");
    }

    await FeedService.createFeed({
      author_id: userId,
      caption: body.caption,
      image_url: body.image_url,
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

export async function GET(req: Request) {
  try {
    const feeds = await FeedService.getAllFeed();

    return NextResponse.json(new WebResponse(feeds, null), {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(new WebResponse(null, error.message), {
      status: 400,
    });
  }
}
