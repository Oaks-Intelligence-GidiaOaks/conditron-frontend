import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  SetupPasswordPage,
  RegisterSuccessPage,
  ProfileDetailsPage,
  AddressDetailsPage,
  DocumentationPageOne,
  DocumentationPageTwo,
  DashboardHomePage,
} from "../page";
import ProtectedRoute from "../components/protected/ProtectedRoute";
import PublicRoute from "../components/protected/PublicRoute";

import * as routes from "./CONSTANT";

const RouterConfig = () => {
  return (
    <div>
      <Routes>
        <Route
          path={routes.DASHBOARD}
          element={<ProtectedRoute component={DashboardHomePage} />}
        />
        <Route
          path={routes.LOGIN}
          element={<PublicRoute component={LoginPage} />}
        />

        <Route path={routes.REGISTER} element={<RegisterPage />} />
        <Route path={routes.SETUP_PASSWORD} element={<SetupPasswordPage />} />
        <Route
          path={routes.REGISTER_SUCCESS}
          element={<RegisterSuccessPage />}
        />
        <Route
          path={routes.ONBOARDING_PROFILE_DETAILS}
          element={<ProfileDetailsPage />}
        />
        <Route
          path={routes.ONBOARDING_ADDRESS_DETAILS}
          element={<AddressDetailsPage />}
        />
        <Route
          path={routes.DOCUMENTATION_PAGE_ONE}
          element={<DocumentationPageOne />}
        />
        <Route
          path={routes.DOCUMENTATION_PAGE_TWO}
          element={<DocumentationPageTwo />}
        />
      </Routes>
    </div>
  );
};

export default RouterConfig;
