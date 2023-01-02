import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { getRequest } from "../../api";
import { Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import UserForm from "../../components/UserForm";

function EditUser() {
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [permissionData, setPermissionData] = useState([]);

  useEffect(() => {
    console.log(location.state.id);
    setLoading(true);

    getRequest(`users/${location.state.id}`).then(({ data }) => {
      setUser(data);
      setPermissionData(data.permissions);
      setLoading(false);
    });
    setLoading(false);
  }, []);

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
              <UserOutlined style={{ fontSize: "20px", color: "#3f87f5" }} />
            </div>
            <div style={{ marginLeft: "20px" }}>
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                Edit User
              </span>
            </div>
          </div>
        </div>
        <UserForm
          setLoading={setLoading}
          user={user}
          permissionData={permissionData}
        />
      </Spin>
    </>
  );
}

export default EditUser;
