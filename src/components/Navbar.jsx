import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="https://png.pngtree.com/png-vector/20240818/ourmid/pngtree-geset-of-luxury-beauty-cosmetic-makeup-bdifferent-png-image_13532167.png"
            alt="logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          <span className="fw-bold">Tasnim Store</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    <i className="fas fa-box-open me-1"></i> Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <i className="fas fa-user me-1"></i> Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={logout}
                    className="btn btn-outline-light ms-2"
                  >
                    <i className="fas fa-sign-out-alt me-1"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <i className="fas fa-sign-in-alt me-1"></i> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
