"use client";

import React, { MouseEvent, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsChatDots, BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AppAxios from "@/utils/AppAxios";
import Comments, { IComment } from "./Comments";
import { Like, Post, User } from "@prisma/client";
import { Unknown } from "@/app/assets/assets";

export interface IFeed extends Post {
  likes: Like[];
  comments: IComment[];
  author: User;
}

export default function Feed(props: IFeed) {
  const { data: session } = useSession();
  const [seemore, setSeeMore] = useState(false);
  const [isLikes, setIsLikes] = useState(() =>
    props.likes.some((item) => item.user_id === session?.user?.id)
  );
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState(props.comments.reverse());
  const [totalLikes, setTotalLikes] = useState(props.likes.length);

  const router = useRouter();

  const addLike = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    if (!session) {
      router.push("/auth");
      return;
    }

    try {
      setIsLikes(true);
      setTotalLikes((prev) => ++prev);

      await AppAxios.post(
        `/like/${props.id}`,
        {},
        {
          headers: { user_id: session.user.id },
        }
      );
    } catch (error) {
      setIsLikes(false);
      setTotalLikes((prev) => --prev);
    }
  };

  const disLike = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    if (!session) {
      router.push("/auth");
      return;
    }
    try {
      setIsLikes(false);
      setTotalLikes((prev) => --prev);

      const currentLike = props.likes.find((item) => item.user_id);

      await AppAxios.delete(`/like/${currentLike?.id}`);
    } catch (error) {
      setIsLikes(true);
      setTotalLikes((prev) => ++prev);
    }
  };

  return (
    <div className="bg-white border-gray-200 border-b-2 relative">
      <div className="flex items-center justify-between py-3 sm:py-4 px-2">
        <div className="flex-1 flex items-center space-x-2">
          <Image
            src={props?.author?.image_url || Unknown}
            alt={props?.author?.username}
            className="rounded-full"
            width={40}
            height={40}
          />
          <h6 className="font-semibold">{props.author.username}</h6>
        </div>
        <BsThreeDots className="text-2xl" />
      </div>

      <div className="relative">
        <Image
          src={props.image_url}
          alt={props?.author?.username}
          width={500}
          height={500}
          loading="lazy"
          className="w-full"
        />
      </div>

      <div className="p-2 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5 flex-1">
            {isLikes ? (
              <AiFillHeart
                className="text-3xl cursor-pointer hover:scale-110 text-pink-500"
                onClick={disLike}
              />
            ) : (
              <AiOutlineHeart
                className="text-3xl cursor-pointer hover:scale-110"
                onClick={addLike}
              />
            )}
            <BsChatDots
              onClick={() => setShowComment((value) => !value)}
              className="text-2xl cursor-pointer hover:scale-110"
            />
          </div>
          <BsBookmark className="text-2xl cursor-pointer hover:scale-110" />
        </div>

        {totalLikes > 0 ? (
          <p className="font-semibold">{totalLikes} Likes</p>
        ) : null}
        <pre className={`font-bold whitespace-pre-wrap`}>
          <span>{props.author.username} </span>
          <span
            className={`font-normal text-sm text-gray-800 ${
              seemore ? "block" : "line-clamp-2"
            } `}
          >
            {props.caption}
          </span>
          {props.caption.length > 75 && (
            <span
              className="text-blue-500 cursor-pointer inline"
              onClick={() => setSeeMore(!seemore)}
            >
              {seemore ? "Less More" : "Read More"}
            </span>
          )}
        </pre>
        <Comments
          showComment={showComment}
          current_post_id={props.id}
          comments={comments}
          setComments={setComments}
          setShowComment={setShowComment}
        />
      </div>
    </div>
  );
}
