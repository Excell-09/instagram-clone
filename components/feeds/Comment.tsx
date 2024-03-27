import React from "react";
import moment from "moment";
import Image from "next/image";
import { IComment } from "./Comments";
import { Unknown } from "@/app/assets/assets";

export default function Comment({ user, comment, createdAt }: IComment) {
  const formatDate = moment(createdAt).fromNow();

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex space-x-3 ">
        <div>
          <Image
            src={user.image_url || Unknown}
            alt=""
            className="rounded-full"
            width={35}
            height={35}
          />
        </div>
        <h6 className="font-semibold">{user.username}</h6>
        <p className="text-gray-500 text-sm flex-1 max-w-[80%]">{comment}</p>
      </div>
      <p className="text-gray-400 text-sm hidden sm:inline-flex whitespace-nowrap">
        {formatDate}
      </p>
    </div>
  );
}
