import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { BsFillCalendarCheckFill,BsGraphUp } from "react-icons/bs";

function Sidebar() {

  return (
    <Container>
      <UList>
        <List>
          <StyledLink to="/"><GiForkKnifeSpoon style={{margin:"0 0.5rem"}} />Meals</StyledLink>
        </List>
        <List>
          <StyledLink to="/todaymenu"><BsFillCalendarCheckFill style={{margin:"0 0.5rem"}} />Today's Menu</StyledLink>
        </List>
        <List>
          <StyledLink to="/dashboard"><BsGraphUp style={{margin:"0 0.5rem"}} />Dashboard</StyledLink>
        </List>
      </UList>
    </Container>
  );
}

const Container = styled.div`
  width: 150px ;
  height: 350px;
  border-radius: 26px;
  background: #bccccd;
  box-shadow: -5px -5px 13px #848f90, 5px 5px 13px #f4ffff;
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
  overflow: hidden;
  font-size: 1.2rem;
  box-sizing: border-box;

  @media (max-width: 992px) {
    width: 320px;
    height: 60px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius:5px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
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
    gap:10px;
  }
`;

const List = styled.li`
  list-style: none;
  color: #f4f4f5;
  width: 100%;
  height: 34%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.2rem;
  letter-spacing: 1px;
  

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    transition: 0.5s ease-in-out;
    color: #14213d;
    font-size: 1.2rem;
  }

  @media (max-width: 992px) {
    width: 100%;
    height: 100%;
  }
`;

const StyledLink = styled(NavLink)`
  color: #f4f4f5;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  font-size: 1.2rem;
  letter-spacing: 1px;
  text-decoration: none;
  padding-left:0.5rem;


  &:hover {
    background: rgba(255, 255, 255, 0.5);
    transition: 0.5s ease-in-out;
    color: #14213d;

  }

  &.active {
    background: rgba(255, 255, 255, 0.5);
    transition: 0.5s ease-in-out;
    color: #14213d;

  }

  @media (max-width: 992px) {
    padding:0 10px;
  }

`;

export default Sidebar;
