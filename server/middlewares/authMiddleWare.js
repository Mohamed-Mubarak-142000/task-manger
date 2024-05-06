import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRRT);

      const response = await User.findById(decoded.userId).select(
        "isAdmin email"
      );

      req.user = {
        email: response.email,
        isAdmin: response.isAdmin,
        userId: decoded.userId,
      };

      next();
    } else {
      console.log("Error Auth");
      return res
        .status(401)
        .json({ status: false, message: "Not Authorized , Try Login Again" });
    }
  } catch (error) {
    console.log("Error Auth", error);
    return res
      .status(401)
      .json({ status: false, message: "Not Authorized , Try Login Again" });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not Authorized , Try Login Agin as Admin",
    });
  }
};

export { isAdminRoute, protectRoute };
