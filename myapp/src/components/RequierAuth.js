import { useContext } from "react";
import { Users } from "./context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequierAuth() {
  const user = useContext(Users);
  const location = useLocation();
  return user.auth.userDetails ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}

export default RequierAuth;
