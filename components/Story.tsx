import { PlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';

interface IStory {
  username?: string;
  image: string;
  isUser?: boolean;
}

export default function Story({ username, image, isUser = false }: IStory) {
  return (
    <div className='cursor-pointer basis-5 '>
      <div className='w-14 h-14 relative mx-auto'>
        <Image
          src={image || ''}
          alt={username || ''}
          fill
          loading={'lazy'}
          className={`rounded-full ${
            !isUser
              ? 'border-red-400 border-2 p-[2px] transition-all duration-150 hover:scale-[1.1]'
              : 'brightness-50'
          }`}
        />
        {isUser && (
          <PlusIcon
            fontWeight={1000}
            className='w-2/3 text-white cursor-pointer absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'
          />
        )}
      </div>
      {!isUser && <p className='w-14 mx-auto truncate text-xs'>{username}</p>}
    </div>
  );
}
