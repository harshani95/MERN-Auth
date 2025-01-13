import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import getStorage from "redux-persist/es/storage/getStorage";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePresent, setImagePresent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePresent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  return (
    <>
      <div className="max-w-lg mx-auto mt-6">
        <h1 className="text-3xl text-center font-semibold">Profile</h1>
        <form className=" gap-3 flex flex-col">
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            src={currentUser.profilePicture}
            alt="Profile"
            className="h-24 w-24 self-center rounded-full object-cover cursor-pointer mt-2 mb-3"
            onClick={() => fileRef.current.click()}
          />
          <p>
            {imageError ? (
              <span className="text-red-500">Error uploading image</span>
            ) : imagePresent > 0 && imagePresent < 100 ? (
              <span className="text-green-500">{`Uploading : ${imagePresent}%`}</span>
            ) : imagePresent === 100 ? (
              <span className="text-green-500">
                Image Uploaded Successfully
              </span>
            ) : (
              ""
            )}
          </p>
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
