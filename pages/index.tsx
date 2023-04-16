import Feed from '@/components/Feed';
import Header from '@/components/Header';
import MiniProfile from '@/components/MiniProfile';
import Stories from '@/components/Stories';
import SuggestionFriends from '@/components/SuggestionFriends';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

export default function Home() {
  const {data:session} = useSession()
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Instagram-clone</title>
      </Head>
      <header className='px-2 py-3 bg-white shadow-sm sticky top-0 z-50'>
        <Header />
      </header>
      <main className={`max-w-6xl mx-auto px-1 sm:mt-6 ${session && 'flex justify-between'}`}>
        <section className={`lg:w-[65%] ${!session && 'mx-auto'} w-full`}>
          <Stories />
          <Feed />
        </section>
        {session && (
          <aside className='w-[35%] hidden lg:inline-block p-5 '>
            <MiniProfile />
            <SuggestionFriends />
          </aside>
        )}
      </main>
    </div>
  );
}
