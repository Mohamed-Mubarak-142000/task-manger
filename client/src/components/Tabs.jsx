import React from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Tabs = ({ children, setSelected, tabs }) => {
  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex gap-2 items-center">
          {tabs.map((tab, i) => {
            return (
              <Tab
                key={i}
                onClick={() => setSelected(i)}
                className={({ selected }) =>
                  classNames(
                    `w-fit capitalize flex items-center outline-none gap-1 px-3 py-1 text-base font-medium leading-5 bg-white ${
                      selected
                        ? " bg-sky-200 text-gray-900 rounded border-b-2 border-blue-700"
                        : "text-gray-700"
                    }`
                  )
                }
              >
                {tab.icon}
                {tab.title}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className="mt-3">{children} </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;
