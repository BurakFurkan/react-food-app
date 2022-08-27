import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Container>
      <LogoDiv>
        <MainLogo>HealthFree</MainLogo>
      </LogoDiv>
      <NavRight>
        <Contact>Contact</Contact>
        <Contact>Contact</Contact>
        <Contact>Contact</Contact>
      </NavRight>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  width: 100vw;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

const LogoDiv = styled.div`
  width: 80px;
  height: 60px;
`;
const MainLogo = styled.span`
  width: 90%;
  height: 90%;
  font-size: 35px;
  cursor: pointer;
  src: url("https://fonts.googleapis.com/css2?family=Rubik+Dirt&display=swap");
  font-family: "Rubik Dirt", cursive;
  display: block;
  filter: drop-shadow(0 0 0.50rem #888895);
`;

const NavRight = styled.div`
  width: 500px;
  height: 90%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  overflow: hidden;
`;

const Contact = styled.div`
  cursor: pointer;
  letter-spacing: 1.5px;
  font-size: 1.1rem;
  width: 34%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    transition: 0.5s ease-in-out;
    color: #14213d;
  }
`;
