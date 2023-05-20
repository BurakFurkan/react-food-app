import React from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import { DropdownThemes } from "./DropdownThemes";
import { useDispatch } from "react-redux";
import { langHandler } from "../features/userSlice";
import TurkeyFlag from "../assets/turkey-flag.png";
import USAFlag from "../assets/usa-flag.png";
import { useTranslation } from "react-i18next";

export const Dropdown = ({ info }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Container
      style={{ top: `${info.top + 45}px`, left: `${info.left - 20}px` }}
    >
      <ul>
        <li onClick={() => dispatch(langHandler("en"))}>
          {" "}
          <StyledImg src={USAFlag} alt="usa-flag" />{" "}
        </li>
        <li onClick={() => dispatch(langHandler("tr"))}>
          <StyledImg src={TurkeyFlag} alt="turkey-flag" />
        </li>
        <hr
          style={{
            width: "75%",
            height: "1px",
            backgroundColor: `${theme.nav_text}`,
            border: "none",
          }}
        />
      </ul>
      <p>{t("navTheme")}</p>
      <ul>
        <li>
          <DropdownThemes
            colorarray={["#FFFFFF", "#57BE6C", "#F7F7F7", "#101010"]}
            theme="lightTheme"
          />
        </li>
        <li>
          <DropdownThemes
            colorarray={["#041C32", "#ECB365", "#777785b3", "#ecb365b3"]}
            theme="darkTheme"
          />
        </li>
      </ul>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 150px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.main_bg};
  box-shadow: 0px 4px 6px -1px ${(props) => props.theme.box_shadow1};
  color: ${(props) => props.theme.nav_text};
  z-index: 999 !important;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  gap: 5px;

  @media (max-width: 992px) {
    top: 110px;
    right: 260px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 0.3rem;

    li {
      width: 90px;
      height: 50px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      list-style: none;
      border-radius: 4px;
      background: ${(props) => props.theme.main_bg_200};
      &:hover {
        background: ${(props) => props.theme.hover};
        transition: 0.5s ease-in-out;
        color: ${(props) => props.theme.text_color2};
        cursor: pointer;
      }
    }
  }
`;

const StyledImg = styled.img`
  width: 65px;
  height: auto;
`;
