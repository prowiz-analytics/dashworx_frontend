import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API } from "../../App";

function UpdateUser() {
  const [brandsOptions, setBrandsOptions] = useState([]);
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
  const getUser = async (formData) => {
    try {
      console.log(formData);
      let user = JSON.parse(localStorage.getItem("data"));
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };

      const res = await axios.get(
        `${API}/admin/dashboards?email=${formData.email}`,
        { headers: headers }
      );
      console.log(res.data);

      const groupedData = Object.values(
        res.data.reduce((acc, entry) => {
          const { brand_id, brand_name, user, ...dashboard } = entry;

          if (!acc[brand_id]) {
            acc[brand_id] = {
              brand_id,
              brand_name,
              user,
              dashboards: [],
            };
          }

          acc[brand_id].dashboards.push({
            dashboard: JSON.parse(dashboard.dashboard),
            dashboard_id: dashboard.dashboard_id,
            label: dashboard.dashboard_name,
          });

          return acc;
        }, {})
      );
      console.log(groupedData);

      const items = form.getFieldValue("items");
      items[0].dashboards = groupedData;
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
      formData.dashboards.map((brands) => {
        brands.dashboards.map((item) => {
          if (item?.dashboard !== undefined) {
            try {
              JSON.parse(item.dashboard);
            } catch (error) {
              item.dashboard = JSON.stringify(item.dashboard);
            }
          }
        });
      });
    }
    console.log(formData);
    if (formData.dashboards === undefined) {
      formData.dashboards = [];
    }
    let dashboards = [];
    formData.dashboards.forEach((item) => {
      dashboards = [...dashboards, ...item.dashboards]; // Append item.dashboards (which is also an array)
    });
    let payload = {
      data: dashboards,
    };
    console.log(payload);
    let user = JSON.parse(localStorage.getItem("data"));
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };
    try {
      console.log(payload);
      const data = await axios.put(
        `${API}/admin/user/dashboards?email=${formData.email}`,
        payload,
        {
          headers,
        }
      );
      if (data.status === 200) {
        successNotify("Updated Dashboards Successfully");
      } else {
        notify("Something Went Wrong");
      }
    } catch (err) {
      console.log(err);
      notify(err.response?.data?.detail);
    }
  };

  useEffect(() => {
    const getAllBrands = async () => {
      try {
        let user = JSON.parse(localStorage.getItem("data"));
        const headers = {
          Authorization: `Bearer ${user.token}`,
        };
        const getBrands = await axios.get(`${API}/admin/dashboards/brands`, {
          headers: headers,
        });
        console.log(getBrands.data);
        setBrandsOptions(getBrands.data);
      } catch (err) {
        console.log(err);
        notify(err.response?.data.detail);
      }
    };
    getAllBrands();
  }, []);
  const [form] = Form.useForm();
  const successNotify = (data) => toast.success(data);
  const notify = (data) => toast.error(data);
  const validateMessages = () => {
    notify("${label} is required");
  };
  const handleFinishFailed = ({ errorFields }) => {
    console.log(errorFields);
    errorFields.forEach((error) => {
      toast.error(error.name[error.name.length - 1] + " is Required", {
        toastId: `${error.name[error.name.length - 1]}`,
      });
    });
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // useEffect(()=>{
  //   console.log(form.getFieldValue("items"));
  // },[form])
  return (
    <div className="w-full h-full flex flex-row justify-center items-center bg-[#ffffff]">
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        form={form}
        style={{
          maxWidth: "60vw",
          width: "70vw",
        }}
        autoComplete="off"
        initialValues={{
          items: [{}],
        }}
        validateMessages={validateMessages}
        onFinishFailed={handleFinishFailed}
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
                  <div className="flex flex-row justify-center gap-8 items-start mb-3">
                    <Form.Item
                      label="Email"
                      name={[field.name, "email"]}
                      className="pl-2 basis-[55%] no-flex-basis"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter Email Here"
                        className="w-full py-3 text-[0.90rem]"
                      />
                    </Form.Item>
                    <div className="basis-[30%]">
                      <Button
                        type="solid"
                        className="bg-[#73956F] border-[2px] border-[#000000] w-full py-[22px] rounded-[6px] text-[1.1rem] text-[#ffffff]"
                        onClick={() => getUser(form.getFieldsValue().items[0])}
                        block
                      >
                        GET USER
                      </Button>
                    </div>
                  </div>

                  {/* Nest Form.List */}
                  <Form.Item className="no-flex-basis" label="Dashboards">
                    <Form.List name={[field.name, "dashboards"]}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <div
                              key={subField.key}
                              className="flex flex-row justify-start items-center gap-4 w-full"
                            >
                              <Form.Item
                                className="basis-[30%]"
                                name={[subField.name, "brand_id"]}
                              >
                                <Select
                                  placeholder="Brands"
                                  className="h-[48px] brands-select"
                                  open={dropdownOpen} // Control dropdown open/close state
                                  onDropdownVisibleChange={(visible) =>
                                    setDropdownOpen(visible)
                                  } // Sync state
                                  dropdownRender={(menu) => (
                                    <div className="relative flex flex-col gap-4 h-auto p-4 overflow-auto">
                                      {brandsOptions?.map((item) => (
                                        <div
                                          key={item.brand_id}
                                          className="p-1 border-[2px] rounded-[8px] border-black cursor-pointer"
                                          onClick={() => {
                                            // Get form values safely
                                            const items =
                                              form.getFieldValue("items") || [];

                                            // Ensure items[0] exists
                                            if (!items[0]) {
                                              items[0] = { dashboards: {} };
                                            }

                                            // Ensure dashboards exist
                                            if (!items[0].dashboards) {
                                              items[0].dashboards = {};
                                            }

                                            // Ensure subField.name exists in dashboards
                                            if (
                                              !items[0].dashboards[
                                                subField.name
                                              ]
                                            ) {
                                              items[0].dashboards[
                                                subField.name
                                              ] = {};
                                            }

                                            // Update brand_id safely
                                            items[0].dashboards[
                                              subField.name
                                            ].brand_id = item.brand_id;

                                            // Set updated values
                                            form.setFieldsValue({ items });

                                            console.log(
                                              "Selected Brand ID:",
                                              item.brand_id
                                            );
                                            console.log(
                                              "Updated Form Data:",
                                              form.getFieldsValue()
                                            );

                                            // Close the dropdown after selection
                                            setDropdownOpen(false);
                                          }}
                                        >
                                          <p className="text-[1.1rem] text-center">
                                            {item.brand_name}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                >
                                  {brandsOptions?.map((item) => (
                                    <Select.Option
                                      key={item.brand_id}
                                      value={item.brand_id}
                                    >
                                      {item.brand_name}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                className="flex-1"
                                name={[subField.name, "dashboards"]}
                              >
                                <Select
                                  mode="multiple"
                                  // onDropdownVisibleChange={}
                                  placeholder="Select Dashboard"
                                  className="h-[48px] icons-select"
                                  tagRender={({
                                    label,
                                    value,
                                    closable,
                                    onClose,
                                  }) => {
                                    return (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "4px",
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          borderRadius: "4px",
                                        }}
                                        title={label} // Tooltip to show full name on hover
                                      >
                                        {`${label}` + ","}
                                      </div>
                                    );
                                  }}
                                  dropdownRender={(menu) => {
                                    return (
                                      <div className="relative flex p-4 flex-col gap-4 h-[350px] overflow-auto">
                                        {brandsOptions
                                          ?.find(
                                            (brand) =>
                                              brand.brand_id ===
                                              form.getFieldValue([
                                                "items",
                                                field.name,
                                                "dashboards",
                                                subField.name,
                                                "brand_id",
                                              ])
                                          )
                                          ?.dashboards?.map(
                                            (dashboard, index) => {
                                              console.log(
                                                form.getFieldValue([
                                                  "items",
                                                  field.name,
                                                  "dashboards",
                                                  subField.name,
                                                  "dashboards",
                                                ])
                                              );
                                              const selectedDashboardIds = form
                                                .getFieldsValue()
                                                .items[0].dashboards[
                                                  subField.name
                                                ].dashboards?.map((item) => {
                                                  return item.dashboard_id;
                                                });
                                              console.log(selectedDashboardIds);

                                              // let isSelected = true;
                                              let isSelected =
                                                selectedDashboardIds?.includes(
                                                  dashboard.dashboard_id
                                                );

                                              return (
                                                <div className="flex flex-col w-full justify-start items-start gap-4">
                                                  {index === 0 && (
                                                    <div
                                                      className="flex flex-row justify-start border-2 border-[#000000] rounded-md items-start w-full gap-4"
                                                      onClick={() => {
                                                        let allDashboards =
                                                          brandsOptions?.find(
                                                            (brand) =>
                                                              brand.brand_id ===
                                                              form.getFieldValue(
                                                                [
                                                                  "items",
                                                                  field.name,
                                                                  "dashboards",
                                                                  subField.name,
                                                                  "brand_id",
                                                                ]
                                                              )
                                                          )?.dashboards;
                                                        console.log(
                                                          allDashboards
                                                        );
                                                        allDashboards.map(
                                                          (item) =>
                                                            (item.label =
                                                              item.dashboard_name)
                                                        );
                                                        const items =
                                                          form.getFieldValue(
                                                            "items"
                                                          );
                                                        console.log(items);
                                                        items[0].dashboards[
                                                          subField.name
                                                        ].dashboards =
                                                          allDashboards;
                                                        console.log(items);
                                                        form.setFieldsValue({
                                                          items,
                                                        });
                                                      }}
                                                    >
                                                      <div className="p-2 text-center w-[100%] rounded-md">
                                                        <p>
                                                          {`+ Select All Dashboards From This Brand`}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  )}
                                                  <div
                                                    className="flex flex-row justify-between items-center gap-8 w-full"
                                                    onClick={() => {
                                                      console.log(dashboard);
                                                      if (isSelected) {
                                                        console.log("here why");

                                                        let filteredValues =
                                                          form
                                                            .getFieldsValue()
                                                            .items[0].dashboards[
                                                              subField.name
                                                            ].dashboards?.filter(
                                                              (singleItem) =>
                                                                singleItem.dashboard_id !==
                                                                dashboard.dashboard_id
                                                            );
                                                        console.log(
                                                          filteredValues
                                                        );
                                                        const items =
                                                          form.getFieldValue(
                                                            "items"
                                                          );
                                                        console.log(items);
                                                        items[0].dashboards[
                                                          subField.name
                                                        ].dashboards =
                                                          filteredValues;
                                                        console.log(items);
                                                        form.setFieldsValue({
                                                          items,
                                                        });
                                                      } else {
                                                        let existingDashboards =
                                                          form.getFieldsValue()
                                                            .items[0]
                                                            .dashboards[
                                                            subField.name
                                                          ]?.dashboards
                                                            ? form.getFieldsValue()
                                                                .items[0]
                                                                .dashboards[
                                                                subField.name
                                                              ].dashboards
                                                            : [];
                                                        console.log(
                                                          existingDashboards
                                                        );
                                                        existingDashboards.push(
                                                          {
                                                            dashboard_id:
                                                              dashboard.dashboard_id,
                                                            label:
                                                              dashboard.dashboard_name,
                                                          }
                                                        );
                                                        console.log(
                                                          existingDashboards
                                                        );
                                                        const items =
                                                          form.getFieldValue(
                                                            "items"
                                                          );
                                                        items[0].dashboards[
                                                          subField.name
                                                        ].dashboards =
                                                          existingDashboards;
                                                        console.log(items);
                                                        form.setFieldsValue({
                                                          items,
                                                        });
                                                        // form.get
                                                      }
                                                    }}
                                                  >
                                                    <div className="checkbox-wrapper">
                                                      <input
                                                        type="checkbox"
                                                        readOnly
                                                        checked={isSelected}
                                                        // value={isSelected}
                                                        className="cursor-pointer"
                                                      />
                                                    </div>
                                                    <div className="flex-1">
                                                      <p className="p-2 border-2 border-[#000000] w-[100%] rounded-md">
                                                        {
                                                          dashboard.dashboard_name
                                                        }
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                      </div>
                                    );
                                  }}
                                  // onChange={(selectedValues) => {
                                  //   form.setFieldValue(
                                  //     [subField.name, "dashboards"],
                                  //     selectedValues
                                  //   );
                                  //   // console.log(selectedValues);
                                  // }}
                                  maxTagCount="responsive" // Automatically handles overflow with "..."
                                  optionLabelProp="label"
                                ></Select>
                              </Form.Item>

                              <div className="basis-[3%] mb-[20px]">
                                <CloseOutlined
                                  className=""
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            type="solid"
                            onClick={() => subOpt.add()}
                            className="w-[100%] py-[7px] border-[1px] text-[1.1rem] border-[#9C9C9C] rounded-[6px]"
                          >
                            + Add Sub Item
                          </button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <button
                onClick={() => UpdateDashboards(form.getFieldsValue().items[0])}
                htmlType="submit"
                block
                className="bg-[#73956F] border-[2px] border-[#000000] w-full py-[10px] rounded-[6px] text-[1.1rem] text-[#ffffff]"
              >
                Update User
              </button>
            </div>
          )}
        </Form.List>
      </Form>
    </div>
  );
}

export default UpdateUser;

{
  /* <div className="flex flex-col w-full justify-start items-start gap-4">
                                            {index === 0 && (
                                              <div className="flex flex-row justify-start border-2 border-[#000000] rounded-md items-start w-full gap-8">
                                                <div className="p-2 text-center w-[100%] rounded-md">
                                                  <p>
                                                    {`+ Select All Dashboards From This Brand`}
                                                  </p>
                                                </div>
                                              </div>
                                            )}
                                            <div
                                              className="flex flex-row justify-between items-center gap-8 w-full"
                                              onClick={() => {
                                                console.log(dashboard);
                                                if (isSelected) {
                                                  console.log("here why");

                                                  let filteredValues = form
                                                    .getFieldsValue()
                                                    .items[0].dashboards[
                                                      subField.name
                                                    ].dashboards?.filter(
                                                      (singleItem) =>
                                                        singleItem.dashboard_id !==
                                                        dashboard.dashboard_id
                                                    );
                                                  console.log(filteredValues);
                                                  const items =
                                                    form.getFieldValue("items");
                                                  console.log(items);
                                                  items[0].dashboards[
                                                    subField.name
                                                  ].dashboards = filteredValues;
                                                  console.log(items);
                                                  form.setFieldsValue({
                                                    items,
                                                  });
                                                } else {
                                                  let existingDashboards =
                                                    form.getFieldsValue()
                                                      .items[0].dashboards[
                                                      subField.name
                                                    ]?.dashboards
                                                      ? form.getFieldsValue()
                                                          .items[0].dashboards[
                                                          subField.name
                                                        ].dashboards
                                                      : [];
                                                  console.log(
                                                    existingDashboards
                                                  );
                                                  existingDashboards.push({
                                                    dashboard_id:
                                                      dashboard.dashboard_id,
                                                    label:
                                                      dashboard.dashboard_name,
                                                  });
                                                  console.log(
                                                    existingDashboards
                                                  );
                                                  const items =
                                                    form.getFieldValue("items");
                                                  items[0].dashboards[
                                                    subField.name
                                                  ].dashboards =
                                                    existingDashboards;
                                                  console.log(items);
                                                  form.setFieldsValue({
                                                    items,
                                                  });
                                                  console.log(
                                                    form.getFieldValue("items")
                                                  );
                                                  // form.get
                                                }
                                              }}
                                            >
                                              <div className="checkbox-wrapper">
                                                <input
                                                  type="checkbox"
                                                  readOnly
                                                  checked={isSelected}
                                                  // value={isSelected}
                                                  className="cursor-pointer"
                                                />
                                              </div>
                                              <div className="flex-1">
                                                <p className="p-2 border-2 border-[#000000] w-[100%] rounded-md">
                                                  {dashboard.dashboard_name}
                                                </p>
                                              </div>
                                            </div>
                                          </div> */
}
