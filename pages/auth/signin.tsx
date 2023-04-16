import Header from '@/components/Header';
import Head from 'next/head';
import React, { CSSProperties, useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import type { InferGetServerSidePropsType } from 'next';
import Image, { StaticImageData } from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import imageSigIn from '@/public/instagram-image-signin';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [imageSigin, setImageSignin] = useState<StaticImageData>(imageSigIn.imageSigIn1);
  const [showAnimation, setShowAnimation] = useState<boolean>(true);
  useEffect(() => {
    let i = 0;
    const image: StaticImageData[] = Object.values(imageSigIn);
    const interval = setInterval(() => {
      if (i > 3) {
        i = 0;
      }
      setShowAnimation(true);
      setImageSignin(image[i]);
      setTimeout(() => {
        setShowAnimation(false);
      }, 3500);
      i++;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const styleCoverImage: CSSProperties = {
    backgroundImage: `url('/cover-instagram-image-signin.png')`,
    width: '250px',
    position: 'relative',
    backgroundSize: '300px',
    marginRight: '1.2rem',
    top: '0',
    left: '0',
    height: '380px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundPositionY: '1px',
  };

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
          <div className='sm:inline-block hidden' style={styleCoverImage}>
            <AnimatePresence>
              {showAnimation && (
                <motion.div
                  initial='start'
                  animate='end'
                  exit='start'
                  variants={{
                    start: { opacity: 0 },
                    end: { opacity: 1 },
                  }}
                  transition={{ duration: 0.5 }}>
                  <Image
                    src={imageSigin}
                    alt='instagram'
                    className=' w-[65%] absolute right-[12px] top-[16.5px]'
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className='flex flex-col items-center space-y-5'>
            <h3 className='text-2xl font-bold'>Sign In</h3>
            <p className='text-gray-500'>This Project for learning purpose!</p>
            {Object.values(providers).map((item) => (
              <button
                onClick={() => signIn(item.id, { callbackUrl: '/' })}
                className=' bg-pink-400 px-3 py-2 rounded-full shadow font-semibold text-white w-full hover:bg-pink-500'
                key={item.id}>
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
