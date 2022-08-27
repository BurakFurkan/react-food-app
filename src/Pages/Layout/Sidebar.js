import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Sidebar() {

  return (
    <Container>
      <UList>
        <List>
          <StyledLink to="/">Meals</StyledLink>
        </List>
        <List>
          <StyledLink to="/todaymenu">Today's Menu</StyledLink>
        </List>
        <List>
          <StyledLink to="/dashboard">Dashboard</StyledLink>
        </List>
      </UList>
    </Container>
  );
}

const Container = styled.div`
  width: 150px;
  height: 350px;
  border-radius: 26px;
  background: #bccccd;
  box-shadow: -5px -5px 13px #848f90, 5px 5px 13px #f4ffff;
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const UList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
  }
`;

const StyledLink = styled(NavLink)`
  color: #f4f4f5;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.2rem;
  letter-spacing: 1px;
  text-decoration: none;

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
`;

export default Sidebar;
