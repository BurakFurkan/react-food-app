import React from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import styled from "styled-components";
import Tabs from "./Layout/Tabs";
import CategoryTabs from "../components/CategoryTabs";
import SideCart from "../components/SideCart";

const Home = () => {
  return (
    <Container>
      <Navbar />
      <PageWrapper>
        <Sidebar />
        <HomeWrapper>
          <CategoryTabs />
          <Tabs />
        </HomeWrapper>
        <SideCart />
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

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #bccccd;
  width: 68vw;
  gap:0.75rem;
`;

export default Home;
