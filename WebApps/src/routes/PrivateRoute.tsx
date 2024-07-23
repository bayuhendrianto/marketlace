import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
