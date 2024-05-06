import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { Menu, Transition } from "@headlessui/react";
import { HiDuplicate, HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoAdd } from "react-icons/io5";
import AddTaskModel from "./AddTaskModel";
import SubTaskModel from "./SubTaskModel";
import { ConfirmatioDialog } from "./Dialogs";

const TaskDialog = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const duplicateHandler = () => {};
  const deleteClick = () => {};
  const deleteHandler = () => {};
  const items = [
    {
      label: "open task ",
      icon: (
        <AiTwotoneFolderOpen className="w-5 h-5 mr-2 " aria-hidden={true} />
      ),
      onClick: () => navigate(`/task-details/${item.id}`),
    },
    {
      label: "edit task ",
      icon: <MdOutlineEdit className="w-5 h-5 mr-2 " aria-hidden={true} />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: "add sub task ",
      icon: <IoAdd className="w-5 h-5 mr-2 " aria-hidden={true} />,
      onClick: () => setOpen(true),
    },

    {
      label: "duplicate task ",
      icon: <HiDuplicate className="w-5 h-5 mr-2 " aria-hidden={true} />,
      onClick: () => duplicateHandler(),
    },
  ];
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <HiOutlineDotsHorizontal size={20} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {items.map((item, index) => {
                return (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        onClick={item.onClick}
                        className={`${
                          active ? "bg-blue-700 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {item?.icon}
                        {item?.label}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => deleteClick()}
                    className={`${
                      active ? "bg-red-500 text-white" : "text-red-500"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <MdDelete className="w-5 h-5 mr-2 " aria-hidden={true} />
                    <span>delete</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <AddTaskModel
        open={openEdit}
        setOpen={setOpenEdit}
        key={new Date().getTime()}
        task={item}
      />

      <SubTaskModel open={open} setOpen={setOpen} />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default TaskDialog;
