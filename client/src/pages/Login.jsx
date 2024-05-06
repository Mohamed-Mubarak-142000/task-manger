import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import HeaderLogin from "../components/HeaderLogin";
import Texbox from "../components/Texbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/apis/authApisSlice";
import Loading from "../components/Loading";
import { setCredentials } from "../redux/slices/authSlice";
import { toast } from "sonner";

const Login = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/");
      toast.success("Login Successfull.!");
      console.log("result:", result);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <section className="relative w-full flex flex-wrap lg:h-screen  ">
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="image-login"
          src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 bg-white">
        <HeaderLogin />

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4 shadow-2xl p-2 rounded-lg"
        >
          <h1 className="text-center text-[30px] capitalize bg-gradient-to-r from-gray-700 via-blue-600 to-purple-800 bg-clip-text font-extrabold text-transparent">
            welcome back.!
          </h1>
          <h5 className="text-gray-500 text-center ">
            keep all your credential information.
          </h5>

          <Texbox
            placeholder="example@example.com"
            type="email"
            name="email"
            label="Email Address"
            register={register("email", {
              required: "Email Address is required.!",
            })}
            error={errors.email ? errors.email.message : ""}
          />

          <Texbox
            placeholder="Enter Password"
            type="password"
            name="password"
            label="password"
            register={register("password", {
              required: "Password is required.!",
            })}
            error={errors.password ? errors.password.message : ""}
          />

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">Forget password?</span>
            </div>

            <Button
              label="Sign in"
              type="submit"
              className={
                "inline-block rounded-lg bg-blue-500 px-10 py-2 text-md font-medium text-white"
              }
            />
          </div>
          <p className="text-sm text-gray-500 text-center">
            No account?
            <a className="underline" href="#">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
