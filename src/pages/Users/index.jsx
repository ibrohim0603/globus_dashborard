import { Table } from "antd";
import React from "react";
import { useGetData } from "../../utils/hooks";

const Users = () => {
  const users = useGetData(["users"], "/user");

  const dataSource = users?.data?.map((u) => {
    return {
      key: u?.id,
      id: u?.id,
      name: u?.name,
      email: u?.email,
    };
  });

  return (
    <>
      {users.isLoading ? (
        "Loading"
      ) : (
        <Table dataSource={dataSource} columns={columns} />
      )}
    </>
  );
};

export default Users;

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 50,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];
