import { Routes, Route } from "react-router-dom";
import { DashboardPage, LoginPage, RegisterPage } from "@/pages";
import {
  // HOME,
  REGISTER,
  // FORGOT_PASSWORD,
  LOGIN,
  DASHBOARD,
} from "./CONSTANTS";

import { ProtectedRoute, PublicRoute } from "@/components";

const RouterConfig = () => {
  return (
    <div>
      <Routes>
        {/* Public routes should be placed in here */}
        {/* <Route path={HOME} element={<Home />} /> */}
          <Route path={DASHBOARD} element={<DashboardPage />} />

        

        <Route path="/" element={<PublicRoute />}>
          {/* Auth pages */}
          <Route path={REGISTER} element={<RegisterPage />} />
          <Route path={LOGIN} element={<LoginPage />} />
          {/* <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} /> */}
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route path={DASHBOARD} element={<DashboardPage />} />
          {/* Protected routes should be placed in here */}
        </Route>

        {/* 404 page */}
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </div>
  );
};

export default RouterConfig;
