import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { useGetData } from "../../utils/hooks";
import CategoryTable from "./CategoryTable/CategoryTable";
import PostProductModal from "../../components/postProductModal/PostProductModal";
import CategoryAddForm from "./CategoryAddForm";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader/Loader";

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
`;
const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

const Category = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const categories = useGetData(["categories"], `/category`);
  const formRef = useRef(null);
  const { t } = useTranslation();

  const resForm = () => {
    setModalOpen(false);
    formRef.current.resetFields();
  };

  return (
    <>
      <Container>
        <Top>
          <Button
            type="primary"
            onClick={() => setModalOpen(true)}
            size="large"
          >
            {t("Add Category")}
          </Button>
        </Top>
        <CategoryWrapper>
          {categories?.isLoading ? (
            <Loader />
          ) : (
            <CategoryTable
              categories={categories}
              setModalOpen={setModalOpen}
            />
          )}
        </CategoryWrapper>
      </Container>
      <PostProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        resForm={resForm}
      >
        <CategoryAddForm formRef={formRef} setModalOpen={setModalOpen} />
      </PostProductModal>
    </>
  );
};

export default Category;
