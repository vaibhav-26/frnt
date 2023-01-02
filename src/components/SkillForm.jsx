import React, { useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { postRequest } from "../api";
import { Button, Form, Input, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SkillForm(props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const skill = props?.skill;
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (skill) {
      form.setFieldsValue({
        name: skill?.name,
        description: skill?.description,
      });
    }
  }, [props.skill]);

  const handleCancel = () => {
    navigate("/skills/all", { replace: true });
  };

  const onFinish = async (values) => {
    setIsSubmit(true);
    await postRequest("skill/add", values).then(({ data }) => {
      navigate("/skills/all", { replace: true });
      setIsSubmit(false);
    });
    setIsSubmit(false);
  };

  return (
    <>
      <Form
        name="basic"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        className="form"
      >
        <Form.Item
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
          <Form.List name="topic">
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
    </>
  );
}

export default SkillForm;
