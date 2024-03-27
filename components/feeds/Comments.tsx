import React, {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";
import Comment from "./Comment";
import { CiFaceSmile } from "react-icons/ci";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react/dist/types/exposedTypes";
import AppAxios from "@/utils/AppAxios";
import { User, Comment as CommentType } from "@prisma/client";

export interface IComment extends Omit<CommentType, "user_id"> {
  user: User;
}

type Props = {
  comments: IComment[];
  current_post_id: string;
  showComment: boolean;
  setComments: Dispatch<SetStateAction<IComment[]>>;
  setShowComment: Dispatch<SetStateAction<boolean>>;
};

export default function Comments(props: Props) {
  const { data: session } = useSession();
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const sendComment: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!session) {
      return router.push("/auth");
    }

    if (!commentText) return;

    setLoading(true);

    const dateNow = new Date(Date.now());
    const prevComment = commentText;

    const currentUser: unknown = {
      id: session.user.id,
      email: session?.user.email!,
      image_url: session?.user.image!,
      username: session?.user.name!,
    };

    try {
      const newComment: IComment = {
        id: "",
        comment: commentText,
        post_id: "",
        user: currentUser as User,
        createdAt: dateNow,
        updatedAt: dateNow,
      };

      props.setComments((prevComments) => [newComment, ...prevComments]);

      setCommentText("");

      props.setShowComment(true);

      await AppAxios.post(
        `/comment/${props.current_post_id}`,
        {
          comment: commentText,
        },
        { headers: { user_id: session.user.id } }
      );
    } catch (error) {
      props.setComments((prevComment) =>
        prevComment.filter((item) => item.comment !== commentText)
      );
      setCommentText(prevComment);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {props.showComment ? (
        props.comments.length !== 0 ? (
          <div className="p-3 sm:p-4 overflow-y-auto max-h-[400px] scrollbar-none flex flex-col gap-3">
            {props.comments.map((item, i) => (
              <Comment
                key={i}
                comment={item.comment}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
                user={item.user}
                post_id={item.post_id}
                id={item.id}
              />
            ))}
          </div>
        ) : null
      ) : null}
      <form
        onSubmit={sendComment}
        className="flex justify-between items-center space-x-2"
      >
        <CiFaceSmile
          className="text-2xl cursor-pointer"
          onClick={() => setShowEmoji(!showEmoji)}
        />
        {showEmoji && (
          <div className="absolute z-30 bottom-14 left-0">
            <EmojiPicker
              width={260}
              height={350}
              onEmojiClick={(emoji: EmojiClickData) =>
                setCommentText(
                  (prevCommentText) => prevCommentText + emoji.emoji
                )
              }
            />
          </div>
        )}
        <div className="w-12 flex items-center justify-between space-x-3 flex-1">
          <input
            value={commentText}
            type="text"
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Enter Your Comment..."
            className="w-full focus:outline-none py-2"
            maxLength={2200}
          />
        </div>
        <button
          disabled={commentText === "" || loading}
          className="text-blue-500 font-semibold disabled:text-opacity-40"
        >
          Post
        </button>
      </form>
    </>
  );
}
