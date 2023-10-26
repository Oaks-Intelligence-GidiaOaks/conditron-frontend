import {  MouseEventHandler } from "react";
import "./Button.scss";
import { ThreeDots } from "react-loader-spinner";

interface ButtonProps {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  loadColor?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  text,
  loading,
  disabled,
  className,
  type,
  loadColor,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      className={` ${disabled ? "invalid" : "button"} ${className} center `}
      // style={{ cursor: "not-allowed" }}
    >
      {loading ? (
        <ThreeDots
          height="15"
          width="15"
          radius="9"
          color={loadColor ? "" : "#ffffff"}
          ariaLabel="three-dots-loading"
          visible={true}
        />
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default Button;
