import { modalState } from '@/atom/modalAtom';
import { useRecoilState } from 'recoil';
import Modal from 'react-modal';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { storage } from '@/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import axiosCreate from '@/utils/axiosCreate';

export default function UploadModal() {
  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState<boolean>(modalState);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPostImage, setSelectedPostImage] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [caption, setCaption] = useState('');

  const sendPost = async () => {
    if (loading && selectedPostImage === null) return;

    setLoading(true);

    try {
      const date = new Date(Date.now()).getTime();
      const imageRef = ref(storage, `posts/image_post/${session?.user?.email}/${date}`);
      await uploadString(imageRef, selectedPostImage as string, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        const response = await axiosCreate.post('/post', {
          postImage: downloadURL,
          caption,
          email: session?.user?.email,
        });
        console.log(response);
      });
    } catch (error) {}

    setOpen(false);
    setLoading(false);
    setSelectedPostImage(null);
  };

  const addImageToPost = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e?.target?.files && e?.target?.files[0]) {
      reader.readAsDataURL(e?.target.files[0]);
      reader.onload = (readerEvent) => {
        setSelectedPostImage(readerEvent.target?.result);
      };
    }
  };
  return (
    <>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => {
            setOpen(false);
            setSelectedPostImage(null);
          }}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none shadow-lg border-2 border-black md:w-[50%] w-[80%] bg-white p-5 focus:outline-none'>
          <div>
            <div>
              {selectedPostImage ? (
                <Image
                  src={selectedPostImage as string}
                  alt='post-image'
                  width={200}
                  height={200}
                  className='object-cover aspect-4/5 mx-auto cursor-pointer'
                  onClick={() => setSelectedPostImage(null)}
                />
              ) : (
                <UserCircleIcon
                  onClick={() => inputFileRef.current && inputFileRef.current.click()}
                  className='w-14 h-14 bg-red-300 text-red-400 mx-auto rounded-full cursor-pointer'
                />
              )}
              <input type='file' hidden ref={inputFileRef} onChange={addImageToPost} />
            </div>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              type='text'
              placeholder='Please enter your caption...'
              maxLength={150}
              className='w-full text-center focus:outline-none p-2 mt-3'
            />
            <button
              onClick={sendPost}
              disabled={selectedPostImage === null || loading}
              className='w-full mt-3 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed bg-pink-500 font-semibold py-2 text-white'>
              {loading ? 'Loading...' : 'Post'}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
