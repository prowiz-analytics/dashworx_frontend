import React, { useState } from "react";
import loginIcon from "../Assets/Login_icon 1.svg";
import DownArrow from "../Assets/downArrow.svg";
import { useNavigate } from "react-router-dom";
// import RestartIcon from '../Assets/restart_alt.svg';
import SVG from 'react-inlinesvg';

function Header(props) {
  const [onRefresh, setIsOnRefresh] = useState(false);
  // const handleClick = () => {
  //   setIsRefreshed(!isRefreshed);
  // };
  const { isNavigatable , isHomeNav, refreshDashboard, refreshBtn ,isAdminNav } = props;
  console.log(isNavigatable);
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleClick = () => {
        console.log("clicked")
        setIsOnRefresh(true);
        refreshDashboard();
        setRotationAngle(prevAngle => prevAngle - 1680); // Always subtract 180 degrees for counterclockwise rotation
        setTimeout(()=>{
          setIsOnRefresh(false);
        },3000)
  };
  return (
    <div className={`w-full h-20 flex flex-row justify-between items-center p-4 profile ${isHomeNav ? 'bg-[#f1f1f1]':'bg-[#fffffff]'}`}>
      <div className="basis-[18%] flex flex-row justify-center items-center">
        <img
          src={'/logo.svg'}
          alt=""
          className=" h-14 w-[200px] rounded-sm cursor-pointer"
          onClick={() => {
            if (isNavigatable) {
              navigate("/home");
            }
          }}
        />
      </div>
          
      <div className="flex flex-row gap-4">
        {refreshBtn && <button className={`flex refresh_btn flex-row border-[2px] ${onRefresh?'disabled_btn':'bg-white hover:bg-[#274156] hover:text-[#ffffff] hover:fill-[#ffffff] fill-[#274156]'}  border-[#274156] px-2 gap-2 justify-between items-center rounded-md cursor-pointer`} disabled={onRefresh} onClick={handleClick}>
          
          <SVG src={'/restart_alt.svg'} alt="" style={{ transform: `rotate(${rotationAngle}deg)` }}/>
        </button>}
      <div
        className="w-[auto] relative h-8 bg-hoverColor text-[#f1f1f1] flex flex-row gap-2 mr-4 rounded-md justify-between items-center px-2 profile"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <img src={loginIcon} alt="" className="w-6 h-6" />
        <p className="font-bold quicksand-font">My Account</p>
        <img src={DownArrow} alt="" />
      </div>
      </div>
      {hover && (
        <div
          className={`absolute w-[157px] quicksand-font bg-[#f1f1f1] h-auto border-[2px] border-[#274156
]  mt-28 py-2 px-2  rounded-[10px] no-profile flex flex-col gap-1 font-[600] ${isAdminNav ? 'right-[48px]':'right-[33px]'}`}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          <p
            className="cursor-pointer"
            onClick={() => {
              if (isNavigatable) {
                navigate("/home");
              }
            }}
          >
            Home
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("data");
            }}
          >
            Log Out
          </p>
          <p
            className="cursor-pointer"
            onClick={() => navigate("/resetpassword")}
          >
            Change Password
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
