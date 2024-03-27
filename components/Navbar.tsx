"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  AiFillHome,
  AiOutlinePlusCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useModal } from "./ModalProvider";
import { Logo, Unknown } from "@/app/assets/assets";

const Logout = () => {
  return (
    <button
      className="font-semibold text-lg text-red-500 px-2 py-1  hover:bg-gray-100"
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
};

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpenLogoutButton, setIsOpenLogoutButton] = useState(false);
  const { setOpen } = useModal();

  return (
    <header className="px-2 py-2 lg:py-3 bg-white shadow-sm z-40 lg:sticky top-0 left-0 w-full">
      <nav className="flex justify-between items-center max-w-6xl mx-auto gap-3">
        <div
          className="max-w-[3.5rem] md:max-w-[3.8rem] cursor-pointer"
          onClick={() => window.scrollTo(0, 0)}
        >
          <Image src={Logo} alt="Logo" width={50} height={50} />
        </div>
        <div className="flex-1">
          <div className="flex items-center border-2 px-2 py-1 space-x-2 rounded-md bg-slate-100 max-w-[220px] mx-auto">
            <AiOutlineSearch className="w-5 text-slate-500 cursor-pointer" />
            <input
              type="text"
              placeholder="Search"
              className=" bg-transparent focus:outline-none w-full"
            />
          </div>
        </div>
        <div className="flex items-center group gap-x-3 sm:gap-x-5">
          <AiFillHome className="text-3xl hidden sm:inline-block" />
          {!session ? (
            <Link
              href={"/auth"}
              className={`group-hover:underline cursor-pointer font-bold sm:font-normal ${
                pathname === "/auth" && "underline"
              }`}
            >
              Sign In
            </Link>
          ) : (
            <>
              <AiOutlinePlusCircle
                className="text-3xl cursor-pointer active:scale-110"
                onClick={() => setOpen(true)}
              />
              <div className="relative">
                <Image
                  src={session?.user?.image || Unknown}
                  alt={session?.user?.name || ""}
                  width={38}
                  height={38}
                  className="rounded-full cursor-pointer active:scale-110"
                  referrerPolicy="no-referrer"
                  onClick={() => setIsOpenLogoutButton((value) => !value)}
                />
                {isOpenLogoutButton ? (
                  <div
                    className={`absolute bottom-0 right-0 bg-white shadow-md p-1 rounded-md transition-all duration-1000 z-50 ${
                      isOpenLogoutButton
                        ? "scale-100 translate-y-12"
                        : "scale-0 translate-y-0"
                    }`}
                  >
                    <Logout />
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
