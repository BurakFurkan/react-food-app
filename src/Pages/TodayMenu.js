import React from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getUserMeals } from "../features/userSlice";

import Carousel from "../components/Carousel";

const TodayMenu = () => {


  return (
    <Container>
      <Navbar />
      <PageWrapper>
        <Sidebar />
        <Carousel/>
      </PageWrapper>
    </Container>
  );
};

const Container = styled.div`
  background: #bccccd;
  width: 100%;
  height: 90vh;
`;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  padding: 1rem;
  align-items: flex-start;
`;
export default TodayMenu;
