import React from "react";
const Texbox = React.forwardRef(
  ({ placeholder, type, name, label, register, error }, ref) => {
    return (
      <div>
        <label
          htmlFor={label}
          className="relative block border rounded-md  border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            {...register}
            type={type}
            id={name}
            className="peer border-none rounded-md py-2 w-full h-full placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            placeholder={placeholder}
            aria-invalid={error ? true : false}
          />

          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white rounded-md p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            {label}
          </span>
        </label>

        {error && <span className="text-xs text-red-500 my-1">{error}</span>}
      </div>
    );
  }
);

export default Texbox;
