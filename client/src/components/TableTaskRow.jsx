import moment from "moment";
import React, { useState } from "react";
import UserPopover from "./UserPopover";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdList,
} from "react-icons/md";
import { getFormatDate } from "../utils/getTimeDetails";
import { TfiAlarmClock } from "react-icons/tfi";
import { CgAttachment } from "react-icons/cg";
import { ConfirmatioDialog } from "./Dialogs";

const TableTaskRow = ({ task }) => {
  const [selected, setSelected] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
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

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };
  return (
    <>
      <tr className="border-b border-gray-300 text-gray-700 hover:bg-gray-100">
        {/***title task */}
        <td className="py-1">
          <div className="flex items-center gap-2">
            <div
              className={`w-5 h-5 rounded-full ${TaskType[task.stage]}`}
            ></div>
            <span> {task.title}</span>
          </div>
        </td>
        {/**priority */}
        <td className="py-1">
          <div className="flex items-center gap-2">
            <div
              className={`w-5 h-5 rounded-full flex justify-center items-center `}
            >
              {iconsTasks[task.PRIORITY]}
            </div>
            <span className="capitalize"> {task.PRIORITY} priority</span>
          </div>
        </td>

        {/**assets */}
        <td className="py-1">
          <div className={` flex items-center pt-3 text-xs text-gray-500`}>
            {/*** Attachments */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex items-center text-xs text-gray-600">
                  <TfiAlarmClock />
                  {task?.activities?.length}
                </span>

                <span className="flex items-center text-xs text-gray-600">
                  <CgAttachment />
                  {task?.assets?.length}
                </span>

                <span className="flex items-center text-xs text-gray-600">
                  <MdList />
                  {task?.subTasks?.length}
                </span>
              </div>
            </div>{" "}
          </div>
        </td>

        {/**created time */}
        <td className="py-1 hidden md:block">
          <div className={` flex items-center pt-3 text-xs text-gray-500`}>
            {getFormatDate(new Date(task?.date))}
          </div>
        </td>
        {/**team users */}
        <td className="py-1">
          <div className="flex items-center">
            {task?.team?.slice(0, 3).map((person, i) => {
              return <UserPopover person={person} key={i} index={i} />;
            })}
          </div>
        </td>

        <td>
          <div className="flex items-center gap-5">
            <button className="capitalize text-blue-600 text-sm hover:bg-blue-500 hover:text-white transition-all duration-150 px-2 rounded ">
              edit
            </button>
            <button
              onClick={() => deleteClick(task.id)}
              className="capitalize text-red-600 text-sm hover:bg-red-500 hover:text-white transition-all duration-150 px-2 rounded"
            >
              delete
            </button>
          </div>
        </td>
      </tr>

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={() => deleteClick(task.id)}
      />
    </>
  );
};

export default TableTaskRow;
