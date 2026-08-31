import { Navigate } from "react-router-dom";

const VijayProtectedRoute = ({ children }) => {
  const vijayToken = localStorage.getItem("vijay_admin_token");
  const vijayEmail = localStorage.getItem("vijay_admin_email");

  // Check if Vijay is authenticated with vijaykumawat8886@gmail.com
  if (!vijayToken || vijayEmail !== "vijaykumawat8886@gmail.com") {
    return <Navigate to="/admin-vijay/login" replace />;
  }

  return children;
};

export default VijayProtectedRoute;
