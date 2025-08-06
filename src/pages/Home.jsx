import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token"); 

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">Welcome to Tasnim Store</h1>
          <p className="lead mb-5">
            Discover amazing products at great prices. Shop now and enjoy the best shopping experience!
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/products" className="btn btn-primary btn-lg">
              <i className="fas fa-shopping-bag me-2"></i> Browse Products
            </Link>

            {!token && (
              <Link to="/login" className="btn btn-outline-primary btn-lg">
                <i className="fas fa-sign-in-alt me-2"></i> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
