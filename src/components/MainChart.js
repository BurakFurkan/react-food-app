import React from "react";
import styled from "styled-components";
import DashboardChart from "./DashboardChart";
import OverallChart from "../components/OverallChart";
import { useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { meals,userName } = useSelector((reduxStore) => reduxStore.user);
  return (
    <MainWrapper>
      <UserInfo>
        <h1>{t("welcome")}</h1>
        <h1 >{userName}</h1>
      </UserInfo>
      <InfoWrapper>
        <h1>{t("overall")}</h1>
        <h1 >{t("nutrients")}</h1>
      </InfoWrapper>
      {(meals.length>0)?(<ChartWrapper>
        <Bar options={OverallChart().config} data={OverallChart().data}  />
        </ChartWrapper>):null}
    </MainWrapper>
  );
};

export default MainChart;

const MainWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  background: ${(props) => props.theme.main_bg_200};
  box-shadow: 0px 4px 6px -1px ${(props) => props.theme.box_shadow1};
  z-index: 55;
  position: sticky;
  top:0;
  display: flex;
  color: ${(props) => props.theme.text_color};
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
  color: ${(props) => props.theme.text_color3};
  padding: 1rem;
  font-family: "Marck Script", cursive;

    h1{
      padding-left:2.5rem;
      color: ${(props) => props.theme.text_color3};
    }

  @media (max-width: 768px) {
    height:85px;
    display: flex;
    flex-direction:row;
    align-items: flex-start;
    justify-content: center;
    gap:0.5rem;
    padding: 5px;

    h1{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:0;
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
  color: ${(props) => props.theme.text_color3};
  &:before{
    content:"";
    width:1px;
    height: 80%;
    background-color: ${(props) => props.theme.text_color};
    position: absolute;
    left:0;
  }
  &:after{
    content:"";
    width:1px;
    height: 80%;
    background-color: ${(props) => props.theme.text_color};
    position: absolute;
    right:0;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: center;
    gap:0.5rem;
    padding:0;

    h1{
    display: flex;
    align-items: center;
    justify-content: center;
    padding:0;
    }

    &:before{
      width:100%;
      height: 1px;
      top:-5px;
  }
  &:after{
    width:100%;
    height: 1px;
    bottom:-5px;
  }

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


