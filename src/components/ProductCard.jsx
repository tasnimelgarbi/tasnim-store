import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.thumbnail}
        className="card-img-top p-3"
        alt={product.title}
        style={{ height: "200px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-muted">
          {product.description.slice(0, 60)}...
        </p>
        <p className="fw-bold text-primary">${product.price}</p>
      </div>
      <div className="card-footer bg-white">
        <div className="d-flex justify-content-between">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-view btn-sm"
          >
            <i className="fas fa-eye me-1"></i> View
          </Link>
          <Link
            to={`/products/${product.id}/edit`}
            className="btn btn-outline-warning btn-sm"         
            >
            <i className="fas fa-edit me-1"></i> Edit
          </Link>
        </div>
      </div>
    </div>
  );
}