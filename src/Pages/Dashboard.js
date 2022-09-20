import React from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import styled from "styled-components";
import MainChart from "../components/MainChart";
import {
  motion
} from "framer-motion";

const Dashboard = () => {
  return (
    <Container >
      <Navbar />
        <PageWrapper  >
        <Sidebar />
        <ContentWrapper  >
         <MainChart/>
        </ContentWrapper>
        </PageWrapper>
    </Container>
  );
};

const Container = styled.div`
  background: #bccccd;
  width: 100%;
  height: 100%;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

`;

const PageWrapper = styled.div`
  width: 100%;
  height: (100%-80px);
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  padding:1rem;
  align-items: flex-start;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px;
  }
`

const ContentWrapper = styled(motion.div)`
  width: 85vw;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: black;
  border-radius:10px;
  gap:0.75rem;
  
`;
export default Dashboard;
