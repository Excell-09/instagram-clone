import React from 'react';
import Posts from './Posts';

export default function Feed() {
  return (
    <div className='mt-5 overflow-y-auto'>
      <Posts />
    </div>
  );
}
