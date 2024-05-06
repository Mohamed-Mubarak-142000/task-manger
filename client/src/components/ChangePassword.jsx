import React from "react";
import { useForm } from "react-hook-form";
import { useChangePassworduserMutation } from "../redux/apis/userApisSlice";
import { toast } from "sonner";
import ModelWrapper from "./ModelWrapper";
import { Dialog } from "@headlessui/react";
import Texbox from "./Texbox";
import Button from "./Button";
import Loading from "./Loading";

const ChangePassword = ({ openPassword, setOpenPassword }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changePassword, { isLoading }] = useChangePassworduserMutation();

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Password dosen't match.!");
      return;
    }

    try {
      const response = await changePassword(data).unwrap();
      toast.success("Password Updated Successfully.!");
      setOpenPassword(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong.!");
    }
  };
  return (
    <ModelWrapper open={openPassword} setOpen={setOpenPassword}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title
          className={"text-lg font-bold leading-6 text-gray-900 mb-4"}
        >
          Change Password
        </Dialog.Title>

        <div className="my-4 flex flex-col gap-6 w-[320px]">
          <Texbox
            placeholder="New Password"
            type="password"
            name="password"
            label="New Password"
            className="w-full rounded"
            register={register("password", {
              required: "New password is required.!",
            })}
            error={errors.password ? errors.password.message : ""}
          />

          <Texbox
            placeholder="Confirm New Password"
            type="password"
            name="cpass"
            label="Confirm New Password"
            className="w-full rounded"
            register={register("cpass", {
              required: "Confirm New password is required.!",
            })}
            error={errors.cpass ? errors.cpass.message : ""}
          />
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div className=" flex items-center justify-center gap-2">
            <Button
              type={"submit"}
              className={
                "bg-blue-600 px-10 text-md py-3 text-white hover:bg-blue-700 "
              }
              label={"Save"}
            />

            <button
              type="button"
              className={
                "bg-white px-10 text-md py-3 text-gray-900 hover:bg-slate-100 "
              }
              onClick={() => setOpenPassword(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </ModelWrapper>
  );
};

export default ChangePassword;
