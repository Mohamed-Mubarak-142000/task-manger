import React, { useState, useEffect } from "react";
import ModelWrapper from "./ModelWrapper";
import { Dialog } from "@headlessui/react";
import Texbox from "./Texbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelecteList from "./SelecteList";
import Button from "./Button";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../redux/apis/taskApiSlice";
import { toast } from "sonner";
import { dateFormatter } from "../utils/getTimeDetails";

const AddTaskModel = ({ open, setOpen, task, refetch }) => {
  const LISTSTAGE = ["TODO", "IN PROGRESS", "COMPLETED"];
  const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

  const TaskType = {
    completed: "bg-blue-600",
    todo: "bg-yellow-600",
    "in progress": "bg-green-500",
  };

  const TypePriority = {
    high: "bg-blue-500",
    medium: "bg-green-500",
    normal: "bg-yellow-500",
    low: "bg-red-500",
  };

  const uploadedFileURLS = [];

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    setValue, // استخدم setValue لتحديث قيم المدخلات
  } = useForm();

  const [stage, setStage] = useState(
    task?.stage?.toUpperCase() || LISTSTAGE[0]
  );
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORITY[1]
  );
  const [team, setTeam] = useState(task?.team || []);
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [uploadTask] = useUpdateTaskMutation();
  const URLS = task?.assets ? [...task?.assets] : [];

  // استخدم useEffect لتحديث قيم المدخلات عند فتح النموذج أو تغيير بيانات المهمة
  useEffect(() => {
    if (task) {
      // استخدم setValue لتحديث قيم المدخلات
      setValue("title", task.title || "");
      setValue("date", dateFormatter(task.date) || "");
      setAssets(task.assets || []);
      setStage(task.stage || LISTSTAGE[0]);
      setPriority(task.priority || PRIORITY[1]);
      setTeam(task.team || []);
    } else {
      // إعادة تعيين القيم عند عدم وجود مهمة
      reset();
      setStage(LISTSTAGE[0]);
      setPriority(PRIORITY[1]);
      setTeam([]);
    }
  }, [task, reset, setValue]);

  //Handler Submit
  const submitHandler = async (formData) => {
    for (const file of assets) {
      setUploading(true);
      try {
        await uploadFiles(file);
      } catch (error) {
        console.log("Error uploading file:", error.message);
        return;
      } finally {
        setUploading(false);
      }
    }

    try {
      const newData = {
        ...formData,
        assets: [...URLS, ...uploadedFileURLS],
        team,
        stage,
        priority,
      };

      const res = task?._id
        ? await uploadTask({ ...newData, _id: task?._id }).unwrap()
        : await createTask(newData).unwrap();
      toast.success(res?.message);
      setOpen(false);
      refetch();
      reset();
      setTeam([]);
      setAssets([]);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.message);
    }
  };

  //Handle Images
  const handleSelectImage = (e) => {
    setAssets(e.target.files);
  };

  //UPLOAD IMAGES
  const uploadFiles = async (file) => {
    const storage = getStorage(app);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("Uploading");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => {
              uploadedFileURLS.push(downloadUrl);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  return (
    <ModelWrapper open={open} setOpen={setOpen} className="my-2">
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          {task ? "UPDATE TASK" : "ADD TASK"}
        </Dialog.Title>

        <div className="flex flex-col gap-3 mt-3">
          <div className="w-[350px]">
            <Texbox
              placeholder="task title"
              type="text"
              name="title"
              label="task title"
              className="w-full rounded"
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />
          </div>

          <UserList setTeam={setTeam} team={team} />

          <div className="flex items-center gap-1 my-1">
            <SelecteList
              TaskType={TaskType}
              label="task stage"
              list={LISTSTAGE}
              stage={stage}
              setStage={setStage}
            />

            <SelecteList
              TaskType={TypePriority}
              label="priority level"
              list={PRIORITY}
              stage={priority}
              setStage={setPriority}
            />
          </div>

          <Texbox
            placeholder="task date"
            type="date"
            name="date"
            label="task date"
            className="w-full rounded"
            register={register("date", { required: "date is required" })}
            error={errors.date ? errors.date.message : ""}
          />

          <div className="py-2 flex flex-col gap-1">
            <label
              htmlFor="imageUpload"
              className="capitalize text-sm text-gray-600"
            >
              add assets
            </label>
            <input
              className="bg-white shadow-lg rounded-lg p-2"
              type="file"
              name="imageUpload"
              id="imageUpload"
              accept=".jpg, .png , jpeg"
              multiple={true}
              onChange={handleSelectImage}
            />
          </div>
        </div>

        <div>
          {uploading && (
            <span className="text-sm text-gray-500 capitalize">
              uploading assets
            </span>
          )}
        </div>

        {isLoading || uploading ? (
          <div className="flex items-center w-full bg-blue-500 py-5 justify-center gap-1">
            <div className="bg-gray-300 h-3 w-3 rounded-full animate-pulse delay-75" />
            <div className="bg-gray-300 h-3 w-3 rounded-full animate-pulse delay-100" />
            <div className="bg-gray-300 h-3 w-3 rounded-full animate-pulse delay-150" />
          </div>
        ) : (
          <div className="my-2 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2">
            <Button
              isDisabled={uploading}
              className={`bg-blue-700 text-white py-2 capitalize hover:bg-blue-800 transition-all duration-150 ${
                uploading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              type="submit"
              label={task ? "update task" : "add task"}
            />
            <Button
              className="bg-white py-2 w-full capitalize border border-gray-200 transition-all duration-150"
              onClick={() => setOpen(false)}
              type="button"
              label="cancel"
            />
          </div>
        )}
      </form>
    </ModelWrapper>
  );
};

export default AddTaskModel;
