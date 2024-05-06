import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { getInitial } from "../utils/getInitialUsername";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { logoutUser } from "../redux/slices/authSlice";
import { toast } from "sonner";
import { useLogoutMutation } from "../redux/apis/authApisSlice";
import { useNavigate } from "react-router-dom";
import AddUser from "./AddUser";
import ChangePassword from "./ChangePassword";

const UserDropDown = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [selected, setSelected] = useState({ user });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const handleLogOUt = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutUser());
      navigate("/login");
      toast.success("Logout Successfully.!");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong.!");
    }
  };
  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              {getInitial(user?.name)}
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
            <Menu.Items className="absolute right-0 mt-4 w-56 rounded-lg bg-white shadow-xl focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      disabled
                      className={`${
                        active ? "bg-blue-600 text-white" : "text-gray-900"
                      } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-md capitalize`}
                    >
                      <FaUser size={20} />
                      {user?.name}
                    </button>
                  )}
                </Menu.Item>
                <div className="border-b" />
              </div>

              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpen(true)}
                      className={`${
                        active ? "bg-blue-600 text-white" : "text-gray-900"
                      } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-md capitalize`}
                    >
                      <FaUsers size={20} />
                      profile
                    </button>
                  )}
                </Menu.Item>
              </div>

              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenPassword(true)}
                      className={`${
                        active ? "bg-blue-600 text-white" : "text-gray-900"
                      } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-md capitalize`}
                    >
                      <MdPassword />
                      Change Password
                    </button>
                  )}
                </Menu.Item>
              </div>

              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogOUt}
                      className={`${
                        active ? "bg-blue-600 text-white" : "text-red-600"
                      } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-md capitalize`}
                    >
                      <IoMdLogOut />
                      Log Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <AddUser
        open={open}
        setOpen={setOpen}
        userData={user}
        setSelected={setSelected}
      />
      <ChangePassword
        openPassword={openPassword}
        setOpenPassword={setOpenPassword}
      />
    </>
  );
};

export default UserDropDown;
