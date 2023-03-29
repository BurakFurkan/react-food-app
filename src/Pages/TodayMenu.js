import React from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import styled from "styled-components";
import Carousel from "../components/Carousel";
import { motion } from "framer-motion";

const TodayMenu = () => {
  return (
    <Container>
      <Navbar />
      <PageWrapper>
        <Sidebar />
        <ContentWrapper
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100, transition: { duration: 0.2 } }}
        >
          <Carousel />
        </ContentWrapper>
      </PageWrapper>
    </Container>
  );
};

const Container = styled.div`
  background: ${(props) => props.theme.main_bg};
  

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1rem;
  align-items: flex-start;
  box-sizing: border-box;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px;
  }
`;

const ContentWrapper = styled(motion.div)`
  width: 85vw;
  height: calc(100vh - 102px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.main_bg};
  gap: 0.75rem;
`;
export default TodayMenu;
