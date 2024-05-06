import React from "react";

const Card = ({ label, count, icon, bg }) => {
  return (
    <article className="rounded-lg flex justify-between items-center  bg-white p-4 shadow-md transition hover:shadow-xl sm:p-6">
      <div>
        <h3 className="mt-0.5 text-lg font-medium text-gray-900 capitalize">
          {label}
        </h3>
        <h4 className="border h-8 w-8 rounded-full flex items-center justify-center border-blue-600 ">
          {count}
        </h4>
        <h6 className="text-gray-500">{"110 last month"}</h6>
      </div>

      <span className={`inline-block rounded bg- p-2 text-white ${bg}`}>
        {icon}
      </span>
    </article>
  );
};

export default Card;
