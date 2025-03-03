import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import DashboardIcon from "../Assets/dashboards.svg";
import InsightsIcon from "../Assets/insights.svg";
import ChatIcon from "../Assets/Contact.svg";

import SettingsIcon from "../Assets/settings.svg";
import { Skeleton } from "antd";
import KPI from "../Assets/kpi.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../App";
import SVG from "react-inlinesvg";
import QRCode from "react-qr-code";
import { jwtDecode } from "jwt-decode";

// NOTE:  REFERENCE FOR PAGE SECTIONS
// let sections = [
//   {
//     "page":"Home",
//     "value":0
//   },
//   {
//     "page":"Settings",
//     "value":1
//   }
// ]

function Home() {
  const location = useLocation();
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
          const decoded = jwtDecode(user.token);
          console.log(decoded);
          if (!decoded.logged_in) {
            navigate("/login");
          }
          const headers = {
            Authorization: `Bearer ${user.token}`,
          };

          const data = await axios.get(
            `${API}/auth/user/dashboards?email=${decoded.email}`,
            { headers: headers }
          );
          // let data = {
          //   data: {
          //     email: "demo@dashworx.co.uk",
          //     dashboards: [
          //       {
          //         link: '"https://lookerstudio.google.com/embed/reporting/5d27bf9b-7447-4944-9362-cad35b785a4a/page/p_7th4a67ijd"',
          //         name: "Google Analytics Report",
          //         image: "Web_Icon",
          //       },
          //       {
          //         link: '"https://lookerstudio.google.com/embed/reporting/5a26b988-cba2-4613-a38a-450ba0215970/page/2jyxD"',
          //         name: "Shopify Report",
          //         image: "Chart_Icon",
          //       },
          //       {
          //         link: '"https://lookerstudio.google.com/embed/reporting/d09fbf42-53d4-4644-b13f-ec9451713aa9/page/p_1088fw1tld"',
          //         name: "Master Ecom Overview",
          //         image: "Heartbeat_Icon",
          //       },
          //       {
          //         link: '"https://lookerstudio.google.com/embed/reporting/8d6cf582-5ee0-43bf-bc9f-66a5ddd71be9/page/p_j1f6bq2vld"',
          //         name: "Retention Overview",
          //         image: "User_Icon",
          //       },
          //       {
          //         link: '"https://lookerstudio.google.com/embed/reporting/1871f543-3696-42d3-bfdb-f716d1d8f8ae/page/p_j1vqqokqhd"',
          //         name: "Google Ads Report",
          //         image: "Lightbulb_Icon",
          //       },
          //       {
          //         link: '"https://lookerstudio.google.com/embed/reporting/efdaed51-db5b-447a-bcbe-8a7d9e935c40/page/2jyxD"',
          //         name: "Master Ads Overview",
          //         image: "Pie_Chart_Icon",
          //       },
          //     ],
          //     firstName: "Demo",
          //   },
          // };
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
  console.log(data);
  return (
    <div className="flex flex-col">
      <div className="fixed top-0 z-[1000] h-[10vh] w-full">
        <Header isHomeNav={true} refreshBtn={false} />
      </div>
      <div className="flex flex-col justify-between items-center sidenav top-[10vh] md:w-[22vw] lg:w-[22vw] xl:w-[22vw] fixed left-0 bg-[#f1f1f1]">
        <div className="flex flex-col justify-between items-center h-[25%] w-[85%] gap-10">
          <div className="flex flex-row justify-start items-center w-[100%] mt-1">
            <div className="flex flex-col justify-start items-start gap-4 w-full  border-t-[1px]">
              {/* <h2 className="font-[600] quicksand-font">Summary</h2> */}
              <div className="flex flex-col justify-start items-start gap-2 w-full graphik-font mt-4">
                <div
                  className={`flex flex-row justify-start w-full items-center gap-4 cursor-pointer rounded-md px-2 py-2 ${
                    location.pathname === "/home" ? "bg-[#ffffff]" : "bg-none"
                  }`}
                >
                  <img src={DashboardIcon} alt="" className="w-[1vw]" />
                  <p
                    className={` text-[#28262C] max-h-600:text-[0.75rem] text-[1rem] ${
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
            <div className="flex flex-col gap-4 w-full ml-[7%]">
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
                    <p className="font-[500] max-h-600:text-[0.75rem] text-[1rem] graphik-font text-[#28262C] hover:border-b-[1px] hover:border-[#000000] border-b-[1px] border-[#f1f1f1]">
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
      <div className="flex flex-row w-full">
        <Dashboards loading={loading} data={data} navigate={navigate} />
        {/* {currentSection === 1 && (
          <Settings loading={loading} data={data} navigate={navigate} />
        )} */}
      </div>
    </div>
  );
}

export default Home;

function Dashboards({ loading, data, navigate }) {
  return (
    <div className="basis-[80%] mt-[10vh] overflow-auto flex flex-col ml-[22vw] md:ml-[22vw] lg:ml-[22vw] xl:ml-[22vw] home-section">
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
            {" " + data?.firstName}
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
                        state: {
                          data: item.link,
                        },
                      });
                    }}
                  >
                    <img
                      src={"/Dashboard_icons/Chart_Icon.svg"}
                      alt=""
                      className="w-20 h-20"
                    />
                    <p className="max-h-600:text-[0.75rem] text-[1rem]">{`${item.name}`}</p>
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
                    className="w-[90%] h-[75px] max-h-900:h-[75px] min-h-1000:h-[75px] max-h-600:h-[75px] bg-[#F1F1F1] cursor-pointer hover:bg-[#274156] hover:text-[#ffffff] group hover:fill-[#ffffff] fill-[#274156] flex flex-row justify-between px-10 items-center gap-8 rounded-[10px] text-[#28262C] border-[3px] border-[#274156]"
                    onClick={() => {
                      navigate(`/dashboard`, {
                        state: {
                          data: JSON.parse(item.link),
                        },
                      });
                    }}
                  >
                    <p className="font-[900] max-h-600:text-[1rem] max-h-900:text-[1rem]  md:text-[1.5rem] lg:text-[1.25rem] uppercase">{`${item.name}`}</p>
                    {/* <img src={'/Dashboard_icons/Chart_Icon.svg'} alt="" className="w-20 h-20 "/> */}
                    <div className="flex">
                      {item?.image.map((icon, index) => {
                        return (
                          <>
                          {index !== 3 && <div
                            key={index}
                            style={{
                              zIndex: index + 100 - index * (index + 1),
                            }}
                            className={`relative -mr-6 rounded-full first:ml-0 border-white bg-white `}
                          >
                            <SVG
                              src={`/DashboardIcons/${icon.label}.svg`}
                              className="w-[50px] h-[40px]"
                            />
                          </div>}
                          {index === 3 && <div
                            key={index}
                            style={{
                              zIndex: index + 100 - index * (index + 1),
                            }}
                            className={`relative -mr-6 rounded-full first:ml-0 border-white bg-white `}
                          >
                            <SVG
                              src={`/DashboardIcons/plus.svg`}
                              className="w-[50px] h-[40px]"
                            />
                          </div>}
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {!loading && data?.dashboards?.length === 0 && (
          <>
            <div className="w-[100%] min-h-[70vh] text-[1.25rem] font-[500] flex flex-col justify-center items-center gap-8 rounded-[10px] text-[#000000]">
              Sorry No Dashboards Available For User !!
            </div>
          </>
        )}
      </div>
    </div>
  );
}
