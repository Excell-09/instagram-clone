import Image from 'next/image';
import React from 'react';
import logoInstagramText from '@/public/instagram-text-logo.webp';
import logoInstagram from '@/public/instagram_logo.webp';
import { HomeIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { modalState } from '@/atom/modalAtom';

export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  const router = useRouter();
  return (
    <div className='flex justify-between items-center max-w-6xl mx-auto gap-3'>
      {/* logo mobile */}
      <div className='w-10 sm:hidden cursor-pointer'>
        <Image
          src={logoInstagram}
          alt='logo'
          className='object-contain'
          onClick={() => router.push('/')}
        />
      </div>

      {/* logo large screen */}
      <div className='w-28 sm:inline hidden cursor-pointer'>
        <Image
          src={logoInstagramText}
          alt='logo'
          className='object-contain'
          onClick={() => router.push('/')}
        />
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
      <div className='flex items-center group space-x-3'>
        <HomeIcon className='w-6 hidden sm:inline-block ' />
        {!session ? (
          <p
            className={`group-hover:underline cursor-pointer font-semibold sm:font-normal ${
              router.pathname === '/auth/signin' && 'underline'
            }`}
            onClick={() => router.push('/auth/signin')}>
            Sign In
          </p>
        ) : (
          <>
            <PlusCircleIcon
              className='w-7 h-7 cursor-pointer active:scale-110'
              onClick={() => setOpen(!open)}
            />
            <div className='relative w-10 h-10'>
              <Image
                src={session?.user?.image || ''}
                alt={session?.user?.name || ''}
                fill
                className='rounded-full cursor-pointer active:scale-110'
                referrerPolicy='no-referrer'
                onClick={() => signOut()}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
