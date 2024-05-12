import React, { useState } from "react";
import Button from "../components/Button";
import { MdDelete, MdRestore } from "react-icons/md";
import Title from "../components/Title";
import { tasks } from "../assets/data";
import TrashedTask from "../components/TrashedTask";
import { ConfirmatioDialog } from "../components/Dialogs";
import {
  useDeleteRestoreTaskMutation,
  useGetAllTasksQuery,
} from "../redux/apis/taskApiSlice";
import { toast } from "sonner";

const RecycleBin = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("deleted");
  const [selected, setSelected] = useState("");

  const { data, refetch } = useGetAllTasksQuery({
    strQuery: "",
    isTrashed: "true",
    search: "",
  });

  const [deleteRestoreTask] = useDeleteRestoreTaskMutation();

  const deleteAndReasoreTask = async () => {
    try {
      let result;

      switch (type) {
        case "delete":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "delete",
          }).unwrap();
          break;

        case "deleteAll":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "deleteAll",
          }).unwrap();
          break;

        case "restore":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "restore",
          }).unwrap();
          break;

        case "restoreAll":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "restoreAll",
          }).unwrap();
          break;

        default:
          break;
      }

      toast.success(result?.message);
      refetch();
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.message);
    }
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("do you went to permently restore all items");
    setOpenDialog(true);
  };

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("do you went to permently delete all items");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };
  const restoreClick = (id) => {
    setType("restore");
    setSelected(id);
    setMsg("do you want to restore the selected item ?");
    setOpenDialog(true);
  };

  const HeaderTable = () => {
    return (
      <thead className="border-b border-gray-300 bg-gray-200">
        <tr className="text-black text-left">
          <th className="py-2">Task Title</th>
          <th className="py-2">Priority</th>
          <th className="py-2">Stage</th>
          <th className="py-2 hidden line-clamp-1 md:block">Modified On</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
    );
  };

  return (
    <section className="w-full">
      <section className="flex justify-between items-center pr-5">
        <Title title={"Trashed Tasks"} />
        <div className="flex items-center gap-2">
          <Button
            className={
              "bg-blue-600 px-2 py-1 capitalize text-white flex items-center justify-center rounded gap-1 hover:bg-blue-700  hover:shadow-lg transition-all duration-150"
            }
            icon={<MdRestore />}
            label={"restore all"}
            type={"button"}
            onClick={restoreAllClick}
          />
          <Button
            className={
              "bg-red-600 px-2 py-1 capitalize text-white flex items-center justify-center rounded gap-1 hover:bg-red-700 hover:shadow-lg transition-all duration-150"
            }
            icon={<MdDelete />}
            label={"Delete all"}
            type={"button"}
            onClick={deleteAllClick}
          />
        </div>
      </section>

      <div className="w-full my-2">
        <table className="w-full">
          <HeaderTable />

          <tbody>
            <tr>
              {!data?.tasks?.length && (
                <td
                  colSpan="5"
                  className=" py-3 text-gray-400 text-lg capitalize text-center my-3"
                >
                  not found any tasks
                </td>
              )}
            </tr>
            {data?.tasks?.map((task, index) => {
              return (
                <TrashedTask
                  task={task}
                  key={index}
                  setMsg={setMsg}
                  setOpenDialog={setOpenDialog}
                  setType={setType}
                  deleteClick={() => deleteClick(task._id)}
                  restoreClick={() => restoreClick(task._id)}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmatioDialog
        msg={msg}
        open={openDialog}
        onClick={deleteAndReasoreTask}
        setMsg={setMsg}
        setType={setType}
        type={type}
        setOpen={setOpenDialog}
      />
    </section>
  );
};

export default RecycleBin;
