import React from "react";
import "./container.scss";
interface ContainerProp {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProp) => {
  return (
    <div className="container">
      <div className="container-child">{children}</div>
    </div>
  );
};

export default Container;
