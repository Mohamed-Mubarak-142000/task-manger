import React, { useState } from "react";
import { MdGridView } from "react-icons/md";
import { BsList, BsPlus } from "react-icons/bs";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Title from "../components/Title";
import Button from "../components/Button";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardTask from "../components/BoardTask";
import ListView from "../components/ListView";
import AddTaskModel from "../components/AddTaskModel";
import { useGetAllTasksQuery } from "../redux/apis/taskApiSlice";

const Tasks = () => {
  const params = useParams();
  const status = params?.status?.replace("-", " ") || "";

  const tabs = [
    { title: "board view ", icon: <MdGridView /> },
    { title: "list view", icon: <BsList /> },
  ];

  const TaskType = {
    completed: "bg-blue-600",
    "in progress": "bg-green-500",
    todo: "bg-yellow-500",
  };

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const { isLoading, data, refetch } = useGetAllTasksQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <section className="flex justify-between items-center pr-5">
        <Title title={status ? ` ${status} Tasks` : "Tasks"} />
        {!status && (
          <Button
            onClick={() => setOpen(true)}
            icon={<BsPlus size={20} />}
            label={"create task"}
            type={"button"}
            className={
              "bg-blue-700 text-white flex items-center justify-center capitalize rounded px-3 py-2 hover:bg-blue-800 transition-all duration-150 "
            }
          />
        )}
      </section>

      <section>
        <Tabs tabs={tabs} setSelected={setSelected}>
          {!status && (
            <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-2">
              <TaskTitle className={TaskType.todo} title={"todo"} />
              <TaskTitle className={TaskType.completed} title={"completed"} />
              <TaskTitle
                className={TaskType["in progress"]}
                title={"in progress"}
              />
            </section>
          )}

          {selected === 0 ? (
            <div>
              <BoardTask tasks={data?.tasks} refetch={refetch} />{" "}
              {!data?.tasks.length && (
                <h1
                  colSpan="5"
                  className=" py-3 text-gray-400 text-lg capitalize text-center flex items-center justify-center my-3"
                >
                  not found any tasks
                </h1>
              )}
            </div>
          ) : (
            <div>
              <ListView tasks={data?.tasks} refetch={refetch} />
              {!data?.tasks.length && (
                <h1
                  colSpan="5"
                  className=" py-3 text-gray-400 text-lg capitalize text-center flex items-center justify-center my-3"
                >
                  not found any tasks
                </h1>
              )}
            </div>
          )}
        </Tabs>
      </section>

      <AddTaskModel open={open} setOpen={setOpen} refetch={refetch} />
    </div>
  );
};

export default Tasks;
