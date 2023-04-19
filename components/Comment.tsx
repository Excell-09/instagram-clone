import { TComments } from '@/typing';
import React from 'react';
import moment from 'moment';
import Image from 'next/image';

export default function Comment({ username, userImage, text, createdAt }: TComments) {
  const formatDate = moment(createdAt).fromNow();

  return (
    <div className='flex items-center justify-between mb-3 space-x-2'>
      <div className='flex space-x-3 '>
        <div>
          <Image src={userImage} alt='' className='rounded-full' width={35} height={35} />
        </div>
        <h6 className='font-semibold'>{username}</h6>
        <p className='text-gray-500 text-sm flex-1 max-w-[80%]'>{text}</p>
      </div>
      <p className='text-gray-400 text-sm hidden sm:inline-flex whitespace-nowrap'>{formatDate}</p>
    </div>
  );
}
