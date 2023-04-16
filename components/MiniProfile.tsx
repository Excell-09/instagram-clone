import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

export default function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center space-x-2'>
        <div className='relative w-[55px] h-[55px]'>
          <Image
            src={session?.user?.image || ''}
            alt={session?.user?.image || ''}
            fill
            className='rounded-full'
          />
        </div>
        <div>
          <h3 className='font-bold'>{session?.user?.name}</h3>
          <p className='text-gray-500 text-bs'>Welcome To Instagram</p>
        </div>
      </div>
      <button onClick={()=> signOut()} className='text-blue-500 font-semibold hover:underline'>Sign Out</button>
    </div>
  );
}
