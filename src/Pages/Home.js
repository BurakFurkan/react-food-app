import React from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import styled from "styled-components";
import Tabs from "./Layout/Tabs";
import CategoryTabs from "../components/CategoryTabs";
import SideCart from "../components/SideCart";
import { HomePagination } from "../components/HomePagination";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Container>
      <Navbar />
      <PageWrapper>
        <Sidebar />
        <ContentWrapper
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, transition: { duration: 0.1 } }}
        >
          <CategoryTabs />
          <Tabs />
          <HomePagination />
        </ContentWrapper>
        <SideCart />
      </PageWrapper>
    </Container>
  );
};

const Container = styled.div`
  background: ${(props) => props.theme.main_bg};
  min-height: 100vh;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  align-items: flex-start;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 5px;
  }
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.main_bg};
  max-height: 85vh;
  gap: 0.5rem;
`;

export default Home;
