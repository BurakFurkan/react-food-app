import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ImBin } from "react-icons/im";
import { GoLocation } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { removeFromUserMeals, removeFromUserMenu } from "../features/userSlice";
import yellowStar from "../assets/yellowStar.png";
import { useTranslation } from "react-i18next";

const SideCart = () => {
  const { meals } = useSelector((reduxStore) => reduxStore.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dragStart, setDragStart] = useState(0);

  const handleDragEnd = (e, info, mealID) => {
    const dragEnd = info.point.x;
    if (dragStart - dragEnd > 200) {
      dispatch(removeFromUserMenu(mealID));
      dispatch(removeFromUserMeals(mealID));
    }
  };

  return (
    <Container
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.1 } }}
    >
      <h2>{t("userinventory")}</h2>
      <SideItemWrapper>
        {meals
          .slice(0)
          .reverse()
          .map((meal) => {
            return (
              <AnimationDiv
                key={meal.id}
                initial={{ opacity: 0, y: -200, transition: { duration: 1 } }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100, transition: { duration: 0.1 } }}
              >
                <SideItem
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={{ left: 0.1, right: 0.01 }}
                  onDragStart={(e, info) => setDragStart(info.point.x)}
                  onDragEnd={(e, info) => handleDragEnd(e, info, meal.id)}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
                >
                  <SideImageWrapper>
                    <StyledStar src={yellowStar} alt="yellowStar" />
                    <SideImage src={meal.images[0]} alt="MealImage" />
                  </SideImageWrapper>
                  <SideInfoWrapper> {meal.title}</SideInfoWrapper>
                  <SideFooterWrapper>
                    <GoLocation /> {meal.restaurantChain}
                  </SideFooterWrapper>
                </SideItem>
                <DeleteBtn>
                  <ImBin style={{ fontSize: "1.5rem" }} />
                </DeleteBtn>
              </AnimationDiv>
            );
          })}
      </SideItemWrapper>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 15vw;
  height: 65vh;
  border-radius: 0.8rem;
  background: ${(props) => props.theme.second_bg};
  box-shadow: 0px 4px 6px -1px ${(props) => props.theme.box_shadow1};
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem 5px 5px 5px;
  overflow: hidden;

  h2 {
    color: ${(props) => props.theme.text_color2};
  }

  @media (max-width: 992px) {
    min-width: 320px;
  }
  @media (max-width: 1330px) {
    margin-top: 100px;
  }
`;

const SideItemWrapper = styled.ul`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.main_bg};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.3rem;
  padding: 0.4rem 0;
  overflow: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const AnimationDiv = styled(motion.div)`
  display: flex;
  justify-items: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;

`;

const SideItem = styled(motion.li)`
  height: 80px;
  background: ${(props) => props.theme.second_bg};
  border-radius: 15px;
  color: ${(props) => props.theme.text_color2};
  box-shadow: 0px 1px 3px -1px ${(props) => props.theme.text_color};
  display: flex;
  box-sizing: border-box;
  flex: 1;
  position: relative;
  z-index: 2;
  font-size: 0.7rem;
  letter-spacing: 1px;
  gap: 3px;
  padding-right: 5px;
  @media (max-width: 992px) {
    flex-direction: row;
  }
  @media (max-width: 1330px) {
    justify-content: center;
    align-items: center;
    height: 100px;
  }
`;

const SideImageWrapper = styled.div`
  flex: 3.5;
  background: ${(props) => props.theme.main_bg_200};
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.second_bg};
  padding-bottom: 5px;
  @media (max-width: 1330px) {
    border-radius: 5px;
    height: 100px;
    justify-content: center;
    align-items: center;
  }
`;

const SideImage = styled.img`
  border-radius: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  max-width: 75%;
  height: auto;
  max-height: 75%;
  object-fit: cover;
  z-index: 2;
  @media (max-width: 992px) {
    max-width: 50%;
    max-height: 50%;
  }
`;

const StyledStar = styled.img`
  width: 70px;
  height: 70px;
  position: absolute;
  z-index: 1;
`;
const SideInfoWrapper = styled.div`
  flex: 3.5;
  height: 95%;
  background: ${(props) => props.theme.second_bg};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 5px 5px;
  text-overflow: ellipsis;
  white-space: pre-line;
  overflow: hidden;
  @media (max-width: 1330px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const SideFooterWrapper = styled.div`
  flex: 3;
  background: ${(props) => props.theme.second_bg};
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  gap: 3px;
  @media (max-width: 1330px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const DeleteBtn = styled(motion.div)`
  z-index: 1;
  position: absolute;
  height: 95%;
  width: 50%;
  top: 50%;
  right: 2px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transform: translateY(-50%);
  background-color: red;
  border-radius: 15px;
  padding-right: 15px;
`;

export default SideCart;
