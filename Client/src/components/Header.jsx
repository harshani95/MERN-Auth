import { Link } from "react-router-dom";

const Header = () => {
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
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
