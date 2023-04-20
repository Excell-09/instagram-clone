import React, { MouseEvent, useState } from 'react';
import Comment from './Comment';
import { TComments } from '@/typing';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axiosCreate from '@/utils/axiosCreate';
import useLoadingRecoil from '@/utils/hooks/useLoadingRecoil';
import EmojiPicker from 'emoji-picker-react';
import { EmojiClickData } from 'emoji-picker-react/dist/types/exposedTypes';

type Props = {
  comments: TComments[];
  postId: string;
  currentUser: string | undefined;
};

export default function Comments(props: Props) {
  const [comment, setComment] = useState<TComments[]>(props.comments);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const { data: session } = useSession();
  const router = useRouter();
  const { loading } = useLoadingRecoil();

  const sendComment = async (e: MouseEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!session?.user) {
      router.push('/auth/signin');
      return;
    }
    if (!commentText) return;

    const dateNow = new Date(Date.now());
    const prevComment = commentText;
    try {
      setComment((prevComment) => [
        {
          createdAt: dateNow,
          text: commentText,
          username: session?.user?.name!,
          userImage: session?.user?.image!,
        },
        ...prevComment,
      ]);
      setCommentText('');
      await axiosCreate.post(`/comment/${props.postId}`, {
        email: session.user.email,
        text: commentText,
      });
    } catch (error) {
      setComment((prevComment) => prevComment.filter((item) => item.text !== commentText));
      setCommentText(prevComment);
    }
  };

  console.log(comment);

  return (
    <>
      {props.comments.length > 0 && (
        <div className='p-3 sm:p-4 overflow-y-auto max-h-[150px] scrollbar-none'>
          {comment.map((item, i) => (
            <Comment
              key={i}
              text={item.text}
              createdAt={item.createdAt}
              userImage={item.userImage}
              username={item.username}
            />
          ))}
        </div>
      )}
      <div className='flex justify-between items-center space-x-2'>
        <FaceSmileIcon className='w-6 cursor-pointer' onClick={() => setShowEmoji(!showEmoji)} />
        {showEmoji && (
          <div className='absolute z-30 bottom-14 left-0'>
            <EmojiPicker
              width={260}
              height={350}
              onEmojiClick={(emoji: EmojiClickData) =>
                setCommentText((prevCommentText) => prevCommentText + emoji.emoji)
              }
            />
          </div>
        )}
        <div className='w-12 flex items-center justify-between space-x-3 flex-1'>
          <input
            value={commentText}
            type='text'
            onChange={(e) => setCommentText(e.target.value)}
            placeholder='Enter Your Comment...'
            className='w-full focus:outline-none py-1'
            maxLength={2200}
          />
        </div>
        <button
          disabled={commentText === '' || loading}
          onClick={sendComment}
          className='text-blue-500 font-semibold disabled:text-opacity-40'>
          Post
        </button>
      </div>
    </>
  );
}
