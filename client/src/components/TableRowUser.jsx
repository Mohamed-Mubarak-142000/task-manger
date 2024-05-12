import React from "react";
import { getInitial } from "../utils/getInitialUsername";
import moment from "moment";

const TableRowUser = ({ user }) => {
  return (
    <tr className="border-b border-gray-300 text-gray-700 hover:bg-gray-100">
      <td className="py-3 flex items-center capitalize text-gray-500 gap-1">
        <div className="w-8 h-8 border rounded-full bg-blue-700 text-white flex items-center justify-center">
          {getInitial(user?.name)}
        </div>

        <div>{user?.name}</div>
      </td>

      <td>
        {user && (
          <div className="text-block bg-blue-300 w-16 py-1 rounded-2xl flex items-center justify-center capitalize hover:bg-blue-500 hover:text-white transition-all duration-150 ">
            active
          </div>
        )}
      </td>

      <td>
        <div className="text-sm md:text-xs">
          {moment(user?.createdAt).fromNow()}
        </div>
      </td>
    </tr>
  );
};

export default TableRowUser;
