import { Button, Row, Table, Tag, Col, Modal } from "antd";
import React, { useContext, useRef, useState } from "react";
import { QueryContext } from "../../App";
import PostProductModal from "../../components/postProductModal/PostProductModal";
import { useDeleteData, useGetData } from "../../utils/hooks";
import InfoAdd from "./InfoAdd/InfoAdd";
import InfoEdit from "./InfoEdit/InfoEdit";
const { confirm } = Modal;

const Info = () => {
  const infos = useGetData(["infos"], "/information");
  const item = infos?.data?.data?.[0];
  const [modalOpen, setModalOpen] = useState(false);
  const editRef = useRef(null);
  const { queryClient } = useContext(QueryContext);

  const delMut = useDeleteData("/information");
  const delBtn = () => {
    delMut.mutate(
      {
        id: item?.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["infos"] });
        },
      }
    );
  };

  const editFormRes = () => {
    editRef?.current?.resetFields();
    setModalOpen(false);
  };
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

  if (infos?.data?.data.length == 0) {
    return <InfoAdd />;
  }
  const showConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete the information?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        delBtn();
        queryClient.invalidateQueries({ queryKey: ["infos"] });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
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
                  <Button type="primary" onClick={() => setModalOpen(true)}>
                    Edit
                  </Button>
                </Col>
                <Col span={2}>
                  <Button danger onClick={() => showConfirm()}>
                    Delete
                  </Button>
                </Col>
              </Row>
            </>
          );
        }}
      />
      <PostProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        resForm={editFormRes}
      >
        <InfoEdit editRef={editRef} setModalOpen={setModalOpen} infos={infos} />
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
