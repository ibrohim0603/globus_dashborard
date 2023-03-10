import { Table } from "antd";
import React from "react";
import { useGetData } from "../../utils/hooks";

const Info = () => {
  const infos = useGetData(["infos"], "/information");
  const item = infos?.data?.data?.[0];
  console.log(item);
  const dataSource = [
    {
      email: item?.email,
      tel: item?.phone[0],
      phone: item?.phone[1],
      telegram: item?.telegram,
      instagram: item?.instagram,
      address: item?.address,
    },
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default Info;

const columns = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Telegram",
    dataIndex: "telegram",
    key: "telegram",
  },
  {
    title: "Instagram",
    dataIndex: "instagram",
    key: "instagram",
  },
  {
    title: "Phone numbers",
    colSpan: 2,
    dataIndex: "tel",
  },
  {
    title: "Phone",
    colSpan: 0,
    dataIndex: "phone",
  },
];
