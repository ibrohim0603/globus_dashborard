import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Pagination } from "antd";
import { useGetData } from "../../utils/hooks";
import SingleProduct from "./SingleProduct/SingleProduct";
import { Modal, Button } from "antd";
import PostProductModal from "../../components/postProductModal/PostProductModal";

const Container = styled.div`
  width: 100%;
  padding-bottom: 30px;
`;
const Top = styled.div`
  width: 100%;
  height: 50px;
  background-color: #734;
`;
const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0 50px;
`;
const Pag = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
`;

const Products = () => {
  const [limit, setLimit] = useState(10);
  const [current, setCurrent] = useState(1);
  const [slicedProducts, setSlicedProduts] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const products = useGetData(["products"], `/products?take=99999`);

  useEffect(() => {
    setSlicedProduts(
      products?.data?.data?.slice((current - 1) * limit, current * limit)
    );
  }, [limit, current, products?.data?.data]);

  return (
    <>
      {products.isLoading ? (
        "Loading"
      ) : (
        <Container>
          <Top>
            <Button type="primary" onClick={() => setModalOpen(true)}>
              Create
            </Button>

          </Top>
          <ProductsWrapper>
            {slicedProducts?.map((p, idx) => (
              <SingleProduct
                key={p.id}
                prod={p}
                idx={idx + (current - 1) * limit}
              />
            ))}
          </ProductsWrapper>
          <Pag>
            <Pagination
              current={current}
              onChange={(c, l) => {
                setCurrent(c);
                setLimit(l);
              }}
              total={products?.data?.total}
            />
          </Pag>
        </Container>

      )}
      <PostProductModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default Products;
