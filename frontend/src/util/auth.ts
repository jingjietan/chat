import axios from "axios";

import { useEffect, useState } from "react";
import { LoginInputs } from "./types";

interface User {
  email: string;
  id: number;
  name: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/user`, { withCredentials: true })
      .then((r) => r.data)
      .then(setUser)
      .catch(() => console.log("No session"));
  }, []);

  const signin = async (data: LoginInputs) => {
    const user = await axios.post<User>(`${baseUrl}/login`, data, {
      withCredentials: true,
    });
    setUser(user.data);
  };

  const signout = async () => {
    // Signout doesnt work?
    await axios.post(`${baseUrl}/logout`);
    setUser(null);
  };

  return {
    user,
    signin,
    signout,
  };
};

export default useAuth;
