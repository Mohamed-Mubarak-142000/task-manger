import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import {
  MdOutlineArrowDropDown,
  MdOutlineCheckCircleOutline,
} from "react-icons/md";

const SelecteList = ({ label, list, stage, setStage, TaskType }) => {
  return (
    <div className="flex flex-col w-1/2">
      {label && (
        <span className="capitalize text-gray-600 text-sm">{label}</span>
      )}
      <Listbox value={stage} onChange={setStage}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full border border-gray-300 cursor-default rounded-lg bg-white py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="flex items-center gap-1 truncate">
              <div
                className={`w-4 h-4 rounded-full border ${
                  TaskType[stage.toLowerCase()]
                } `}
              />
              {stage}
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
            <Listbox.Options className="absolute mt-1 max-h-60 z-50 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {list?.map((stage, index) => {
                return (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 outline-none my-1 rounded pl-10 pr-4 capitalize flex items-center gap-1 ${
                        active ? "bg-blue-100 text-green-900" : "text-gray-800"
                      }`
                    }
                    value={stage}
                  >
                    {({ selected }) => (
                      <>
                        <div>
                          <div
                            className={`w-5 h-5 rounded-full border ${
                              TaskType[stage.toLowerCase()]
                            } `}
                          />
                        </div>
                        <span
                          className={` truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {stage}
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
    </div>
  );
};

export default SelecteList;
