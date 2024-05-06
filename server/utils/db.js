import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connection established.!");
  } catch (error) {
    console.log("BD Error : ", error);
  }
};

export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRRT, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict", //prevent CSRF attacks
    maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
  });
};
