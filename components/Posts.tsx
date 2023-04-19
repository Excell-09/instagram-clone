import React, { useEffect, useState } from 'react';
import Post from './Post';
import useLoadingRecoil from '@/utils/hooks/useLoadingRecoil';
import axiosCreate from '@/utils/axiosCreate';
import { IPostResponse } from '@/typing';
import { useSession } from 'next-auth/react';

type CallbackFunction = (result: IPostResponse[]) => void;

export default function Posts() {
  const [posts, setPost] = useState<IPostResponse[]>([]);
  const { loading, setLoading } = useLoadingRecoil();
  const { data: session } = useSession();

  useEffect(() => {
    getPost((result) => setPost(result));
  }, [session?.user?.email]);

  const getPost = async (callback: CallbackFunction) => {
    setLoading(true);
    try {
      let result;
      if (session?.user?.email) {
        result = await axiosCreate<IPostResponse[]>(`/post/${session.user.email}`);
      } else {
        result = await axiosCreate<IPostResponse[]>('/post/null');
      }
      callback(result.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };


  return (
    <div>
      {loading ? (
        <div className='font-semibold text-pink-600 text-center'>Loading...</div>
      ) : (
        posts.map((item) => (
          <Post
            key={item._id}
            _id={item._id}
            username={item.username}
            userImage={item.userImage}
            caption={item.caption}
            postImage={item.postImage}
            comments={item.comments}
            likes={item.likes}
            currentUserId={item.currentUserId || ''}
          />
        ))
      )}
    </div>
  );
}
