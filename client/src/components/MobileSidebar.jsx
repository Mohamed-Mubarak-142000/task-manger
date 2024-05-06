import React, { Fragment, useRef } from "react";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import { IoClose } from "react-icons/io5";
import Sidebar from "../layout/Sidebar";

const MobileSidebar = () => {
  const { isOpenSidebar } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef();
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isOpenSidebar}
        as={Fragment}
        enter="transition-opacity duration-700"
        enterFrom="opacity-x-10"
        enterTo=" opacity-x-100 "
        leave="transition-opacity duration-700"
        leaveFrom=" opacity-x-100"
        leaveTo="opacity-x-0 "
      >
        {(ref) => {
          return (
            <div
              ref={(node) => (mobileMenuRef.current = node)}
              className={`md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ${
                isOpenSidebar ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="bg-white w-3/4 h-full ">
                <div className="w-full flex justify-end px-3 py-2">
                  <button onClick={closeSidebar} className="text-red-500">
                    <IoClose size={25} />
                  </button>
                </div>

                <div className="h-[95%]" onClick={closeSidebar}>
                  <Sidebar />
                </div>
              </div>
            </div>
          );
        }}
      </Transition>
    </>
  );
};

export default MobileSidebar;
