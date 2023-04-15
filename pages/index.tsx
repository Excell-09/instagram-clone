import Feed from '@/components/Feed';
import Header from '@/components/Header';
import Stories from '@/components/Stories';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Instagram-clone</title>
      </Head>
      <Header />
      <main className='max-w-3xl mx-auto bg-white mt-5'>
        <Stories />
        <Feed />
      </main>
    </>
  );
}
