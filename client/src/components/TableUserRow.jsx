import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { getInitial } from "../utils/getInitialUsername";
import Button from "./Button";
import { useUserActionMutation } from "../redux/apis/userApisSlice";
import { toast } from "sonner";

const TableUserRow = ({
  user,
  deleteHandler,
  refetch,
  setSelected,
  setOpen,
}) => {
  const [userAction] = useUserActionMutation();

  //EDIT USER
  const editUser = (user) => {
    setSelected(user);
    setOpen(true);
  };

  //HANDLER ACTIVE OT DEACTIVE
  const userActionHandler = async (user) => {
    try {
      const result = await userAction({
        isActive: !user?.isActive,
        id: user?._id,
      });
      refetch();
      toast.success(result?.data?.message);
      setSelected(null);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <>
      <tr className="border-b border-gray-300  text-gray-700 hover:bg-gray-100">
        {/**team users */}
        <td className="py-2">
          <div className=" flex items-center gap-1 capitalize">
            <div className="flex items-center bg-blue-800 w-8 h-8 rounded-full justify-center text-white">
              {getInitial(user?.name)}
            </div>
            <span>{user.name}</span>
          </div>
        </td>

        {/**title users */}
        <td className="py-2">
          <span className="flex items-center gap-1 capitalize">
            {user.title}
          </span>
        </td>

        {/**role users */}
        <td className="py-2">
          <span className="flex items-center gap-1 capitalize">
            {user.role}
          </span>
        </td>

        {/**email users */}
        <td className="py-2">
          <span className="flex items-center gap-1 capitalize">
            {user.email}
          </span>
        </td>

        {/**title users */}
        <td className="py-2">
          <button
            onClick={() => userActionHandler(user)}
            className={`flex items-center justify-center rounded-xl outline-none gap-1 w-12 text-sm py-1 ${
              user.isActive ? "bg-green-600" : "bg-blue-200"
            }`}
          >
            {user.isActive ? "Active" : "disabled"}
          </button>
        </td>

        <td>
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={() => editUser(user)}
              className="capitalize text-blue-600 text-md flex items-center hover:bg-blue-500 hover:text-white transition-all duration-150 px-2 rounded"
              icon={<MdEdit />}
              label={"edit"}
              type={"button"}
            />

            <Button
              className="capitalize text-red-600 text-md  flex items-center hover:bg-red-500 hover:text-white transition-all duration-150 px-2 rounded"
              icon={<MdDelete />}
              label={"delete"}
              type={"button"}
              onClick={() => deleteHandler(user)}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableUserRow;
