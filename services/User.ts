import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

interface UserData extends Pick<User, "username" | "email" | "password"> {
  image_url?: string | null;
}

class UserService {
  async createUser(user: UserData) {
    if (!user.email || !user.username) {
      throw new Error("Your Field Not Complete!");
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(user.email)) {
      throw new Error("Email Is Not Valid");
    }

    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password!, salt);
      user = { ...user, password: hashedPassword };
    } else {
      user = { ...user, password: null };
    }

    await prisma.user.create({ data: user });
  }
}

export default UserService;
