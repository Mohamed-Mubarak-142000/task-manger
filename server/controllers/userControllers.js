import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";
import { createJWT } from "../utils/db.js";

export const updateUserProfile = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { _id } = req.body;

    const id =
      isAdmin && userId === _id
        ? userId
        : isAdmin && userId !== _id
        ? _id
        : userId;

    const user = await User.findById(id);

    if (user) {
      user.name = req.body.name || user.name;
      user.title = req.body.title || user.title;
      user.role = req.body.role || user.role;

      const updateUser = await user.save();
      user.password = undefined;

      res.status(201).json({
        status: true,
        message: "Profile Updated Successfully",
        user: updateUser,
      });
    } else {
      return res.status(404).json({ status: false, message: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const { userId } = req.user;
    const { isReadType, id } = req.query;
    if (isReadType === "all") {
      await Notification.updateMany(
        {
          team: userId,
          isRead: { $nin: [userId] },
        },
        { $push: { isRead: userId } },
        { new: true }
      );
    } else {
      await Notification.findOneAndUpdate(
        {
          _id: id,
          isRead: { $nin: [userId] },
        },
        { $push: { isRead: userId } },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const changeUserPassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (user) {
      user.password = req.body.password;
      await user.save();
      user.password = undefined;
      res.status(200).json({
        status: true,
        message: "Password Changed Successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const activeUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
      user.isActive = req.body.isActive;
      await user.save();

      res.status(200).json({
        status: true,
        message: `User account has been ${
          user?.isActive ? "activited" : "disabled"
        }`,
      });
    } else {
      console.log(error);
      return res.status(404).json({ status: false, message: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(200).json({
      status: true,
      message: "User deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getTeamListController = async (req, res) => {
  try {
    const users = await User.find().select("name title role email isActive");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getNotificationList = async (req, res) => {
  try {
    const { userId } = req.user;
    const notification = await Notification.findOne({
      team: userId,
      isRead: { $nin: [userId] },
    }).populate("task", "title");

    res.status(200).json(notification);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    if (!userExist?.isActive) {
      return res.status(400).json({
        status: false,
        message:
          "User account has been deactivated , contact the administrator",
      });
    }

    const isMatch = await userExist.matchPassword(password);
    if (userExist && isMatch) {
      createJWT(res, userExist._id);
      userExist.password = undefined;
      res.status(200).json(userExist);
    } else {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
export const logoutController = async (req, res) => {
  try {
    // Clear the 'token' cookie
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set expiry date to the past to delete the cookie
      secure: process.env.NODE_ENV === "production", // Use secure flag in production
      sameSite: "lax", // Set the sameSite policy as needed
    });

    // Send success response to the client
    return res.status(200).json({ status: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    // Return error response
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const registerController = async (req, res) => {
  try {
    const { name, email, role, isAdmin, password, title } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        status: false,
        message: "User Already Exist",
      });
    }

    const newUser = await User.create({
      name,
      password,
      email,
      role,
      isAdmin,
      title,
    });

    if (newUser) {
      isAdmin ? createJWT(res, newUser._id) : null;

      User.password = undefined;

      res.status(201).json(newUser);
    } else {
      return res.status(400).json({
        status: false,
        message: "Invalid user Data",
      });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
