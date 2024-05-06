import express from "express";
import userRouter from "./userRouter.js";
import taskRouter from "./taskRouter.js";

const router = express.Router();

// Use the `use` method to mount the routers at the specified paths
router.use("/user", userRouter);
router.use("/task", taskRouter);

export default router;
