import React from "react";

const HeaderLogin = () => {
  return (
    <div className="mx-auto max-w-lg text-center">
      <h1 className=" capitalize font-bold sm:text-3xl relative">
        <span className="bg-gradient-to-r from-gray-700 via-blue-600 to-purple-800 bg-clip-text text-2xl font-extrabold text-transparent sm:text-5xl md:text-4xl animate-pulse ">
          cloud-Based task manager
        </span>
      </h1>

      <h2 className="mt-4 text-[22px] capitalize text-gray-500">
        manage all your task in one place.!{" "}
      </h2>
    </div>
  );
};

export default HeaderLogin;
