import { Table, Button } from "antd";
import React, { useState, useRef } from "react";
import { useGetData } from "../../utils/hooks";
import PostProductModal from "../../components/postProductModal/PostProductModal";
import styled from "styled-components";
import AddInfoForm from "./addInfoForm/addInfoForm";
import EditInfoForm from "./editInfoForm/addInfoForm";


const Container = styled.div`
  width: 100%;
  padding-bottom: 30px;
`;
const Top = styled.div`
  width: 100%;
  height: 50px;
  /* background-color: #f4f6f8; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;


const Info = () => {
  const infos = useGetData(["infos"], "/information");
  // const infos = null
  const item = infos?.data?.data?.[0];

  const [infoId, setInfoId] = useState()
  const [modalOpen, setModalOpen] = useState(false);
  const formRef = useRef(null);

  const resForm = () => {
    setModalOpen(false);
    formRef.current.resetFields();
  };

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

  const Buttons = () => {
    if (infos?.data?.data.length >= 0) {
      return <>
        <Button
          type="primary"
          size="large"
          onClick={() => setModalOpen(true)}
        >Edit</Button>
        <Button size="large">Delete</Button>
      </>
    } else {
      return <Button
        type="primary"
        size="large"
        onClick={() => setModalOpen(true)}
      >
        Add Information
      </Button>;
    }
  }

  return (
    <>
      <Container>
        <Top>
          <Buttons />
        </Top>
        <InfoWrapper>

          <Table dataSource={dataSource} columns={columns} />
        </InfoWrapper>
      </Container>

      <PostProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        resForm={resForm}
      >
        {infos?.data?.data.length >= 0 ? <EditInfoForm formRef={formRef} setModalOpen={setModalOpen} id={infoId} /> : <AddInfoForm formRef={formRef} setModalOpen={setModalOpen} />}
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
    colSpan: 2,
    dataIndex: "tel",
  },
  {
    title: "Phone",
    colSpan: 0,
    dataIndex: "phone",
  },
];