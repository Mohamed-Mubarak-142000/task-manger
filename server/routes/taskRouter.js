import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleWare.js";
import {
  getOneTask,
  getAllTasks,
  createTask,
  duplicateTask,
  postTaskActivity,
  dashboardStatistics,
  createSubTask,
  updateTask,
  trashTask,
  deleteRestoreTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/create-task", protectRoute, isAdminRoute, createTask);
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/get-all-task", protectRoute, getAllTasks);
router.get("/task/:id", protectRoute, getOneTask);

router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);
router.put("/update/:id", protectRoute, isAdminRoute, updateTask);
router.put("/trash/:id", protectRoute, isAdminRoute, trashTask);
router.delete(
  "/delete-restore/:id?",
  protectRoute,
  isAdminRoute,
  deleteRestoreTask
);

export default router;
