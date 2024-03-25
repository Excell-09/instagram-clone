"use client";
import { Logo } from "@/app/assets/assets";
import Image from "next/image";

export default function LoadingScreen() {
  return (
    <article className="grid fixed top-0 right-0 w-full h-screen z-[9999999]">
      <div className="m-auto">
        <Image src={Logo} alt="logo" width={100} height={100} priority />
      </div>
      <div className="absolute bottom-5 right-1/2 translate-x-1/2">
        <p className="text-center">From</p>
        <p className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Excell
        </p>
      </div>
    </article>
  );
}
