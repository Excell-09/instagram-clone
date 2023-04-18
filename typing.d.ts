type likes = {
  userId: string;
};
type comments = {
  userId: string;
  text: string;
};

export interface IPostResponse {
  _id?: string;
  username: string;
  userImage: string;
  postImage: string;
  caption: string;
  likes: likes[];
  comments: comments[];
}
