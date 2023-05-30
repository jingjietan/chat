import axios from "axios";

import { CommentInputs, Post, PostInputs } from "./types";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/v`;

export const getPosts = () => {
  return axios.get<Post[]>(baseUrl).then((r) => r.data);
};

export const addPost = (obj: PostInputs) => {
  return axios
    .post<never>("/", obj, { withCredentials: true })
    .then((r) => r.data);
};

export const addComment = (id: string) => (obj: CommentInputs) => {
  return axios
    .post(`/${id}/c`, obj, { withCredentials: true })
    .then((r) => r.data);
};

export const deletePost = (id: string) => {
  return axios
    .delete(`/${id}`, { withCredentials: true })
    .then((r) => r.data);
};

export const deleteComment = ({postId, commentId}: {postId: string, commentId: string}) => {
  return axios
    .delete(`$/${postId}/c/${commentId}`, { withCredentials: true })
    .then((r) => r.data);
};

export const updatePost = ({id, content}: {id: string, content: string}) => {
  return axios
    .put(`/${id}`, { content }, { withCredentials: true})
    .then(r => r.data)
}