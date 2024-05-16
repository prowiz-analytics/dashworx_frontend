import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Dash() {
  const location = useLocation();
  const { data } = location.state;
  console.log(data);
  const [loading, setLoading] = useState(true);
  const [iframe,setIframe]=useState(0);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const refreshDashboard=()=>{
    setIframe(iframe => iframe + 1)
  }
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
      <Header isNavigatable={true} isHomeNav={false} refreshDashboard={refreshDashboard} refreshBtn={true}/>
      {/* <button onClick={()=>setIframe(iframe => iframe + 1)}>Refresh</button> */}
      <div className="flex-auto bg-[#b1b1b1] mb-12 px-2">
        <div className="w-full h-full  overflow-auto scroll-smooth mb-1">
          <iframe key={iframe} src={data} className="w-full h-full" frameborder="0"></iframe>
        </div>
        <Footer />
      </div>
      
    </div>
  );
}

export default Dash;
