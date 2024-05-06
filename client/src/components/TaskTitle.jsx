import React from "react";
import { BsPlus } from "react-icons/bs";

const TaskTitle = ({ title, className }) => {
  return (
    <div className="shadow-lg py-1 rounded flex items-center justify-between px-1 bg-white">
      <div className="flex items-center capitalize gap-1">
        <div className={`${className} h-5 w-5 rounded-full `}></div>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default TaskTitle;
