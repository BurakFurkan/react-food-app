import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import userImage from "../../assets/userPhoto.png";
import { BiWorld } from "react-icons/bi";
import { IoOptionsOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { Dropdown } from "../../components/Dropdown";

const Navbar = () => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const portalRef = useRef();
  const portalRoot = document.getElementById("modal-root");
  const DropdownPortal = () =>
    createPortal(<Dropdown info={info} />, portalRoot);
  const { t } = useTranslation();

  const [info, setInfo] = useState({ isOpen: false, top: 0, left: 0 });

  const clickHandler = () => {
    const top = portalRef.current.getBoundingClientRect().top;
    const left = portalRef.current.getBoundingClientRect().left;
    const isOpen = true;
    setInfo({ ...info, isOpen: isOpen, top: top, left: left });
  };

  const leaveHandler = () => {
    const isOpen = false;
    setInfo({ ...info, isOpen: isOpen });
  };

  return (
    <Container>
      <LogoDiv>
        <StyledLink to="/">
          <MainLogo>HealthFree</MainLogo>
        </StyledLink>
      </LogoDiv>
      <NavRight>
        <Contact
          onClick={() => {
            openInNewTab("https://www.fao.org/home/en/");
          }}
        >
          <BiWorld style={{ fontSize: "1.3rem" }} />
          FAO
        </Contact>
        <StyledNavLink
          ref={portalRef}
          onMouseOver={clickHandler}
          onMouseLeave={leaveHandler}
          to="/"
        >
          <IoOptionsOutline style={{ fontSize: "1.3rem" }} />
          {t("options")}
          {info.isOpen ? DropdownPortal() : null}
        </StyledNavLink>
        <Contact>
          <StyledImage src={userImage} alt="userImage" />
        </Contact>
      </NavRight>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  padding: 0.5rem;
  min-height: 70px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 500 !important;

  @media (max-width: 992px) {
    padding: 5px;
    min-height: 250px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 1330px) {
    min-height: 150px;
  }
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 992px) {
    min-height: 60px;
    justify-content: center;
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  position: relative;
`;

const MainLogo = styled.span`
  font-size: 35px;
  cursor: pointer;
  src: url("https://fonts.googleapis.com/css2?family=Rubik+Dirt&display=swap");
  font-family: "Rubik Dirt", cursive;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.second_bg};
  filter: ${(props) => props.theme.logo_shadow};
`;

const NavRight = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-radius: 5px;
  box-shadow: 0px 1px 2px 1px ${(props) => props.theme.box_shadow1};
  color: ${(props) => props.theme.nav_text};
  position: relative;
  overflow: hidden;
`;

const Contact = styled.div`
  cursor: pointer;
  letter-spacing: 1.5px;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem;

  &:hover {
    background: ${(props) => props.theme.hover};
    transition: 0.5s ease-in-out;
    color: ${(props) => props.theme.text_color2};
  }
`;

const StyledImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin: 0 5px;
  border: 1px solid ${(props) => props.theme.text_color};
`;

const StyledNavLink = styled.a`
  cursor: pointer;
  letter-spacing: 1.5px;
  font-size: 1.1rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  position: relative;
  z-index: 800 !important;

  &:hover {
    background: ${(props) => props.theme.hover};
    transition: 0.5s ease-in-out;
    color: ${(props) => props.theme.text_color2};
  }
`;
