import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import KPI from "../Assets/kpi.svg";
import Heart from "../Assets/heart.svg";
import SEO from "../Assets/SEO_magify 1.svg";
import Marketing from "../Assets/Marketing.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import axios from "axios";
import { API } from "../App";
import { Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Dashboards() {
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
        console.log(localStorage.getItem('data'))
        if (localStorage.getItem('data') === null) {
          navigate("/login");
        } else {
          let user = JSON.parse(localStorage.getItem('data'))
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
  console.log(data);
  return (
    <div className="bg-[#ffffff] h-[100vh] w-[100vw] p-4">
      {/* {loading && (
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
      )} */}
      <Header isNavigatable={false} />
      <div className="p-4">
        <p className="text-[4vmin] text-[#000000] flex flex-row">Welcome <Skeleton title={false} loading={loading} style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'1rem', width:'10rem'}} paragraph={{
                  rows: 2,
                }}>{data?.firstName}</Skeleton></p>
      </div>
      <div className="flex flex-col p-4 gap-4 min-h-[70vh]">
        <p className="text-[2vmin]">Your Dashboards:</p>
        <div className="grid grid-cols-4 w-full justify-start items-center gap-10">
          {loading &&
            [1, 2, 3, 4].map((item, index) => {
              return (
                <Skeleton loading={loading} paragraph={{
                  rows: 4,
                }}>
                  <div
                    className="w-[20vw] h-[30vh] bg-[#1C6E8C] hover:bg-hoverColor cursor-pointer flex flex-col justify-center items-center gap-8 rounded-[10px] text-[#ffffff]"
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
          {(!loading && data?.dashboards?.length>0) &&
            data?.dashboards?.map((item, index) => {
              return (
                <div
                  className="w-[20vw] h-[30vh] bg-[#1C6E8C] hover:bg-hoverColor cursor-pointer flex flex-col justify-center items-center gap-8 rounded-[10px] text-[#ffffff]"
                  onClick={() => {
                    navigate(`/dash`, {
                      state: { data: JSON.parse(item.link) },
                    });
                  }}
                >
                  <img src={KPI} alt="" className="w-20 h-20" />
                  <p className="">{`${item.name}`}</p>
                </div>
              );
            })}
            {(!loading && data?.dashboards?.length === 0) &&
            <>
            <div
                  className="w-[90vw] h-[30vh] flex flex-col justify-center items-center gap-8 rounded-[10px] text-[#000000]"
                >
                  Sorry No Dashboards Available For User !!
                </div>
            </>
            }
        </div>
        <div className="w-[15vw] mt-[10vh] mb-[50px] h-auto p-4 flex flex-col justify-between items-start rounded-[10px] bg-[#D9D9D9] gap-4">
          <div className="font-bold">
            <p>Quick Links:</p>
          </div>
          <div className="flex flex-col gap-2">
            <Link target="_blank" to={"https://dashworx.co.uk/"}>Website</Link>
            <Link target="_blank" to={"https://dashworx.co.uk/book-a-demo/"}> 
              Contact Dashworx
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboards;
