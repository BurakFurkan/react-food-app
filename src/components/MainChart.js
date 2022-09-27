import React from "react";
import styled from "styled-components";
import DashboardChart from "./DashboardChart";
import { useSelector, useDispatch } from "react-redux";
import useMealOptionGenerator from "./useMealOptionGenerator";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const MainChart = () => {
  const { userMenu, meals,userName } = useSelector((reduxStore) => reduxStore.user);
  return (
    <MainWrapper>
      <UserInfo>
        <h1>Welcome</h1>
        <h1 style={{ paddingLeft: "2.5rem" }}>{userName}</h1>
      </UserInfo>
      <InfoWrapper>
        <h1>Overall</h1>
        <h1 style={{ paddingLeft: "2.5rem" }}>Nutrients</h1>
      </InfoWrapper>
      {(meals.length>0)?(<ChartWrapper>
        <Bar options={DashboardChart(meals[0]).config} data={DashboardChart(meals[0]).data}  />
        </ChartWrapper>):null}
    </MainWrapper>
  );
};

export default MainChart;

const MainWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  background: rgba(255,255,255,1);
  z-index: 55;
  position: sticky;
  top:0;
  display: flex;
  color: #777785;
  flex:1;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px;
  }
`;
const UserInfo = styled.div`
  flex: 1;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  color: #777785;
  padding: 1rem;
  font-family: "Marck Script", cursive;

`;

const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-right: 2rem;
  position: relative;
  &:before{
    content:"";
    width:1px;
    height: 80%;
    background-color: #777785;
    position: absolute;
    left:0;
  }
  &:after{
    content:"";
    width:1px;
    height: 80%;
    background-color: #777785;
    position: absolute;
    right:0;
  }
`;

const ChartWrapper = styled.div`
  flex: 3;
  width: 100%;
  height: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

`;


