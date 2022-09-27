import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import userImage from "../../assets/userPhoto.png";
import { BiWorld,BiBookBookmark } from "react-icons/bi";

const Navbar = () => {

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container>
      <LogoDiv>
        <StyledLink to="/">
          <MainLogo>HealthFree</MainLogo>
        </StyledLink>
      </LogoDiv>
      <NavRight>
      <Contact onClick={() =>{openInNewTab("https://www.fao.org/home/en/")}} ><BiWorld style={{fontSize: "1.3rem"}}/>FAO</Contact>
        <StyledNavLink to="/"><BiBookBookmark style={{fontSize: "1.3rem"}}/>Blog</StyledNavLink>
        <Contact><StyledImage src={userImage} alt="userImage" />User</Contact>
      </NavRight>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  width: 98vw;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 992px) {
    padding: 5px;
    width: 95vw;
    height: 250px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const LogoDiv = styled.div`
  width: 300px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 992px) {
    height: 60px;
    justify-content: center;
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const MainLogo = styled.span`
  width: 250px;
  height: 100px;
  font-size: 35px;
  cursor: pointer;
  src: url("https://fonts.googleapis.com/css2?family=Rubik+Dirt&display=swap");
  font-family: "Rubik Dirt", cursive;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f4f4f5;
  filter: drop-shadow(0 0 0.5rem #888895);
`;

const NavRight = styled.div`
  width: 450px;
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
  @media (max-width: 992px) {
    width: 320px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
  gap:0.3rem;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    transition: 0.5s ease-in-out;
    color: #14213d;
  }

  @media (max-width: 992px) {
    height: 100%;
  }
`;

const StyledImage = styled.img`
  width:2rem;
  height: 2rem;
  border-radius: 50%;
  margin:0 5px;
  border:1px solid #777785;
`;

const StyledNavLink = styled.a`
  cursor: pointer;
  letter-spacing: 1.5px;
  font-size: 1.1rem;
  width: 34%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  


  &:hover {
    background: rgba(255, 255, 255, 0.5);
    transition: 0.5s ease-in-out;
    color: #14213d;
  }

  @media (max-width: 992px) {
    height: 100%;
  }
`;


