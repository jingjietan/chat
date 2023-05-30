import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root.tsx";
import SignIn from "./SignIn.tsx";
import Post from "./Post.tsx";
import SignUp from "./Signup.tsx";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/:postId",
        element: <Post />
      }
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
