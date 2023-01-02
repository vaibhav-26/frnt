import {
  AuditOutlined,
  DownOutlined,
  ReconciliationOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Badge, Button, Dropdown, Progress, Space, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { red, green } from "@ant-design/colors";

function TeamSkills() {
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    defaultFunction();
  }, []);

  const expandedRowRender = () => {
    const columns = [
      {
        title: "Skills",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Start Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "End Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Progress",
        dataIndex: "upgradeNum",
        key: "upgradeNum",
        render: () => <Progress percent={100} />,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: "2014-12-24",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
        description: "description " + (i + 1),
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: "Screen " + (i + 1),
    });
  }

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
              <AuditOutlined style={{ fontSize: "20px", color: "#3f87f5" }} />
            </div>
            <div style={{ marginLeft: "20px" }}>
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                Team Skills
              </span>
              <br />
              <span style={{ fontSize: "14px", color: "#7e9cc6" }}>
                Assigned skills to team members
              </span>
            </div>
          </div>
          <div>
            <Button
              className="button"
              // onClick={() => navigate("/skill/add", { replace: true })}
            >
              Add
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              className="button"
              // onClick={() => navigate("/skill/add", { replace: true })}
            >
              Assign Assessment
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: ["0"],
          }}
          dataSource={data}
        />
      </Spin>
    </>
  );
}

export default TeamSkills;
