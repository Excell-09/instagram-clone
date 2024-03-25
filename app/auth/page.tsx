"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import LoadingScreen from "@/components/LoadingScreen";
import banner from "@/app/assets/banner";
import { coverBanner } from "../assets/assets";
import CardAuth from "./CardAuth";

export default function Page() {
  const { status } = useSession();

  const [imageSigin, setImageSignin] = useState<StaticImageData>(
    banner.banner1
  );
  const [isOnFade, setIsOnFade] = useState(false);
  const ImageRef = useRef(null);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "authenticated") {
    return redirect("/");
  }

  useEffect(() => {
    let i = 1;
    const image: StaticImageData[] = Object.values(banner);
    const interval = setInterval(() => {
      if (i > 2) {
        i = 0;
      }
      setImageSignin(image[i]);
      setIsOnFade(true);

      i++;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isOnFade) {
        setIsOnFade(false);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isOnFade]);

  const styleCoverImage: CSSProperties = {
    backgroundImage: `url('${coverBanner.src}')`,
    backgroundSize: "468.32px 634.15px",
    backgroundPositionY: "1px",
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-2">
      <div className="flex items-center">
        <div
          className={`hidden lg:block bg-no-repeat bg-center top-0 left-0 h-[590px] w-[390px] relative mr-[1.2rem]`}
          style={styleCoverImage}
        >
          <Image
            src={imageSigin}
            alt="instagram"
            className={`w-[250px] h-[538.84px] absolute right-[21px] top-[26px] ${
              isOnFade ? "animate-fade" : ""
            }`}
            ref={ImageRef}
          />
        </div>
        <CardAuth />
      </div>
    </main>
  );
}
