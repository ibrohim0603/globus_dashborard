import { Button, Row, Tag, Col, Modal, Descriptions, message } from "antd";
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
// import parse from "html-react-parser";
import { QueryContext } from "../../App";
import PostProductModal from "../../components/postProductModal/PostProductModal";
import { useDeleteData, useGetData } from "../../utils/hooks";
import InfoAdd from "./InfoAdd/InfoAdd";
import InfoEdit from "./InfoEdit/InfoEdit";
const { confirm } = Modal;

const Map = styled.div`
  width: 100%;
  min-height: 400px;
  /* background-color: #123; */
  iframe {
    width: 100%;
  }
`;

const Info = () => {
  const infos = useGetData(["infos"], "/information");
  const item = infos?.data?.data?.[0];
  const [modalOpen, setModalOpen] = useState(false);
  const editRef = useRef(null);
  const { queryClient } = useContext(QueryContext);
  const parse = require("html-react-parser");

  const telAddBtn = (add) => {
    const phoneArr = editRef?.current?.getFieldValue("phone");

    if (phoneArr.some((i) => !!i == false)) {
      message.error("Bo'sh joyni to'ldiring");
    } else add();
  };

  const delMut = useDeleteData("/information");
  const delBtn = () => {
    delMut.mutate(
      {
        id: item?.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["infos"] });
          message.success(
            "Information was successfully deleted! Refresh the page if the information is not deleted"
          );
        },
      }
    );
  };

  const editFormRes = () => {
    editRef?.current?.resetFields();
    setModalOpen(false);
  };

  const dataSource = [
    {
      email: item?.email,
      tags: item?.phone,
      telegram: item?.telegram,
      instagram: item?.instagram,
      address: item?.address,
    },
  ];

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
  if (infos?.data?.data.length == 0) {
    return <InfoAdd />;
  } else {
    return (
      <>
        <PostProductModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          resForm={editFormRes}
        >
          <InfoEdit
            editRef={editRef}
            setModalOpen={setModalOpen}
            infos={infos}
            telAddBtn={telAddBtn}
          />
        </PostProductModal>

        {infos.isLoading ? (
          "Loading"
        ) : (
          <Row gutter={[0, 15]} style={{ padding: 10 }}>
            <Col span={24}>
              <Descriptions title="Information" layout="vertical" bordered>
                <Descriptions.Item label="Email" style={{ maxWidth: 100 }}>
                  {item?.email}
                </Descriptions.Item>

                <Descriptions.Item label="Telegram" style={{ maxWidth: 130 }}>
                  {item?.telegram}
                </Descriptions.Item>
                <Descriptions.Item label="Instagram" style={{ maxWidth: 130 }}>
                  {item?.instagram}
                </Descriptions.Item>
                <Descriptions.Item label="Telephone" span={3}>
                  <Row gutter={[5, 5]}>
                    {item?.phone.map((p, i) => (
                      <Col style={{ width: "max-content", cursor: "pointer" }}>
                        <Tag color={i < 2 ? "geekblue" : "yellow"}>{p}</Tag>
                      </Col>
                    ))}
                  </Row>
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  {item?.address}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={24}>
              <Map>{parse(item?.addressMap)}</Map>
            </Col>
          </Row>
        )}

        <Row justify="end" gutter={[15, 0]} style={{ padding: 10 }}>
          <Col span={12}>
            <Button
              block
              type="primary"
              size="large"
              onClick={() => setModalOpen(true)}
            >
              Edit
            </Button>
          </Col>
          <Col span={12}>
            <Button danger block size="large" onClick={() => showConfirm()}>
              Delete
            </Button>
          </Col>
        </Row>
      </>
    );
  }
};

export default Info;
