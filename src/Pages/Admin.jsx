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

function Admin() {
  const ImageOptions = [
    {
      image: "/Dashboard_icons/Todo_Icon.svg",
      name: "Todo",
      value: "Todo_Icon",
    },
    {
      image: "/Dashboard_icons/Chart_Icon.svg",
      name: "Chart",
      value: "Chart_Icon",
    },
    {
      image: "/Dashboard_icons/Chat_Icon.svg",
      name: "Chat",
      value: "Chat_Icon",
    },
    {
      image: "/Dashboard_icons/Earth_Icon.svg",
      name: "Earth",
      value: "Earth_Icon",
    },
    {
      image: "/Dashboard_icons/Heartbeat_Icon.svg",
      name: "Heartbeat",
      value: "Heartbeat_Icon",
    },
    {
      image: "/Dashboard_icons/Calendar_Icon.svg",
      name: "Calendar",
      value: "Calendar_Icon",
    },
    {
      image: "/Dashboard_icons/Lightbulb_Icon.svg",
      name: "Lightbulb",
      value: "Lightbulb_Icon",
    },
    {
      image: "/Dashboard_icons/Pie_Chart_Icon.svg",
      name: "Pie_Chart",
      value: "Pie_Chart_Icon",
    },
    {
      image: "/Dashboard_icons/User_Icon.svg",
      name: "User",
      value: "User_Icon",
    },
    {
      image: "/Dashboard_icons/Web_Icon.svg",
      name: "Web",
      value: "Web_Icon",
    },
  ];
  const validateMessages = {
    required: "${label} is required!",
  };

  const [form] = Form.useForm();
  const successNotify = (data) => toast.success(data);
  const notify = (data) => toast.error(data);
  const location = useLocation();
  const [isCreateUser, setIsCreateUser] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const CreateUser = async (formData) => {
    console.log(formData);
    if (
      formData.dashboards !== undefined &&
      formData?.dashboards?.length !== 0
    ) {
      formData.dashboards.map((item) => {
        try{
          JSON.parse(item.dashboard)
        }
        catch(error){
          item.dashboard = JSON.stringify(item.dashboard);
        }
        item.username = formData.email;
      });
    }
    console.log(formData);
    let user = JSON.parse(localStorage.getItem("data"));
    const headers = {
      token: user.token,
    };
    console.log(typeof formData);
    try {
      const data = await axios.post(`${API}/admin/signup`, formData, {
        headers,
      });
      if (data.status === 200) {
        successNotify("Created User Successfully");
      }
    } catch (err) {
      notify(err.response.data.detail);
    }
  };

  const getUser = async (formData) => {
    try {
      console.log(formData);
      const res = await axios.get(
        `${API}/auth/dashboards?email=${formData.email}`
      );
      console.log(res.data);

      let user_dashboards = [];
      res.data.dashboards.map((item) => {
        user_dashboards.push({
          dashboard: JSON.parse(item.link),
          dashboard_name: item.name,
          dashboard_image: item.image
        });
      });
      console.log(user_dashboards);
      const items = form.getFieldValue("items");
      items[0].dashboards = user_dashboards;
      form.setFieldsValue({ items });
    } catch (err) {
      console.log(err);
      notify(err.response.data.detail);
    }
  };

  const UpdateDashboards = async (formData) => {
    if (
      formData.dashboards !== undefined &&
      formData?.dashboards?.length !== 0
    ) {
      formData.dashboards.map((item) => {
        try{
          JSON.parse(item.dashboard)
        }
        catch(error){
          item.dashboard = JSON.stringify(item.dashboard);
        }
        item.username = formData.email;
      });
    }
    if (formData.dashboards === undefined) {
      formData.dashboards = [];
    }
    console.log(formData);
    let user = JSON.parse(localStorage.getItem("data"));
    const headers = {
      token: user.token,
    };
    try {
      console.log(typeof formData);
      const data = await axios.post(`${API}/admin/update`, formData, {
        headers,
      });
      if (data.status === 200) {
        successNotify("Updated Dashboards Successfully");
      } else {
        notify("Something Went Wrong");
      }
    } catch (err) {
      notify(err.response.data.detail);
    }
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
    <div className="bg-[#ffffff] h-[100vh] w-[100vw] p-4">
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
              setIsCreateUser(true);
              form.resetFields();
            }}
          >
            Create User
          </button>
          <button
            className="underline text-xl"
            onClick={() => {
              setIsCreateUser(false);
              form.resetFields();
            }}
          >
            Update User
          </button>
        </div>
      </div>
      <div className="flex flex-col p-4 gap-4 min-h-[70vh]">
        <div className="h-auto">
          {isCreateUser && (
            <div className="w-full h-full flex flex-row justify-center items-center bg-[#ffffff]">
              <Form
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 18,
                }}
                form={form}
                name="dynamic_form_complex"
                style={{
                  maxWidth: 600,
                }}
                autoComplete="off"
                initialValues={{
                  items: [{}],
                }}
                validateMessages={validateMessages}
              >
                <Form.List name="items">
                  {(fields, { add, remove }) => (
                    <div
                      style={{
                        display: "flex",
                        rowGap: 16,
                        flexDirection: "column",
                      }}
                    >
                      {fields.map((field) => (
                        <Card
                          size="small"
                          title={`Create New User`}
                          key={field.key}
                          extra={
                            <CloseOutlined
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          }
                        >
                          <Form.Item
                            label="Email"
                            name={[field.name, "email"]}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Password"
                            name={[field.name, "password"]}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="First_Name"
                            name={[field.name, "first_name"]}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          {/* Nest Form.List */}
                          <Form.Item label="Dashboards">
                            <Form.List name={[field.name, "dashboards"]}>
                              {(subFields, subOpt) => (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    rowGap: 16,
                                  }}
                                >
                                  {subFields.map((subField) => (
                                    <Space key={subField.key}>
                                      <Form.Item
                                        noStyle
                                        name={[subField.name, "dashboard"]}
                                      >
                                        <Input placeholder="Dasboard Link" />
                                      </Form.Item>
                                      <Form.Item
                                        noStyle
                                        name={[subField.name, "dashboard_name"]}
                                      >
                                        <Input placeholder="Dashboard Name" />
                                      </Form.Item>
                                      <Form.Item
                                      
                                        noStyle
                                        name={[
                                          subField.name,
                                          "dashboard_image",
                                        ]}
                                      >
                                        <Select placeholder="Dashboard Image">
                                          {ImageOptions.map((item) => {
                                            return (
                                              <Select.Option
                                                value={item.value}
                                              >
                                                <img
                                                  src={item.image}
                                                  alt={item.name}
                                                  style={{
                                                    marginRight: "8px",
                                                    width: "20px",
                                                    height: "20px",
                                                  }}
                                                />
                                                {item.name}
                                              </Select.Option>
                                            );
                                          })}
                                          {/* Add more options as needed */}
                                        </Select>
                                      </Form.Item>
                                      <CloseOutlined
                                        onClick={() => {
                                          subOpt.remove(subField.name);
                                        }}
                                      />
                                    </Space>
                                  ))}
                                  <Button
                                    type="dashed"
                                    onClick={() => subOpt.add()}
                                    block
                                  >
                                    + Add Sub Item
                                  </Button>
                                </div>
                              )}
                            </Form.List>
                          </Form.Item>
                        </Card>
                      ))}

                      <Button
                        type="dashed"
                        onClick={() =>
                          CreateUser(form.getFieldsValue().items[0])
                        }
                        htmlType="submit"
                        block
                      >
                        Create User
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Form>
            </div>
          )}
          {!isCreateUser && (
            <div className="w-full h-full flex flex-row justify-center items-center bg-[#ffffff]">
              <Form
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 18,
                }}
                form={form}
                name="dynamic_form_complex"
                style={{
                  maxWidth: 600,
                }}
                autoComplete="off"
                initialValues={{
                  items: [{}],
                }}
                validateMessages={validateMessages}
              >
                <Form.List name="items">
                  {(fields, { add, remove }) => (
                    <div
                      style={{
                        display: "flex",
                        rowGap: 16,
                        flexDirection: "column",
                      }}
                    >
                      {fields.map((field) => (
                        <Card
                          size="small"
                          title={`Update User`}
                          key={field.key}
                          extra={
                            <CloseOutlined
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          }
                        >
                          <div className="flex flex-row justify-center items-center mb-4">
                            <Form.Item
                              label="Email"
                              name={[field.name, "email"]}
                              className="m-0 basis-[70%]"
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            <Button
                              type="dashed"
                              className="basis-[30%]"
                              onClick={() =>
                                getUser(form.getFieldsValue().items[0])
                              }
                              block
                            >
                              Get User
                            </Button>
                          </div>

                          {/* Nest Form.List */}
                          <Form.Item label="Dashboards">
                            <Form.List name={[field.name, "dashboards"]}>
                              {(subFields, subOpt) => (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    rowGap: 16,
                                  }}
                                >
                                  {subFields.map((subField) => (
                                    <Space key={subField.key}>
                                      <Form.Item
                                        noStyle
                                        name={[subField.name, "dashboard"]}
                                      >
                                        <Input placeholder="Dasboard Link" />
                                      </Form.Item>
                                      <Form.Item
                                        noStyle
                                        name={[subField.name, "dashboard_name"]}
                                      >
                                        <Input placeholder="Dashboard Name" />
                                      </Form.Item>
                                      <Form.Item
                                        // initialValue={'Todo_Icon'}
                                        noStyle
                                        name={[
                                          subField.name,
                                          "dashboard_image",
                                        ]}
                                      >
                                        <Select placeholder="Dashboard Image">
                                          {ImageOptions.map((item) => {
                                            return (
                                              <Select.Option
                                                value={item.value}
                                              >
                                                <img
                                                  src={item.image}
                                                  alt={item.name}
                                                  style={{
                                                    marginRight: "8px",
                                                    width: "20px",
                                                    height: "20px",
                                                  }}
                                                />
                                                {item.name}
                                              </Select.Option>
                                            );
                                          })}
                                          {/* Add more options as needed */}
                                        </Select>
                                      </Form.Item>
                                      <CloseOutlined
                                        onClick={() => {
                                          subOpt.remove(subField.name);
                                        }}
                                      />
                                    </Space>
                                  ))}
                                  <Button
                                    type="dashed"
                                    onClick={() => subOpt.add()}
                                    block
                                  >
                                    + Add Sub Item
                                  </Button>
                                </div>
                              )}
                            </Form.List>
                          </Form.Item>
                        </Card>
                      ))}

                      <Button
                        type="dashed"
                        onClick={() =>
                          UpdateDashboards(form.getFieldsValue().items[0])
                        }
                        htmlType="submit"
                        block
                      >
                        Update User
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Form>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Admin;
