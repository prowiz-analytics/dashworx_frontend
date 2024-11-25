import React, { useState } from "react";
import loginIcon from "../Assets/Login_icon 1.svg";
import DownArrow from "../Assets/downArrow.svg";
import { useNavigate } from "react-router-dom";
// import RestartIcon from '../Assets/restart_alt.svg';
import SVG from "react-inlinesvg";

function Header(props) {
  const [onRefresh, setIsOnRefresh] = useState(false);
  // const handleClick = () => {
  //   setIsRefreshed(!isRefreshed);
  // };
  const { isNavigatable, isHomeNav, refreshDashboard, refreshBtn, enlargeDashboard, isAdminNav ,setIsEnlarged } =
    props;
  console.log(isNavigatable);
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleClick = () => {
    console.log("clicked");
    setIsOnRefresh(true);
    refreshDashboard();
    setRotationAngle((prevAngle) => prevAngle - 1440); // Always subtract 180 degrees for counterclockwise rotation
    setTimeout(() => {
      setIsOnRefresh(false);
    }, 3000);
  };
  return (
    <div
      className={`w-full h-[10vh] flex flex-row justify-between items-center p-4 profile ${
        isHomeNav ? "bg-[#f1f1f1]" : "bg-[#fffffff]"
      }`}
    >
      <div className="basis-[18%] flex flex-row justify-center items-center">
        <img
          src={"/logo.svg"}
          alt=""
          className=" h-14 w-[10vw] rounded-sm cursor-pointer"
          onClick={() => {
            if (isNavigatable) {
              navigate("/home");
            }
          }}
        />
      </div>
      <div className="flex flex-row gap-4">
        {refreshBtn && (
          <div className="flex flex-row justify-center items-center gap-4">
            <button
              className={`flex refresh_btn flex-row border-[2px] ${
                onRefresh
                  ? "disabled_btn"
                  : "bg-white hover:bg-[#274156] hover:text-[#ffffff] hover:fill-[#ffffff] fill-[#274156]"
              }  border-[#274156] px-2 gap-2 py-2 max-h-900:p-1  justify-between items-center rounded-md cursor-pointer`}
              disabled={onRefresh}
              onClick={()=>{setIsEnlarged(true);enlargeDashboard()}}
            >
              <SVG
                src={"/enlarge.svg"}
                alt=""
                className=""
              />
            </button>
            <button
              className={`flex refresh_btn flex-row border-[2px] ${
                onRefresh
                  ? "disabled_btn"
                  : "bg-white hover:bg-[#274156] hover:text-[#ffffff] hover:fill-[#ffffff] fill-[#274156]"
              }  border-[#274156] px-2 py-2 max-h-900:p-1 gap-2 flex justify-between items-center rounded-md cursor-pointer`}
              disabled={onRefresh}
              onClick={handleClick}
            >
              <SVG
                src={"/restart_alt.svg"}
                alt=""
                style={{ transform: `rotate(${rotationAngle}deg)`,width:'15px' ,height:'15px',transformOrigin: '7px 8.5px' }}
              />
            </button>
          </div>
        )}
        <div
          className="sm:w-[10vw] lg:w-[8vw] md:w-[9vw] relative py-1 bg-hoverColor text-[#f1f1f1] flex flex-row gap-1 mr-[0.5vw] rounded-md justify-between items-center px-2 profile"
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          <img src={loginIcon} alt="" className="w-[18px] h-[3vh]" />
          <p className="font-bold quicksand-font text-[1.5vmin]">My Account</p>
          <img src={DownArrow} alt="" className="w-[10px]"/>
        </div>
        {hover && (
        <div
          className={`absolute sm:w-[10vw] max-h-900:border-[0.5px] lg:w-[8vw] md:w-[9vw] quicksand-font bg-[#f1f1f1] h-auto border-[2px] border-[#274156
] mt-[3vh] py-2 px-2  rounded-[10px] no-profile flex flex-col gap-1 font-[600] ${
            isAdminNav ? "right-[48px]" : "right-[1.4vw]"
          }`}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          <p
            className="cursor-pointer text-[1.5vmin]"
            onClick={() => {
              if (isNavigatable) {
                navigate("/home");
              }
            }}
          >
            Home
          </p>
          <p
            className="cursor-pointer text-[1.5vmin]"
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("data");
            }}
          >
            Log Out
          </p>
          <p
            className="cursor-pointer text-[1.5vmin]"
            onClick={() => navigate("/resetpassword")}
          >
            Change Password
          </p>
        </div>
      )}


      </div>
      
    </div>
  );
}

export default Header;
