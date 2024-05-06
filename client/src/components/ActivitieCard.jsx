import React from "react";
import { MdDoneOutline, MdOutlineMessage } from "react-icons/md";
import { LuBug, LuThumbsUp, LuUser } from "react-icons/lu";
import { TbProgress } from "react-icons/tb";
import moment from "moment";

const ActivitieCard = ({ activeite }) => {
  const TASKTYPEICON = {
    commented: (
      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white">
        <MdOutlineMessage />
      </div>
    ),

    started: (
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
        <LuThumbsUp size={20} />
      </div>
    ),

    assigned: (
      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white">
        <LuUser />
      </div>
    ),

    bug: (
      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
        <LuBug />
      </div>
    ),

    completed: (
      <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white">
        <MdDoneOutline />
      </div>
    ),
    "in progress": (
      <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white">
        <TbProgress />
      </div>
    ),
  };
  return (
    <>
      <div className="flex items-center gap-2 ">
        <div>{TASKTYPEICON[activeite?.type]}</div>

        <div className="flex flex-col">
          <h2 className=" capitalize">{activeite?.by?.name}</h2>
          <div className="flex items-center gap-3 capitalize text-sm text-gray-800 ">
            <span>{activeite?.type}</span>
            <span>{moment(activeite?.date).fromNow()}</span>
          </div>
          <span className="text-gray-800 text-xs">{activeite.activity}</span>
        </div>
      </div>

      <div className="border-b my-1" />
    </>
  );
};

export default ActivitieCard;
