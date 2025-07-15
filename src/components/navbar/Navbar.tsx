import "./navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export const Navbar = () => {
  const { logout } = useAuth();
  return (
    <nav>
      <div className="nav-content">
        <Link to="/" className="logo">
          Social
        </Link>
        <input type="text" className="search-bar" placeholder="Search" />
        <div className="nav-buttons">
          <button className="nav-btn" onClick={() => logout()}>
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};
