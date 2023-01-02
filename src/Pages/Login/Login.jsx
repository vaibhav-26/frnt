import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { postRequest } from "../../api";
import { useAuth } from "../../components/Auth";
import { useDispatch } from "react-redux";
import { store } from "../../features/authTokenSlice";
import "./login.scss";
import logo from "../../logo.png";
import bg from "../../bg.webp";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function Login() {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectPath = "/auth";
  const onFinish = async (values) => {
    setIsSubmit(true);
    await postRequest("login", values).then(({ data }) => {
      // auth.login(data.token);
      dispatch(store({ user: JSON.stringify(data.user) }));
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
                <h2 style={{ fontWeight: "bold" }}>Sign In</h2>
              </div>
              <div>
                <p>Enter your credential to get access</p>
              </div>
            </div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
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
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input
                  type="password"
                  className="inputfield"
                  style={{ padding: "10px" }}
                  placeholder="Enter Password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <div className="login_footer">
                <Link to="/forgot-password" className="text">
                  Forget Password?
                </Link>
              </div>
              <br />
              <Form.Item className="submit_button">
                <Button className="button" htmlType="submit" loading={isSubmit}>
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Login;
