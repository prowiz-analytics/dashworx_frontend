import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import App, { API } from "../App";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [emailField, setEmailField] = useState(true);
  const notify = (data) => toast.error(data);
  const successNotify = (data) => toast.success(data);
  const [successPage, setSuccessPage] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm();
  console.log({ register });
  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   try {
  //     const changePassword = await axios.post(`${API}/auth/resetpassword`, {
  //       email: data.email,
  //       password: data.password,
  //     });
  //     setLoading(false);
  //     console.log(changePassword);
  //     successNotify("password changed Successfully");
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 3000);
  //     console.log(data);
  //   } catch (err) {
  //     setLoading(false);
  //     notify("Something Went Wrong !")
  //   }
  // };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const changePassword = await axios.get(
        `${API}/auth/resetpassword/mail?email=${data.email}`
      );
      setLoading(false);
      console.log(changePassword);
      // successNotify("Email");
      setSuccessPage(true);
      console.log(data);
    } catch (err) {
      setLoading(false);
      notify(err.response.data.detail);
    }
  };

  console.log(watch("example"));
  return (
    <div className="w-[100vw] h-[100vh] bg-[#D9D9D9] flex flex-col justify-around items-center">
      {loading && (
        <Spin
          className="spinning_indicator"
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 24,
              }}
              spin
            />
          }
        />
      )}
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="w-[400px] rounded-md">
          <img src={'/logo.svg'} alt="" />
        </div>
        {!successPage && (
          <div className="rounded-[10px] bg-[#ffffff] h-[40vh] w-[40vw] flex flex-col px-4 py-4">
            <p className="text-3xl">Password Reset</p>
            <p className="text-xl">
              We will send you an email to reset your password
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col h-full justify-around"
            >
              {emailField && (
                <div className="flex flex-col">
                  <label htmlFor="">Email Address</label>
                  <input
                    placeholder="Email"
                    type="email"
                    {...register("email", { required: true })}
                    className={`${
                      errors.username
                        ? "error_outline focus:border-[red]"
                        : "focus:border-[black] no_outline"
                    } focus:outline-none px-4 py-4 rounded-md`}
                  />
                  {errors.username && (
                    <span className="text-[#DD0F0F]">
                      This field is required
                    </span>
                  )}
                </div>
              )}

              {/* {!emailField && (
                <div className="flex flex-col">
                  <label htmlFor="">New Password</label>
                  <input
                    placeholder="Password"
                    type="password"
                    {...register("password", { required: true })}
                    className={`${
                      errors.password
                        ? "error_outline focus:border-[red]"
                        : "focus:border-[black] no_outline"
                    } focus:outline-none px-4 py-4 rounded-md`}
                  />
                  {errors.password && (
                    <span className="text-[#DD0F0F]">
                      This field is required
                    </span>
                  )}
                </div>
              )} */}

              {emailField && (
                <input
                  type="submit"
                  value="Reset Password"
                  className="w-[100%] items-center p-4 bg-primaryColor text-[#ffffff] font-bold rounded-md cursor-pointer"
                />
              )}
              {emailField && (
                <div className="flex justify-center items-center">
                  <Link to={"/login"} className="underline">
                    Back to Login
                  </Link>
                </div>
              )}
              {/* {!emailField && (
                <>
                  <input
                    type="submit"
                    value="Reset Password"
                    className="w-[100%] items-center p-4 bg-[#1C6E8C] text-[#ffffff] font-bold rounded-md cursor-pointer"
                  />
                  <input
                    type="button"
                    value="Back to Login"
                    className="w-[100%] items-center p-4 bg-[#1C6E8C] text-[#ffffff] font-bold rounded-md mt-4 cursor-pointer"
                    onClick={() => navigate("/login")}
                  />
                </>
              )} */}
            </form>
          </div>
        )}
        {/* {successPage && (
          <div className="rounded-[10px] bg-[#ffffff] h-[40vh] w-[40vw] flex flex-col px-4 py-4 gap-4">
            <p className="text-3xl">Type New Password</p>
            <p className="text-xl">
              Enter your new password
            </p>
            <form
              onSubmit={handleSubmit(onSubmit())}
              className="flex flex-col h-full justify-around"
            >
              <div className="flex flex-col">
                <label htmlFor="">Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  {...register("password", { required: true })}
                  className={`${
                    errors.password
                      ? "error_outline focus:border-[red]"
                      : "focus:border-[black] no_outline"
                  } focus:outline-none px-4 py-4 rounded-md`}
                />
                {errors.password && (
                  <span className="text-[#DD0F0F]">This field is required</span>
                )}
              </div>
              <input
                type="submit"
                value="Reset Password"
                className="w-[100%] items-center p-4 bg-[#1C6E8C] text-[#ffffff] font-bold rounded-md cursor-pointer"
              />
              <input
                type="button"
                value="Back to Login"
                className="w-[100%] items-center p-4 bg-[#1C6E8C] text-[#ffffff] font-bold rounded-md mt-4 cursor-pointer"
                onClick={()=>navigate('/login')}
              />
              
            </form>
          </div>
        )} */}
        {successPage && (
          <div className="rounded-[10px] bg-[#ffffff] h-[30vh] w-[40vw] flex flex-col px-4 py-4 gap-4">
            <p className="text-3xl">Check your Inbox</p>
            <p className="text-xl">
              We sent you an email to reset your password
            </p>
            <form
              // onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col h-full justify-around"
            >
              <input
                type="submit"
                value="Back to Login"
                className="w-[100%] items-center p-4 bg-primaryColor text-[#ffffff] font-bold rounded-md mt-4 cursor-pointer"
                onClick={() => navigate("/login")}
              />
            </form>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full justify-center items-center gap-2">
        <div className="w-[90%] h-[2px] bg-[#000000]"></div>
        <p className="flex flex-row justify-start w-[90%] py-2 quicksand-font ">
                <span className="font-[600] text-[#28262C] mr-1">Data Hub </span>|
                <span className="ml-1 mr-1">{`${"Powered by dashworx"}`}</span>
              </p>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ResetPassword;
