import React from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar/Sidebar";

const Container = styled.div`
  max-width: 1340px;
  margin: 0 auto;
  display: flex;
  position: relative;
`;

const Left = styled.div`
  width: 20%;
  height: 100vh;
  background-color: #3a6963;
  position: sticky;
  left: 0;
  top: 0;
`;
const Right = styled.div`
  width: 80%;
  position: relative;
`;
const Head = styled.div`
  background-color: #fff;
  padding: 20px;
  position: sticky;
  left: 0;
  top: 0;
`;
const Body = styled.div`
  margin: 15px 0 0 15px;
  padding: 10px;
  background-color: #fff;

  min-height: 900px;
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Left>
        <Sidebar />
      </Left>
      <Right>
        <Head>This is heading section</Head>
        <Body>{children}</Body>
      </Right>
    </Container>
  );
};

export default Layout;
