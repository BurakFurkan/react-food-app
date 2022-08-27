import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CgAddR } from "react-icons/cg";
import { BsHeart } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import {addToUserMenu} from "../features/userSlice";
import { getUserMeals } from "../features/userSlice";
import useRandomNumber from "./useRandomNumber";
import StarRatingComponent from 'react-star-rating-component';


const MenuItem = ({ id,title, image, restaurantChain }) => {

  const { userMeals} = useSelector((reduxStore) => reduxStore.user);
  const dispatch = useDispatch();
  const price1 = useRandomNumber(50,150)

  


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
            dispatch(getUserMeals(id))
          }}
        />
      </CardHeader>
      <CardImageWrapper image={image}></CardImageWrapper>
      <CardInfoWrapper>
        <h2>{title}</h2>
        <StarWrapper>
        <StarRatingComponent name={"StarRating"} starCount={5} editing={false} value={useRandomNumber(1,5)} style={{fontSize:"50px"}} />
        <StarSpan>({useRandomNumber(100,2500)})</StarSpan>
        </StarWrapper>
        <RestaurantWrapper>
          <GoLocation
            style={{
              fontSize: "1.3rem",
              boxSizing: "border-box",
              transition: "0.3s ease-in-out",
              margin: "0 0.3rem 0 0"
            }}
          />
          {restaurantChain}
        </RestaurantWrapper>
      </CardInfoWrapper>
      <CardFooter >
            <PriceSpan>{price1}TL</PriceSpan>
            <PriceSign>&#61;&gt;</PriceSign>
            <DiscountSpan>{price1-useRandomNumber(5,25)}TL</DiscountSpan>
      </CardFooter>
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
  gap:2rem;
`;

const StarWrapper = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
`

const StarSpan = styled.span`
  margin:0 1rem;

`

const RestaurantWrapper = styled.div`
  width: 100%;
  height: 100%;
  color:  #777785;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size:1rem;
  font-weight: 600;
`;

const CardFooter = styled.div`
  width: 100%;
  height: 100%;
  color: #777785;
  padding:1rem 0 0 0;

`;

const PriceSpan = styled.del`
  margin-right:0.5rem;
`

const PriceSign=styled.span`
  margin-right:0.5rem;
`

const DiscountSpan =styled.span`

`

export default MenuItem;
