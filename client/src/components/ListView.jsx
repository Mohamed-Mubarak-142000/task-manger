import React from "react";
import TableTaskRow from "./TableTaskRow";

const ListView = ({ tasks }) => {
  const HeaderTable = () => {
    return (
      <thead className="border-b border-gray-300 bg-gray-200">
        <tr className="text-black text-left">
          <th className="py-2">Task Title</th>
          <th className="py-2">Priority</th>
          <th className="py-2">Assets</th>
          <th className="py-2 hidden md:block">CreatedAt</th>
          <th className="py-2">Team</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
    );
  };
  return (
    <div className="w-full shadow-lg md:px-4 pt-2 rounded bg-white">
      <table className="w-full">
        <HeaderTable />
        <tbody>
          {tasks?.map((task, id) => {
            return <TableTaskRow key={id} task={task} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
