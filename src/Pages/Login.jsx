import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { API } from "../App"; 
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
  const notify = (data) => toast.error(data);
  const successNotify = (data) => toast.success(data);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const request = await axios.post(`${API}/auth/login`, {
        email: data.username,
        password: data.password,
      });
      console.log(request.data)
      if (request.status === 200){
        const decoded = jwtDecode(request.data.token);
        console.log(decoded)
        if(decoded.user_type==="admin"){
          navigate("/admin");
        }
        else{
          navigate("/home");
        }
        localStorage.setItem("data", JSON.stringify(request.data))
        successNotify("Logged In Sucecssfully");
        setLoading(false);
      }
    } catch (err) {
      console.log(err.response.data);
      notify(err.response.data.detail);
      setLoading(false);
    }
    // console.log(request);
  };

  console.log(watch("example"));
  return (
    <div className="w-[100vw] h-[100vh] bg-[#D9D9D9] flex flex-col justify-around items-center">
      {loading && <Spin
      className="spinning_indicator"
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />
        }
      />}
      <div className="flex flex-col gap-4 h-[55vh] mb-[15vh] justify-center items-center">
        <div className=" rounded-md flex flex-row justify-center items-center">
          <img src={'/logo.svg'} alt="" className="sm:w-[20vw] md:w-[26vw] lg:w-[26vw] xl:w-[24vw] max-h-600:h-[10vh] h-[15vh]"/>  
        </div>
        <div className="rounded-[10px] bg-[#ffffff] max-h-600:h-[auto] h-[55vh] w-[35vw] sm:w-[27vw] md:w-[32vw] 2xl:w-[30vw] quicksand-font flex flex-col max-h-600:py-4 2xl:px-12  px-4 py-4">
          <p className="max-h-600:text-[1.25rem] mb-[10px] graphik-font text-[2rem] font-[500]">Login</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full max-h-900:gap-2 gap-4 justify-around"
          >
            <div className="flex flex-col">
              <label htmlFor="" className="max-h-600:text-[0.75rem] text-[1rem]">Username</label>
              <input
                placeholder="Username"
                {...register("username", { required: true })}
                className={`${
                  errors.username
                    ? "error_outline focus:border-[red]"
                    : "focus:border-[black] no_outline"
                } max-h-600:text-[0.75rem] text-[1rem] focus:outline-none max-h-900:px-2 max-h-990:py-3 px-3 py-3 rounded-md`}
              />
              {errors.username && (
                <span className="text-[#DD0F0F]">This field is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="max-h-600:text-[0.75rem] text-[1rem]">Password</label>
              <input
                type={isPassVisible ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: true })}
                className={`${
                  errors.password ? "error_outline" : "no_outline"
                } max-h-600:text-[0.75rem] text-[1rem] focus:outline-none max-h-900:px-2 max-h-990:py-3 px-3 py-3 rounded-md`}
              />
              {errors.password && (
                <span className="text-[#DD0F0F]">This field is required</span>
              )}
            </div>
            <input
              type="submit"
              value="Login"
              className="w-[100%] mt-[1vh] max-h-600:text-[0.75rem] text-[1rem] items-center max-h-900:px-2 max-h-900:py-4 px-4 py-4 p-4 bg-primaryColor text-[#ffffff] font-bold rounded-md cursor-pointer"
            />
            <div className="flex justify-end items-end  ">
              <Link to={"/resetpassword"} className="underline">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
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

export default Login;
