import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signin",
        formData
      );
      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="p-6 max-w-lg mx-auto mt-5 mb-2 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold mb-5">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
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
            Login
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don&apos;t have an Account? </p>
          <Link to="/signup">
            <span className="text-blue-500 hover:underline cursor-pointer">
              Register Here
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
