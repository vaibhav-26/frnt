import React, { useEffect, useState } from "react";
import { getRequest, postRequest, putRequest } from "../api";
import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import { useNavigate } from "react-router-dom";
import permissions from "../json/permissions.json";

const columns = [
  {
    title: "Permissions",
    dataIndex: "name",
    key: "permissions",
  },
];

function UserForm(props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const user = props?.user;
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getRequest(`getusers`).then(({ data }) => {
      setUsers(data);
    });
    if (user) {
      form.setFieldsValue({
        name: user?.name,
        username: user?.username,
        email: user?.email,
        phonenumber: user?.phonenumber,
        assignedTo: user?.assignedTo,
      });
      setSelectedRowKeys(user.permissions);
    }
  }, [props?.user]);

  const handleCancel = () => {
    navigate("/users", { replace: true });
  };

  const onFinish = async (values) => {
    setIsSubmit(true);
    values.permissions = selectedRowKeys;
    if (user) {
      await putRequest(`user/edit/${user._id}`, values)
        .then(({ data }) => {
          navigate("/users", { replace: true });
          setIsSubmit(false);
        })
        .catch(() => {
          setIsSubmit(false);
        });
    } else {
      await postRequest("user/add", values)
        .then(({ data }) => {
          navigate("/users", { replace: true });
          setIsSubmit(false);
        })
        .catch(() => {
          setIsSubmit(false);
        });
    }
    setIsSubmit(false);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys: selectedRowKeys,
  };

  return (
    <>
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        className="form"
        form={form}
      >
        <Row>
          <Col md={12} xl={8} style={{ width: "100%", padding: "0px 5px" }}>
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
          </Col>
          <Col md={12} xl={8} style={{ width: "100%", padding: "0px 5px" }}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                className="inputfield"
                style={{ padding: "10px" }}
                placeholder="Enter Username"
              />
            </Form.Item>
          </Col>
          <Col md={12} xl={8} style={{ width: "100%", padding: "0px 5px" }}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                className="inputfield"
                style={{ padding: "10px" }}
                placeholder="Enter Email"
              />
            </Form.Item>
          </Col>
          <Col md={12} xl={8} style={{ width: "100%", padding: "0px 5px" }}>
            <Form.Item
              name="phonenumber"
              rules={[
                {
                  required: true,
                  message: "Please input your contact number!",
                },
              ]}
            >
              <Input
                className="inputfield"
                style={{ padding: "10px" }}
                placeholder="Enter Contact Number"
              />
            </Form.Item>
          </Col>
          <Col md={12} xl={8} style={{ width: "100%", padding: "0px 5px" }}>
            <Form.Item
              name="assignedTo"
              rules={[{ required: true, message: "Please select mentor" }]}
            >
              <Select
                showSearch
                size="large"
                placeholder="select assigned member"
                options={users}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Col>
          <Col md={12} xl={8} style={{ width: "100%", padding: "0px 5px" }}>
            {!user ? (
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  className="inputfield"
                  style={{ padding: "10px" }}
                  placeholder="Enter Password"
                />
              </Form.Item>
            ) : null}
          </Col>
          <br />
          <Col md={12} xl={8} style={{ width: "100%", padding: "0px 5px" }}>
            <div style={{ padding: "0px 0px" }}>
              <Table
                columns={columns}
                dataSource={permissions}
                rowSelection={{
                  ...rowSelection,
                  checkStrictly: false,
                }}
                pagination={false}
              />
            </div>
          </Col>
        </Row>
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default UserForm;
