import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import App, { API } from "../App";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function ResetGauthNotify() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const notify = (data) => toast.error(data);
  const [successPage, setSuccessPage] = useState(false);

  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   try {
  //     const changePassword = await axios.post(`${API}/auth/ResetGauthNotify`, {
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
      <div className="flex flex-col gap-4 h-[55vh] mb-[15vh] justify-center items-center">
        <div className=" rounded-md flex flex-row justify-center items-center">
          <img
            src={"/logo.svg"}
            alt=""
            className="sm:w-[20vw] md:w-[18vw] lg:w-[18vw] xl:w-[24vw] max-h-600:h-[10vh] h-[10vh]"
          />
        </div>
        {true && (
          <div className="rounded-[10px] bg-[#ffffff] max-h-600:h-[auto] h-[auto] w-[35vw] sm:w-[27vw] md:w-[35vw] 2xl:w-[32vw] graphik-font flex flex-col gap-4 max-h-600:py-4 2xl:px-12  px-8 py-8">
            <div className="flex flex-col gap-2">
              <p className="text-3xl ">Check your Inbox</p>
              <p className="text-[1.1rem] quicksand-font">
                We have sent you an email to reset your 2FA
              </p>
            </div>
            <form
              // onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col h-full justify-around"
            >
              <input
                type="submit"
                value="Return to Login"
                className="w-[100%] items-center quicksand-font p-4 bg-[#274156] text-[#ffffff] font-bold rounded-md mt-4 cursor-pointer"
                onClick={() => navigate("/login")}
              />
            </form>
          </div>
        )}
      </div>
      <div className="flex flex-col fixed bottom-[5vh] w-full justify-center items-center gap-2">
        <div className="w-[90%] h-[2px] bg-[#000000]"></div>
        <p className="py-2 max-h-600:text-[0.75rem] text-[1rem] quicksand-font flex flex-row justify-start  w-[90%]">
          <span className="font-[600] text-[#28262C] mr-1">Data Hub </span>|
          <span className="ml-1 mr-1">{`${"Powered by dashworx"}`}</span>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ResetGauthNotify;
