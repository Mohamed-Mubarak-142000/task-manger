import React from "react";

const Button = ({ type, label, isDisabled, icon, className, onClick }) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className={className}
      onClick={onClick}
    >
      {icon && icon}
      {label}
    </button>
  );
};

export default Button;
