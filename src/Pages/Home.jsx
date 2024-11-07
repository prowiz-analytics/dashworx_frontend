import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import DashboardIcon from "../Assets/dashboards.svg";
import InsightsIcon from "../Assets/insights.svg";
import ChatIcon from "../Assets/Contact.svg";
import UpgradeIcon from "../Assets/upgrade.svg";
import { Skeleton } from "antd";
import KPI from "../Assets/kpi.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../App";
import SVG from 'react-inlinesvg';

function Home() {
  const location = useLocation();
  console.log(location.pathname);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const { data } = location.state;
  // console.log(data);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        // Check if location.state is null after fetching data
        // console.log(localStorage.getItem("data"));
        if (localStorage.getItem("data") === null) {
          navigate("/login");
        } else {
          let user = JSON.parse(localStorage.getItem("data"));
          const data = await axios.get(
            `${API}/auth/dashboards?email=${user.email}`
          );
          console.log(data);
          setLoading(false);
          setData(data.data);
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);

        // Handle error and redirect to login
        navigate("/login");
      }
    };

    getData();
  }, [location.state, navigate]);
  return (
    <div className="flex flex-col">
      <Header isHomeNav={true} refreshBtn={false}/>
      <div className="flex flex-row">
        <div className="flex flex-col justify-between items-center sidenav basis-[20%] bg-[#f1f1f1] ">
          <div className="flex flex-col justify-between items-center h-[25%] w-[85%] gap-10">
            {/* <div className="border-b-[1px] w-[90%]">
              <p className="text-xl font-[500] text-center graphik-font text-[#28262C]">
                Current Plan : {"Premium"}
              </p>
            </div> */}
            <div className="flex flex-row justify-start items-center w-[100%] mt-1">
              <div className="flex flex-col justify-start items-start gap-4 w-full  border-t-[1px]">
                {/* <h2 className="font-[600] quicksand-font">Summary</h2> */}
                <div className="flex flex-col justify-start items-start gap-2 w-full graphik-font mt-4">
                  <div
                    className={`flex flex-row justify-start w-full items-center gap-4 cursor-pointer rounded-md px-2 py-2 ${
                      location.pathname === "/home" ? "bg-[#ffffff]" : "bg-none"
                    }`}
                  >
                    <img src={DashboardIcon} alt="" />
                    <p
                      className={` text-[#28262C] ${
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
                    <img src={InsightsIcon} alt="" />
                    <p className="text-[#8a8a8a] font-[500]">
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
                <h2 className="font-[600] quicksand-font">Support</h2>
                <div className="flex flex-col justify-start items-start gap-4 w-full">
                  <div className="flex flex-row justify-center items-center gap-4 cursor-pointer">
                    <img src={ChatIcon} alt="" className="w-[18px] h-[28px] font-[800 ]" />
                    <Link
                      target="_blank"
                      to={"https://dashworx.co.uk/book-a-demo/"}
                      className=""
                    >
                      <p className="font-[500] graphik-font text-[#28262C] hover:border-b-[1px] hover:border-[#000000] border-b-[1px] border-[#f1f1f1]">
                        Contact
                      </p>
                    </Link>
                  </div>
                  {/* <div className="flex flex-row justify-center items-center gap-4 cursor-pointer">
                    
                    <img src={UpgradeIcon} alt="" />
                    <Link target="_blank" to={"https://billing.stripe.com/p/login/cN25ohbPQ3Z44x2000"} >
                    <p className="font-[500] graphik-font text-[#28262C] hover:border-b-[1px] hover:border-[#000000] border-b-[1px] border-[#f1f1f1]">Upgrade Plan</p>
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="w-[95%] flex flex-row justify-start items-center border-t-[1px] ml-2">
              <p className="py-2 quicksand-font ">
                <span className="font-[600] text-[#28262C]">Data Hub </span>|
                <span className="ml-1 mr-1">{`${"Powered by dashworx"}`}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="basis-[80%] overflow-auto flex flex-col home-section">
          <div className="p-4">
            <p className="text-[4vmin] ml-8 font-[600] text-[#000000] flex flex-row">
              Welcome 
              <Skeleton
                title={false}
                loading={loading}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "1rem",
                  width: "10rem",
                }}
                paragraph={{
                  rows: 2,
                }}
              >
                {" "+data?.firstName}
              </Skeleton>
            </p>
          </div>
          <div className="flex flex-col p-4 gap-4 min-h-[70vh] justify-start items-center">
            <div className="grid grid-cols-2 w-full justify-start items-center gap-10">
              {loading &&
                [1, 2, 3, 4].map((item, index) => {
                  return (
                    <Skeleton
                      loading={loading}
                      paragraph={{
                        rows: 4,
                      }}
                    >
                      <div
                        className="w-[80%] h-[30vh] bg-[#1C6E8C] hover:bg-hoverColor cursor-pointer flex flex-col justify-center items-center gap-8 rounded-[10px] text-[#ffffff]"
                        onClick={() => {
                          navigate(`/dashboard`, {
                            state: { data: item.link },
                          });
                        }}
                      >
                        <img src={'/Dashboard_icons/Chart_Icon.svg'} alt="" className="w-20 h-20" />
                        <p className="">{`${item.name}`}</p>
                      </div>
                    </Skeleton>
                  );
                })}
              {!loading &&
                data?.dashboards?.length > 0 &&
                data?.dashboards?.map((item, index) => {
                  return (
                    <div className="w-[100%] flex flex-row justify-center items-center">
                      <div
                        className="w-[90%] h-[auto] bg-[#F1F1F1] cursor-pointer hover:bg-[#274156] hover:text-[#ffffff] group hover:fill-[#ffffff] fill-[#274156] flex flex-row justify-between px-10 items-center gap-8 rounded-[10px] text-[#28262C] border-[3px] border-[#274156]"
                        onClick={() => {
                          navigate(`/dashboard`, {
                            state: { data: JSON.parse(item.link) },
                          });
                        }}
                      >
                        <p className="font-[900] text-lg uppercase">{`${item.name}`}</p>
                        {/* <img src={'/Dashboard_icons/Chart_Icon.svg'} alt="" className="w-20 h-20 "/> */}
                        <SVG src={`/Dashboard_icons/${item.image}.svg`} className="w-10 h-20"/>
                      </div>
                    </div>
                  );
                })}
              {!loading && data?.dashboards?.length === 0 && (
                <>
                  <div className="w-[90vw] h-[30vh] flex flex-col justify-center items-center gap-8 rounded-[10px] text-[#000000]">
                    Sorry No Dashboards Available For User !!
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;