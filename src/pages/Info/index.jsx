import { Table, Button } from "antd";
import React, {useState, useRef} from "react";
import { useGetData } from "../../utils/hooks";
import PostProductModal from "../../components/postProductModal/PostProductModal";
import styled from "styled-components";
import AddInfoForm from "./addInfoForm/addInfoForm";


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
  const item = infos?.data?.data?.[0];

  const [modalOpen, setModalOpen] = useState(false);
  const formRef = useRef(null);

  const resForm = () => {
    setModalOpen(false);
    formRef.current.resetFields();
  };

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

  console.log(infos);

  return (
    <>
      <Container>
        <Top>
          <Button
            type="primary"
            size="large"
            onClick={() => setModalOpen(true)}
          >
            Add Information
          </Button>
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
        <AddInfoForm formRef={formRef} setModalOpen={setModalOpen} />
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
