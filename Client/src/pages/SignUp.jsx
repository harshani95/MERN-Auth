import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        formData
      );
      console.log(response);
      alert("User created successfully");
      navigate("/signin");
    } catch (error) {
      console.log(error);
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
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="bg-slate-100 p-3 rounded-lg mb-4"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="bg-slate-100 p-3 rounded-lg mb-4"
            onChange={handleChange}
          />
          <button className="bg-slate-800 text-white p-3 rounded-lg uppercase font-semibold mb-1 mt-3 hover:bg-slate-700 transition-colors duration-300">
            Sign Up
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
      </div>
    </>
  );
};

export default SignUp;
