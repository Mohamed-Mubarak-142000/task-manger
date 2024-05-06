import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { MdAddAlert, MdMessage } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  useGetNotificationQuery,
  useMarkNotificationIsReadMutation,
} from "../redux/apis/userApisSlice";
import ViewNotification from "./ViewNotification";
const Notification = () => {
  const iconsNotification = {
    alert: (
      <MdAddAlert size={25} className=" text-gray-900 hover:text-blue-700" />
    ),
    message: (
      <MdMessage size={25} className=" text-gray-900 hover:text-blue-700 " />
    ),
  };

  const data = [
    {
      id: "1",
      team: ["ahmed mohamed ", "ibrahim mohamed", "ali ashraf"],
      text: "lorem lor emloreml oremlore mlore mloremlo remlor em lore mlorem lorem lorem lo rem",
      task: null,
      notiType: "alert",
      isRead: [],
      createdAt: "2023-12-15",
      updatedAt: "2024-01-12",
    },
    {
      id: "2",
      team: ["ibrahim mohamed", "ali ashraf"],
      text: "lorem lor emloreml oremlore mlore mloremlo remlor em lore mlorem lorem lorem lo rem",
      task: {
        _id: "222222113231s11212d1s2a",
        title: "test task",
      },
      notiType: "message",
      isRead: [],
      createdAt: "2023-12-15",
      updatedAt: "2024-01-12",
    },
    {
      id: "3",
      team: ["ibrahim mohamed", "ali ashraf"],
      text: "lorem lor emloreml oremlore mlore mloremlo remlor em lore mlorem lorem lorem lo rem",
      task: null,
      notiType: "message",
      isRead: [],
      createdAt: "2023-12-15",
      updatedAt: "2024-01-12",
    },
    {
      id: "4",
      team: ["ahmed mohamed ", "ibrahim mohamed"],
      text: "lorem lor emloreml oremlore mlore mloremlo remlor em lore mlorem lorem lorem lo rem",
      task: {
        _id: "222222113231s11212d1s2a",
        title: "test task",
      },
      notiType: "alert",
      isRead: [],
      createdAt: "2023-12-15",
      updatedAt: "2024-01-12",
    },
  ];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { getNotification, refetch } = useGetNotificationQuery();
  const [markNotificationIsRead] = useMarkNotificationIsReadMutation();

  const readHandler = async (type, id) => {
    await markNotificationIsRead({ type, id }).unwrap();
    refetch();
  };

  const viewHandler = async (el) => {
    setSelected(el);
    readHandler("one", el._id);
    setOpen(true);
  };

  const callToActions = [
    { name: "Cancel", href: "#", icon: "" },
    {
      name: "mark all read ",
      href: "#",
      icon: "",
      onClick: () => readHandler("all", ""),
    },
  ];
  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className={"outline-none"}>
              <div className=" relative w-10 h-10 flex items-center justify-center">
                <IoMdNotifications size={25} />

                {data.length > 0 && (
                  <span className="h-5 w-5 bg-red-700 text-white absolute top-0 right-[-5px] rounded-full flex items-center justify-center text-sm ">
                    {data?.length}
                  </span>
                )}
              </div>
            </Popover.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel className="absolute right-0 mt-4 z-50 w-[300px]  md:w-[500px] rounded-lg bg-white shadow-xl focus:outline-none">
                <div className="h-[200px] overflow-y-auto">
                  {data.map((item) => (
                    <div
                      className="flex gap-2 items-center my-2 hover:bg-blue-100 cursor-pointer transition-all duration-150 "
                      key={item.id}
                      onClick={() => viewHandler(item)}
                    >
                      <div className="w-10 h-16 flex justify-center items-center ">
                        {iconsNotification[item.notiType]}
                      </div>

                      <div className="flex flex-col gap-2 p-1">
                        <div className="text-sm capitalize text-blue-500 flex items-center gap-2">
                          <span>{item.notiType}</span>
                          <span className="text-xs text-gray-800">
                            ({moment(item.createdAt).fromNow()})
                          </span>
                        </div>

                        <p className="text-sm line-clamp-1">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {callToActions.map((action) => {
                    return (
                      <Link
                        key={action.name}
                        onClick={
                          action?.onClick ? () => item.onClick() : () => close()
                        }
                        className="flex items-center justify-center gap-2 p-3 capitalize font-bold text-blue-700 bg-gray-100 hover:bg-gray-200 transition-all duration-100"
                      >
                        {action.name}
                      </Link>
                    );
                  })}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>

      <ViewNotification open={open} setOpen={setOpen} el={selected} />
    </>
  );
};

export default Notification;
