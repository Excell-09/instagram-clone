import React, { useEffect, useState } from 'react';
import Story from './Story';
import 'minifaker/locales/en';
import minifaker from 'minifaker';

interface IStories {
  username: string;
  image: string;
  id: number;
}

export default function Stories() {
  const [profile, setProfile] = useState<IStories[]>([]);
  useEffect(() => {
    const storyUser = minifaker.array(20, (i: number) => ({
      id: i,
      username: minifaker.username({ locale: 'en' }).toLowerCase(),
      image: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
    }));
    setProfile(storyUser);
  }, []);
  return (
    <div className='flex items-center space-x-2 p-6 bg-white mt-8 border-gray-200 border-[1px] overflow-x-scroll rounded-sm scrollbar-none'>
      {profile.map((item) => (
        <Story key={item.id} image={item.image} username={item.username} />
      ))}
    </div>
  );
}
