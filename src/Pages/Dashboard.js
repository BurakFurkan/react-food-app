import React from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import styled from "styled-components";
import MainChart from "../components/MainChart";
import MealChart from "../components/MealChart";
import { useSelector} from "react-redux";
import { motion } from "framer-motion";
import useOverAllChartOptions from "../components/useOverAllChartOptions";


const Dashboard = () => {
  const {  meals } = useSelector((reduxStore) => reduxStore.user);

  return (
    <Container>
      <Navbar />
      <PageWrapper>
        <Sidebar />
        <ContentWrapper>
          <MainChart />
          <hr />
          <MealsChartWrapper>
          {(meals.length>0)?( meals.map((meal) =>{
            return <MealChart key={meal.id} meal={meal}/>
          }) ):null}
          </MealsChartWrapper>
        </ContentWrapper>
      </PageWrapper>
    </Container>
  );
};

const Container = styled.div`
  background: ${(props) => props.theme.main_bg};
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
  padding: 1rem;
  align-items: flex-start;

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
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  gap: 1rem;
  position: relative;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  hr{
    width:100%;
    height:3px;
    color:${(props) => props.theme.text_color};
  }
`;

const MealsChartWrapper = styled.div`
width: 100%;
flex:3;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap:1rem;

`

export default Dashboard;
