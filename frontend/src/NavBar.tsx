import useAuth from "./util/auth";

const NavBar = () => {
  const { user, signout } = useAuth();
  return (
    <div className="navbar bg-base-300">
      <a href="/" className="btn btn-ghost normal-case text-xl">forum clone</a>
      <div className="ml-auto">
        <div className="normal-case text-xl">
          {user ? (
            <button className="btn btn-ghost" onClick={() => signout()}>Welcome, {user.name}. Logout?</button>
          ) : (
            <>
            <a className="btn btn-ghost" href="/signup">Signup.</a>
            <a className="btn btn-ghost" href="/signin">Login.</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
