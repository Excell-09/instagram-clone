import { NextResponse } from "next/server";
import WebResponse from "@/utils/webResponse";
import UserService from "../../../../services/User";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface RegisterBody extends Pick<User, "username" | "email" | "password"> {}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RegisterBody;
    console.log(body);

    const userService = new UserService();

    await userService.createUser(body);

    return NextResponse.json(new WebResponse("user created", null), {
      status: 201,
    });
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        error.message = "Account Already Exits";
      }
    }
    return NextResponse.json(new WebResponse(null, error.message), {
      status: 400,
    });
  }
}
