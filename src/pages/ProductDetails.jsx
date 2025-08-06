import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Product not found");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        navigate("/products");
      } catch (err) {
        alert("Failed to delete product");
        console.error(err);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-custom text-white">
          <h2 className="mb-0">{product.title}</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <img
                src={product.thumbnail}
                className="img-fluid rounded shadow"
                alt={product.title}
              />
            </div>
            <div className="col-md-6">
              <h4 className="edit-title">${product.price}</h4>
              <p className="lead">{product.description}</p>
              <div className="mt-4">
                <Link
                  to={`/products/${product.id}/edit`}
                  className="btn btn-warning me-2"
                >
                  <i className="fas fa-edit me-1"></i> Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn btn-danger"
                >
                  <i className="fas fa-trash me-1"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}