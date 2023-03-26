import React from "react";
import styled from "styled-components";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { Dropdown, Select } from "antd";
import i18next from "i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useTranslation } from "react-i18next";
import { useUser } from "../../utils/state";
import { queryClient } from "../..";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 10px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  .fi {
    filter: drop-shadow(0 0 1px #000);
  }
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
  const user = useUser((s) => s.user);
  const nav = useNavigate();

  const { t } = useTranslation();

  const items = [
    {
      label: (
        <BtnItem
          onClick={() => {
            localStorage.removeItem("access_token");
            queryClient.invalidateQueries("userGetMe");
            nav("/signin");
          }}
        >
          <AiOutlineLogout />
          <span>{t("Sign out")}</span>
        </BtnItem>
      ),
      key: "0",
      // onClick: () => console.log("work"),
    },
  ];

  const handleChange = (l) => {
    i18next.changeLanguage(l);
    localStorage.setItem("lang", l);
  };

  return (
    <Container>
      <Select
        defaultValue={localStorage.getItem("lang") || "en"}
        style={{ width: "max-content" }}
        onChange={handleChange}
        options={[
          {
            value: "uz",
            label: (
              <span>
                <span className="fi fi-uz"></span>
              </span>
            ),
          },
          {
            value: "en",
            label: (
              <span>
                <span className="fi fi-gb"></span>
              </span>
            ),
          },
          {
            value: "ru",
            label: (
              <span>
                <span className="fi fi-ru"></span>
              </span>
            ),
          },
        ]}
      />
      <UserData>
        <UserName>{user?.name}</UserName>
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
