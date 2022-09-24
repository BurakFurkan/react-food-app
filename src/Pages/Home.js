import React from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import styled from "styled-components";
import Tabs from "./Layout/Tabs";
import CategoryTabs from "../components/CategoryTabs";
import SideCart from "../components/SideCart";
import { HomePagination } from "../components/HomePagination";
import {motion} from "framer-motion";

const Home = () => {
  return (
    <Container >
      <Navbar />
      <PageWrapper  >
        <Sidebar />
        <ContentWrapper initial={{opacity:0 , y:-100}} animate={{opacity:1 , y:0}} exit={{opacity:0 , y:20 , transition:{duration:0.1}}} >
          <CategoryTabs />
          <Tabs />
          <HomePagination/>
        </ContentWrapper>
        <SideCart  />
      </PageWrapper>
    </Container>
  );
};

const Container = styled.div`
  background: #bccccd;
  width: 100vw;
  height: 100vh;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

`;

const PageWrapper = styled.div`
  width: 100%;
  height: (100%-100px);
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #bccccd;
  width: 68vw;
  gap:0.75rem;

`;

export default Home;
