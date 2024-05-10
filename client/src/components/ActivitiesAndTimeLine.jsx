import React, { useState } from "react";
import Title from "./Title";
import ActivitieCard from "./ActivitieCard";
import Loading from "./Loading";
import Button from "./Button";
import { useCreateTaskActivityMutation } from "../redux/apis/taskApiSlice";
import { toast } from "sonner";

const ActivitiesAndTimeLine = ({ taskDetails, id, refetch }) => {
  const act_type = [
    "Started",
    "completed",
    "in progress",
    "commented",
    "bug",
    "assigned",
  ];

  const [createTaskActivity, { isLoading: loading }] =
    useCreateTaskActivityMutation();

  console.log("first:::::::::::::::::::::::::::::::", taskDetails);

  const [selected, setSelected] = useState(act_type[0]);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    try {
      const activityPost = {
        type: selected?.toLowerCase(),
        activityText: text,
      };
      const response = await createTaskActivity({
        data: activityPost,
        id,
      }).unwrap();

      setText("");
      toast.success(response?.message);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.message);
    }
  };
  return (
    <section className="w-full bg-white rounded-lg shadow-lg py-5 px-3 min-h-[600px] grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
      <section>
        <Title title={"activities"} />

        <div className=" flex flex-col gap-3">
          {taskDetails?.map((activeite, index) => {
            return (
              <ActivitieCard
                isConnected={index < activeite.length - 1}
                activeite={activeite}
                key={index}
              />
            );
          })}
        </div>
      </section>

      <section>
        <div>
          <h2 className="capitalize py-2">add activity</h2>
        </div>

        <section className="w-2/3 my-2 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {act_type?.map((act, index) => {
              return (
                <div key={index} className="flex flex-row gap-1">
                  <input
                    type="checkbox"
                    name={act}
                    id={act}
                    checked={selected === act ? true : false}
                    onChange={(e) => setSelected(act)}
                  />

                  <div>{act}</div>
                </div>
              );
            })}
          </div>

          <textarea
            value={text}
            placeholder="Type..."
            onChange={(e) => setText(e.target.value)}
            className="border border-gray-300 rounded-md focus:border-blue-500 transition-all duration-150 outline-none p-2"
            cols="30"
            rows="8"
          ></textarea>

          {loading ? (
            <Loading />
          ) : (
            <Button
              className={
                "bg-blue-700 w-[50%] text-white rounded-md py-2 px-2 capitalize hover:bg-blue-800 transition-all duration-150"
              }
              icon={""}
              label={"add activity"}
              type={"submit"}
              onClick={() => handleSubmit()}
            />
          )}
        </section>
      </section>
    </section>
  );
};

export default ActivitiesAndTimeLine;
