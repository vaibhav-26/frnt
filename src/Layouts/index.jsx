import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  AuditOutlined,
  ReconciliationOutlined,
  TeamOutlined,
  LogoutOutlined,
  BarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Dropdown, Layout, Menu, Row } from "antd";
import logo from "../logo.png";
import logo1 from "../logo1.png";
import moment from "moment";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../components/Auth";
import { remove } from "../features/authTokenSlice";
import permissions from "../json/permissions.json";
const { Content, Sider, Footer } = Layout;


function Layouts(props) {
 const location = useLocation()
  const [collapsed, setCollapsed] = useState(false);
  const [companyLogo, setCompanyLogo] = useState(logo);
  const [sideWidth, setSideWidth] = useState(100);
  const [logoDisplay, setLogoDisplay] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useAuth();
  const { user } = useSelector((state) => state.token);
  const authUser = user && JSON.parse(user);

  // const permissionCheck = (permission) => {
  //   return authUser.permissions.includes(permission);
  // };

 

  const handleLogout = async () => {
    dispatch(remove());
    auth.logout();
    navigate("/ogin");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    console.log(location)
    if(location.pathname === '/'){
      navigate('/skills/all')
    }
  }, [location])
  

  const items = [
    {
      label: (
        <>
         {authUser && <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={logo1} size="large" style={{ marginRight: "15px" }} />
            <p> {authUser.name} </p>
          </div>}
        </>
      ),
      key: "0",
      style: { padding: "10px", color: "#1677ff" },
    },
    {
      type: "divider",
    },
    {
      label: "LogOut",
      key: "3",
      icon: <LogoutOutlined />,
      onClick: () => handleLogout(),
      style: {
        padding: "10px 0px 10px 20px",
        display: "flex",
        justifyContent: "start",
        textAlign: "start",
      },
    },
  ];

  const sidebarItems = [
    {
      key: `skills`,
      icon: React.createElement(UnorderedListOutlined),
      label: `Skills`,
      children: [
        {
          key: `/skills/all`,
          icon: React.createElement(UnorderedListOutlined),
          label: `All Skills`,
          onClick: () => {
            navigate("/skills/all");
          },
        },
        {
          key: `/skills`,
          icon: React.createElement(ReconciliationOutlined),
          label: `My Skills`,
          onClick: () => {
            navigate("/skills", { replace: true });
          },
        },
        {
          key: `/skills/team`,
          icon: React.createElement(AuditOutlined),
          label: `Team Skills`,
          onClick: () => {
            navigate("/skills/team", { replace: true });
          },
        },
      ],
    },
    {
      key: `/team`,
      icon: React.createElement(TeamOutlined),
      label: `Team`,
      onClick: () => {
        navigate("/team", { replace: true });
      },
    },
    {
      key: `/report`,
      icon: React.createElement(BarChartOutlined),
      label: `Report`,
      onClick: () => {
        navigate("/report", { replace: true });
      },
    },
    {
      key: `/users`,
      icon: React.createElement(UserOutlined),
      label: `Users`,
      onClick: () => {
        navigate("/users", { replace: true });
      },
    },
  ];

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            padding: "0px",
            backgroundColor: "white",
            height: "100%",
            borderBottom: "1px solid #edf2f9",
          }}
        >
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Col style={{ display: "flex", alignItems: "center" }}>
              {logoDisplay ? (
                <div
                  style={{
                    width: collapsed ? sideWidth : "270px",
                    borderRight: "1px solid #edf2f9",
                    display: "flex",
                    justifyContent: "center",
                    transition: "width 0.2s",
                  }}
                >
                  <img
                    src={companyLogo}
                    alt="logo"
                    style={{
                      height: "75px",
                      padding: "5px",
                    }}
                  />
                </div>
              ) : null}

              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => {
                    setCollapsed(!collapsed);
                    setCompanyLogo(collapsed ? logo : logo1);
                  },
                  style: { fontSize: "18px", marginLeft: "30px" },
                }
              )}
            </Col>
            <Col style={{ display: "flex", alignItems: "center" }}>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
                placement="bottomLeft"
              >
                <Avatar
                  src={logo1}
                  size="85px"
                  style={{ marginRight: "25px", height: "55px", width: "55px" }}
                />
              </Dropdown>
            </Col>
          </Row>
        </div>
        <Layout className="site-layout">
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="lg"
            collapsedWidth={sideWidth}
            onBreakpoint={(value) => {
              setCollapsed(value);
              if (value) {
                setSideWidth(0);
                setLogoDisplay(false);
              }
            }}
            style={{
              backgroundColor: "white",
              borderRight: "1px solid #edf2f9",
              zIndex: "1001",
            }}
            width={270}
          >
            <Menu
              defaultSelectedKeys={window.location.pathname}
              mode="inline"
              items={sidebarItems}
              className="text-color"
              style={{ borderTop: "1px solid #edf2f9" }}
            />
          </Sider>
          <Content
            style={{
              margin: "16px 16px",
            }}
          >
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 360,
                backgroundColor: "white",
              }}
            >
              <Outlet />
            </Content>
          </Content>
        </Layout>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Copyright © {moment().year()} Volansys. All rights reserved.
        </Footer>
      </Layout>
    </>
  );
}

export default Layouts;
