import React from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import styled from "styled-components";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

const Dashboard = () => {
  return (
    <Container >
      <Navbar />
        <PageWrapper  >
        <Sidebar />
        <ContentWrapper  >
          Dashboard
        </ContentWrapper>
        </PageWrapper>
    </Container>
  );
};

const Container = styled.div`
  background: #bccccd;
  width: 100%;
  height: 100%;

`;

const PageWrapper = styled.div`
  width: 100%;
  height: (100%-80px);
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  padding:1rem;
  align-items: flex-start;
`

const ContentWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #bccccd;
  width: 68vw;
  gap:0.75rem;
  
`;
export default Dashboard;
