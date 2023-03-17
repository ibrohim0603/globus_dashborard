import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { sidebarlinks } from "./sidebarlinks";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 100%;
  padding: 15px;
  height: 100vh;
`;
const Logo = styled(Link)`
  font-size: 30px;
  font-weight: 600;
  padding: 10px;
  color: #fff;
`;
const LinksWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
const SidebarLink = styled(NavLink)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  padding: 8px 10px;
  border-radius: 5px;
  transition: 0.4s;
  &:hover {
    background-color: #b4c8d2;
    color: #07a976;
    opacity: 0.9;
  }
  &.active {
    background-color: #e1e1e1;
    color: #005036;
    opacity: 1;
  }
`;
const Icon = styled.div`
  font-size: 22px;
  line-height: 1;
`;
const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Logo to="/">Logo</Logo>
      <LinksWrapper>
        {sidebarlinks.map((s, i) => (
          <SidebarLink to={s.link} key={i}>
            <Icon>{s.icon}</Icon>
            <Name>{t(s.name)}</Name>
          </SidebarLink>
        ))}
      </LinksWrapper>
    </Container>
  );
};

export default Sidebar;
