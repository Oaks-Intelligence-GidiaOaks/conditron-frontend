import React from "react";
import "./MenuBars.scss";

interface MenuBarsProps {
  isOpen: boolean;
  handleClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuBars = ({ isOpen, handleClick }: MenuBarsProps) => {
  return (
    <div
      className={`menu_bar ${isOpen ? "open" : ""}`}
      onClick={() => handleClick(!isOpen)}
    >
      <div className="menu_bar_line"></div>
      <div className="menu_bar_line"></div>
      <div className="menu_bar_line"></div>
    </div>
  );
};

export default MenuBars;
