import Image from 'next/image';
import React from 'react';

interface IProfile {
  username: string;
  image: string;
}

export default function Story({ username, image }: IProfile) {
  return (
    <div className='cursor-pointer basis-5 '>
      <div className='w-14 h-14 relative mx-auto'>
        <Image
          src={image}
          alt={username}
          fill
          loading={'lazy'}
          className='rounded-full border-2 p-[2px] border-red-400 transition-all duration-150 hover:scale-[1.1]'
        />
      </div>
      <p className='w-14 mx-auto truncate text-xs'>{username}</p>
    </div>
  );
}
