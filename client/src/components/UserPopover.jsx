import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { getInitial } from "../utils/getInitialUsername";

const UserPopover = ({ person, index }) => {
  const TaskTypeProirty = {
    1: "bg-blue-600",
    2: "bg-green-500",
    3: "bg-yellow-500",
  };

  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className={"outline-none"}>
              <div
                key={index}
                className={`w-7 h-7 rounded-full border flex items-center justify-center text-sm text-white ${
                  TaskTypeProirty[index + 1]
                }`}
              >
                {" "}
                {getInitial(person?.name)}
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
              <Popover.Panel className="absolute right-full border p-1 z-50 rounded-lg bg-white text-gray-900 shadow-xl focus:outline-none">
                <div className="flex flex-col gap-1 w-40">
                  <div
                    key={index}
                    className={`w-7 h-7 rounded-full border flex items-center justify-center text-sm text-white ${
                      TaskTypeProirty[index + 1]
                    }`}
                  >
                    {" "}
                    {getInitial(person?.name)}
                  </div>

                  <span className="capitalize">{person?.name}</span>
                  <span className="capitalize text-gray-600 text-sm">
                    {person?.title}
                  </span>
                  <span className="text-sm text-gray-500">{person?.email}</span>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default UserPopover;
