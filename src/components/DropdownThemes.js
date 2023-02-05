import React from "react";
import styled from "styled-components";
import { useDispatch} from "react-redux";
import {themeHandler} from "../features/userSlice";

export const DropdownThemes = (colorarray=[], theme) => {
  const dispatch = useDispatch();
  return (
    <Container onClick={() =>dispatch(themeHandler(colorarray.theme))} >
      {colorarray.colorarray.map((color, index) => {
        return <Color key={index} color={color} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const Color = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  box-shadow: 0px 4px 6px -1px ${(props) => props.theme.box_shadow1};
  border: 2px solid ${(props) => props.theme.main_bg};
  &:nth-child(1) {
    top: 50%;
    margin-top: -15px;
    left: 10%;
    background-color: ${(props) => props.color};
    z-index: 5;
  }
  &:nth-child(2) {
    top: 50%;
    margin-top: -15px;
    left: 25%;
    background-color: ${(props) => props.color};

    z-index: 4;
  }
  &:nth-child(3) {
    top: 50%;
    margin-top: -15px;
    left: 40%;
    background-color: ${(props) => props.color};

    z-index: 3;
  }
  &:nth-child(4) {
    top: 50%;
    margin-top: -15px;
    left: 55%;
    background-color: ${(props) => props.color};

    z-index: 2;
  }
`;
