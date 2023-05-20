import React from "react";
import styled from "styled-components";
import DashboardChart from "./DashboardChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MealChart = (props) => {
  return (
    <MainWrapper>
      <UserInfo>
        <img src={props.meal.images[1]} alt={props.meal.title} />
      </UserInfo>
      <InfoWrapper>
        <h1>{props.meal.title}</h1>
      </InfoWrapper>
      <ChartWrapper>
        <Bar
          options={DashboardChart(props.meal).config}
          data={DashboardChart(props.meal).data}
        />
      </ChartWrapper>
    </MainWrapper>
  );
};

export default MealChart;

const MainWrapper = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  background: ${(props) => props.theme.dashboard_bg};
  box-shadow: 0px 4px 6px -1px ${(props) => props.theme.box_shadow1};
  display: flex;
  color: #777785;
  flex: 1;

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
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text_color3};
  padding: 1rem;

  img {
    width: 100%;
    height: auto;
    border-radius: 30%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  @media (max-width: 768px) {
    height: 50%;
    img {
      width: 45%;
    }
  }
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
  font-family: "Marck Script", cursive;
  color: ${(props) => props.theme.text_color3};
  &:before {
    content: "";
    width: 1px;
    height: 80%;
    background-color: ${(props) => props.theme.text_color};
    position: absolute;
    left: 0;
  }
  &:after {
    content: "";
    width: 1px;
    height: 80%;
    background-color: ${(props) => props.theme.text_color};
    position: absolute;
    right: 0;
  }

  @media (max-width: 992px) {
    font-size: 0.8rem;

    &:before {
      width: 80%;
      height: 1px;
      top: 0;
      left: 10%;
    }
    &:after {
      width: 80%;
      height: 1px;
      bottom: 0;
      left: 10%;
    }
  }
`;

const ChartWrapper = styled.div`
  flex: 3;
  width: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
