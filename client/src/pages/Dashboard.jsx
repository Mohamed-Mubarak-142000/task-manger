import React from "react";
import { summary } from "../assets/data";
import { FaRegNewspaper } from "react-icons/fa";
import Card from "../components/Card";
import { GiProgression } from "react-icons/gi";
import { MdIncompleteCircle } from "react-icons/md";
import { RiTodoFill } from "react-icons/ri";
import Charts from "../components/Charts";
import TaskTable from "../components/TaskTable";
import TableUsers from "../components/TableUsers";
import { useGetDashoardStatusQuery } from "../redux/apis/taskApiSlice";
import Loading from "../components/Loading";

const Dashboard = () => {
  const { data, isLoading } = useGetDashoardStatusQuery();

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const totals = data?.tasks;

  const stats = [
    {
      id: "1",
      label: "total task",
      total: data?.totalTasks || 0,
      icon: <FaRegNewspaper size={25} />,
      bg: "bg-[#1d4ed8]",
    },
    {
      id: "2",
      label: "completed task",
      total: totals["completed"] || 0,
      icon: <MdIncompleteCircle size={25} />,
      bg: "bg-[#0f766e]",
    },
    {
      id: "3",
      label: "task in progress",
      total: totals["in progress"] || 0,
      icon: <GiProgression size={25} />,
      bg: "bg-[#f59e0b]",
    },
    {
      id: "4",
      label: "todo task",
      total: totals["todo"] || 0,
      icon: <RiTodoFill size={25} />,
      bg: "bg-[#be185d]",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {stats?.map((card) => {
          return (
            <Card
              key={card?.id}
              label={card?.label}
              count={parseInt(card?.total)}
              icon={card?.icon}
              bg={card?.bg}
            />
          );
        })}
      </div>

      <Charts data={data?.graphData} />

      <div className="flex gap-2 flex-col items-center md:gap-1 md:flex-row md:items-start">
        <TaskTable tasks={data?.last10Task} />
        <TableUsers users={data?.users} />
      </div>
    </>
  );
};

export default Dashboard;
