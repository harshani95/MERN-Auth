import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <div className="max-w-lg mx-auto mt-6">
        <h1 className="text-3xl text-center font-semibold">Profile</h1>
        <form className=" gap-3 flex flex-col">
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
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="Email"
            className="bg-slate-100 rounded-lg p-3"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-slate-100 rounded-lg p-3"
          />
          <button
            className="bg-slate-700 text-white rounded-lg p-3 mt-5 uppercase hover:bg-slate-800
          opacity-95 disabled:opacity-80"
          >
            Update
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-500 cursor-pointer">Dlete Account</span>
          <span className="text-red-500 cursor-pointer">Sign Out</span>
        </div>
      </div>
    </>
  );
};

export default Profile;
