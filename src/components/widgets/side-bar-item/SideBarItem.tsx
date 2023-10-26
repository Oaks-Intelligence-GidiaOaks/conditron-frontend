import React, { useState } from "react";
import "./SideBarItem.scss";
import { NavLink } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";

interface SideBarItemProps {
  icon: React.ReactElement;
  title: string;
  link: string;
  subLinks?: { [key in string]: string | React.ReactElement }[];
}

const SideBarItem = ({ icon, title, link, subLinks }: SideBarItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`side_bar_item ${isCollapsed && "extend"}`}>
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive ? "active  between" : "side_bar_link between"
        }
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="center side_link_title_wrap">
          <div className="side_link_icon">{icon}</div>
          <div className="side_link_title">{title}</div>
        </div>
        {subLinks && (
          <div className="side_link_icon_left">
            <BiChevronLeft />
          </div>
        )}
      </NavLink>
      <div className="side_bar_sublink_wrap">
        {subLinks?.map((item, idx) => (
          <NavLink
            to={item.link as string}
            key={idx}
            className={({ isActive }) =>
              isActive ? "active_sub  start" : "side_bar_sublink start"
            }
          >
            <div className="side_bar_sublink_icon">
              <BsCircleFill />
            </div>
            <div className="side_bar_sublink_title">{item.title}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBarItem;
