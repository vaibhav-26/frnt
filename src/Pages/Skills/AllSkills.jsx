import React, { useEffect } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { deleteRequest, getRequest, postRequest } from "../../api";
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { store } from "../../features/authTokenSlice";

function AllSkills() {
  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: "Skill Name",
      dataIndex: "name",
      key: "name",
      style: { padding: "16px 0px" },
    },
    {
      title: "Preview",
      dataIndex: "description",
      width: "30%",
      key: "description",
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
                navigate(`/skills/edit/${record._id}`, {
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
                await deleteRequest(`skill/delete/${record._id}`).then(
                  ({ data }) => {
                    setSkills((skilldata) =>
                      skilldata.filter((item) => item._id !== record._id)
                    );
                    navigate("/skills/all", { replace: true });
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

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const defaultFunction = async () => {
    setLoading(true);
    await getRequest(`skills?page=${page}&key=${searchKey}`).then((data) => {
      setPage(data?.data?.[0]?.metadata?.[0]?.page);
      setTotal(data?.data?.[0]?.metadata?.[0]?.total);
      setSkills(data?.data?.[0]?.data);
    });
    setLoading(false);
  };

  useEffect(() => {
    defaultFunction();
  }, []);

  const onPaginationChange = async (pageNumber) => {
    setLoading(true);
    await getRequest(`skills?page=${pageNumber}&key=${searchKey}`).then(
      ({ data }) => {
        setPage(data?.[0]?.metadata?.[0]?.page);
        setTotal(data?.[0]?.metadata?.[0]?.total);
        setSkills(data?.[0]?.data);
      }
    );
    setLoading(false);
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

  const redirectPath = "/skills/all";
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
                Skills
              </span>
              <br />
              <span style={{ fontSize: "14px", color: "#7e9cc6" }}>
                List of Skills
              </span>
            </div>
          </div>
          <div>
            <Button
              className="button"
              onClick={() => navigate("/skills/add", { replace: true })}
            >
              Add Skills
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
          style={{ padding: "0px" }}
          scroll={{ x: "400" }}
        />
      </Spin>
    </>
  );
}

export default AllSkills;
