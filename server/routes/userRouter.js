import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleWare.js";
import {
  activeUserProfile,
  changeUserPassword,
  deleteUserProfile,
  getNotificationList,
  getTeamListController,
  loginController,
  logoutController,
  markNotificationRead,
  registerController,
  updateUserProfile,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

router.get("/get-team", protectRoute, isAdminRoute, getTeamListController);
router.get("/get-notification", protectRoute, getNotificationList);

router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-notification", protectRoute, markNotificationRead);
router.put("/change-password", protectRoute, changeUserPassword);

router
  .route("/:id")
  .put(protectRoute, isAdminRoute, activeUserProfile)
  .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;
