import React from "react";
import { RiDashboard2Line } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";
import { GiProgression } from "react-icons/gi";
import { RiCalendarTodoFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import { MdAddTask } from "react-icons/md";
import NavLink from "../components/NavLink";
import { IoMdSettings } from "react-icons/io";

const Sidebar = () => {
  const dataLinks = [
    {
      id: "1",
      name: "Dashboard",
      link: "/dashboard",
      icons: <RiDashboard2Line />,
    },
    {
      id: "2",
      name: "Tasks",
      link: "/tasks",
      icons: <FaTasks />,
    },
    {
      id: "3",
      name: "Completed",
      link: "/completed/completed",
      icons: <SiGoogletasks />,
    },
    {
      id: "4",
      name: "In Progress",
      link: "/in-progress/in-progress",
      icons: <GiProgression />,
    },
    {
      id: "5",
      name: "Todo",
      link: "/todo/todo",
      icons: <RiCalendarTodoFill />,
    },
    {
      id: "6",
      name: "Users",
      link: "/users",
      icons: <HiUsers />,
    },
    {
      id: "7",
      name: "Trash",
      link: "/recycleBin",
      icons: <FaTrashCan />,
    },
  ];

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const sidebarLink = user?.isAdmin ? dataLinks : dataLinks.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <div className="w-[280px] h-full flex flex-col gap-5 p-5">
      <h1 className="flex items-center gap-1">
        <span className="bg-blue-600 text-white text-[30px] rounded-full">
          <MdAddTask />
        </span>
        <span className="capitalize font-bold text-[25px]">task dashboard</span>
      </h1>

      <div className="h-[100%] flex flex-col gap-5 py-5">
        {sidebarLink.map((link) => {
          return (
            <NavLink key={link.id} data={link} closeSidebar={closeSidebar} />
          );
        })}
      </div>

      <button className="flex items-center gap-1 text-lg">
        <span>
          <IoMdSettings />
        </span>

        <span>setting</span>
      </button>
    </div>
  );
};

export default Sidebar;
