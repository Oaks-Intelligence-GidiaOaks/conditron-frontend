import { useAppSelector } from "@/hooks/index";
import { HOME } from "@/routes/CONSTANTS";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { token } = useAppSelector((state) => state.user);
  return token ? <Navigate to={HOME} replace /> : <Outlet />;
};

export default PublicRoutes;
