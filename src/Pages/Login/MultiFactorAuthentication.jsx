import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { postRequest } from "../../api";
import { useAuth } from "../../components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../features/authTokenSlice";
import "./login.scss";
import logo from "../../logo.png";
import bg from "../../bg.webp";
import { UserOutlined, LockOutlined, ReloadOutlined } from "@ant-design/icons";

function MultiFactorAuthentication() {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirectPath = location.state?.path || "/skills/all";
  const { user } = useSelector((state) => state.token);
  const authUser = JSON.parse(user);
  const onFinish = async (values) => {
    setIsSubmit(true);
    await postRequest("verify-token", values).then(({ data }) => {
      auth.login(data.token);
      dispatch(store({ token: data.token, user: JSON.stringify(data.user) }));
      navigate(redirectPath, { replace: true });
      setIsSubmit(false);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/skills/all");
    }
  }, []);

  return (
    <>
      {/* <div className="bg" style={{ backgroundImage: `url(${bg})`, }}> */}
      <div className="bg">
        <Row style={{ padding: "15px 30px" }} className="logo_box">
          <img src={logo} alt="logo" />
        </Row>
        <Row justify="center" className="login_layout">
          <Col xs={24} sm={24} md={8} lg={8} xl={7} className="login_box">
            <div className="login_header">
              <div className="bold_text ">
                <h2 style={{ fontWeight: "bold" }}>
                  Multi-Factor Authentication
                </h2>
              </div>
              <div>
                <p>Enter the MFA token</p>
              </div>
            </div>
            <Form
              name="basic"
              initialValues={{ remember: true, username: authUser.username }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="login_form"
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  className="inputfield"
                  style={{ padding: "10px" }}
                  placeholder="Enter UserName"
                  prefix={<UserOutlined />}
                  disabled
                />
              </Form.Item>
              <Form.Item
                name="token"
                rules={[
                  { required: true, message: "Please input your token!" },
                ]}
              >
                <Input
                  className="inputfield"
                  style={{ padding: "10px" }}
                  placeholder="Enter Token"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item className="submit_button">
                <Button className="button" htmlType="submit" loading={isSubmit}>
                  Submit
                </Button>
                <Button
                  className="button"
                  style={{ marginLeft: "10px" }}
                  icon={<ReloadOutlined />}
                  loading={isSubmit}
                >
                  Resend OTP
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MultiFactorAuthentication;
