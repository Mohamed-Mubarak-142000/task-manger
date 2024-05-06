import React from "react";
import { useForm } from "react-hook-form";
import ModelWrapper from "./ModelWrapper";
import { Dialog } from "@headlessui/react";
import Button from "./Button";
import Texbox from "./Texbox";

const SubTaskModel = ({ open, setOpen }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();
  const submitHandler = () => {};

  return (
    <ModelWrapper open={open} setOpen={setOpen} className="my-2">
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          ADD SUB TASK
        </Dialog.Title>

        <div className=" flex flex-col gap-3 mt-3 ">
          <div className="w-[350px]">
            <Texbox
              placeholder="sub task title"
              type="text"
              name="subtitle"
              label="sub task title"
              className={"w-full rounded"}
              register={register("subtitle", {
                required: "sub task title is required",
              })}
              error={errors.subtitle ? errors.subtitle.message : ""}
            />
          </div>

          <div className="flex flex-col gap-3 my-1 ">
            <Texbox
              placeholder="task date"
              type="date"
              name="date"
              label="task date"
              className={"w-full rounded"}
              register={register("date", { required: "date is required" })}
              error={errors.date ? errors.date.message : ""}
            />

            <Texbox
              placeholder="tag "
              type="tag"
              name="tag"
              label=" tag"
              className={"w-full rounded"}
              register={register("tag", { required: "tag is required" })}
              error={errors.date ? errors.date.message : ""}
            />
          </div>
        </div>

        <div className=" my-2 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2">
          <Button
            className={`bg-blue-700 text-white py-2 capitalize hover:bg-blue-800 transition-all duration-150 `}
            icon={""}
            type={"submit"}
            label={"add sub task"}
          />
          <Button
            className={
              "bg-white py-2 w-full capitalize hover:bg-red-300 transition-all duration-150"
            }
            icon={""}
            onClick={() => setOpen(false)}
            type={"submit"}
            label={"cancel"}
          />
        </div>
      </form>
    </ModelWrapper>
  );
};

export default SubTaskModel;
