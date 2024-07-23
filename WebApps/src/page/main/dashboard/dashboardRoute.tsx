import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const DashboardRoute = () => {
  const { permissions } = useSelector(
    (state: any) => state.auth.authentication.role
  );
  return (
    <div>
      <Outlet
        context={permissions.find(
          (e: any) => (e.name as string).toLowerCase() === "dashboard"
        )}
      />
    </div>
  );
};

export default DashboardRoute;
