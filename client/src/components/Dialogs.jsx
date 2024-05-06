import React from "react";
import ModelWrapper from "./ModelWrapper";
import { Dialog } from "@headlessui/react";
import { BsQuestion } from "react-icons/bs";
import Button from "./Button";
import { MdWarning } from "react-icons/md";

export function ConfirmatioDialog({
  open,
  setOpen,
  msg,
  onClick = () => {},
  type = "delete",
  setMsg = () => {},
  setType = () => {},
}) {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };

  return (
    <>
      <ModelWrapper open={open} setOpen={closeDialog} className="my-2 ">
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          <div
            className={` flex items-center my-3 justify-center font-semibold ${
              type === "restore" || type === "restoreAll"
                ? "text-yellow-700 bg-yellow-100"
                : "text-red-600 bg-yellow-100 rounded-lg"
            }`}
          >
            <MdWarning size={70} />
          </div>
        </Dialog.Title>

        <div className="text-center capitalize text-gray-500 ">
          {!msg ? "are you sure you went to delete the selected record?" : msg}
        </div>

        <div className=" my-3 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2">
          <Button
            className={` py-2 capitalize transition-all duration-150  ${
              type === "restore" || type === "restoreAll"
                ? "text-yellow-600 bg-yellow-100"
                : "text-white bg-red-500"
            }`}
            icon={""}
            label={type === "restore" ? "Restore" : "Delete"}
            onClick={onClick}
          />
          <Button
            className={
              "bg-white py-2 w-full capitalize hover:shadow-lg rounded transition-all duration-150"
            }
            icon={""}
            onClick={closeDialog}
            type={"button"}
            label={"cancel"}
          />
        </div>
      </ModelWrapper>{" "}
    </>
  );
}

export function UserAction({ open, setOpen, onClick = () => {} }) {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <ModelWrapper open={open} setOpen={closeDialog} className="my-2">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900 my-3"
          >
            <div
              className={`text-red-500 bg-red-50 rounded-lg flex items-center justify-center `}
            >
              <MdWarning size={80} />
            </div>
          </Dialog.Title>

          <div className="text-center text-gray-500 my-5 ">
            are you sure you went to activite or deactivite this account?
          </div>

          <div className=" my-2 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2">
            <Button
              className={`bg-red-700 text-white py-2 capitalize hover:bg-red-800 transition-all duration-150`}
              icon={""}
              type={"button"}
              label={"yes"}
              onClick={onClick}
            />
            <Button
              className={
                "bg-white py-2 w-full capitalize hover:bg-blue-100 transition-all duration-150"
              }
              icon={""}
              onClick={closeDialog}
              type={"button"}
              label={"no"}
            />
          </div>
        </ModelWrapper>{" "}
      </>
    </>
  );
}
