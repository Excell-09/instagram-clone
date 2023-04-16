import Header from '@/components/Header';
import Head from 'next/head';
import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import imageSigIn from '@/public/instagram-image-signin.png';
import coverImageSigIn from '@/public/cover-instagram-image-signin.png';
import type { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

export default function Home({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <header className='px-2 py-3 bg-white shadow-sm fixed w-full left-0 top-0 z-50'>
        <Header />
      </header>
      <main className='flex min-h-screen items-center justify-center'>
        <div className='flex items-center'>
          <div className='relative w-[200px] h-[500px] mr-5'>
            <Image src={imageSigIn} alt='instagram' className='hidden sm:block' />
          </div>
          <div className='flex flex-col items-center space-y-5'>
            <h3 className='text-2xl font-bold'>Sign In</h3>
            <p className='text-gray-500'>This Project for learning purpose!</p>
            {Object.values(providers).map((item, i) => (
              <button
                onClick={() => signIn(item.id, { callbackUrl: '/' })}
                className=' bg-pink-400 px-3 py-2 rounded-full shadow font-semibold text-white w-full hover:bg-pink-500'
                key={i}>
                Sign In With Google
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: '/' } };
  }
  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
};
