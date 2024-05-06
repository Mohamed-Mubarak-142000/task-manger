import React from "react";
import { LuBug, LuThumbsUp, LuUser } from "react-icons/lu";
import { MdAddTask, MdDoneOutline, MdOutlineMessage } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import { getFormatDate } from "../utils/getTimeDetails";
import { getInitial } from "../utils/getInitialUsername";
import Assets1 from "../assets/image1.jpg";
import Assets2 from "../assets/image2.jpg";
const OneTaskDetails = ({ taskDetails }) => {
  const STYLEDCOLOR = {
    stageStyle: {
      completed: "text-green-700",
      todo: "text-blue-700",
      "in progress": "text-red-700",
    },
    priorityStyle: {
      high: "bg-green-300",
      medium: "bg-blue-300",
      "in progress": "bg-red-300",
    },
    stageIcons: {
      completed: "bg-green-700",
      todo: "bg-blue-700",
      "in progress": "bg-red-700",
    },
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-2 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-2">
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-5 my-2">
          <div
            className={`w-[160px] text-center capitalize rounded-xl py-1 flex items-center justify-center gap-1
        ${STYLEDCOLOR.priorityStyle[taskDetails?.PRIORITY]} ${
              STYLEDCOLOR.stageStyle[taskDetails?.stage]
            } `}
          >
            <span>{taskDetails?.PRIORITY}</span>
            <span className="capitalize">priority</span>
          </div>

          <div className="capitalize flex items-center justify-center gap-1">
            <div
              className={`w-4 h-4 rounded-full ${
                STYLEDCOLOR.stageIcons[taskDetails?.stage]
              }`}
            />

            <span>{taskDetails?.stage}</span>
          </div>
        </div>

        <h6 className="text-gray-500 my-2">
          Created At : {getFormatDate(new Date(taskDetails?.date))}
        </h6>

        <div className="border-t-2 " />

        {/**attechments */}
        <div className="flex items-center justify-between px-4 gap-2">
          <div className="flex items-center gap-2">
            <span>Assets:</span>
            <span>{taskDetails?.assets?.length}</span>
          </div>
          <div className="flex items-center gap-2 capitalize">
            <span>sub task:</span>
            <span>{taskDetails?.subTasks?.length}</span>
          </div>
        </div>

        <div className="border-t-2 " />

        {/**user team */}
        <div className="mt-5 flex flex-col gap-3">
          <h3 className="text-gray-600 capitalize">user team</h3>
          <div className="border-t-2 " />

          {taskDetails?.team?.map((user, index) => {
            return (
              <div key={index}>
                <section className="py-2 flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 text-sm rounded-full bg-blue-700 text-white flex items-center justify-center ${
                        STYLEDCOLOR.stageIcons[taskDetails.stage]
                      }`}
                    >
                      {getInitial(user?.name)}
                    </div>

                    <div className="flex flex-col ">
                      <span className="capitalize">{user.name}</span>
                      <span className="text-gray-500 capitalize text-sm">
                        {user?.title}
                      </span>
                    </div>
                  </div>
                </section>
                <div className="border-t-2 " />
              </div>
            );
          })}
        </div>

        {/**sub tasks */}
        <div className="mt-5 flex flex-col gap-3">
          <h3 className="capitalize text-gray-600">sub tasks</h3>
          <div className="border-t-2 " />

          {taskDetails?.subTasks.length > 0 ? (
            taskDetails?.subTasks?.map((task, index) => {
              return (
                <div key={index}>
                  <div className="flex items-center gap-4">
                    <h1 className="flex items-center gap-1">
                      <span className="bg-blue-600 text-white text-[30px] rounded-full">
                        <MdAddTask />
                      </span>
                    </h1>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">
                          {getFormatDate(new Date(task?.date))}
                        </span>
                        <span className="text-sm bg-blue-200 rounded capitalize p-1">
                          {task.tag}
                        </span>
                      </div>

                      <span className="text-sm">{task.title}</span>
                    </div>
                  </div>

                  <div className="border-t-2 " />
                </div>
              );
            })
          ) : (
            <h2 className="text-gray-500 text-center text-[18px] py-1">
              Not Any Sub Task
            </h2>
          )}
        </div>
      </section>
      {/**assets */}
      <section className="flex gap-1 flex-col">
        <h3 className="capitalize text-gray-600 m-2 text-[20px] ">
          task assets
        </h3>

        <div className="flex items-center gap-1">
          <div className="w-[100%] md:w-[50%] h-[300px] overflow-hidden rounded-lg">
            <img
              src={Assets1}
              alt="image-ass1"
              className="w-full h-full rounded-lg cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50"
            />
          </div>
          <div className="w-[100%] md:w-[50%] h-[300px]  overflow-hidden rounded-lg">
            <img
              src={Assets2}
              alt="image-ass2"
              className="w-full h-full rounded-lg cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50"
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default OneTaskDetails;
