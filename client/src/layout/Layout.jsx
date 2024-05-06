import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <main className="w-full h-screen flex flex-col  md:flex-row bg-[#f4f4f4]">
      {user && (
        <div className="max-w-[300px] bg-white h-full sticky top-0 shadow-lg rounded-tl-none rounded-tr-lg hidden md:flex ">
          <Sidebar />
        </div>
      )}
      <MobileSidebar />

      <div className="flex-1 overflow-y-auto">
        {user && (
          <div className="w-full bg-white sticky top-0 z-50 shadow-lg">
            <Navbar />
          </div>
        )}
        <div className="p-4">
          {children}
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;
