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
    <PageWrapper>
      <Navbar />
      <MainContent>
        <Sidebar />
        <CenterColumn
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8, transition: { duration: 0.14 } }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <CategoryTabs />
          <Tabs />
          <HomePagination />
        </CenterColumn>
        <SideCart />
      </MainContent>
    </PageWrapper>
  );
};

export default Home;

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

  @media (max-width: 992px) {
    flex-direction: column;
  }

  /* Leave room for bottom tab bar on mobile */
  @media (max-width: 768px) {
    padding: 1rem 0.875rem;
    padding-bottom: calc(4.5rem + env(safe-area-inset-bottom, 0px));
  }
`;

const CenterColumn = styled(motion.main)`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
