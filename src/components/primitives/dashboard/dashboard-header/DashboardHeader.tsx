import React from "react";
import "./DashboardHeader.scss";
import { Link } from "react-router-dom";
import { MenuBars } from "@/components";
import { settings, avartar } from "@/assets";

interface DashboardHeaderProps {
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DashboardHeader = ({
  menuIsOpen,
  setMenuIsOpen,
}: DashboardHeaderProps) => {
  return (
    <div className="dashboard_header between">
      <Link to={"/dashboard"} className="dashboard_header_logo center link">
        <span className="dashboard_header_logo_bold">We</span>Move
        {/* <img src={carbon} className="dashboard_header_logo_img" alt="logo" /> */}
        <div className="dashboard_header_logo_bold">Rider</div>
      </Link>
      <div className="dashboard_logowrap center">
        <Link
          to={"/my-account"}
          className="dashboard_header_textbtn_wrap center link"
        >
          <img
            src={"user?.photo_url" || avartar}
            alt="icon"
            className="dashboard_avartar"
          />
          <div className="dashboard_header_text">{"data?.name" || "Name"}</div>
          {/* <img src={down} alt="icon" className="dashboard_down_icon" /> */}
        </Link>
        <Link to={"/my-account"} className="link">
          <img src={settings} alt="icon" className="dashboard_icon" />
        </Link>
        {/* <a className="link">
          <Notification />
        </a> */}
        <div className="dashboard_header_menu">
          <MenuBars isOpen={menuIsOpen} handleClick={setMenuIsOpen} />
        </div>
        {/* <Link to={"/register_company"} className="link">
          <img src={cart} alt="icon" className="dashboard_icon" />
        </Link> */}
      </div>
    </div>
  );
};

export default DashboardHeader;
