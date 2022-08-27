import React from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import styled from "styled-components";

const Dashboard = () => {
  return (
    <Container>
      <Navbar />
        <PageWrapper>
        <Sidebar />
        Dashboard
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
export default Dashboard;
