import React, { useState } from "react";
import {
  MdAdd,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdList,
} from "react-icons/md";
import TaskDialog from "./TaskDialog";
import { getFormatDate } from "../utils/getTimeDetails";
import { TfiAlarmClock, TfiPulse } from "react-icons/tfi";
import { CgAttachment, CgList } from "react-icons/cg";
import UserPopover from "./UserPopover";
import { useSelector } from "react-redux";
import SubTaskModel from "./SubTaskModel";

const TaskCard = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const TaskTypeProirty = {
    high: "text-blue-600",
    medium: "text-green-500",
    "in progress": "text-yellow-500",
  };

  const TaskTypeProirty2 = {
    high: "bg-blue-600",
    medium: "bg-green-500",
    "in progress": "bg-yellow-500",
  };

  const iconsTasks = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    "in progress": <MdKeyboardArrowDown />,
  };

  return (
    <div className="bg-white rounded shadow-lg p-1 h-[260px] hover:shadow-xl transition-all duration-150 cursor-pointer">
      <div
        className={`flex gap-1 items-center justify-between capitalize text-xs`}
      >
        {/**priority */}
        <div
          className={`${
            TaskTypeProirty[item.priority]
          } flex gap-1 items-center`}
        >
          <span>{iconsTasks[item.priority]} </span>
          <span>{item.priority}</span>
          <span>priority</span>
        </div>
        {/**task dialog */}
        <TaskDialog item={item} />
      </div>
      {/***title task */}
      <div className="flex items-center gap-1 capitalize mt-2">
        <div
          className={`${TaskTypeProirty2[item.priority]} w-4 h-4 rounded-full`}
        />
        <span className="text-sm line-clamp-1">{item?.title}</span>
      </div>
      {/***time */}
      <span className="text-gray-500 text-xs">
        {getFormatDate(new Date(item?.date))}
      </span>

      <div className="border-t my-1" />

      {/*** Attachments */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center text-sm text-gray-600">
            <TfiAlarmClock />
            {item?.activities?.length}
          </span>

          <span className="flex items-center text-sm text-gray-600">
            <CgAttachment />
            {item?.assets?.length}
          </span>

          <span className="flex items-center text-sm text-gray-600">
            <MdList />
            {item?.subTasks?.length}
          </span>
        </div>

        <div className="flex items-center">
          {item?.team?.slice(0, 3).map((person, index) => {
            return <UserPopover key={index} person={person} index={index} />;
          })}
        </div>
      </div>

      <div className="border-t mt-1" />
      {/**sub Tasks**/}

      <div className="">
        <h6 className="capitalize text-gray-500 text-sm">sub task</h6>
        {item?.subTasks?.length ? (
          <>
            <span className="text-sm px-2 line-clamp-1">
              {item?.subTasks[0]?.title}
            </span>

            <div className="flex items-center justify-around mt-1">
              <span className="text-gray-700 text-xs ">
                {getFormatDate(new Date(item?.subTasks[0]?.date))}
              </span>

              <span className="text-sm text-gray-700 bg-blue-200 px-2 rounded flex items-center justify-center">
                {item?.subTasks[0]?.tag}
              </span>
            </div>
          </>
        ) : (
          <span className="text-gray-500 text-center mx-5 w-full">
            Not Found Any Sub Task
          </span>
        )}

        <button
          onClick={() => setOpen(true)}
          type="button"
          className="flex items-center py-2 w-full justify-center capitalize my-2 bg-blue-100 disabled:cursor-not-allowed disabled::text-gray-500 hover:bg-blue-600 transition-all duration-150 hover:text-white text-[16px]"
          disabled={!user?.isAdmin ? false : true}
        >
          <MdAdd />
          add sub task
        </button>
      </div>

      <SubTaskModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default TaskCard;
