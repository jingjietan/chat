import { useForm, SubmitHandler } from "react-hook-form";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { addPost, deletePost, getPosts } from "./util/connection";
import { PostInputs } from "./util/types";
import useAuth from "./util/auth";

function App() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: posts,
  } = useQuery({ queryKey: ["posts"], queryFn: getPosts });

  const addMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostInputs>();
  const onSubmit: SubmitHandler<PostInputs> = (data) => {
    addMutation.mutate(data);
    reset();
  };

  const { user } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>"n error has occured.</div>;

  return (
    <>
      {posts?.map((post) => (
        <div key={post.id} className="flex flex-row mt-2">
          <a href={`/${post.id}`}>
            <div className="px-[100px]">
              <div className="text-2xl link">{post.title}</div>
              <div className="text-lg">{post.content}</div>
            </div>
          </a>
          <div className="ml-auto mr-5">
            {post.authorId === user?.id ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  deleteMutation.mutate(post.id.toString());
                }}
              >
                delete?
              </button>
            ) : null}
          </div>
        </div>
      ))}
      {user ? (
        <form
          className="mt-auto p-5 bg-base-200"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-control my-5">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input className="input input-bordered" {...register("title")} />
            {errors.title && <span>no</span>}
          </div>
          <div className="form-control my-5">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <input className="input input-bordered" {...register("content")} />
            {errors.content && <span>no</span>}
          </div>
          <button className="btn">submit</button>
        </form>
      ) : null}
    </>
  );
}

export default App;
