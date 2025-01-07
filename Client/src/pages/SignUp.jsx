import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="p-6 max-w-lg mx-auto mt-5 mb-2 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold mb-5">Sign Up</h1>
        <form className="flex flex-col">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="bg-slate-100 p-3 rounded-lg mb-4"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="bg-slate-100 p-3 rounded-lg mb-4"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="bg-slate-100 p-3 rounded-lg mb-4"
          />
          <button className="bg-slate-800 text-white p-3 rounded-lg uppercase font-semibold mb-1 mt-3 hover:bg-slate-700 transition-colors duration-300">
            Sign Up
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to="/signin">
            <span className="text-blue-500 hover:underline cursor-pointer">
              Sign In
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
