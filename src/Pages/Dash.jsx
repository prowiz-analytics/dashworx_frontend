import React, { useCallback, useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SVG from "react-inlinesvg";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { FloatButton } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// function toastComponent(){
//   return(
//     <div className="">

//     </div>
//   )
// }

function Dash() {
  const screen1 = useFullScreenHandle();
  const reportChange = useCallback(
    (state, handle) => {
      if (handle === screen1) {
        console.log("Screen 1 went to", state, handle);
        if (!state) {
          setIsEnlarged(false);
        }
      }
    },
    [screen1]
  );
  const location = useLocation();
  // const [showButton, setShowButton] = useState(true);
  useEffect(() => {
    const handleEsc = (event) => {
      console.log(event.key);
      if (event.key === "Escape") {
        console.log("yes Escape form here ");
        if (
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
        ) {
          // Exit fullscreen mode if currently in fullscreen
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);
  // const { data } = location.state;
  const { data } =
    "https://lookerstudio.google.com/embed/reporting/a8c2cb10-0742-404e-bd22-24fae10c7ab2/page/qlD";
  console.log(data);
  const [loading, setLoading] = useState(true);
  const [isEnlarged, setIsEnlarged] = useState(false);
  console.log("the value of is Enlarged is", isEnlarged);
  const [iframe, setIframe] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const refreshDashboard = () => {
    setIframe((iframe) => iframe + 1);
  };
  const enlargeDashboard = () => {
    const notify = () => toast.info("Click Esc Key To Exit Fullscreen",{position: "bottom-left",theme:"dark",className: "toast-message",style: { // Inline styles
      backgroundColor: '#274156', // Custom background color
      color: 'white', // Custom text color
      borderRadius: '10px',
      padding: '10px',
      border: '1px solid #888',
      fontFamily: 'quicksand',
      fontWeight: '400'
  }});
    notify()
    screen1.enter();
  };

  const exitFullScreen = () => {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    ) {
      // Exit fullscreen mode if currently in fullscreen
      if (document.exitFullscreen) {
        setIsEnlarged(false);
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        setIsEnlarged(false);
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        setIsEnlarged(false);
      }
    }
    // Set isEnlarged to false to hide the enlarged view
    setIsEnlarged(false);
  };

  // const handleMouseEnter = () => {
  //   setShowButton(true);
  // };
  // const handleMouseLeave = () => {
  //   setShowButton(false);
  // };
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
          setIsEnlarged={setIsEnlarged}
          refreshDashboard={refreshDashboard}
          refreshBtn={true}
        />
      </div>

      {/* <button onClick={()=>setIframe(iframe => iframe + 1)}>Refresh</button> */}

      <div
        className={`flex-auto bg-[#b1b1b1] h-full  ${
          isEnlarged ? "mb-0" : "mb-12"
        }`}
      >
        <FullScreen
          handle={screen1}
          onChange={reportChange}
          className="w-full h-full overflow-auto scroll-smooth mb-4 relative"
        >
          <div className="w-full h-full overflow-auto scroll-smooth  relative">
            <iframe
              key={iframe}
              src={
                "https://lookerstudio.google.com/embed/reporting/a8c2cb10-0742-404e-bd22-24fae10c7ab2/page/qlD"
              }
              className="w-full h-full"
              frameborder="0"
            ></iframe>
          </div>
          <ToastContainer />
        </FullScreen>
        <div className={`${isEnlarged ? "hidden" : "block"}`}>
          <Footer />
        </div>
      </div>
      {/* </FullScreen> */}
      
    </div>
  );
}

export default Dash;
