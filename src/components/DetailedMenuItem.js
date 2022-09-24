import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CgAddR } from "react-icons/cg";
import { BsHeart } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { GiMagnifyingGlass } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import {
  addToUserMenu,
  removeFromUserMenu,
  removeFromUserMeals,
} from "../features/userSlice";
import { getUserMeals } from "../features/userSlice";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const DetailedMenuItem = ({
  id,
  title,
  images,
  modalHandler,
  selectedId,
  selectHandler,
  nutrition,
}) => {
  const { userMenu } = useSelector((reduxStore) => reduxStore.user);
  const dispatch = useDispatch();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconColor: "#777785",
    background: "#bccccd",
    color: "#777785",
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CardHeader>
        <BsHeart
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            boxSizing: "border-box",
            transition: "0.3s ease-in-out",
          }}
        />
        <GiMagnifyingGlass
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            boxSizing: "border-box",
            transition: "0.3s ease-in-out",
          }}
          onClick={() => {
            selectHandler(id);
            modalHandler();
          }}
        />
        {userMenu.includes(id) ? (
          { selectedId } ? (
            <TiDeleteOutline
              style={{
                alignSelf: "flex-end",
                fontSize: "2rem",
                cursor: "pointer",
                boxSizing: "border-box",
                transition: "0.3s ease-in-out",
              }}
              onClick={() => {
                selectHandler(null);
                modalHandler();
                dispatch(removeFromUserMenu(id));
                dispatch(removeFromUserMeals(id));

                Toast.fire({
                  icon: "error",
                  title: "Item removed to User Daily Meal",
                });
              }}
            />
          ) : (
            ""
          )
        ) : (
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
      <CardImageWrapper images={(images[1] || images )} />
      <CardInfoWrapper>
        <h2 style={{ fontSize: "1.5rem" }}>{title}</h2>
      </CardInfoWrapper>
      <CardFooter>
        <StyledTable>
          <tbody>
            <StyledTR>
              <StyledTH>Nutritient</StyledTH>
              <StyledTH>Value</StyledTH>
              <StyledTH>Daily Amount</StyledTH>
            </StyledTR>
            {nutrition.nutrients.map((nutrient, index) => {
              return (
                <StyledTR key={index}>
                  <StyledTD>{nutrient.name}</StyledTD>
                  <StyledTD>
                    {nutrient.amount} {nutrient.unit}
                  </StyledTD>
                  <StyledTD>
                    {nutrient.percentOfDailyNeeds} {nutrient.unit}
                  </StyledTD>
                </StyledTR>
              );
            })}
          </tbody>
        </StyledTable>
      </CardFooter>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 350px;
  height: 550px;
  border-radius: 26px;
  background: #bccccd;
  box-shadow: -5px -5px 13px #848f90, 5px 5px 13px #f4ffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  color: white;

  @media (max-width: 992px) {
    width: 300px;
  }
`;

const CardImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  background-image: ${(props) => `url(${props.images})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  -webkit-box-shadow: 1px 2px 9px 2px #777785;
  box-shadow: 1px 2px 9px 2px #777785;
  border-radius: 25px;
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
  height: 150px;
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
  height: 550px;
  color: #777785;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  
`;

const StyledTable = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: flex-start;
    justify-content: flex-start;
    font-size:0.8rem;
  }
`;
const StyledTR = styled.tr`
  &:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.5);
  }

  &:hover {
    background-color: #3b9ae1;
    color: white;
  }
`;
const StyledTH = styled.th`
  padding: 2px;
  background: rgba(255, 255, 255, 0.5);
  text-align: left;
  border: 2px solid #777785;
`;
const StyledTD = styled.td`
  padding: 2px 4px;
  text-align: left;
  white-space: nowrap;
  border: 2px solid #777785;
`;

export default DetailedMenuItem;
