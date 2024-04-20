import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import DashboardIcon from "../Assets/dashboards.svg";
import InsightsIcon from "../Assets/insights.svg";
import ChatIcon from "../Assets/chat.svg";
import UpgradeIcon from "../Assets/upgrade.svg";
import { Skeleton } from "antd";
import KPI from "../Assets/kpi.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../App";

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
        console.log(localStorage.getItem("data"));
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
      <Header />
      <div className="flex flex-row">
        <div className="flex flex-col justify-between items-center sidenav basis-[20%] bg-[#f1f1f1] ">
          <div className="flex flex-col justify-between items-center h-[25%] w-[90%] gap-12">
            <div className="border-b-[1px] w-[90%]">
              <p className="text-xl font-[500] text-center graphik-font text-[#28262C]">
                Current Plan : {"Premium"}
              </p>
            </div>
            <div className="flex flex-row justify-start items-center w-[100%]">
              <div className="flex flex-col justify-start items-start gap-4 w-full ml-[10%]">
                <h2 className="font-[600] quicksand-font">Summary</h2>
                <div className="flex flex-col justify-start items-start gap-2 w-full graphik-font">
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
                    <p className="text-[#28262C] font-[500]">
                      High Level Insights
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[90%] gap-4 mb-4">
            <div className="flex flex-row justify-start items-center w-[100%]">
              <div className="flex flex-col gap-4 w-full ml-[10%]">
                <h2 className="font-[600] quicksand-font">Support</h2>
                <div className="flex flex-col justify-start items-start gap-4 w-full">
                  <div className="flex flex-row justify-center items-center gap-4 cursor-pointer">
                    <img src={ChatIcon} alt="" />
                    <Link
                      target="_blank"
                      to={"https://dashworx.co.uk/book-a-demo/"}
                    >
                      <p className="font-[500] graphik-font text-[#28262C]">
                        Contact Dashworx
                      </p>
                    </Link>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-4 cursor-pointer">
                    <img src={UpgradeIcon} alt="" />
                    <p className="font-[500] graphik-font text-[#28262C]">Upgrade Plan</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[95%] flex flex-row justify-start items-center border-t-[1px]">
              <p className="py-2 quicksand-font">
                <span className="font-[500] text-[#28262C]">Portal </span>|
                Dashworx Limited
              </p>
            </div>
          </div>
        </div>
        <div className="basis-[80%] flex flex-col home-section">
          <div className="p-4">
            <p className="text-[4vmin] font-[400] text-[#000000] flex flex-row">
              Welcome{" "}
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
                {"Name"}
              </Skeleton>
            </p>
          </div>
          <div className="flex flex-col p-4 gap-4 min-h-[70vh]">
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
                        className="w-[80%] h-[30vh] bg-primaryColor hover:bg-hoverColor cursor-pointer flex flex-col justify-center items-center gap-8 rounded-[10px] text-[#ffffff]"
                        onClick={() => {
                          navigate(`/dash`, {
                            state: { data: item.link },
                          });
                        }}
                      >
                        <img src={KPI} alt="" className="w-20 h-20" />
                        <p className="">{`${item.name}`}</p>
                      </div>
                    </Skeleton>
                  );
                })}
              {!loading &&
                data?.dashboards?.length > 0 &&
                data?.dashboards?.map((item, index) => {
                  return (
                    <div className="w-[100%] flex flex-row justify-start items-center">
                      <div
                        className="w-[90%] h-[auto] bg-white cursor-pointer hover:bg-[#274156] hover:text-[#ffffff] group hover:fill-[#ffffff] flex flex-row justify-between px-10 items-center gap-8 rounded-[10px] text-[#28262C] border-4 border-[#274156]"
                        onClick={() => {
                          navigate(`/dash`, {
                            state: { data: JSON.parse(item.link) },
                          });
                        }}
                      >
                        <p className="font-[700] text-lg">{`${item.name}`}</p>
                        <svg
                          width="34"
                          height="64"
                          viewBox="0 0 84 84"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M65.3009 15.828V80.1774C65.3009 80.4445 65.0849 80.6606 64.8177 80.6606H57.1214C56.8542 80.6606 56.6382 80.4445 56.6382 80.1774V28.8147C56.6382 27.7444 55.7708 26.877 54.7005 26.877H39.8768C38.8065 26.877 37.9391 27.7444 37.9391 28.8147V80.1774C37.9391 80.4445 37.7231 80.6606 37.4559 80.6606H29.7596C29.4924 80.6606 29.2764 80.4445 29.2764 80.1774V55.0138C29.2764 53.9436 28.409 53.0762 27.3387 53.0762H12.5199C11.4497 53.0762 10.5822 53.9436 10.5822 55.0138V80.1774C10.5822 80.4445 10.3662 80.6606 10.0991 80.6606H3.8226C3.55545 80.6606 3.33942 80.4445 3.33942 80.1774V0.483185C3.33942 0.216032 3.12339 0 2.85623 0H0.483185C0.216032 0 0 0.216032 0 0.483185V83.8334H0.166559V84H83.5168C83.784 84 84 83.784 84 83.5168V15.828C84 14.3323 82.7863 13.1186 81.2905 13.1186H68.012C66.5163 13.1186 65.3026 14.3323 65.3026 15.828H65.3009Z"
                            className="fill-[#274156] group-hover:fill-[#ffffff]"
                          />
                        </svg>
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