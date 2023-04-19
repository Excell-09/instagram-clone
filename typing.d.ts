export type TLikes = {
  userId: string;
};
export type TComments = {
  userImage: string;
  username: string;
  text: string;
  createdAt: string;
};

export interface IPostResponse {
  _id?: string;
  username: string;
  userImage: string;
  postImage: string;
  currentUserId: string;
  caption: string;
  likes: TLikes[];
  comments: TComments[];
}
