import React from "react";

interface Button {
  children: React.ReactNode;
  className?: string;
  color?: "white" | "green" | "teal" | "purple" | "";
  shadow?: boolean;
  hover?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: () => void;
}

const defaultStyle =
  "rounded-lg pt-2 px-4 pb-4 border-[1px] border-black ml-2 ";

const shadowStyle = "shadow-hard";

const hoverStyle = "hover:bg-purple-600 transition ease-in-out delay-100";

const colorSelection = (color: string) => {
  switch (color) {
    case "purple":
      return "bg-purple-400";

    case "green":
      return "bg-green-500";

    case "teal":
      return "bg-green-300";

    case "white":
      return "bg-white";

    default:
      return "bg-white";
  }
};

const Button = ({
  children,
  className,
  color,
  shadow,
  hover,
  onClick,
  onSubmit,
}: Button) => {
  return (
    <button
      className={`${defaultStyle} ${className} ${
        color && colorSelection(color)
      } 
      ${shadow && shadowStyle} 
      ${hover && hoverStyle}
      `}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  );
};

export default Button;
