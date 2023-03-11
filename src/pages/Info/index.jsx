import { Button, Row, Table, Tag, Col } from "antd";
import React from "react";
import PostProductModal from "../../components/postProductModal/PostProductModal";
import { useGetData } from "../../utils/hooks";
import InfoAdd from "./InfoAdd/InfoAdd";
import InfoEdit from "./InfoEdit/InfoEdit";

const Info = () => {
  const infos = useGetData(["infos"], "/information");
  const item = infos?.data?.data?.[0];
  // console.log(item);
  const dataSource = [
    {
      email: item?.email,
      tags: item?.phone,
      telegram: item?.telegram,
      instagram: item?.instagram,
      address: item?.address,
    },
  ];

  if (infos?.data?.data.length >= 0) {
    console.log(infos?.data?.data);
    return <InfoAdd />;
  }

  return (
    <>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        footer={(details) => {
          return (
            <>
              <Row justify="end">
                <Col span={2}>
                  <Button type="primary">Edit</Button>
                </Col>
                <Col span={2}>
                  <Button danger>Delete</Button>
                </Col>
              </Row>
            </>
          );
        }}
      />
      <PostProductModal>
        <InfoEdit />
      </PostProductModal>
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
    dataIndex: "tags",
    key: "tags",
    render: (_, { tags }) => (
      <>
        {tags?.map((tag, i) => {
          return (
            <Tag color="green" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];
