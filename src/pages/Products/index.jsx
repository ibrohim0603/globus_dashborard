import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useGetData } from "../../utils/hooks";
import { Modal, Button } from "antd";
import PostProductModal from "../../components/postProductModal/PostProductModal";
import PostForm from "../../components/postForm/postForm";
import ProductsTable from "./ProductsTable/ProductsTable";
import AddProductForm from "./AddProductForm/AddProductForm";

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
const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0 50px;
`;

const Products = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const addRef = useRef(null);

  const addFormRes = () => {
    setModalOpen(false);
    addRef?.current?.resetFields();
  };

  const products = useGetData(["products"], `/products?take=99999`);

  return (
    <>
      {products.isLoading ? (
        "Loading"
      ) : (
        <Container>
          <Top>
            <Button
              type="primary"
              onClick={() => setModalOpen(true)}
              size="large"
            >
              Create Product
            </Button>
          </Top>

          <ProductsWrapper>
            <ProductsTable data={products?.data?.data} />
          </ProductsWrapper>
        </Container>
      )}
      <PostProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        resForm={addFormRes}
      >
        <AddProductForm addRef={addRef} setModalOpen={setModalOpen} />
      </PostProductModal>
    </>
  );
};

export default Products;
