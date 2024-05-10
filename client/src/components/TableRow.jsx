import React, { Fragment } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import moment from "moment";
import UserPopover from "./UserPopover";

const TableRow = ({ task }) => {
  const TaskType = {
    completed: "bg-blue-600",
    "in progress": "bg-green-500",
    todo: "bg-yellow-500",
  };

  const iconsTasks = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  return (
    <tr className="border-b border-gray-300 text-gray-700 hover:bg-gray-100">
      {/***title task */}
      <td className="py-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-5 h-5 rounded-full ${TaskType[task?.stage]}`}
          ></div>
          <span> {task?.title}</span>
        </div>
      </td>
      {/**priority */}
      <td className="py-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-5 h-5 rounded-full flex justify-center items-center `}
          >
            {iconsTasks[task?.priority]}
          </div>
          <span className="capitalize"> {task?.priority}</span>
        </div>
      </td>
      {/**team users */}
      <td className="py-3">
        <div className="flex items-center">
          {task?.team?.slice(0, 3).map((person, i) => {
            return <UserPopover person={person} key={i} index={i} />;
          })}
        </div>
      </td>
      {/**created time */}
      <td className="py-3 hidden md:block">
        <div className={` flex items-center pt-3 text-xs text-gray-500`}>
          {moment(task?.date).fromNow()}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
