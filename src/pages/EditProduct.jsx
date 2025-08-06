import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../validation/productSchema";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        reset(res.data);
      } catch (err) {
        setError("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/products/${id}`, data);
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="edit-title text-white">
          <h2 className="mb-0">
            <i className="fas fa-edit me-2"></i>Edit Product
          </h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Product Title</label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                {...register("title")}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title.message}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Price</label>
              <input
                type="number"
                className={`form-control ${errors.price ? "is-invalid" : ""}`}
                {...register("price")}
              />
              {errors.price && (
                <div className="invalid-feedback">{errors.price.message}</div>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                rows="3"
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                {...register("description")}
              ></textarea>
              {errors.description && (
                <div className="invalid-feedback">
                  {errors.description.message}
                </div>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">Thumbnail URL</label>
              <input
                type="text"
                className={`form-control ${errors.thumbnail ? "is-invalid" : ""}`}
                {...register("thumbnail")}
              />
              {errors.thumbnail && (
                <div className="invalid-feedback">{errors.thumbnail.message}</div>
              )}
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn btn-custom"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <span>
                    <i className="fas fa-save me-1"></i> Save Changes
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}