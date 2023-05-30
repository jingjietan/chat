export interface Post {
  authorId: number;
  comments: Comment[];
  content: string;
  title: string;
  id: number;
}

export interface PostInputs {
  title: string;
  content: string;
}

export interface LoginInputs {
  email: string;
  password: string;
};

export interface SignUpInputs {
  name: string;
  email: string;
  password: string;
}

export interface CommentInputs {
  content: string
}

export interface Comment {
  id: number
  content: string
  author: User
  authorId: number
  postId: number
}

export interface User {
  id: number
  name: string
}