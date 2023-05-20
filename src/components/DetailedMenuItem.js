import React from "react";
import styled,{useTheme} from "styled-components";
import { CgAddR } from "react-icons/cg";
import { BsHeart } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { GiMagnifyingGlass } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { userMenu } = useSelector((reduxStore) => reduxStore.user);
  const dispatch = useDispatch();
  const theme=useTheme();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconColor: `${theme.text_color}`,
    background: `${theme.main_bg}`,
    color: `${theme.text_color}`,
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
                  title: t("ItemRemoved"),
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
              <StyledTH style={{color:`${theme.text_color2}`}} >{t("nutrients")}</StyledTH>
              <StyledTH style={{color:`${theme.text_color2}`}} >{t("value")}</StyledTH>
              <StyledTH style={{color:`${theme.text_color2}`}} >{t("dailyamount")}</StyledTH>
            </StyledTR>
            {nutrition.nutrients.map((nutrient, index) => {
              return (
                <StyledTR key={index}>
                  <StyledTD>{t(`${nutrient.name}`)}</StyledTD>
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
  background: ${(props) => props.theme.main_bg_200};
  box-shadow: 0px 4px 6px -1px ${(props) => props.theme.box_shadow2};
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
  -webkit-box-shadow:  1px 1px 6px -1px ${(props) => props.theme.text_color};
  box-shadow:  1px 1px 6px -1px ${(props) => props.theme.text_color};
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
  color: ${(props) => props.theme.text_color};

  & > *:hover {
    transform: scale(1.1);
    color: #d02a2a;
  }
`;

const CardInfoWrapper = styled.div`
  width: 100%;
  height: 150px;
  color: ${(props) => props.theme.text_color};
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
  color: ${(props) => props.theme.text_color};
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
    background-color: ${(props) => props.theme.hover};
    color:${(props) => props.theme.text_color3};
  }

  &:hover {
    background-color: ${(props) => props.theme.active};
    color: ${(props) => props.theme.text_color2};
  }
`;
const StyledTH = styled.th`
  padding: 2px;
  background: ${(props) => props.theme.hover};
  text-align: left;
  border: 2px solid ${(props) => props.theme.text_color};
`;
const StyledTD = styled.td`
  padding: 2px 4px;
  text-align: left;
  white-space: nowrap;
  border: 2px solid ${(props) => props.theme.text_color};
`;

export default DetailedMenuItem;
