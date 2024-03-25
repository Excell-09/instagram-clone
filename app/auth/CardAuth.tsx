"use client";

import Image from "next/image";
import { useState } from "react";
import CardSignUp from "./CardSignUp";
import CardSignIn from "./CardSignIn";
import ButtonGoogle from "./ButtonGoogle";
import { logoText } from "../assets/assets";

const CardAuth = () => {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <article className="flex flex-col gap-2">
      <div className="flex flex-col items-center border-2 p-10">
        <Image
          src={logoText}
          alt="text logo"
          width={228}
          height={51}
          className="text-gray-500 pb-7"
        />

        {hasAccount ? <CardSignIn /> : <CardSignUp />}

        <div className="relative my-10 w-full ">
          <hr className="h-2 border-t-2 w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
          <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-6 bg-white flex">
            OR
          </span>
        </div>

        <ButtonGoogle />
      </div>
      <div className="flex flex-col items-center border-2 px-2 py-5">
        <p className="text-sm">
          {hasAccount ? "Don't Have An Account?" : "Already Have An Account?"}{" "}
          <span
            className="text-blue-500 font-bold cursor-pointer"
            onClick={() => setHasAccount((value) => !value)}
          >
            {hasAccount ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </article>
  );
};

export default CardAuth;
