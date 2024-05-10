import React from "react";
import TaskCard from "./TaskCard";

const BoardTask = ({ tasks, refetch }) => {
  return (
    <div className="w-full mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks?.map((item, i) => {
        return <TaskCard key={i} item={item} refetch={refetch} />;
      })}
    </div>
  );
};

export default BoardTask;
