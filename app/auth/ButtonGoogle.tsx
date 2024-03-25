"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const ButtonGoogle = () => {
  return (
    <button
      className="flex items-center gap-2 font-semibold"
      onClick={() => signIn("google")}
    >
      <FcGoogle className="text-2xl" /> Log in With Google
    </button>
  );
};

export default ButtonGoogle;
