import React, { useEffect } from "react";
import { API } from "../../App";
import { toast } from "react-toastify";
import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Card, Form, Input, Select, Space } from "antd";
import axios from "axios";

function Brands() {
  const [form] = Form.useForm();
  const validateMessages = () => {
    notify("${label} is required");
  };
  const successNotify = (data) => toast.success(data);
  const notify = (data) => toast.error(data);

  const createBrands = async (formData) => {
    console.log(form.getFieldsValue().items[0]);
  };

  const getBrands = async (formData) => {
    try {
      let user = JSON.parse(localStorage.getItem("data"));
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      const res = await axios.get(`${API}/admin/getbrands`, {
        headers: headers,
      });
      let existing_brands = [];
      res.data.map((item) => {
        existing_brands.push({
          brand_name: item.brand_name,
          id: item.id,
        });
      });

      const items = form.getFieldValue("items");
      items[0].brands = existing_brands;
      // console.log(existing_brands)
      form.setFieldsValue({ items });
    } catch (err) {
      console.log(err);
      notify(err.response.data.detail);
    }
  };

  const updateBrands = async () => {
    let user = JSON.parse(localStorage.getItem("data"));
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };
    // console.log(typeof formData);
    let formData = {
      data: form.getFieldsValue().items[0].brands,
    };
    try {
      const data = await axios.put(`${API}/admin/update/brand`, formData, {
        headers,
      });
      if (data.status === 200) {
        successNotify("Updated Brands Successfully");
      }
    } catch (err) {
      notify(err.response.data.detail);
    }
  };
  const handleFinishFailed = ({ errorFields }) => {
    console.log(errorFields);
    errorFields.forEach((error) => {
      toast.error(error.name[error.name.length - 1] + " is Required", {
        toastId: `${error.name[error.name.length - 1]}`,
      });
    });
  };
  useEffect(() => {
    getBrands();
  }, []);
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
        name="dynamic_form_complex"
        style={{
          width: 400,
          maxWidth: 400,
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
                  title={`Create or Edit Brands`}
                  key={field.key}
                >
                  {/* Nest Form.List */}
                  <Form.Item label="Create or Edit Brands" className="basis-[60%]">
                    <Form.List name={[field.name, "brands"]}>
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
                              className="flex flex-row justify-center items-center gap-12 w-full"
                            >
                              <Form.Item
                                className="basis-[60%]"
                                noStyle
                                name={[subField.name, "brand_name"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "this is required",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Brand Name"
                                  className="w-full py-2 text-[1rem]"
                                />
                              </Form.Item>
                              <Form.Item
                                style={{ display: "none" }}
                                name={[subField.name, "id"]}
                                initialValue={0}
                                className="hidden"
                              >
                                <Input
                                  placeholder="Brand Name"
                                  className="w-full"
                                />
                              </Form.Item>
                              <div className="basis-[40%]">
                                <CloseOutlined
                                  onClick={() => subOpt.remove(subField.name)}
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            type="solid"
                            onClick={() => subOpt.add()}
                            className="w-[67%] py-[7px] border-[1px] text-[1.1rem] border-[#9C9C9C] rounded-[6px]"
                          >
                            <span className="mr-4">+ </span>Add New Brand
                          </button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <div className="flex flex-row w-full justify-center items-center">
                <button
                  type="solid"
                  onClick={updateBrands}
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

export default Brands;
