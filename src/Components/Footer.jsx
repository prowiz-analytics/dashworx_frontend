import React from "react";

function Footer() {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-2 fixed ml-[1%]  bottom-0 pb-2 bg-[#ffffff]">
      <div className="w-[95%] h-[2px] mr-[5%] bg-[#000000]"></div>
      <p className="quicksand-font flex flex-row justify-start max-h-600:text-[0.75rem] text-[1rem]  w-full">
                <span className="font-[600] text-[#28262C] mr-1">Data Hub </span>|
                <span className="ml-1 mr-1">{`${"Powered by dashworx"}`}</span>
              </p>
    </div>
  );
}

export default Footer;
