import React from 'react';
import { dummyDataPost } from '@/dummy_data/dummy_data_posts';
import Post from './Post';

export default function Posts() {
  return (
    <div>
      {dummyDataPost.map((item) => (
        <Post
          key={item.id}
          username={item.username}
          userImage={item.userImage}
          caption={item.caption}
          postImage={item.postImage}
        />
      ))}
    </div>
  );
}
