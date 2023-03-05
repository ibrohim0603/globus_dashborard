import React, { useContext } from "react";
import styled from "styled-components";
import { Admin } from "../../utils/context/AdminContext";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { Dropdown } from "antd";

const Container = styled.div`
  padding: 10px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const UserData = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: 10px;
`;
const UserName = styled.div`
  font-size: 17px;
  font-weight: 600;
`;
const AccBtn = styled.button`
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  background: none;
  border: none;
  outline: none;
  font-size: 23px;
  cursor: pointer;
`;
const BtnItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 20px;
  span {
    font-size: 17px;
  }
`;

const FixedHead = () => {
  const { admin } = useContext(Admin);

  const items = [
    {
      label: (
        <BtnItem>
          <AiOutlineSetting />
          <span>Settings</span>
        </BtnItem>
      ),
      key: "0",
    },
    {
      label: (
        <BtnItem>
          <AiOutlineLogout />
          <span>Sign out</span>
        </BtnItem>
      ),
      key: "1",
      // onClick: () => console.log("work"),
    },
  ];

  return (
    <Container>
      <UserData>
        <UserName>{admin.firstname + " " + admin.lastname}</UserName>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <AccBtn>
            <RiAdminLine />
          </AccBtn>
        </Dropdown>
      </UserData>
    </Container>
  );
};

export default FixedHead;
