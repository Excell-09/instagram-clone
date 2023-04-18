import Feed from '@/components/Feed';
import Header from '@/components/Header';
import MiniProfile from '@/components/MiniProfile';
import Stories from '@/components/Stories';
import SuggestionFriends from '@/components/SuggestionFriends';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { authOptions } from './api/auth/[...nextauth]';
import axiosCreate from '@/utils/axiosCreate';
import UploadModal from '@/components/UploadModal';

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Instagram-clone</title>
      </Head>
      <header className='px-2 py-3 bg-white shadow-sm sticky top-0 z-40'>
        <Header />
      </header>
      <main
        className={`mx-auto px-1 sm:mt-6 ${
          session ? 'grid grid-cols-3 max-w-6xl ' : 'max-w-4xl '
        }`}>
        <section className={`col-span-full lg:col-span-2 `}>
          <Stories />
          <Feed />
        </section>
        {session && (
          <aside className='p-5 hidden lg:inline-grid relative'>
            <div className='fixed w-[350px]'>
              <MiniProfile />
              <SuggestionFriends />
            </div>
          </aside>
        )}
        <UploadModal />
      </main>
    </div>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    await axiosCreate.post('/user', {
      username: session?.user?.name,
      email: session?.user?.email,
      userImage: session?.user?.image,
    });
  }

  return {
    props: {},
  };
};
