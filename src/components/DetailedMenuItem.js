import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CgAddR } from "react-icons/cg";
import { BsHeart } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import {
  addToUserMenu,
  removeFromUserMenu,
  removeFromUserMeals,
} from "../features/userSlice";
import { getUserMeals } from "../features/userSlice";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const DetailedMenuItem = ({ id, title, images ,modalHandler, selectedId, selectHandler  } ) => {
  const { userMenu } = useSelector((reduxStore) => reduxStore.user);
  const dispatch = useDispatch();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return (
    <Container >
      <CardHeader>
        <BsHeart
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            boxSizing: "border-box",
            transition: "0.3s ease-in-out",
          }}
        />
        {userMenu.includes(id) ? (
          {selectedId}?<TiDeleteOutline
            style={{
              alignSelf: "flex-end",
              fontSize: "2rem",
              cursor: "pointer",
              boxSizing: "border-box",
              transition: "0.3s ease-in-out",
            }}
            onClick={() => {
              selectHandler(null)
              modalHandler()      
              dispatch(removeFromUserMenu(id));
              dispatch(removeFromUserMeals(id));
              
              Toast.fire({
                icon: "error",
                title: "Item removed to User Daily Meal",
              });
            }}
          />
        :"") : (
          <CgAddR
            style={{
              alignSelf: "flex-end",
              fontSize: "1.5rem",
              cursor: "pointer",
              boxSizing: "border-box",
              transition: "0.3s ease-in-out",
            }}
            onClick={() => {
              dispatch(addToUserMenu(id));
              dispatch(getUserMeals(id));
            }}
          />
        )}
      </CardHeader>
      <CardImageWrapper images={images[1]}>
        {console.log()}
      </CardImageWrapper>
      <CardInfoWrapper>
        <h2 style={{ cursor: "pointer" }} onClick={() => {
          selectHandler(id)
          modalHandler()  }} >{title}</h2>
      </CardInfoWrapper>
      <CardFooter>
        <StyledTable>
          <tbody>
            <StyledTR>
              <StyledTH>Nutritient</StyledTH>
              <StyledTH>Value</StyledTH>
              <StyledTH>Daily Amount</StyledTH>
            </StyledTR>
            <StyledTR>
              <StyledTD>Alfreds Futterkiste</StyledTD>
              <StyledTD>Alfreds Futterkiste</StyledTD>
              <StyledTD>Alfreds Futterkiste</StyledTD>
            </StyledTR>
          </tbody>
        </StyledTable>
      </CardFooter>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 300px;
  height: 450px;
  border-radius: 26px;
  background: #bccccd;
  box-shadow: -5px -5px 13px #848f90, 5px 5px 13px #f4ffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  color: white;
`;

const CardImageWrapper = styled.div`
  width: 100%;
  height: 150%;
  background-image: ${(props) => `url(${props.images})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  -webkit-box-shadow: 1px 2px 9px 2px #777785;
  box-shadow: 1px 2px 9px 2px #777785;
  border-radius: 50%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 1rem;
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 5px;
  color: #777785;

  & > *:hover {
    transform: scale(1.1);
    color: #d02a2a;
  }
`;

const CardInfoWrapper = styled.div`
  width: 100%;
  height: 50%;
  color: #777785;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
`;

const CardFooter = styled.div`
  width: 100%;
  height: 100%;
  color: #777785;
  padding: 1rem 0 0 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const StyledTable = styled.table``;
const StyledTR = styled.tr``;
const StyledTH = styled.th``;
const StyledTD = styled.td``;

export default DetailedMenuItem;
