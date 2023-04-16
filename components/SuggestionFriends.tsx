import React, { useEffect, useState } from 'react';
import minifaker from 'minifaker';
import 'minifaker/locales/en';
import Image from 'next/image';

interface ISuggestion {
  id: number;
  username: string;
  userImage: string;
  jobTitle: string;
}

export default function SuggestionFriends() {
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  useEffect(() => {
    const suggestions = minifaker.array(5, (i) => ({
      username: minifaker.username({ locale: 'en' }).toLowerCase(),
      jobTitle: minifaker.jobTitle(),
      userImage: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div className='mt-5'>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='font-bold text-gray-400 text-sm'>Suggestion For Your</h3>
        <button className='text-gray-600 font-semibold'>See All</button>
      </div>
      <div >
        {suggestions.map((item) => (
          <div key={item.id} className='flex items-center justify-between mb-3'>
            <div className='flex items-center space-x-2 '>
              <div className='relative w-12 h-12'>
                <Image
                  src={item.userImage}
                  alt=''
                  fill
                  className='h-10 rounded-full border p-[2px]'
                />
              </div>
              <div>
                <h4 className='text-sm font-bold'>@{item.username}</h4>
                <p className='text-sm text-gray-500'>{item.jobTitle}</p>
              </div>
            </div>
            <button className='font-semibold text-sm text-blue-500'>Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
}
