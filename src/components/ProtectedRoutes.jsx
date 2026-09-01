import { useSelector } from "react-redux";
import { selectUserDetails } from "../redux/selectors/userSelector";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const userData = useSelector(selectUserDetails) || null;

  if (!userData) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

export const PublicOnlyRoute = () => {
  const userData = useSelector(selectUserDetails) || null;

  if (userData) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};
