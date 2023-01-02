import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Input, Table, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteRequest, getRequest } from "../../api";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      style: { padding: "16px 0px" },
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "12%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "30%",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phonenumber",
      width: "30%",
      key: "phonenumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "30%",
      key: "status",
      render: (_, { status }) => {
        let color = status ? "green" : "volcano";

        return (
          <Tag color={color} key={status}>
            {status ? "Active" : "InActive"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "30%",
      key: "action",
      render: (_, record) => {
        return (
          <span>
            <Typography.Link
              onClick={() =>
                navigate(`/users/edit/${record._id}`, {
                  state: { id: record._id },
                })
              }
              style={{
                marginRight: 8,
              }}
            >
              <EditOutlined />
            </Typography.Link>
            <Typography.Link
              onClick={async () => {
                await deleteRequest(`user/delete/${record._id}`).then(
                  ({ data }) => {
                    setUsers((usersdata) =>
                      usersdata.filter((item) => item._id !== record._id)
                    );
                    navigate("/users", { replace: true });
                  }
                );
              }}
            >
              <DeleteOutlined />
            </Typography.Link>
          </span>
        );
      },
    },
  ];

  const handleSearch = async (value) => {
    setSearchKey(value);
    await getRequest(`users?page=${1}&key=${value}`).then(({ data }) => {
      setPage(data[0].metadata[0].page);
      setTotal(data[0].metadata[0].total);
      setUsers(data[0].data);
    });
    setLoading(false);
  };

  const onPaginationChange = async (pageNumber) => {
    setLoading(true);
    await getRequest(`users?page=${pageNumber}&key=${searchKey}`).then(
      ({ data }) => {
        setPage(data[0].metadata[0].page);
        setTotal(data[0].metadata[0].total);
        setUsers(data[0].data);
      }
    );
    setLoading(false);
  };

  const defaultFunction = async () => {
    await getRequest(`users?page=${page}&key=${searchKey}`).then(({ data }) => {
      setPage(data[0].metadata[0].page);
      setTotal(data[0].metadata[0].total);
      setUsers(data[0].data);
    });
    setLoading(false);
  };

  useEffect(() => {
    defaultFunction();
  }, []);

  return (
    <>
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
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>Users</span>
            <br />
            <span style={{ fontSize: "14px", color: "#7e9cc6" }}>
              List of Users
            </span>
          </div>
        </div>
        <div>
          <Button
            className="button"
            onClick={() => navigate("/users/add", { replace: true })}
          >
            Add User
          </Button>
        </div>
      </div>
      <Input
        size="large"
        className="inputfield"
        style={{
          maxWidth: "400px",
          padding: "9px",
          marginBottom: "10px",
          float: "right",
        }}
        placeholder="Serch Users..."
        onChange={(e) => handleSearch(e.target.value)}
        suffix={<SearchOutlined />}
      />

      <Table
        columns={columns}
        dataSource={users}
        pagination={{
          current: page,
          total: total,
          onChange: onPaginationChange,
        }}
        style={{ padding: "0px" }}
        scroll={{ x: "400" }}
      />
    </>
  );
}

export default Users;
