import { Dashboard, LoginForm } from "@/components";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <Dashboard component={LoginForm} />
    </>
  );
};

export default DashboardPage;
