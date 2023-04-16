import React from 'react';

interface IComment {
  username: string;
  userImage: string;
}

export default function Comment({ username, userImage }: IComment) {
  return (
    <div className='flex items-center space-x-3'>
      <img src={userImage} alt='' className='rounded-full w-8 sm:w-10' />
      <h6 className='font-semibold'>{username}</h6>
      <p className=' line-clamp-1 max-w-[80%] text-gray-500 text-sm'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi laboriosam est, obcaecati
        quaerat iure at labore praesentium et molestiae eveniet.
      </p>
    </div>
  );
}
