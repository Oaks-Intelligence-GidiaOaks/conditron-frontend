import React from "react";
import "./DashboardSidebar.scss";
import { SideBarItem } from "@/components";
import { AiFillDashboard } from "react-icons/ai";

const DashboardSidebar = () => {
  return (
    <div className="dash_sidebar">
      <SideBarItem
        icon={<AiFillDashboard />}
        title="Title"
        link=""
        subLinks={[
          { icon: <AiFillDashboard />, title: "Sublink", link: "" },
          { icon: <AiFillDashboard />, title: "Sublink2", link: "" },
        ]}
      />
    </div>
  );
};

export default DashboardSidebar;
