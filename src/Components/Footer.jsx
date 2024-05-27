import React from "react";

function Footer() {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-2 fixed bottom-0 pb-2 bg-[#ffffff]">
      <div className="w-[95%] h-[2px] mr-[5%] bg-[#000000]"></div>
      <p className="flex flex-row justify-start  w-[100%]">
        Data Hub | {process.env.REACT_APP_CLIENT} Limited
      </p>
    </div>
  );
}

export default Footer;
