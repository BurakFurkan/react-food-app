import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CgAddR } from "react-icons/cg";
import { BsHeart } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import {addToUserMenu} from "../features/userSlice";


const MenuItem = ({ id,title, image, restaurantChain }) => {

  const { userMeals} = useSelector((reduxStore) => reduxStore.user);
  const dispatch = useDispatch();

  return (
    <Container>
      <CardHeader>
        <BsHeart
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            boxSizing: "border-box",
            transition: "0.3s ease-in-out",
          }}
        />
        <CgAddR
          style={{
            alignSelf: "flex-end",
            fontSize: "1.5rem",
            cursor: "pointer",
            boxSizing: "border-box",
            transition: "0.3s ease-in-out",
          }}

          onClick={() =>{
            dispatch(addToUserMenu(id))
          }}
        />
      </CardHeader>
      <CardImageWrapper image={image}></CardImageWrapper>
      <CardInfoWrapper>
        <h2>{title}</h2>
        <RestaurantWrapper>
          <GoLocation
            style={{
              fontSize: "1.5rem",
              boxSizing: "border-box",
              transition: "0.3s ease-in-out",
              margin: "0 0.5rem"
            }}
          />
          {restaurantChain}
        </RestaurantWrapper>
      </CardInfoWrapper>
      <CardFooter />
    </Container>
  );
};

const Container = styled.div`
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
  transform: ${(props) =>
    `rotateY(${props.degx}deg) rotateX(${props.degy}deg)`};
`;

const ProductImg = styled.img`
  width: 80%;
  height: 80%;
  transition: 0.6s ease-in-out;
  object-fit: cover;
`;

const CardImageWrapper = styled.div`
  width: 250px;
  height: 250%;
  background-image: ${(props) => `url(${props.image})`};
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
  align-items: center;
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
  align-items: center;
  justify-content: center;
  gap:2rem;
`;

const RestaurantWrapper = styled.div`
  width: 100%;
  height: 100%;
  color:  #777785;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:1.3rem;
  font-weight: 600;
`;

const CardFooter = styled.div`
  width: 100%;
  height: 100%;
  color: #777785;
`;

export default MenuItem;
