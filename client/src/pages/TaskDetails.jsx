import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import { tasks } from "../assets/data";
import Tabs from "../components/Tabs";
import { TbListDetails } from "react-icons/tb";
import { LuListFilter } from "react-icons/lu";
import ActivitiesAndTimeLine from "../components/ActivitiesAndTimeLine";
import OneTaskDetails from "../components/OneTaskDetails";

const TaskDetails = () => {
  const [taskDetails, setTaskDetails] = useState(null);
  const [selected, setSelected] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const taskData = tasks.find((task) => task.id === id);
    setTaskDetails(taskData);
  }, [id]);

  const tabs = [
    { id: "1", title: "task details", icon: <TbListDetails /> },
    { id: "2", title: "activities / timeline", icon: <LuListFilter /> },
  ];
  console.log("898998989898 ", taskDetails);

  return (
    <>
      <div>
        <Title title={taskDetails?.title} />
      </div>
      <Tabs tabs={tabs} setSelected={setSelected}>
        {selected === 0 ? (
          <div>
            <OneTaskDetails taskDetails={taskDetails} />
          </div>
        ) : (
          <div>
            <ActivitiesAndTimeLine taskDetails={taskDetails} />
          </div>
        )}
      </Tabs>
    </>
  );
};

export default TaskDetails;
