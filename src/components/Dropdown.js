import React, {useState} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {DropdownThemes}  from "./DropdownThemes";
import { useDispatch} from "react-redux";
import {langHandler} from "../features/userSlice";
import TurkeyFlag from "../assets/turkey-flag.png";
import USAFlag from "../assets/usa-flag.png";

export const Dropdown = ({info}) => {
  const dispatch= useDispatch();
  
  return (
    <Container style={{top:`${info.top+45}px`,left:`${info.left-20}px`}}>
      <ul>
        <li onClick={()=>dispatch(langHandler("en"))}> <StyledImg src={USAFlag} alt="usa-flag" /> </li>
        <li onClick={()=>dispatch(langHandler("tr"))} ><StyledImg src={TurkeyFlag} alt="turkey-flag" /></li>
        <hr
          style={{
            width: "75%",
            height: "1px",
            backgroundColor: "white",
            border: "none",
          }}
        />
      </ul>
      <p>Themes</p>
      <ul>
        <li><DropdownThemes colorarray={["#bccccd","#f4f4f5","#777785","#848f90"]} theme="lightTheme" /></li>
        <li><DropdownThemes colorarray={["#041C32","#ECB365","#777785b3","#ecb365b3"]} theme="darkTheme"/></li>
        <li><DropdownThemes colorarray={["#637F06","#637F06","#F5E281","#9EAA64"]} theme="greenTheme"/></li>
        <li><DropdownThemes colorarray={["#fff","#fff","#fff","#fff"]} theme="lightTheme"/></li>
      </ul>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: absolute;

  width: 200px;
  height: 200px;
  border-radius:5px;
  background-color: ${(props) => props.theme.main_bg};
  box-shadow: -5px -5px 13px ${(props) => props.theme.box_shadow1},
    5px 5px 13px ${(props) => props.theme.box_shadow2};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: ${(props) => props.theme.text_color};

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

    li {
      width: 80px;
      height: 50px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      list-style: none;
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


`
