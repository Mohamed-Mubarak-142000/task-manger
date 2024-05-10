import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { Menu, Transition } from "@headlessui/react";
import { HiDuplicate, HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoAdd } from "react-icons/io5";
import AddTaskModel from "./AddTaskModel";
import SubTaskModel from "./SubTaskModel";
import { toast } from "sonner";
import {
  useDuplicateTaskMutation,
  useTrashedTaskMutation,
} from "../redux/apis/taskApiSlice";

const TaskDialog = ({ item, refetch }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();
  const [trashedTask] = useTrashedTaskMutation();
  const [duplicateTask] = useDuplicateTaskMutation();

  // Function to handle duplicate task (implementation not provided)
  const duplicateHandler = async () => {
    try {
      const response = await duplicateTask(item?._id).unwrap();
      toast.success(response?.message);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.message);
    }
  };

  // Function to handle delete task (implementation not provided)
  const deleteHandler = async () => {
    try {
      const response = await trashedTask({
        id: item?._id,
        isTrashed: "trash",
      }).unwrap();
      toast.success(response.message);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.message);
    }
  };

  // Array of menu items for the task options
  const menuItems = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className="w-5 h-5 mr-2" aria-hidden={true} />,
      onClick: () => navigate(`/task-details/${item._id}`),
    },
    {
      label: "Edit Task",
      icon: <MdOutlineEdit className="w-5 h-5 mr-2" aria-hidden={true} />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: "Add Sub Task",
      icon: <IoAdd className="w-5 h-5 mr-2" aria-hidden={true} />,
      onClick: () => setOpen(true),
    },
    {
      label: "Duplicate Task",
      icon: <HiDuplicate className="w-5 h-5 mr-2" aria-hidden={true} />,
      onClick: () => duplicateHandler(),
    },
  ];

  // Render the menu
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
              {/* Render menu items */}
              {menuItems.map((menuItem, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      onClick={menuItem.onClick}
                      className={`${
                        active ? "bg-blue-700 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {menuItem.icon}
                      {menuItem.label}
                    </button>
                  )}
                </Menu.Item>
              ))}

              {/* Delete task menu item */}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={deleteHandler}
                    className={`${
                      active ? "bg-red-500 text-white" : "text-red-500"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <MdDelete className="w-5 h-5 mr-2" aria-hidden={true} />
                    <span>Delete</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {/* Render the edit task modal */}
      <AddTaskModel open={openEdit} setOpen={setOpenEdit} task={item} />
      {/* Render the sub-task model */}
      <SubTaskModel open={open} setOpen={setOpen} id={item?._id} />
    </>
  );
};

export default TaskDialog;
