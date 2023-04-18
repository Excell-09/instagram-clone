import { TComments } from '@/typing';
import React from 'react';
import moment from 'moment';
import Image from 'next/image';

export default function Comment({ username, userImage, text, createdAt }: TComments) {
  const formatDate = moment(createdAt).fromNow();

  return (
    <>
      <div className='flex items-center space-x-3'>
        <Image src={userImage} alt='' className='rounded-full' width={10} height={10} />
        <h6 className='font-semibold'>{username}</h6>
        <p className=' line-clamp-1 max-w-[80%] text-gray-500 text-sm'>{text}</p>
      </div>
      <p className='text-gray-400 text-sm whitespace-nowrap'>{formatDate}</p>
    </>
  );
}
