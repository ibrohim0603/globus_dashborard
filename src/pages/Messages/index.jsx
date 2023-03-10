import { Button, Table } from "antd";
import React from "react";
import { useGetData } from "../../utils/hooks";

const Messages = () => {
  const messages = useGetData(["messages"], "/message");

  const dataSource = messages?.data?.data.map((d, i) => {
    return {
      key: i,
      time: d?.createdAt.slice(0, 10).replaceAll("-", "."),
      time2: d?.createdAt.slice(11, 16).replaceAll("-", "."),
      subject: d?.subject,
      // message: d?.message,
      phone: d?.phone,
      status: d?.status,
      select: <Button style={{ color: "#005036" }}>Read</Button>,
      del: <Button danger>Remove</Button>,
    };
  });

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default Messages;

const columns = [
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    width: 100,
    colSpan: 2,
  },
  {
    title: "time2",
    dataIndex: "time2",
    key: "time2",
    colSpan: 0,
    width: 70,
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "Phone number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Select",
    dataIndex: "select",
    key: "select",
    colSpan: 2,
    width: 50,
  },
  {
    title: "del",
    width: 50,
    dataIndex: "del",
    key: "del",
    colSpan: 0,
  },
];
