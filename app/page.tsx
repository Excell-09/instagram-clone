"use client";

import { useSession } from "next-auth/react";
import Feeds from "../components/feeds/Feeds";
import Navbar from "../components/Navbar";
import Modal from "@/components/Modal";
import { useModal } from "@/components/ModalProvider";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Image from "next/image";
import axios from "axios";
import AppAxios from "@/utils/AppAxios";
import LoadingScreen from "@/components/LoadingScreen";
import { noImage } from "./assets/assets";

const CaptionInput = (props: {
  display: string;
  total_length: number;
  value: (value: string) => void;
  text: string;
}) => {
  return (
    <div>
      <textarea
        value={props.text}
        className="w-full min-h-[200px] focus:outline-none"
        onChange={(e) => props.value(e.target.value)}
        placeholder={props.display}
      />
      <p className="text-sm text-gray-400 text-end">
        {props.total_length}/2.200
      </p>
    </div>
  );
};

const ImageInput = (props: { value: (value: string) => void }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setIsLoading] = useState(false);

  const handleUpload = async (file: File | null) => {
    setIsLoading(true);

    if (!file || !file.type.startsWith("image")) {
      return;
    }

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "uf1vjgv2");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dit4qh80d/image/upload",
        form
      );
      props.value(response.data.url);
    } catch (error: any) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid py-3">
      <Button
        isLoading={loading}
        onClick={() => fileRef.current?.click()}
        className="px-5 m-auto"
        type="button"
      >
        Upload Your Image
      </Button>
      <input
        accept="image/png, image/gif, image/jpeg"
        type="file"
        hidden
        onChange={(e) => handleUpload(e.target.files![0])}
        ref={fileRef}
      />
    </div>
  );
};

const PostFeedCard = () => {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { setOpen } = useModal();

  const handleUpload: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (!caption || !imageUrl) return;

    try {
      await AppAxios.post(
        "/feed",
        {
          image_url: imageUrl,
          caption,
        },
        { headers: { user_id: session?.user.id } }
      );

      setOpen(false);
      window.location.reload();
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="overflow-y-auto max-h-[450px]" onSubmit={handleUpload}>
      <Image
        src={imageUrl || noImage}
        alt="no image"
        width={640}
        height={400}
      />

      <ImageInput value={(value) => setImageUrl(value)} />
      <CaptionInput
        text={caption}
        total_length={caption.length}
        display="Write a caption..."
        value={(value) =>
          setCaption((prevValue) => {
            if (prevValue.length >= 2200) {
              return prevValue;
            }
            return value;
          })
        }
      />
      <Button
        isLoading={isLoading}
        type="submit"
        className="w-full"
        isDisable={!caption || !imageUrl}
      >
        Add New Feed
      </Button>
    </form>
  );
};

export default function Home() {
  const { status } = useSession();
  const { isOpen } = useModal();

  if (status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <>
      {isOpen ? (
        <Modal ModalTitle="Post You Feed" ModalBody={<PostFeedCard />} />
      ) : null}
      <Navbar />
      <main className={"max-w-4xl lg:my-5 mx-auto"}>
        <Feeds />
      </main>
    </>
  );
}
