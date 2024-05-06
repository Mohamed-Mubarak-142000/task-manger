import React from "react";
import { summary } from "../assets/data";
import TableRow from "./TableRow";

const TaskTable = ({ tasks }) => {
  const HeaderTable = () => {
    return (
      <thead className="border-b border-gray-300 bg-gray-200">
        <tr className="text-black text-left">
          <th className="py-2">Task Title</th>
          <th className="py-2">Priority</th>
          <th className="py-2">Team</th>
          <th className="py-2 hidden md:block">createdAt</th>
        </tr>
      </thead>
    );
  };
  return (
    <>
      <div className="w-full md:w-2/3 shadow-lg md:px-4 pt-2 rounded bg-white">
        <table className="w-full">
          <HeaderTable />
          {!tasks?.length && (
            <p className="py-2 text-gray-500 font flex items-center justify-center text-lg">
              Not any Tasks
            </p>
          )}
          <tbody>
            {tasks?.map((task, id) => {
              return <TableRow key={id} task={task} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskTable;
