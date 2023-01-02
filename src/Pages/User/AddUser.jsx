import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import UserForm from "../../components/UserForm";

function AddUser() {
  const [loading, setLoading] = useState(false);

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
                Add User
              </span>
            </div>
          </div>
        </div>
        <UserForm setLoading={setLoading} />
      </Spin>
    </>
  );
}

export default AddUser;
