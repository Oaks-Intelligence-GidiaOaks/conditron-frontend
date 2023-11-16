import { Routes, Route } from "react-router-dom";
import { RegisterSuccessPage } from "../page";
import { LANDING } from "./CONSTANT";

const RouterConfig = () => {
  return (
    <div>
      <Routes>
        <Route path={LANDING} element={<RegisterSuccessPage />} />
      </Routes>
    </div>
  );
};

export default RouterConfig;
