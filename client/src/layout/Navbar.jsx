import React from "react";
import { BsList } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserDropDown from "../components/UserDropDown";
import Notification from "../components/Notification";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toggleOpenSidebar = () => {
    dispatch(setOpenSidebar(true));
  };

  return (
    <div className=" py-2 px-5 w-full flex justify-between items-center ">
      <button
        type="button"
        onClick={toggleOpenSidebar}
        className="text-4xl block md:hidden animate-pulse text-blue-700 "
      >
        <BsList />
      </button>

      <div className="w-1/2 md:w-1/4">
        <label
          htmlFor="Search"
          className="relative block rounded-md border py-2 border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="text"
            id="Search"
            className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            placeholder="Search"
          />

          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            Search
          </span>
        </label>
      </div>

      <div className="flex items-center gap-5">
        <Notification />
        <UserDropDown />
      </div>
    </div>
  );
};

export default Navbar;
