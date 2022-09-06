import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CgAddR } from "react-icons/cg";
import { BsHeart, BsCheckSquare } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import {
  addToUserMenu,
  removeFromUserMenu,
  removeFromUserMeals,
} from "../features/userSlice";
import { getUserMeals } from "../features/userSlice";
import useRandomNumber from "./useRandomNumber";
import ReactStars from "react-stars";
import Swal from "sweetalert2";

import { motion } from "framer-motion";

const MenuItem = ({ id, title, image, restaurantChain }) => {
  const { userMenu } = useSelector((reduxStore) => reduxStore.user);
  const dispatch = useDispatch();
  const price1 = useRandomNumber(50, 150);

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
      initial={{ opacity: 0, y: 200, transition: { duration: 1 } }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100, transition: { duration: 0.1 } }}
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
        {userMenu.includes(id) ? (
          <BsCheckSquare
            style={{
              alignSelf: "flex-end",
              fontSize: "1.5rem",
              cursor: "pointer",
              boxSizing: "border-box",
              transition: "0.3s ease-in-out",
            }}
            onClick={() => {
              dispatch(removeFromUserMenu(id));
              dispatch(removeFromUserMeals(id));
              Toast.fire({
                icon: "error",
                title: "Item removed to User Daily Meal",
              });
            }}
          />
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
              Toast.fire({
                icon: "success",
                title: "Item added to User Daily Meal",
              });
            }}
          />
        )}
      </CardHeader>
      <CardImageWrapper>
        <CardImage src={image} alt="CardImage" />
      </CardImageWrapper>
      <CardInfoWrapper>
        <h2>{title}</h2>
        <StarWrapper>
          <ReactStars
            edit={false}
            half={true}
            size={24}
            count={5}
            editing={false}
            value={useRandomNumber(1, 5)}
          />
          <StarSpan>({useRandomNumber(100, 2500)})</StarSpan>
        </StarWrapper>
        <RestaurantWrapper>
          <GoLocation
            style={{
              fontSize: "1.3rem",
              boxSizing: "border-box",
              transition: "0.3s ease-in-out",
              margin: "0 0.3rem 0 0",
            }}
          />
          {restaurantChain}
        </RestaurantWrapper>
      </CardInfoWrapper>
      <CardFooter>
        <PriceSpan>{price1}TL</PriceSpan>
        <PriceSign>&#61;&gt;</PriceSign>
        <DiscountSpan>{price1 - useRandomNumber(5, 25)}TL</DiscountSpan>
      </CardFooter>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 300px;
  height: 400px;
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
  height: auto;
  min-height: 150px;
  width: auto;
  min-width: 150px;
  -webkit-box-shadow: 1px 2px 9px 2px #777785;
  box-shadow: 1px 2px 9px 2px #777785;
  border-radius: 50%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  height: 100%;
  color: #777785;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
`;

const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StarSpan = styled.span`
  margin: 0 1rem;
  font-size: 1.1rem;
`;

const RestaurantWrapper = styled.div`
  width: 100%;
  height: 100%;
  color: #777785;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1rem;
  font-weight: 600;
`;

const CardFooter = styled.div`
  width: 100%;
  height: 35%;
  color: #777785;
  padding: 1rem 0 0 0;
`;

const PriceSpan = styled.del`
  margin-right: 0.5rem;
`;

const PriceSign = styled.span`
  margin-right: 0.5rem;
`;

const DiscountSpan = styled.span``;

export default MenuItem;
