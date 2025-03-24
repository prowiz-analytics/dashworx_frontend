import React, { useEffect, useState } from "react";
import { API } from "../../App";
import { toast } from "react-toastify";
import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Card, Form, Input, Select, Space } from "antd";
import axios from "axios";

function MasterTable() {
  const successNotify = (data) => toast.success(data);
  const notify = (data) => toast.error(data);

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
  ];
  const [brandsOptions, setBrandsOptions] = useState([]);
  // console.log(brandsOptions);
  const [dashboardIcons, setDashboardIcons] = useState([]);
  const [form] = Form.useForm();

  const updateDashboards = async () => {
    let formData = {
      data: form.getFieldValue("items")[0].dashboards
    }
    console.log(formData)
    let user = JSON.parse(localStorage.getItem("data"));
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };
    formData?.data.map((item) => {
      if (item?.dashboard !== undefined) {
        try {
          JSON.parse(item.dashboard);
        } catch (error) {
          item.dashboard = JSON.stringify(item.dashboard);
        }
      }
    });
    console.log(formData);
    const res = await axios.put(`${API}/admin/master/dashboards/update`,formData,{
      headers:headers
    })
    if(res.status == 200){
      successNotify('Master Dashboard Updated Successfully');
    }
  };

  useEffect(() => {
    const getDashboardIcons = async () => {
      try {
        let user = JSON.parse(localStorage.getItem("data"));
        const headers = {
          Authorization: `Bearer ${user.token}`,
        };
        const getBrands = await axios.get(`${API}/admin/getbrands`, {
          headers: headers,
        });

        const getIcons = await axios.get(`${API}/admin/geticons`, {
          headers: headers,
        });
        // console.log(getIcons.data);
        setBrandsOptions(getBrands.data);
        setDashboardIcons(getIcons.data);
        const getMasterDashboards = await axios.get(
          `${API}/admin/master/dashboards`,
          {
            headers: headers,
          }
        );
        let master_dashboards = [];
        getMasterDashboards.data.map((item) => {
          master_dashboards.push({
            dashboard: JSON.parse(item.dashboard),
            icons: item.icons,
            dashboard_name: item.dashboard_name,
            brand_id: item.brand_id,
            dashboard_id: item.dashboard_id
          });
        });
        console.log(master_dashboards);
        const items = form.getFieldValue("items");
        items[0].dashboards = master_dashboards;
        form.setFieldsValue({ items });
        console.log(form.getFieldValue("items"))
      } catch (err) {
        console.log(err);
        notify(err.response?.data.detail);
      }
    };
    getDashboardIcons();
  }, []);
  console.log(dashboardIcons);
  return (
    <div className="w-full h-full flex flex-col gap-6 justify-around items-center bg-[#ffffff]">
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        form={form}
        name=""
        style={{
          width: "95vw",
          maxWidth: "95vw",
        }}
        autoComplete="off"
        initialValues={{
          items: [{}],
        }}
        // validateMessages={validateMessages}
        // onFinishFailed={handleFinishFailed}
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
                  title={`Define Client Organisation Dashboards `}
                  key={field.key}
                >
                  {/* Nest Form.List */}
                  <Form.Item className="no-flex-basis" label={"Dashboards"}>
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
                            <div
                              key={subField.key}
                              className="flex flex-row justify-between items-start gap-4 w-full"
                            >
                              <Form.Item
                                // initialValue={'Todo_Icon'}
                                className="basis-[20%]"
                                name={[subField.name, "brand_id"]}
                                rules={[
                                  {
                                    required: true,
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Brands"
                                  className="h-[48px] brands-select"
                                >
                                  {brandsOptions?.map((item) => {
                                    // console.log(item);
                                    return (
                                      <Select.Option value={item.id}>
                                        {item.brand_name}
                                      </Select.Option>
                                    );
                                  })}
                                  {/* Add more options as needed */}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                style={{ display: "none" }}
                                name={[subField.name, "dashboard_id"]}
                                className="hidden"
                                initialValue={0}
                              >
                                <Input
                                  placeholder="Dashboard ID"
                                  className="w-full"
                                />
                              </Form.Item>
                              <Form.Item
                                style={{ display: "none" }}
                                name={[subField.name, "brand_name"]}
                                initialValue={0}
                                className="hidden"
                              >
                                <Input
                                  placeholder="Brand Name"
                                  className="w-full"
                                />
                              </Form.Item>
                              <Form.Item
                                // initialValue={'Todo_Icon'}
                                className="basis-[30%]"
                                name={[subField.name, "dashboard_name"]}
                                rules={[
                                  {
                                    required: true,
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Dashboard Name"
                                  className="w-full py-3 text-[0.90rem]"
                                />
                              </Form.Item>
                              <Form.Item
                                className="basis-[60%]"
                                noStyle
                                name={[subField.name, "dashboard"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "this is required",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Dashboard Link"
                                  className="w-full py-3 text-[0.90rem]"
                                />
                              </Form.Item>
                              <Form.Item
                                name={[subField.name, "icons"]}
                                noStyle
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select at least one icon",
                                  },
                                ]}
                              >
                                <Select
                                  
                                  onInputKeyDown={event => {
                                    if (event.key === 'Backspace') {
                                            return event.stopPropagation()
                                      }
                                 }}
                                  mode="multiple"
                                  getPopupContainer={(trigger) => trigger.parentNode} // need scroll means enable this 
                                  // getPopupContainer={() => document.body}
                                  className="icons-select"
                                  // dropdownAlign={{ points: ['tl', 'bl'] }}
                                  // placement="topLeft"
                                  // dropdownStyle={{ top: "100%" }}
                                  placeholder="Select Dashboard Icons"
                                  style={{ width: "470px" }}
                                  value={form.getFieldValue([
                                    subField.name,
                                    "icons",
                                  ])} // Ensuring controlled component
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
                                          gap: "18px",
                                          background: "#f5f5f5",
                                          padding: "2px",
                                          borderRadius: "50%",
                                        }}
                                      >
                                        <img
                                          key={label}
                                          src={`/DashboardIcons/${label}.svg`}
                                          alt={label}
                                          style={{
                                            width: "35px",
                                            height: "35px",
                                          }}
                                        />
                                      </div>
                                    );
                                  }}
                                  
                                  
                                  showSearch={false}
                                  dropdownRender={(menu) => {
                                    const selectedValues =
                                      form.getFieldValue([
                                        subField.name,
                                        "icons",
                                      ]) || [];

                                    return (
                                      <div style={{ padding: "8px" }} >
                                        <div
                                          style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                              "repeat(4, 1fr)", // 4 icons per row
                                            gap: "8px",
                                          }}
                                        >
                                          {dashboardIcons.map((item) => {
                                            // console.log(item);
                                            const selectedIconsID = form
                                              .getFieldsValue()
                                              .items[0].dashboards[
                                                subField.name
                                              ].icons?.map((item) => {
                                                return item?.id;
                                              });
                                              console.log(selectedIconsID);
                                            const isSelected =
                                              selectedIconsID?.includes(item?.id) ? true : false;
                                            console.log(isSelected)
                                            return (
                                              <div
                                                key={item.id}
                                                onClick={() => {
                                                  if (isSelected) {
                                                    let filteredValues = form
                                                      .getFieldsValue()
                                                      ?.items[0]?.dashboards[
                                                        subField.name
                                                      ].icons?.filter(
                                                        (singleIcon) =>
                                                          singleIcon.id !==
                                                          item.id
                                                      );
                                                    // console.log(form);
                                                    const items =
                                                      form.getFieldValue(
                                                        "items"
                                                      );
                                                    items[0].dashboards[
                                                      subField.name
                                                    ].icons = filteredValues;
                                                    form.setFieldsValue({
                                                      items,
                                                    });
                                                  } else {
                                                    let addingNewIcons =
                                                      form.getFieldsValue()
                                                        .items[0].dashboards[
                                                        subField.name
                                                      ]?.icons ? form.getFieldsValue()
                                                      .items[0].dashboards[
                                                      subField.name
                                                    ].icons : [];
                                                    
                                                    if (
                                                      addingNewIcons?.length < 4
                                                    ) {
                                                      addingNewIcons.push({
                                                        id: item.id,
                                                        label: item.icon_label,
                                                      });
                                                      const items =
                                                        form.getFieldValue(
                                                          "items"
                                                        );
                                                      items[0].dashboards[
                                                        subField.name
                                                      ].icons = addingNewIcons;
                                                      form.setFieldsValue({
                                                        items,
                                                      });
                                                    } else {
                                                      notify(
                                                        "You Cannot Select More Than 4 Icons"
                                                      );
                                                    }
                                                  }
                                                }}
                                                className={`${
                                                  isSelected
                                                    ? "border-2 border-[#000000]"
                                                    : "border-2 border-[transparent]"
                                                }`}
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                  width: "40px",
                                                  height: "40px",
                                                  borderRadius: "50%",
                                                  cursor: "pointer",
                                                  border: isSelected
                                                    ? "2px solid black"
                                                    : "2px solid transparent",
                                                  transition: "all 0.2s ease",
                                                }}
                                              >
                                                <img
                                                  src={`/DashboardIcons/${item.icon_label}.svg`}
                                                  alt={item.value}
                                                  style={{
                                                    width: "40px",
                                                    height: "40px",
                                                  }}
                                                />
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  }}
                                  onChange={(selectedValues, option) => {
                                    const previousValues = form.getFieldValue([subField.name, "icons"]) || [];
                                
                                    // Prevent deletion by comparing old & new values
                                    if (selectedValues.length < previousValues.length) {
                                      form.setFieldsValue({
                                        [subField.name]: { icons: previousValues }, // Keep old values
                                      });
                                    } else {
                                      form.setFieldsValue({
                                        [subField.name]: { icons: selectedValues },
                                      });
                                    }
                                  }}
                                  // onChange={(selectedValues) => {
                                  //   form.setFieldValue(
                                  //     [subField.name, "icons"],
                                  //     selectedValues
                                  //   );
                                  //   // console.log(selectedValues);
                                  // }}
                                >
                                  
                                </Select>
                              </Form.Item>

                              <div className="basis-[10%]">
                                <CloseOutlined
                                  onClick={() => subOpt.remove(subField.name)}
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            type="solid"
                            onClick={() => subOpt.add()}
                            className="w-[100%] py-[7px] border-[1px] text-[1.1rem] border-[#9C9C9C] rounded-[6px]"
                          >
                            <span className="mr-4">+ </span>Add New Brand
                          </button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <div className="flex flex-row w-full justify-center items-center mt-10">
                <button
                  type="solid"
                  onClick={updateDashboards}
                  htmlType="submit"
                  block
                  className="bg-[#73956F] border-[2px] border-[#000000] w-full py-[10px] rounded-[6px] text-[1.1rem] text-[#ffffff]"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </Form.List>
      </Form>
    </div>
  );
}

export default MasterTable;
