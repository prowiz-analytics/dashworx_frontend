import { QRCode } from "antd";
import React, { useEffect, useRef, useState } from "react";
import LockIcon from "../Assets/lock.svg";
import Header from "../Components/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "../Assets/dashboards.svg";
import InsightsIcon from "../Assets/insights.svg";
import ChatIcon from "../Assets/Contact.svg";
import SettingsIcon from "../Assets/settings.svg";
import axios from "axios";
import { API } from "../App";
import { toast, ToastContainer } from "react-toastify";

function Settings({}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("data"));
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };
    const getData = async () => {
      const res = await axios.get(`${API}/settings`, { headers: headers });
      console.log({ ...user, ...res.data });
      setData({ ...user, ...res.data });
    };
    getData();
  }, []);
  const [otpValue, setOtpValue] = useState("");
  const [invalidOtp, setInvalidOtp] = useState(false);
  const otpRef= useRef();
  const errorOtp = "Incorrect Code";
  //   console.log(otpRef?.current?.value);
  const setup_2fa = async () => {
    try {
      let formData = {
        gauth_code: data?.gauth.unique_code,
        otp: otpValue,
      };
      let user = JSON.parse(localStorage.getItem("data"));
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      const res = await axios.post(`${API}/settings/setup-gauth`, formData, {
        headers: headers,
      });
      console.log(res);
      if (res.status === 200) {
        navigate("/home");
      }
    } catch (err) {
      if (err?.response?.data?.detail === "Invalid OTP") {
        setOtpValue("");
        setInvalidOtp(true);
        toast.error(err?.response?.data?.detail)
        otpRef.current.blur();
        console.log("first");
      }
      // toast.error(err?.response?.data?.detail)
      // console.log(err?.response?.data?.detail)
    }
  };
  return (
    <div className="flex flex-col">
      <div className="fixed top-0 h-[10vh] w-full">
        <Header isHomeNav={true} refreshBtn={false} />
      </div>
      <div className="flex flex-col justify-between items-center sidenav top-[10vh] h-[90vh] md:w-[22vw] lg:w-[22vw] xl:w-[22vw] fixed left-0 bg-[#f1f1f1]">
        <div className="flex flex-col justify-between items-center h-[25%] w-[85%] gap-10">
          <div className="flex flex-row justify-start items-center w-[100%] mt-1">
            <div className="flex flex-col justify-start items-start gap-4 w-full  border-t-[1px]">
              {/* <h2 className="font-[600] quicksand-font">Summary</h2> */}
              <div className="flex flex-col justify-start items-start gap-2 w-full graphik-font mt-4">
                <div
                  className={`flex flex-row justify-start w-full items-center gap-4 cursor-pointer rounded-md px-2 py-2 ${
                    location.pathname === "/home" ? "bg-[#ffffff]" : "bg-none"
                  }`}
                  onClick={()=>{if(data.is_2fa_enabled && data?.is_2fa_setup_done){navigate('/home')}}}
                >
                  <img src={DashboardIcon} alt="" className="w-[1vw]" />
                  <p
                    className={`${(data && data.is_2fa_enabled && !data?.is_2fa_setup_done) ?"text-[#8a8a8a]":"text-[#28262C]"} max-h-600:text-[0.75rem] text-[1rem] ${
                      location.pathname === "/home"
                        ? "font-[700]"
                        : "font-[500]"
                    }`}
                  >
                    Dashboards
                  </p>
                </div>
                <div
                  className={`flex flex-row justify-start w-full items-center gap-4 cursor-pointer rounded-md px-2 py-2 ${
                    location.pathname === "/insights"
                      ? "bg-[#ffffff]"
                      : "bg-none"
                  }`}
                >
                  <img src={InsightsIcon} alt="" className="w-[1vw]" />
                  <p className="text-[#8a8a8a] max-h-600:text-[0.75rem] text-[1rem] font-[500]">
                    High Level Insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[95%] gap-4 mb-4">
          <div className="flex flex-row justify-start items-center w-[100%]">
            <div className="flex flex-col gap-4 w-full ml-[10%]">
              <h2 className="font-[600] quicksand-font max-h-600:text-[0.75rem] text-[1rem]">
                Support
              </h2>
              <div className="flex flex-col justify-start items-start gap-4 w-full">
                <div className="flex flex-row justify-center items-center gap-4 cursor-pointer">
                  <img src={ChatIcon} alt="" className="w-[18px] h-[28px]" />
                  <Link
                    target="_blank"
                    to={"https://dashworx.co.uk/book-a-demo/"}
                    className=""
                  >
                    <p className="font-[500] max-h-600:text-[0.75rem] text-[1rem] graphik-font text-[#28262C] hover:border-b-[1px] hover:border-[#000000] border-b-[1px] border-[#f1f1f1]">
                      Contact
                    </p>
                  </Link>
                </div>
                <div className="flex flex-row justify-center items-center gap-4 cursor-pointer">
                  <img src={SettingsIcon} alt="" />
                  <Link to={"/settings"}>
                    <p className="font-[500] max-h-600:text-[0.75rem] text-[1rem] graphik-font text-[#28262C] border-[#000000] border-b-[1px] ">
                      Settings
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[95%] flex flex-row justify-start items-center border-t-[1px] ml-2">
            <p className="py-2 quicksand-font max-h-600:text-[0.75rem] text-[1rem]">
              <span className="font-[600] text-[#28262C]">Data Hub </span>|
              <span className="ml-1 mr-1">{`${"Powered by dashworx"}`}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full"></div>
      <div className="mt-[10vh] overflow-auto flex flex-col ml-[22vw] md:ml-[22vw] lg:ml-[22vw] xl:ml-[22vw] home-section h-[90vh]">
        <div className="p-4 flex flex-col h-full gap-4">
          <div className="border-[2px] rounded-md border-[#000000] p-4">
            <div className="flex flex-row w-full">
              <div className="flex flex-row gap-4 basis-[35%]">
                <img src="favicon.ico" alt="" className="max-h-900:w-[70px] w-[100px]" />
                <div className="flex flex-col justify-center items-start">
                  <p className="graphik-font max-h-900:text-[1.1rem] text-[1.4rem]">Company name:</p>
                  <p className="quicksand-font max-h-900:text-[0.9rem] text-[1.2rem]">
                    {data?.client_name}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 basis-[30%] justify-center items-center">
                <div className="flex flex-col justify-center items-start">
                  <p className="graphik-font max-h-900:text-[1.1rem] text-[1.4rem]">Email address:</p>
                  <p className="quicksand-font max-h-900:text-[0.9rem] text-[1.2rem]">{data?.email}</p>
                </div>
              </div>
              <div className="flex flex-row gap-4 basis-[30%] items-center justify-center">
                <div className="flex flex-col justify-center items-start">
                  <p className="graphik-font max-h-900:text-[1.1rem] text-[1.4rem]">Password reset:</p>
                  <p className="quicksand-font max-h-900:text-[0.9rem] text-[1.2rem] underline" onClick={()=>navigate('/resetpassword')}>
                    Change Password ?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-[2px] flex-1 flex flex-col rounded-md border-[#000000] p-4 gap-4">
            <div className="flex flex-col">
              <p className="graphik-font max-h-900:text-[1.2rem] text-[1.4rem]">
                2 Factor Authentication
              </p>
              {data && data.is_2fa_enabled && !data?.is_2fa_setup_done && (
                <p className="graphik-font text-[1.2rem] text-[#A51E2C]">
                  Required by your admin
                </p>
              )}
            </div>
            <div className="border-[#7B7B7B] border-[1px] rounded-md flex  items-center flex-row p-4">
              <div className="basis-[5%]">
                <img src={LockIcon} alt="" className="max-h-900:w-[40px] w-[50px]"/>
              </div>
              <div className="basis-[90%] flex flex-col gap-1">
                <div className="flex flex-row justify-start items-center gap-4">
                  <p className="graphik-font max-h-900:text-[1.2rem] text-[1.4rem]">
                    Authenticator App
                  </p>

                  {(data && !data?.is_2fa_enabled) && (
                    <span className="px-5 py-1 bg-[#274156] max-h-900:text-[0.75rem]  text-[#ffffff] text-[0.9rem] rounded-[20px]">
                      Not enabled
                    </span>
                  )}
                  {(data && data?.is_2fa_enabled && data?.is_2fa_setup_done) && (
                    <span className="px-5 py-1 bg-[#2F6A41] max-h-900:text-[0.75rem] text-[#ffffff] text-[0.9rem] rounded-[20px]">
                      Activated
                    </span>
                  )}
                  {(data && data.is_2fa_enabled && !data?.is_2fa_setup_done) && (
                    <span className="px-5 py-1 bg-[#A51E2C] max-h-900:text-[0.75rem] text-[#ffffff] text-[0.9rem] rounded-[20px]">
                      Required for data access
                    </span>
                  )}
                </div>
                {(data && !data?.is_2fa_enabled) && (
                  <p className="quicksand-font max-h-900:text-[0.90rem] text-[1rem]">
                    If you would like to enable two-factor authentication (2FA),
                    please contact your administrator.
                  </p>
                )}
                {(data && data?.is_2fa_enabled && data?.is_2fa_setup_done) && (
                  <p className="quicksand-font max-h-900:text-[0.90rem] text-[1rem]">
                    After entering your password, verify your identity using a
                    supported authenticator app, such as Google Authenticator or
                    Duo. To disable two-factor authentication (2FA), please
                    contact your administrator.
                  </p>
                )}
                {(data && data.is_2fa_enabled && !data?.is_2fa_setup_done) && (
                  <p className="quicksand-font max-h-900:text-[0.90rem] text-[1rem]">
                    Your admin has turned on 2FA. Use an authenticator app to
                    generate a code required for logging in.
                  </p>
                )}
              </div>
            </div>

            {!data?.is_2fa_setup_done && data && (
              <>
                <div className="w-full border border-[#7B7B7B] mt-2 h-[1px]"></div>
                <div className="w-full flex flex-row">
                  <div className="basis-[80%]">
                    <p className="graphik-font max-h-900:text-[1.2rem] text-[1.4rem]">
                      1. Scan QR Code
                    </p>
                    <p className="quicksand-font max-h-900:text-[0.90rem] text-[1.2rem]">
                      Use a supported authenticator app like Google
                      Authenticator or Duo to scan the QR code. Once scanned,
                      you'll receive a six-digit code to enter below.
                    </p>
                  </div>
                  <div className="flex flex-row justify-center basis-[20%] items-center">
                    <div className="max-h-900:w-[150px] w-[200px]">
                      <QRCode
                        // size={256}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={data?.gauth.qr_code}
                        // viewBox={`0 0 50 50`}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full border border-[#7B7B7B] mt-2 h-[1px]"></div>
                <div className="w-full flex flex-col justify-between">
                  <div className="">
                    <p className="graphik-font max-h-900:text-[1.2rem] text-[1.4rem]">
                      2. Enter Code Confirmation
                    </p>
                    <p className="quicksand-font max-h-900:text-[0.90rem] text-[1.2rem]">
                      Enter the six-digit code generated by your authenticator
                      app
                    </p>
                    <input
                      ref={otpRef}
                      onChange={(e) => setOtpValue(e.target.value)}
                      value={invalidOtp?errorOtp:otpValue}
                      onFocus={()=>setInvalidOtp(false)}
                      placeholder={`${
                        invalidOtp ? "Incorrect Code" : "Enter OTP Here"
                      }`}
                      className={`${" border-[2px]"} ${
                        invalidOtp ? "border-[red] text-[red]" : "border-[#000] text-[black]"
                      } max-h-900:text-[0.90rem] text-[1rem] w-[100%] focus:outline-none max-h-900:px-2 max-h-990:py-3 px-3 py-3 rounded-md`}
                    />
                  </div>
                    <div className="w-full border block border-[#7B7B7B] mt-6 h-[1px]"></div>{" "}
                  
                </div>
                <div className="flex flex-row w-full justify-end">
                    <button
                      className={`${
                        otpValue > 0 ? "bg-[#274156]" : "bg-[#7d8c9a]"
                      }  px-0 py-2 w-[120px] text-[#ffffff] max-h-900:text-[0.90rem] text-[1.2rem] font-[500] rounded-[10px]`}
                      onClick={setup_2fa}
                    >
                      Turn on
                    </button>
                  </div>
              </>
            )}

            {/* <div className="flex flex-row justify-end items-end"></div> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Settings;
