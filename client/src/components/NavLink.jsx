import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ data }) => {
  const locate = useLocation();

  const path = locate.pathname.split("/")[1];
  console.log("path", path);
  return (
    <Link
      className={`w-full lg-3/4 flex items-center gap-2 p-2 text-[16px] rounded-lg text-gray-800 hover:bg-[#2564ed2d] ${
        path === data.link.split("/")[1]
          ? "bg-blue-700 text-white hover:bg-blue-700"
          : ""
      }`}
      to={data.link}
    >
      <span>{data.icons}</span>
      <span>{data.name}</span>
    </Link>
  );
};

export default NavLink;
