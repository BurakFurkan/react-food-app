import React from "react";
import styled, { useTheme } from "styled-components";
import { CgAddR } from "react-icons/cg";
import { BsHeart, BsCheckSquare } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  addToUserMenu,
  removeFromUserMenu,
  removeFromUserMeals,
  addToFavList,
  removeFromFavList,
} from "../features/userSlice";
import Placeholder from "../assets/placeholder.png";
import { getUserMeals } from "../features/userSlice";
import useRandomNumber from "./useRandomNumber";
import ReactStars from "react-stars";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const MenuItem = ({ id, title, image, restaurantChain }) => {
  const { userMenu, favList } = useSelector((reduxStore) => reduxStore.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const price1 = useRandomNumber(50, 150);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconColor: `${theme.nav_text}`,
    background: `${theme.main_bg}`,
    color: `${theme.nav_text}`,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const addDefaultSrc = (ev) => {
    ev.target.src = Placeholder;
  };

  const favClickHandler = (id) => {
    favList.includes(id)
      ? dispatch(removeFromFavList(id))
      : dispatch(addToFavList(id));
  };

  const { t } = useTranslation();

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
            color: favList.includes(id) ? "#d02a2a" : theme.text_color,
          }}
          onClick={() => favClickHandler(id)}
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
                title: t("ItemRemoved"),
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
                title: t("ItemAdded"),
              });
            }}
          />
        )}
      </CardHeader>
      <CardImageWrapper>
        <CardImage
          onError={(e) => addDefaultSrc(e)}
          src={image}
          alt="CardImage"
        />
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
  height: 350px;
  border-radius: 26px;
  background: ${(props) => props.theme.main_bg_200};
  box-shadow: 0px 4px 6px -1px ${(props) => props.theme.box_shadow1};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  color: ${(props) => props.theme.active};
`;

const CardImageWrapper = styled.div`
  height: auto;
  min-height: 150px;
  width: 100%;
  box-shadow: 0px 4px 6px -1px ${(props) => props.theme.text_color};
  border-radius: 8px;
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
  background-color: ${(props) => props.theme.main_bg};
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 5px;
  color: ${(props) => props.theme.text_color};

  & > *:hover {
    transform: scale(1.1);
    color: #d02a2a;
  }
`;

const CardInfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.text_color};
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
  h2 {
    width: 95%;
    height: 36px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StarSpan = styled.span`
  margin: 0 1rem;
  font-size: 0.9rem;
`;

const RestaurantWrapper = styled.div`
  width: 100%;
  color: ${(props) => props.theme.text_color};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.7rem;
  font-weight: 600;
`;

const CardFooter = styled.div`
  width: 100%;
  height: 35%;
  color: ${(props) => props.theme.text_color};
  padding: 0;
`;

const PriceSpan = styled.del`
  margin-right: 0.5rem;
  font-size: 0.9rem;
`;

const PriceSign = styled.span`
  margin-right: 0.5rem;
  font-size: 0.9rem;
`;

const DiscountSpan = styled.span`
  font-size: 0.9rem;
`;

export default MenuItem;
