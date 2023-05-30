import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpInputs } from "./util/types";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>();

  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    try {
      axios.post("http://localhost:3001/register", data);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
        setTimeout(() => {
          setError(undefined);
        }, 5000);
      }
    }
  };

  return (
    <>
      {error ? (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! {error}.</span>
          </div>
        </div>
      ) : null}
      <div className="hero grow bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Sign up</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <div className="label-text-alt">Name required</div>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <div className="label-text-alt">Email required</div>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  className="input input-bordered"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <div className="label-text-alt">Password required</div>
                )}
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
