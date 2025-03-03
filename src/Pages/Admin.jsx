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
import { jwtDecode } from "jwt-decode";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Typography, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateUser from "../Components/Admins/CreateUser";
import UpdateUser from "../Components/Admins/UpdateUser";
import Brands from "../Components/Admins/Brands";
import MasterTable from "../Components/Admins/MasterTable";

function Admin() {
  
  // const validateMessages = {
  //   required: "${label} is required!",
  // };
  const validateMessages = () =>{
    notify("${label} is required")
  };

  const [form] = Form.useForm();
  const successNotify = (data) => toast.success(data);
  const notify = (data) => toast.error(data);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('createUser');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleFinishFailed = ({ errorFields }) => {
    console.log(errorFields)
    errorFields.forEach((error) => {
      toast.error(error.name[error.name.length-1]+" is Required",{
        toastId:`${error.name[error.name.length-1]}`
      });
    });
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        // Check if location.state is null after fetching data

        if (localStorage.getItem("data") === null) {
          navigate("/login");
        } else {
          let user = JSON.parse(localStorage.getItem("data"));
          const decoded = jwtDecode(user.token);
          console.log(decoded);
          if (decoded.user_type !== "admin") {
            navigate("/dashboards");
          }
          setLoading(false)
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
    <div className="bg-[#ffffff] h-[100vh] w-[100vw] overflow-auto p-4">
      <Header isNavigatable={false} isAdminNav={true}/>
      <div className="p-4 flex flex-row">
        <p className="text-[4vmin] text-[#000000] flex flex-row">
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
            {"Admin"}
          </Skeleton>
        </p>
        <div className="flex justify-center items-center flex-row gap-4 ml-4">
          <button
            className="underline text-xl"
            onClick={() => {
              setCurrentPage('createUser')
              form.resetFields();
            }}
          >
            Create User
          </button>
          <button
            className="underline text-xl"
            onClick={() => {
              setCurrentPage('updateUser')
              form.resetFields();
            }}
          >
            Update User
          </button>
          <button
            className="underline text-xl"
            onClick={() => {
              setCurrentPage('masterTable')
              form.resetFields();
            }}
          >
            Master Table
          </button>
          <button
            className="underline text-xl"
            onClick={() => {
              setCurrentPage('brands')
              form.resetFields();
            }}
          >
            Brands
          </button>
        </div>
      </div>
      <div className="flex flex-col p-4 gap-4 min-h-[70vh] mb-24">
        <div className="h-auto">
          {currentPage === 'createUser' && (
            <CreateUser />
          )}
          {currentPage === 'updateUser' && (
            <UpdateUser/>
          )}
          {currentPage === 'masterTable' && (
            <MasterTable/>
          )}
          {currentPage === 'brands' && (
            <Brands/>
          )}
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Admin;
