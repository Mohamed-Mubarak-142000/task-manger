import React, { useState } from "react";
import { getFormatDate } from "../utils/getTimeDetails";
import { MdDelete, MdRestore } from "react-icons/md";
import Button from "./Button";

const TrashedTask = ({ task, deleteClick, restoreClick }) => {
  const TaskType = {
    textColor: {
      completed: "text-blue-600",
      "in progress": "text-green-500",
      todo: "text-yellow-500",
    },
    bgColor: {
      completed: "bg-blue-600",
      "in progress": "bg-green-500",
      todo: "bg-yellow-500",
    },
  };

  const IconsTasks = {
    high: "text-blue-600",
    medium: "text-green-500",
    "in progress": "text-red-500",
  };

  return (
    <>
      <tr className="border-b border-gray-300 text-gray-700 capitalize hover:bg-gray-100">
        <td className="py-1">
          <div className="flex items-center gap-1">
            <div
              className={`${
                TaskType.bgColor[task.stage]
              } w-4 h-4 rounded-full `}
            />
            <div>{task.title}</div>
          </div>
        </td>
        <td className={`py-1 capitalize ${IconsTasks[task.PRIORITY]}`}>
          {task.PRIORITY} Priority
        </td>
        <td className={`py-1 ${TaskType.textColor[task.stage]}`}>
          {task.stage}
        </td>
        <td className={`py-1 text-sm ${TaskType[task.stage]}`}>
          {getFormatDate(new Date(task.date))}
        </td>
        <td>
          <div className="flex items-center gap-5">
            <Button
              className={
                "w-5 h-5 flex items-center justify-center text-blue-600"
              }
              icon={<MdRestore size={25} />}
              onClick={restoreClick}
            />

            <Button
              className={
                "w-5 h-5 flex items-center justify-center text-red-600"
              }
              icon={<MdDelete size={25} />}
              onClick={deleteClick}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default TrashedTask;
