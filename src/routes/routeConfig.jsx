import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../page";
import { LANDING } from "./CONSTANT";

const RouterConfig = () => {
  return (
    <div>
      <Routes>
        <Route path={LANDING} element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default RouterConfig;
