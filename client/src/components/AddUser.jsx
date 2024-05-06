import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ModelWrapper from "./ModelWrapper";
import Texbox from "./Texbox";
import Button from "./Button";
import { Dialog } from "@headlessui/react";
import { useRegisterMutation } from "../redux/apis/authApisSlice";
import Loading from "./Loading";
import { toast } from "sonner";
import {
  useGetTeamListQuery,
  useUpdateUserMutation,
} from "../redux/apis/userApisSlice";
import { setCredentials } from "../redux/slices/authSlice";
const AddUser = ({ userData, open, setOpen }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);
  const [isLoad, setIsLoad] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser] = useUpdateUserMutation();
  const { refetch } = useGetTeamListQuery();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  //ADD USER
  const submitHandler = async (data) => {
    try {
      if (userData) {
        const result = await updateUser(data).unwrap();
        toast.success(result?.message);
        refetch();
        if (userData._id === user._id) {
          dispatch(setCredentials({ ...result?.user }));
        }
        setOpen(false);
        reset();
      } else {
        await addNewUser({
          ...data,
          password: data.email,
        }).unwrap();
        refetch();
        toast.success("New User Added Successfully.!");
        setOpen(false);
        reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong.!");
    }
  };

  return (
    <ModelWrapper open={open} setOpen={setOpen} className="my-2">
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          {userData ? "UPDATE User" : "ADD User"}
        </Dialog.Title>

        <div className=" flex flex-col gap-5 mt-5 ">
          <div className="w-[350px]">
            <Texbox
              placeholder="full name"
              type="text"
              name="name"
              label="User Name"
              className={"w-full rounded"}
              register={register("name", { required: "Full Name is required" })}
              error={errors.name ? errors.name.message : ""}
            />
          </div>
          <div className="w-[350px]">
            <Texbox
              placeholder="title "
              type="text"
              name="title"
              label="User Title"
              className={"w-full rounded"}
              register={register("title", {
                required: "title is required",
              })}
              error={errors.title ? errors.title.message : ""}
            />
          </div>
          <div className="w-[350px]">
            <Texbox
              placeholder="email address"
              type="email"
              name="email"
              label="Email Address"
              className={"w-full rounded"}
              register={register("email", {
                required: "Email Address is required",
              })}
              error={errors.email ? errors.email.message : ""}
            />
          </div>

          <div className="w-[350px]">
            <Texbox
              placeholder="User Role "
              type="text"
              name="role"
              label="User Role"
              className={"w-full rounded"}
              register={register("role", {
                required: "user role is required",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>
        </div>

        {isLoad || isUpdating ? (
          <span className="text-gray-500 text-sm my-5 px-2">
            waiting loading...
          </span>
        ) : (
          <div className=" my-5 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2">
            <Button
              isDisabled={isLoad || isUpdating ? true : false}
              className={`bg-blue-700 text-white py-2 capitalize hover:bg-blue-800 transition-all duration-150 ${
                isLoad || isUpdating ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              icon={""}
              type={"submit"}
              label={"add task"}
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
        )}
      </form>
      {isLoading && <Loading />}
    </ModelWrapper>
  );
};

export default AddUser;
