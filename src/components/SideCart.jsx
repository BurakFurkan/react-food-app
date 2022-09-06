import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ImBin } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { removeFromUserMeals, removeFromUserMenu } from "../features/userSlice";
import yellowStar from "../assets/yellowStar.png";

const SideCart = () => {
  const { meals } = useSelector((reduxStore) => reduxStore.user);
  const dispatch = useDispatch();
  const[dragStart ,setDragStart] = useState(0)

  const handleDragEnd = (e, info, mealID) => {
    const dragEnd = info.point.x;
    console.log(dragEnd , dragStart)
    if ((dragStart-dragEnd) > 200) {
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
      <h2 style={{ color: "#777785" }}>User Inventory</h2>
      <SideItemWrapper>
        {meals.slice(0).reverse().map((meal) => {
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
                dragElastic={{ left: 0.2, right: 0.1 }}
                onDragStart={(e,info) => setDragStart(info.point.x)}
                onDragEnd={(e, info) => handleDragEnd(e, info, meal.id)}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
              >
                <SideImageWrapper>
                  <StyledStar src={yellowStar} alt="yellowStar" />
                  <SideImage src={meal.images[0]} alt="MealImage" />
                </SideImageWrapper>
                <SideInfoWrapper>{meal.title}</SideInfoWrapper>
                <SideFooterWrapper>{meal.restaurantChain}</SideFooterWrapper>
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
  border-radius: 26px;
  background: #f4f4f5;
  box-shadow: -5px -5px 13px #848f90, 5px 5px 13px #f4ffff;
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem 5px 5px 5px;
  overflow: hidden;
`;

const SideItemWrapper = styled.ul`
  width: 100%;
  height: 100%;
  background: #bccccd;
  border-radius: 15px;
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
  box-sizing: border-box;
  position: relative;
`;

const SideItem = styled(motion.li)`
  background: #f4f4f5;
  width: 100%;
  height: 75px;
  border-radius: 15px;
  color: #777785;
  display: flex;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  font-size: 0.8rem;
  gap: 10px;
  padding-right: 5px;
`;

const SideImageWrapper = styled.div`
  width: 35%;
  height: 75px;
  background: #777785;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f4f4f5;
  padding-bottom: 5px;
`;

const SideImage = styled.img`
  border-radius: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 75%;
  z-index: 2;
`;

const StyledStar = styled.img`
  width: 70px;
  height: 70px;
  position: absolute;
  z-index: 1;
`;
const SideInfoWrapper = styled.div`
  width: 40%;
  background: #f4f4f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SideFooterWrapper = styled.div`
  width: 25%;
  background: #f4f4f5;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteBtn = styled(motion.div)`
  z-index: 1;
  position: absolute;
  height: 95%;
  width: 40%;
  top: 50%;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transform: translateY(-50%);
  background-color: red;
  border-radius: 15px;
  padding-right: 15px;
`;

export default SideCart;

