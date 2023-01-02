import React, { useEffect } from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { getRequest, postRequest } from "../../api";
import { Button, Form, Input, Space, Spin } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AddSkill() {
  const [loading, setLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [skill, setSkill] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  const handleCancel = () => {
    navigate("/skills/all", { replace: true });
  };

  const defaultFunction = async () => {
    setLoading(true);
    if (location?.state?.id) {
      getRequest(`skills/${location.state.id}`).then(({ data }) => {
        setSkill(data);
        setLoading(false);
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    defaultFunction();
  }, []);

  const onFinish = async (values) => {
    setIsSubmit(true);
    await postRequest("skill/add", values).then(({ data }) => {
      navigate("/skills/all", { replace: true });
      setIsSubmit(false);
    });
    setIsSubmit(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Spin spinning={loading}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <UnorderedListOutlined
                style={{ fontSize: "20px", color: "#3f87f5" }}
              />
            </div>
            <div style={{ marginLeft: "20px" }}>
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                {location?.state?.id ? "Edit" : "Add"} Skill
              </span>
            </div>
          </div>
        </div>

        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          className="form"
        >
          <Form.Item
            initialValue={skill.name}
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              className="inputfield"
              style={{ padding: "10px" }}
              placeholder="Enter Name"
            />
          </Form.Item>
          <Form.Item
            initialValue={skill.description}
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input
              className="inputfield"
              style={{ padding: "10px" }}
              placeholder="Enter Description"
            />
          </Form.Item>
          <div style={{ padding: "0px 0px", width: "80%" }}>
            <p style={{ fontWeight: "bold" }}>Add Topic :</p>
            <Form.List name="topic" initialValue={skill?.children}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <>
                      <Space
                        key={field.key}
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "name"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing Name",
                            },
                          ]}
                          style={{ width: "100%" }}
                          noStyle
                        >
                          <Input
                            style={{ padding: "10px", width: "100%" }}
                            placeholder="Topic Name"
                          />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "description"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing description",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            style={{ padding: "10px" }}
                            placeholder="Description"
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                      <div style={{ padding: "0px 30px" }}>
                        <p style={{ fontWeight: "bold" }}>Add Sub Topic</p>
                        <Form.List name="subtopics">
                          {(subtopics, { add, remove }) => (
                            <>
                              {subtopics.map((subtopic) => (
                                <Space
                                  key={subtopic.key}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "10px",
                                  }}
                                  align="baseline"
                                >
                                  <Form.Item
                                    {...subtopic}
                                    name={[subtopic.name, "name"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing sub topic name",
                                      },
                                    ]}
                                    noStyle
                                  >
                                    <Input
                                      style={{ padding: "10px" }}
                                      placeholder="Sub Topic Name"
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...subtopic}
                                    name={[subtopic.name, "description"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing description",
                                      },
                                    ]}
                                    noStyle
                                  >
                                    <Input
                                      style={{ padding: "10px" }}
                                      placeholder="Description"
                                    />
                                  </Form.Item>
                                  <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(subtopic.name)}
                                  />
                                </Space>
                              ))}
                              <Form.Item>
                                <Button
                                  type="dashed"
                                  onClick={() => add()}
                                  block
                                  icon={<PlusOutlined />}
                                  style={{ width: "auto" }}
                                >
                                  Add sub topic
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>
                      </div>
                    </>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      style={{ width: "auto" }}
                    >
                      Add topic
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          <br />
          <Form.Item
            className="submit_button"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <Button className="modal-cancel-button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className="modal-submit-button"
              htmlType="submit"
              loading={isSubmit}
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}

export default AddSkill;
