import { Table, Button, Modal } from "antd";
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineEdit, AiOutlineDelete, AiFillWarning } from "react-icons/ai";
import PostProductModal from "../../../components/postProductModal/PostProductModal";
import EditProductForm from "../EditProductForm/EditProductForm";
import { useDeleteData } from "../../../utils/hooks";
import { queryClient } from "../../../";
import { useTranslation } from "react-i18next";
import { instanceImg } from "../../../utils/axios";

const Container = styled.div`
  /* overflow-x: scroll; */
`;
const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
`;
const EditBtn = styled(Button)`
  border: none;
  background: none;
  font-size: 22px;
  line-height: 1;
  padding: 5px;
  margin-right: 10px;
  color: #005036;
  transition: 0.2s;
  &:hover {
    color: #005036 !important;
    transform: scale(1.09);
  }
`;
const DeleteBtn = styled(EditBtn)`
  color: #f00;
  &:hover {
    color: #f00 !important;
  }
`;

const ProductsTable = ({ data }) => {
  const editRef = useRef(null);
  const [id, setId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { t } = useTranslation();

  const columns = [
    {
      title: t("Name", { text: "_Uz" }),
      dataIndex: "name_Uz",
      key: "name_Uz",
    },
    {
      title: t("Name", { text: "_Ru" }),
      dataIndex: "name_Ru",
      key: "name_Ru",
    },
    {
      title: t("Name", { text: "_En" }),
      dataIndex: "name_En",
      key: "name_En",
    },
    {
      title: t("Price"),
      dataIndex: "price",
      key: "price",
      sorter: true,
    },
    {
      title: t("Discount"),
      dataIndex: "discount",
      key: "discount",
      sorter: true,
    },
    {
      title: t("Photo"),
      dataIndex: "photo",
      key: "photo",
      ellipsis: true,
    },
    {
      title: t("Description", { text: "_Uz" }),
      dataIndex: "description_Uz",
      key: "description_Uz",
      ellipsis: true,
    },
    {
      title: t("Description", { text: "_Ru" }),
      dataIndex: "description_Ru",
      ellipsis: true,
      key: "description_Ru",
    },
    {
      title: t("Description", { text: "_En" }),
      dataIndex: "description_En",
      ellipsis: true,
      key: "description_En",
    },
    {
      title: t("Category", { text: "_Uz" }),
      dataIndex: "category_Uz",
      key: "category_Uz",
      ellipsis: true,
    },
    {
      title: t("Category", { text: "_Ru" }),
      dataIndex: "category_Ru",
      key: "category_Ru",
      ellipsis: true,
    },
    {
      ellipsis: true,
      title: t("Category", { text: "_En" }),
      dataIndex: "category_En",
      key: "category_En",
    },
    {
      title: t("Control"),
      dataIndex: "btns",
      key: "btns",
      fixed: "right",
      width: 105,
    },
  ];

  const delMut = useDeleteData("/products");

  const delBtn = (id) => {
    delMut.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("products");
        },
      }
    );
  };

  const { confirm } = Modal;
  const showConfirm = (id) => {
    confirm({
      title: t("Are you sure you want to delete the product?"),
      // icon: <ExclamationCircleFilled />,
      // content: "Some descriptions",
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk() {
        delBtn(id);
        queryClient.invalidateQueries("products");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const editFormRes = () => {
    setModalOpen(false);
    editRef?.current?.resetFields();
  };

  const dataSource = data?.map((d, i) => {
    return {
      key: i,
      name_Uz: d.name_Uz,
      name_Ru: d.name_Ru,
      name_En: d.name_En,
      price: d?.price,
      discount: d?.discount,
      description_Uz: d?.description_Uz,
      description_Ru: d?.description_Ru,
      description_En: d?.description_En,
      category_Uz: d?.Category.name_Uz,
      category_Ru: d?.Category.name_Ru,
      category_En: d?.Category.name_En,
      photo: (
        <img
          style={{ width: 40 }}
          src={instanceImg + d?.photo?.path}
          alt="Not found"
        />
      ),
      btns: (
        <BtnWrap>
          <EditBtn
            onClick={() => {
              setModalOpen(true);
              setId(d?.id);
            }}
          >
            <AiOutlineEdit />
          </EditBtn>
          <DeleteBtn onClick={() => showConfirm(d?.id)}>
            <AiOutlineDelete />
          </DeleteBtn>
        </BtnWrap>
      ),
    };
  });

  return (
    <Container>
      <Table columns={columns} dataSource={dataSource} scroll={{ x: 1500 }} />
      <PostProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        resForm={editFormRes}
      >
        <EditProductForm
          editRef={editRef}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          id={id}
        />
      </PostProductModal>
    </Container>
  );
};

export default ProductsTable;
