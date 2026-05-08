import React from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import styled from "styled-components";
import Carousel from "../components/Carousel";
import { motion } from "framer-motion";

const TodayMenu = () => {
  return (
    <PageWrapper>
      <Navbar />
      <MainContent>
        <Sidebar />
        <ContentArea
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14, transition: { duration: 0.18 } }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <Carousel />
        </ContentArea>
      </MainContent>
    </PageWrapper>
  );
};

export default TodayMenu;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
`;

const MainContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    gap: 1rem;
    padding: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem 0.875rem;
    padding-bottom: calc(4.5rem + env(safe-area-inset-bottom, 0px));
  }
`;

const ContentArea = styled(motion.main)`
  flex: 1;
  min-width: 0;
`;
