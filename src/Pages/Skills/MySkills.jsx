import React, { useEffect } from "react";
import {
  ReconciliationOutlined,
  UnorderedListOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getRequest } from "../../api";
import { Input, Spin, Table, Tabs } from "antd";
import { useState } from "react";
import { useAuth } from "../../components/Auth";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

const columns = [
  {
    title: "Skills",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Start Date",
    dataIndex: "actions",
    key: "action",
  },
  {
    title: "End Date",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Progress",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

function MySkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const { user } = useSelector((state) => state.token);
  const authUser = user && JSON.parse(user);

  const defaultFunction = async () => {
    // await getRequest(`skills?page=${page}&key=${searchKey}`).then(
    //   ({ data }) => {
    //     setPage(data[0].metadata[0].page);
    //     setTotal(data[0].metadata[0].total);
    //     setSkills(data[0].data);
    //   }
    // );
    setLoading(false);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const handleSearch = async (value) => {
    setSearchKey(value);
    await getRequest(`skills?page=${1}&key=${value}`).then(({ data }) => {
      setPage(data[0].metadata[0].page);
      setTotal(data[0].metadata[0].total);
      setSkills(data[0].data);
    });
    setLoading(false);
  };

  const onPaginationChange = async (pageNumber) => {
    setLoading(true);
    await getRequest(`skills?page=${pageNumber}&key=${searchKey}`).then(
      ({ data }) => {
        setPage(data[0].metadata[0].page);
        setTotal(data[0].metadata[0].total);
        setSkills(data[0].data);
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    defaultFunction();
  }, []);

  return (
    <>
      <Spin spinning={loading}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <ReconciliationOutlined
              style={{ fontSize: "20px", color: "#3f87f5" }}
            />
          </div>
          {user && (
            <div style={{ marginLeft: "20px", marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                {authUser.name}'s Assigned Skills
              </span>
            </div>
          )}
        </div>
        <hr style={{ border: "1px solid #f0f2f5" }} />
        <div style={{ marginLeft: "20px", padding: "10px" }}>
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>
            Certification
          </span>
        </div>
        <hr style={{ border: "1px solid #f0f2f5" }} />
        <div>
          <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            className="text-color"
            items={[
              {
                label: `Completed Skill`,
                key: "1",
                children: (
                  <>
                    <Input
                      size="large"
                      className="inputfield"
                      style={{
                        width: 400,
                        padding: "9px",
                        marginBottom: "10px",
                        float: "right",
                      }}
                      placeholder="Serch Skill Name..."
                      onChange={(e) => handleSearch(e.target.value)}
                      suffix={<SearchOutlined />}
                    />

                    <Table
                      columns={columns}
                      dataSource={skills}
                      pagination={{
                        current: page,
                        total: total,
                        onChange: onPaginationChange,
                      }}
                      scroll={{ x: "400" }}
                    />
                  </>
                ),
              },
              {
                label: `Certification`,
                key: "2",
                children: `Content of Tab Pane 2`,
              },
            ]}
          />
        </div>
      </Spin>
    </>
  );
}

export default MySkills;
