import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      alert("User created successfully");

      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/signin");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div className="p-6 max-w-lg mx-auto mt-5 mb-2 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold mb-5">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="bg-slate-100 p-3 rounded-lg mb-4"
            autoComplete="username"
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="bg-slate-100 p-3 rounded-lg mb-4"
            autoComplete="email"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="bg-slate-100 p-3 rounded-lg mb-4"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <button className="bg-slate-800 text-white p-3 rounded-lg uppercase font-semibold mb-1 mt-3 hover:bg-slate-700 transition-colors duration-300">
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>

        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to="/signin">
            <span className="text-blue-500 hover:underline cursor-pointer">
              Sign In
            </span>
          </Link>
        </div>
        <p className="text-red-500 mt-3">
          {" "}
          {error ? error.message || "Something went wrong!" : " "}
        </p>
      </div>
    </>
  );
};

export default SignUp;
