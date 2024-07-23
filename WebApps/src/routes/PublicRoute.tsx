import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const { menuItem } = useSelector((state: any) => state.auth);

  return accessToken ? (
    <Navigate to={menuItem && menuItem ? menuItem[0].path : "*"} />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
