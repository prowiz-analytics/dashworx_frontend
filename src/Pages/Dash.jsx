import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SVG from "react-inlinesvg";

function Dash() {
  const location = useLocation();
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleEsc = (event) => {
      setIsEnlarged(false);
      setIsEnlarged(false);
      if (event.key === "Escape" && isEnlarged) {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
          // Exit fullscreen mode if currently in fullscreen
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
        // Set isEnlarged to false to hide the enlarged view
        setIsEnlarged(false);
      }
      setIsEnlarged(false);
    };
    window.addEventListener("keydown", handleEsc);
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);
  const { data } = location.state; 
  // const { data } =
  //   "https://lookerstudio.google.com/embed/reporting/4b0d501c-eec1-4414-8abd-12e0419f86d2/page/p_ab655w8zdd";
  // console.log(data);
  const [loading, setLoading] = useState(true);
  const [isEnlarged, setIsEnlarged] = useState(false);
  console.log("the value of is Enlarged is",isEnlarged);
  const [iframe, setIframe] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  // useEffect(() => {
  //   if (isEnlarged) {
      
  //     console.log(document.fullscreenElement);
  //   } else {
  //     console.log("not in")
  //   }
  // }, [isEnlarged]);
  const refreshDashboard = () => {
    setIframe((iframe) => iframe + 1);
  };
  const enlargeDashboard = () => {
    setIsEnlarged(true);
    const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        /* Safari */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        /* IE11 */
        element.msRequestFullscreen();
      }
  };
  const handleMouseEnter = () => {
    setShowButton(true);
  };
  const handleMouseLeave = () => {
    setShowButton(false);
  };
  return (
    <div className="bg-[#ffffff] h-[100vh] w-[100vw]  flex flex-col">
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
      <div className={`${isEnlarged ? "hidden" : "block"}`}>
        <Header
          isNavigatable={true}
          isHomeNav={false}
          enlargeDashboard={enlargeDashboard}
          refreshDashboard={refreshDashboard}
          refreshBtn={true}
        />
      </div>

      {/* <button onClick={()=>setIframe(iframe => iframe + 1)}>Refresh</button> */}
      <div
        className={`flex-auto bg-[#b1b1b1]  px-2 ${
          isEnlarged ? "mb-0" : "mb-12"
        }`}
      >
        <div className="w-full h-full overflow-auto scroll-smooth mb-4 relative">
          <iframe
            key={iframe}
            src={data}
            className="w-full h-full"
            frameborder="0"
          ></iframe>
        </div>
        {isEnlarged && (
          <div
            className="absolute bottom-0 left-0 flex justify-end items-center w-[40vw] h-[50vh] bg-black z-[1000]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {showButton && (
              <button
                className="w-[230px] 2xl:w-[250px] mt-[15vw] mr-[40%] opacity-80 hover:opacity-100 px-4 rounded-lg py-3 bg-[#274156] flex gap-2 flex-row justify-end items-center text-[#ffffff]"
                onClick={() => setIsEnlarged(false)}
              >
                <p className="">(esc)</p>
                <div className="flex flex-row justify-center items-center gap-2">
                  <p className="text-lg">Exit</p>
                  <SVG
                    src={"/exitfullscreen.svg"}
                    alt=""
                    style={{ width: "1.5rem", height: "1.5rem" }}
                  />
                </div>
              </button>
            )}
          </div>
        )}
        <div className={`${isEnlarged ? "hidden" : "block"}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Dash;
