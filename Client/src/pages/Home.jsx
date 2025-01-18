//import authImage from "../assets/auth.jpg";
import AppAuth_logo from "../assets/AppAuth_logo.svg";

const Home = () => {
  return (
    <>
      <div className="mx-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-center mt-10">
          {" "}
          Welcome to the Auth Home
        </h1>
        <img
          src={AppAuth_logo}
          alt="auth"
          className="object-cover mx-auto mt-10"
        />
      </div>
    </>
  );
};

export default Home;
