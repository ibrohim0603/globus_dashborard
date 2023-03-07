import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import FixedHead from "../FixedHead/FixedHead";
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
  transition: 0.4s;
  box-shadow: 5px 0 0 #f2f4f6,
    0 1px 3px ${(p) => (p.y < 65 ? "#005036, 0 0 5px #005036" : "transparent")};
  position: sticky;
  left: 0;
  top: 0;
  z-index: 1000;
`;
const Body = styled.div`
  margin: 15px 0 0 15px;
  padding: 10px;
  background-color: #fff;
`;

const Layout = ({ children }) => {
  const bodyRef = useRef(null);

  const [y, setY] = useState();

  const getPosition = () => {
    const y = bodyRef.current.getBoundingClientRect().y;
    setY(y);
  };

  useEffect(() => {
    getPosition();
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", getPosition);
  }, []);

  return (
    <Container>
      <Left>
        <Sidebar />
      </Left>
      <Right>
        <Head y={y}>
          <FixedHead />
        </Head>
        <Body ref={bodyRef}>{children}</Body>
      </Right>
    </Container>
  );
};

export default Layout;
