import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { MdAdd } from "react-icons/md";
import { summary, tasks } from "../assets/data";
import TableUserRow from "../components/TableUserRow";
import AddUser from "../components/AddUser";
import {
  useDeleteUserMutation,
  useGetTeamListQuery,
} from "../redux/apis/userApisSlice";
import { toast } from "sonner";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, refetch } = useGetTeamListQuery();
  const [deleteUser] = useDeleteUserMutation();

  //DELETE USER
  const deleteHandler = async (user) => {
    try {
      const result = await deleteUser(user?._id);
      refetch();
      toast.success(result?.data?.message);
      setSelected(null);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.message);
    }
  };

  //HEADER TABLE
  const HeaderTable = () => {
    return (
      <thead className="border-b border-gray-300 bg-gray-200">
        <tr className="text-black text-left">
          <th className="py-2">User Name</th>
          <th className="py-2">Title</th>
          <th className="py-2">Role</th>
          <th className="py-2 hidden md:block">Email</th>
          <th className="py-2">Active</th>
          <th className="py-2 text-center">Actions</th>
        </tr>
      </thead>
    );
  };
  return (
    <>
      <section className="flex justify-between items-center pr-5">
        <Title title={"team members"} />

        <Button
          onClick={() => setOpen(true)}
          className={
            "bg-blue-700  flex items-center text-white px-2 p-2 outline-none  rounded capitalize hover:bg-blue-800"
          }
          label={"add member"}
          icon={<MdAdd />}
          type={"button"}
        />
      </section>

      <div className="w-full shadow-lg md:px-4 pt-2 rounded bg-white">
        <table className="w-full">
          <HeaderTable />
          <tbody>
            {data?.map((user) => {
              return (
                <TableUserRow
                  user={user}
                  key={user.id}
                  setSelected={setSelected}
                  deleteHandler={deleteHandler}
                  refetch={refetch}
                  setOpen={setOpen}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        setSelected={setSelected}
        key={new Date().getTime().toString()}
      />
    </>
  );
};

export default Users;
