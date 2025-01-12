import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <div className="bg-slate-300">
        <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">
          <Link to="/">
            <h1 className="text-2xl font-bold">Auth Application</h1>
          </Link>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/profile">
                  {currentUser ? (
                    <img
                      src={currentUser.profilePicture}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <li>Login</li>
                  )}
                </Link>
              </li>
              {/* <li>
                <Link to="/login">Login</Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
