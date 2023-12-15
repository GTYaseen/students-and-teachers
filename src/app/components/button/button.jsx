import React from "react";
import "./button.css";

export const Button = ({ children, type, size, onClick, ...props }) => {
  let width, height, fontSize;

  if (size === "small") {
    width = "50px";
    height = "20px";
    fontSize = "10px";
  } else if (size === "large") {
    width = "100px";
    height = "40px";
    fontSize = "16px";
  } else {
    width = "80px";
    height = "30px";
    fontSize = "14px";
  }

  let buttonStyle = {
    width: width,
    height: height,
    fontSize: fontSize,
  };

  if (type === "primary") {
    return (
      <button className="primary" style={buttonStyle} onClick={onClick}>
        {children}
      </button>
    );
  } else if (type === "secondary") {
    return (
      <button className="secondary" style={buttonStyle} onClick={onClick}>
        {children}
      </button>
    );
  } else {
    return (
      <button className="default" style={buttonStyle} onClick={onClick}>
        {children}
      </button>
    );
  }
};
