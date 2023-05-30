import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  addComment,
  deleteComment,
  getPosts,
  updatePost,
} from "./util/connection";
import { useForm, SubmitHandler } from "react-hook-form";
import { CommentInputs } from "./util/types";
import useAuth from "./util/auth";
import { useEffect, useState } from "react";

const Post = () => {
  const { postId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addComment(postId || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentInputs>();
  const onSubmit: SubmitHandler<CommentInputs> = (data) => {
    addMutation.mutate(data);
    reset();
  };

  const [content, setContent] = useState("");

  const { user } = useAuth();
  const post = data?.find((r) => r.id === Number(postId));
  const comments = post?.comments;

  useEffect(() => {
    setContent(post?.content || "");
  }, [post]);

  if (!Boolean(Number(postId))) throw new Error("invalid id");
  if (isLoading) return <div>is loading</div>;

  if (error) return <div>error</div>;

  return (
    <>
      <div className="p-4 bg-accent">
        <div className="text-bold text-3xl">{post?.title}</div>
        <input
          className="text-xl border-0 bg-accent"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => {
            if (postId) updateMutation.mutate({ id: postId, content });
          }}
        />
      </div>
      {user ? (
        <form className="p-5 bg-base-200 " onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control my-3">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <input className="input input-bordered" {...register("content")} />
            {errors.content && <span>no</span>}
          </div>
          <button className="btn">submit</button>
        </form>
      ) : (
        <div>you need to be signed in to comment</div>
      )}
      {comments?.length ? (
        comments.map((c) => (
          <div className="m-5 px-auto flex flex-row" key={c.id}>
            <div className="text-lg">{c.content}</div>
            <div className="ml-auto">by {c.author.name}</div>
            {c.authorId === user?.id ? (
              <button
                onClick={() =>
                  deleteMutation.mutate({
                    postId: c.postId.toString(),
                    commentId: c.id.toString(),
                  })
                }
                className="btn btn-secondary ml-3"
              >
                delete?
              </button>
            ) : null}
          </div>
        ))
      ) : (
        <div className="px-auto m-5">no comments on this post </div>
      )}
    </>
  );
};

export default Post;
