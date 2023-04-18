import React, { useEffect, useState } from 'react';
import Post from './Post';
import useLoadingRecoil from '@/utils/hooks/useLoadingRecoil';
import axiosCreate from '@/utils/axiosCreate';
import { IPostResponse } from '@/typing';

type CallbackFunction = (result: IPostResponse[]) => void;
export default function Posts() {
  const [posts, setPost] = useState<IPostResponse[]>([]);
  const { loading, setLoading } = useLoadingRecoil();

  useEffect(() => {
    getPost((result) => setPost(result));
  }, []);

  const getPost = async (callback: CallbackFunction) => {
    if (loading) return;
    setLoading(true);
    const result = await axiosCreate<IPostResponse[]>('/post');
    setLoading(false);
    return callback(result.data);
  };



  return (
    <div>
      {loading ? (
        <div></div>
      ):(
        posts.map((item) => (
          <Post
            key={item._id}
            username={item.username}
            userImage={item.userImage}
            caption={item.caption}
            postImage={item.postImage}
          />
        )))}
    </div>
  );
}
