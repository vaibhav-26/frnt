import React, { useEffect, useState } from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { getRequest, postRequest } from "../../api";
import { Button, Form, Input, Space, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import SkillForm from "../../components/SkillForm";

function EditSkill() {
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    getRequest(`skills/${location.state.id}`).then(({ data }) => {
      setSkill(data);
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
              <UnorderedListOutlined
                style={{ fontSize: "20px", color: "#3f87f5" }}
              />
            </div>
            <div style={{ marginLeft: "20px" }}>
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                Edit Skill
              </span>
            </div>
          </div>
        </div>
        <SkillForm setLoading={setLoading} skill={skill} />
      </Spin>
    </>
  );
}

export default EditSkill;
