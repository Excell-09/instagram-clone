import Image from 'next/image';
import React from 'react';
import logoInstagramText from '@/public/instagram-text-logo.webp';
import logoInstagram from '@/public/instagram_logo.webp';
import { HomeIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className='px-2 py-3 bg-white shadow-sm sticky top-0 z-50'>
      <div className='flex justify-between items-center max-w-6xl mx-auto gap-3'>
        {/* logo mobile */}
        <div className='w-10 sm:hidden cursor-pointer'>
          <Image src={logoInstagram} alt='logo' className='object-contain' />
        </div>

        {/* logo large screen */}
        <div className='w-28 sm:inline hidden cursor-pointer'>
          <Image src={logoInstagramText} alt='logo' className='object-contain' />
        </div>
        <div className='flex-1'>
          <div className='flex items-center border-2 px-2 py-1 space-x-2 rounded-md bg-slate-100 max-w-[220px] mx-auto'>
            <MagnifyingGlassIcon className='w-5 text-slate-500 cursor-pointer' />
            <input
              type='text'
              placeholder='Search'
              className=' bg-transparent focus:outline-none w-full'
            />
          </div>
        </div>
        <div className='flex items-center group'>
          <HomeIcon className='w-6 hidden sm:inline-block mr-1 ' />
          <p
            className=' group-hover:underline cursor-pointer font-semibold sm:font-normal'
            onClick={(e) => {
              const target = e.target as HTMLElement;
              target.classList.add('underline');
            }}>
            Sign In
          </p>
        </div>
      </div>
    </header>
  );
}
