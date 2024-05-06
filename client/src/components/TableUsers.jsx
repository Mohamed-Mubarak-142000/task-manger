import React from "react";
import TableRowUser from "./TableRowUser";
import { summary } from "../assets/data";

const TableUsers = ({ users }) => {
  const HeaderTable = () => {
    return (
      <thead className="border-b border-gray-300 bg-gray-200">
        <tr className="text-black text-left">
          <th className="py-2">Full Name</th>
          <th className="py-2">Status</th>
          <th className="py-2">CreatedAt</th>
        </tr>
      </thead>
    );
  };
  return (
    <div className="w-full md:w-1/3 shadow-lg md:px-4 pt-2 rounded bg-white">
      <table className="w-full">
        <HeaderTable />
        <tbody>
          {users?.slice(0, 6).map((user, id) => {
            return <TableRowUser key={id} user={user} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
