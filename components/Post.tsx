import React, { useRef, useState } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import {
  BookmarkIcon,
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline';
import Comment from './Comment';
import Image from 'next/image';
import { IPostResponse } from '@/typing';

export default function Post({
  username,
  userImage,
  postImage,
  caption,
  comments,
  likes,
}: IPostResponse) {
  const [seemore, setSeeMore] = useState(false);

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
            <HeartIcon className='w-6 cursor-pointer hover:scale-110' />
            <ChatBubbleOvalLeftEllipsisIcon className='w-6 cursor-pointer hover:scale-110' />
          </div>
          <BookmarkIcon className='w-6 cursor-pointer hover:scale-110' />
        </div>
        {likes.length > 0 && <p className='font-bold'>{likes.length}Likes</p>}
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
        {comments.length > 0 && (
          <div className='flex justify-between items-center p-3 sm:p-4'>
            {comments.map((item) => (
              <Comment key={item.createdAt} text={item.text} createdAt={item.createdAt} userImage={item.userImage} username={item.username} />
            ))}
          </div>
        )}
        <div className='flex justify-between items-center space-x-2'>
          <FaceSmileIcon className='w-6' />
          <div className='w-12 flex items-center justify-between space-x-3 flex-1'>
            <input
              type='text'
              placeholder='Enter Your Comment...'
              className='w-full focus:outline-none py-1'
            />
          </div>
          <button className='text-blue-500 font-semibold'>Post</button>
        </div>
      </div>
    </div>
  );
}
