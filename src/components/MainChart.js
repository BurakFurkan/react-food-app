import React from "react";
import styled from "styled-components";


const MainChart = () => {
  return (
    <MainWrapper>
      <UserInfo><h1>Welcome</h1><h1 style={{paddingLeft:"2.5rem"}} >Mr. Jeckyll</h1></UserInfo>
      <InfoWrapper><h1>Overall</h1><h1 style={{paddingLeft:"2.5rem"}} >Nutrients</h1></InfoWrapper>
      <ChartWrapper></ChartWrapper>
    </MainWrapper>
  );
};

export default MainChart;

const MainWrapper = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  background: #f4f4f5;
  position: sticky;
  display: flex;
  color:#777785;

`;
const UserInfo = styled.div`
  width: 25%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  flex-direction: column;
  gap:1rem;
  justify-content: flex-start;
  align-items: flex-start;
  color: #777785;
  padding:1rem;
  font-family: 'Marck Script', cursive;
`;

const InfoWrapper = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align:center;
  padding-right: 2rem;

`;

const ChartWrapper = styled.div`
  width: 60%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 3px;
`;
