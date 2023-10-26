
import { useAppSelector } from "@/hooks/index";
import { LOGIN } from "@/routes/CONSTANTS";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { token } = useAppSelector((state) => state.user);

  return token ? <Outlet /> : <Navigate to={LOGIN} replace />;
};

export default ProtectedRoute;
