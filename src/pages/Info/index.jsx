// <<<<<<< HEAD
import { Button, Row, Table, Tag, Col } from "antd";
import React from "react";
import PostProductModal from "../../components/postProductModal/PostProductModal";
import { useGetData } from "../../utils/hooks";
import InfoAdd from "./InfoAdd/InfoAdd";
import InfoEdit from "./InfoEdit/InfoEdit";
// =======
// import { Table, Button } from "antd";
// import React, {useState, useRef} from "react";
// import { useGetData } from "../../utils/hooks";
// import PostProductModal from "../../components/postProductModal/PostProductModal";
// import styled from "styled-components";
// import AddInfoForm from "./addInfoForm/addInfoForm";

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

// >>>>>>> 79c9eae2c6ef3211191e9c1fbd0fc67631e05d82

const Info = () => {
  const infos = useGetData(["infos"], "/information");
  const item = infos?.data?.data?.[0];
  // <<<<<<< HEAD
  // console.log(item);
  // =======

  const [modalOpen, setModalOpen] = useState(false);
  const formRef = useRef(null);

  const resForm = () => {
    setModalOpen(false);
    formRef.current.resetFields();
  };

  console.log(item);
  // >>>>>>> 79c9eae2c6ef3211191e9c1fbd0fc67631e05d82
  const dataSource = [
    {
      email: item?.email,
      tags: item?.phone,
      telegram: item?.telegram,
      instagram: item?.instagram,
      address: item?.address,
    },
  ];

  // <<<<<<< HEAD
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

// console.log(infos);

//   return (
//     <>
//       <Container>
//         <Top>
//           <Button
//             type="primary"
//             size="large"
//             onClick={() => setModalOpen(true)}
//           >
//             Add Information
//           </Button>
//         </Top>
//         <InfoWrapper>

//           <Table dataSource={dataSource} columns={columns} />
//         </InfoWrapper>
//       </Container>

//       <PostProductModal
//         modalOpen={modalOpen}
//         setModalOpen={setModalOpen}
//         resForm={resForm}
//       >
//         <AddInfoForm formRef={formRef} setModalOpen={setModalOpen} />
// >>>>>>> 79c9eae2c6ef3211191e9c1fbd0fc67631e05d82
//       </PostProductModal>
//     </>
//   );
// };

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
