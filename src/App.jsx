import "./App.css"; 
import { Navigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./pages/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
            <Route path="/products/new" element={<AddProduct />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
