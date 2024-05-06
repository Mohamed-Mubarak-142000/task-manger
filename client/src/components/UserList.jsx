import React, { Fragment, useEffect, useState } from "react";
import { summary } from "../assets/data";
import { Listbox, Transition } from "@headlessui/react";
import {
  MdOutlineArrowDropDown,
  MdOutlineCheckCircleOutline,
} from "react-icons/md";
import { getInitial } from "../utils/getInitialUsername";

const UserList = ({ setTeam, team }) => {
  const [selectedUser, setSelectedUser] = useState([]);

  console.log("team222", team);

  const handleChange = (newSelectedUsers) => {
    setSelectedUser(newSelectedUsers);
    // Update the `team` prop with the IDs of the selected users
    setTeam(newSelectedUsers.map((user) => user._id));
  };

  // Initialize `selectedUser` based on `team`
  useEffect(() => {
    if (team && team.length > 0) {
      setSelectedUser(team);
    } else {
      setSelectedUser([]);
    }
  }, [team]);

  return (
    <>
      <h2 className="capitalize text-gray-600 text-sm">User team</h2>
      <Listbox
        value={selectedUser}
        onChange={() => handleChange(team)}
        multiple
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full border border-gray-300 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {selectedUser?.map((user) => user?.name).join("-")}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <MdOutlineArrowDropDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {team?.map((user, index) => {
                return (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 outline-none my-1 rounded pl-10 pr-4 capitalize flex items-center gap-1 ${
                        active ? "bg-blue-100 text-green-900" : "text-gray-800"
                      }`
                    }
                    value={user}
                  >
                    {({ selected }) => (
                      <>
                        <div className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center ">
                          {getInitial(user?.name)}
                        </div>
                        <span
                          className={` truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {user?.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                            <MdOutlineCheckCircleOutline
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};

export default UserList;
