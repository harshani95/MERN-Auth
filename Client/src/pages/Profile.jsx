import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
} from "../redux/user/userSlice";
import { useState } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [updateSccess, setUpdateSuccess] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        return;
      }
      dispatch(updateSuccess(data.user));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDelete = async () => {
    dispatch(deleteStart());
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success === false) {
        dispatch(deleteFailure(data.message));
        return;
      }
      dispatch(deleteSuccess(data));
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto mt-6">
        <h1 className="text-3xl text-center font-semibold">Profile</h1>
        <form onSubmit={handleSubmit} className=" gap-3 flex flex-col">
          <img
            src={currentUser.profilePicture}
            alt="Profile"
            className="h-24 w-24 self-center rounded-full object-cover cursor-pointer mt-2 mb-3"
          />

          <input
            defaultValue={currentUser.username}
            type="text"
            id="username"
            placeholder="Username"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="Email"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <button
            className="bg-slate-700 text-white rounded-lg p-3 mt-5 uppercase hover:bg-slate-800
          opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-500 cursor-pointer" onClick={handleDelete}>
            Delete Account
          </span>
          <span className="text-red-500 cursor-pointer">Sign Out</span>
        </div>
        <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
        <p className="text-green-700 mt-5">
          {updateSccess && "User is updated successfully!"}
        </p>
      </div>
    </>
  );
};

export default Profile;
