import React from "react";
import Lottie from "lottie-react";
import loadingAnimate from "../assets/loading.json";
const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-[#656565dd] flex items-center justify-center">
      <Lottie animationData={loadingAnimate} width={50} height={50} />
    </div>
  );
};

export default Loading;
