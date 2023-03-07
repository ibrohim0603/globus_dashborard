import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #005036;
  border-radius: 5px;
  padding: 3px 12px;
  background-color: #f4f6f8;
`;
const Left = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 45px 300px 150px;
  font-size: 16px;
  line-height: 1;
`;
const Num = styled.div`
  font-weight: 600;
  color: #005036;
  margin-left: 5px;
`;
const Name = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const Price = styled.div`
  white-space: nowrap;
`;

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 10px;
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

const SingleProduct = ({ prod, idx }) => {
  return (
    <Container>
      <Left>
        <Num>{idx + 1}</Num>
        <Name>{prod?.name_Uz}</Name>
        <Price>{prod?.price} so'm</Price>
      </Left>
      <BtnWrap>
        <EditBtn hover>
          <AiOutlineEdit />
        </EditBtn>
        <DeleteBtn>
          <AiOutlineDelete />
        </DeleteBtn>
      </BtnWrap>
    </Container>
  );
};

export default SingleProduct;
