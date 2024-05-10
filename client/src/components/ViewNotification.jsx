import React from "react";
import ModelWrapper from "./ModelWrapper";
import { Dialog } from "@headlessui/react";

const ViewNotification = ({ open, setOpen, el, refetch }) => {
  const HandlerOK = () => {
    setOpen(false);
    refetch();
  };
  return (
    <ModelWrapper open={open} setOpen={setOpen}>
      <div className="py-4 max-w-md flex flex-col gap-4 items-center justify-center">
        <Dialog.Title as="h3" className="font-semibold text-lg capitalize">
          {el?.task?.title}
        </Dialog.Title>

        <p className=" text-gray-500 text-center">{el?.text}</p>

        <button
          type={"button"}
          className={
            "px-8 mt-3 text-lg w-10 h-10  font-semibold text-white rounded-sm sm:w-auto bg-blue-500 hover:bg-blue-700 transition duration-100 "
          }
          onClick={HandlerOK}
          label={"OK"}
        >
          ok
        </button>
      </div>
    </ModelWrapper>
  );
};

export default ViewNotification;
