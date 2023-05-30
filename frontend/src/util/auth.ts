import axios from "axios";
import { useEffect, useState } from "react";
import { LoginInputs } from "./types";

interface User {
  email: string;
  id: number;
  name: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/user", { withCredentials: true })
      .then((r) => r.data)
      .then(setUser)
      .catch(() => console.log("No session"));
  }, []);

  const signin = async (data: LoginInputs) => {
    const user = await axios.post<User>("http://localhost:3001/login", data, {
      withCredentials: true,
    });
    setUser(user.data);
  };

  const signout = async () => {
    // Signout doesnt work?
    await axios.post("http://localhost:3001/logout");
    setUser(null);
  };

  return {
    user,
    signin,
    signout,
  };
};

export default useAuth;
