import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { BsFillCalendarCheckFill,BsGraphUp } from "react-icons/bs";
import { useTranslation } from 'react-i18next';

function Sidebar() {

  const { t, i18n } = useTranslation();

  return (
    <Container>
      <UList>
        <List >
          <StyledLink to="/"  ><GiForkKnifeSpoon  /><p>{t("meals")}</p></StyledLink>
        </List>
        <List >
          <StyledLink to="/todaymenu" ><BsFillCalendarCheckFill  /><p>{t("todaymenu")}</p></StyledLink>
        </List>
        <List >
          <StyledLink to="/dashboard" ><BsGraphUp  /><p>{t("dashboard")}</p></StyledLink>
        </List>
      </UList>
    </Container>
  );
}

const Container = styled.div`
  width: 150px ;
  height: 350px;
  border-radius: 26px;
  background: ${(props) => props.theme.main_bg};
  box-shadow: -5px -5px 13px ${(props) => props.theme.box_shadow1}, 5px 5px 13px ${(props) => props.theme.box_shadow2};
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
  overflow: hidden;
  font-size: 1.2rem;
  box-sizing: border-box;

  @media (max-width: 480px) {
    width: 320px;
    height: 60px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius:5px;
  }
  @media (max-width: 992px) {
    width: 85vw;
    height: 60px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius:5px;
    margin-top: 0 !important;
  }
  @media (max-width: 1330px){
    margin-top:100px;
  }


`;

const UList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media (max-width: 992px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
  }
`;

const List = styled.li`
  list-style: none;
  color: ${(props) => props.theme.second_bg};
  width: 100%;
  height: 34%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.2rem;
  letter-spacing: 1px;
  

  @media (max-width: 480px) {
    height: 100%;

    &:nth-child(1){
      flex:1;
    }
    &:nth-child(2){
      flex:3;
    }
    &:nth-child(3){
      flex:2;
    }
  }

  @media (max-width: 992px){
    height: 100%;
    
  }
  
`;

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.second_bg};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.2rem;
  letter-spacing: 1px;
  text-decoration: none;
  padding-left:0.5rem;
  gap:0.5rem;


  &:hover {
    background: ${(props) => props.theme.hover};
    transition: 0.5s ease-in-out;
    color: ${(props) => props.theme.text_color2};

  }

  &.active {
    background: ${(props) => props.theme.active};
    transition: 0.5s ease-in-out;
    color: ${(props) => props.theme.text_color2};

  }

  @media (max-width: 768px) {
    justify-content:center;
    align-items:center;
    padding: 3px ;
    font-size: 1rem;
    p{
      flex:2;
    }

    svg{
      flex:1;
    }
  }

`;

export default Sidebar;
