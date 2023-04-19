import React, { MouseEvent, useEffect, useState } from 'react';
import { EllipsisHorizontalIcon, HeartIcon as HeartIconSolid } from '@heroicons/react/20/solid';
import {
  BookmarkIcon,
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IPostResponse } from '@/typing';
import { useRouter } from 'next/router';
import axiosCreate from '@/utils/axiosCreate';
import { useSession } from 'next-auth/react';
import Comments from './Comments';

export default function Post({
  username,
  userImage,
  postImage,
  caption,
  currentUserId,
  comments,
  likes,
  _id,
}: IPostResponse) {
  const [seemore, setSeeMore] = useState(false);
  const [like, setLike] = useState(likes);
  const [currentUser, setCurrentUser] = useState(currentUserId);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!currentUserId) {
      setCurrentUser('null');
    } else {
      setCurrentUser(currentUserId);
    }
  }, [currentUserId]);

  const addLike = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    if (!currentUser || currentUser === 'null') {
      router.push('/auth/signin');
      return;
    }

    try {
      setLike((prevLikes) => [...prevLikes, { userId: currentUser }]);
      await axiosCreate.post(`/like/${_id}`, { email: session?.user?.email });
    } catch (error) {
      setLike((prevLikes) => prevLikes.filter((like) => like.userId !== currentUser));
    }
  };

  const disLike = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    if (!currentUser || currentUser === "null") {
      router.push('/auth/signin');
      return;
    }
    try {
      setLike((prevLikes) => prevLikes.filter((like) => like.userId !== currentUser));
      await axiosCreate.put(`/like/${_id}`, { email: session?.user?.email });
    } catch (error) {
      setLike((prevLikes) => [...prevLikes, { userId: currentUser }]);
    }
  };

  return (
    <div className=' mb-3 sm:mb-5 bg-white border-gray-200 border-2'>
      <div className='flex items-center justify-between p-2 sm:p-5'>
        <div className='flex-1 flex items-center space-x-2'>
          <Image src={userImage} alt='' className='rounded-full' width={40} height={40} />
          <h6 className='font-semibold'>{username}</h6>
        </div>
        <EllipsisHorizontalIcon className='w-7' />
      </div>
      <div className='relative w-full h-[380px] sm:h-[440px]'>
        <Image
          src={postImage}
          alt=''
          fill
          className='object-cover object-center top-0 left-0 w-full h-full'
          loading='lazy'
        />
      </div>
      <div className='p-2 sm:p-5 space-y-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            {like.length > 0 && like.some((item) => item.userId === currentUser) ? (
              <motion.div whileTap={{ scale: 1.15 }}>
                <HeartIconSolid
                  className='w-6 cursor-pointer hover:scale-110 text-pink-500'
                  onClick={disLike}
                />
              </motion.div>
            ) : (
              <motion.div whileTap={{ scale: 1.15 }}>
                <HeartIcon className='w-6 cursor-pointer hover:scale-110' onClick={addLike} />
              </motion.div>
            )}
            <ChatBubbleOvalLeftEllipsisIcon className='w-6 cursor-pointer hover:scale-110' />
          </div>
          <BookmarkIcon className='w-6 cursor-pointer hover:scale-110' />
        </div>
        {like.length > 0 && <p className='font-semibold'>{like.length} Likes</p>}
        <p className={`font-bold ${seemore ? 'inline' : 'line-clamp-2'}`}>
          {username} <span className='font-normal text-sm text-gray-800'>{caption}</span>
        </p>
        {caption.length > 200 && (
          <span
            className='text-blue-500 cursor-pointer inline'
            onClick={() => setSeeMore(!seemore)}>
            {seemore ? 'Less More' : 'See More'}
          </span>
        )}
        <Comments postId={_id} comments={comments} currentUser={currentUser || "null"} />
      </div>
    </div>
  );
}
