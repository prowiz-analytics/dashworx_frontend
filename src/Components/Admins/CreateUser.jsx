import { Button, Card, Form, Input, Select, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../App";
import { toast } from "react-toastify";
import { CloseOutlined } from "@ant-design/icons";

function CreateUser() {
  const [form] = Form.useForm();
  const [brandsOptions, setBrandsOptions] = useState([]);
  const validateMessages = () => {
    notify("${label} is required");
  };
  const successNotify = (data) => toast.success(data);
  const notify = (data) => toast.error(data);
  const CreateUser = async (formData) => {
    console.log(formData);
    if (
      formData.dashboards !== undefined &&
      formData?.dashboards?.length !== 0
    ) {
      formData.dashboards.map((item) => {
        try {
          JSON.parse(item.dashboard);
        } catch (error) {
          item.dashboard = JSON.stringify(item.dashboard);
        }
        item.username = formData.email;
      });
    }
    let dashboards = [];
    formData.dashboards.forEach((item) => {
      dashboards = [...dashboards, ...item.dashboards]; // Append item.dashboards (which is also an array)
    });
    formData.dashboards = dashboards;
    // console.log(formData);
    let user = JSON.parse(localStorage.getItem("data"));
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };

    try {
      const data = await axios.post(`${API}/admin/create/user`, formData, {
        headers,
      });
      if (data.status === 200) {
        successNotify("Created User Successfully");
      }
    } catch (err) {
      notify(err.response.data.detail);
    }
  };
  const handleFinishFailed = ({ errorFields }) => {
    console.log(errorFields);
    errorFields.forEach((error) => {                                                                                                                                                                                                                                                                                                                                                                                            
      toast.error(error.name[error.name.length - 1].replace('_',' ') + " is Required", {
        toastId: `${error.name[error.name.length - 1]}`,
        className: `customtoastcss`
      });
    });
  };

  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openDropdownKey, setOpenDropdownKey] = useState(null);

  const toggleDropdown = (key, visible) => {
    setOpenDropdownKey(visible ? key : null); // Ensure only one dropdown opens at a time
  };

  useEffect(() => {
    const getBrandDashboards = async () => {
      let user = JSON.parse(localStorage.getItem("data"));
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      const getBrands = await axios.get(`${API}/admin/dashboards/brands`, {
        headers: headers,
      });
      console.log(getBrands.data);
      setBrandsOptions(getBrands.data);
    };
    getBrandDashboards();
  }, []);
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
                        message:"Email is required"
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
                    label="First Name"
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
                                className="basis-[40%]"
                                name={[subField.name, "brand_id"]}
                              >
                                <Select
                                  placeholder="Brands"
                                  key={subField.key}
                                  className="h-[48px] brands-select"
                                  open={openDropdownKey === subField.key} // Only the selected dropdown is open
                                  onDropdownVisibleChange={(visible) =>
                                    toggleDropdown(subField.key, visible)
                                  }
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

                                            // Close dropdown after selecting an option
                                            setOpenDropdownKey(null);
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
                                      <div className="relative flex flex-col gap-4 h-[350px] p-4 overflow-auto">
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
                                                      className="flex flex-row justify-start border-2 border-[#000000] rounded-md items-start w-full gap-6"
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
                                                    className="flex flex-row justify-between items-center gap-4 w-full"
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
                                                        console.log(
                                                          form.getFieldValue(
                                                            "items"
                                                          )
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
                                                      <p className="p-2 border-2 h-[4] border-[#000000] w-[100%] rounded-md">
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
                                  onChange={(selectedValues) => {
                                    form.setFieldValue(
                                      [subField.name, "dashboards"],
                                      selectedValues
                                    );
                                    // console.log(selectedValues);
                                  }}
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
                type="solid"
                className="bg-[#73956F] border-[2px] border-[#000000] w-full py-[10px] rounded-[6px] text-[1.1rem] text-[#ffffff]"
                onClick={() => CreateUser(form.getFieldsValue().items[0])}
                htmlType="submit"
                block
              >
                Create User
              </button>
            </div>
          )}
        </Form.List>
      </Form>
    </div>
  );
}

export default CreateUser;
