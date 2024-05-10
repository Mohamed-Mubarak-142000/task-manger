import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import { tasks } from "../assets/data";
import Tabs from "../components/Tabs";
import { TbListDetails } from "react-icons/tb";
import { LuListFilter } from "react-icons/lu";
import ActivitiesAndTimeLine from "../components/ActivitiesAndTimeLine";
import OneTaskDetails from "../components/OneTaskDetails";
import { useGetSingleTaskQuery } from "../redux/apis/taskApiSlice";

const TaskDetails = () => {
  const [selected, setSelected] = useState(0);
  const { id } = useParams();
  const { data, refetch } = useGetSingleTaskQuery(id);

  console.log("first:::::", data);

  const tabs = [
    { id: "1", title: "task details", icon: <TbListDetails /> },
    { id: "2", title: "activities / timeline", icon: <LuListFilter /> },
  ];
  console.log("898998989898 ", data);

  return (
    <>
      <div>
        <Title title={data?.title} />
      </div>
      <Tabs tabs={tabs} setSelected={setSelected}>
        {selected === 0 ? (
          <div>
            <OneTaskDetails taskDetails={data?.task} />
          </div>
        ) : (
          <div>
            <ActivitiesAndTimeLine
              taskDetails={data?.task?.activities}
              id={id}
              refetch={refetch}
            />
          </div>
        )}
      </Tabs>
    </>
  );
};

export default TaskDetails;
