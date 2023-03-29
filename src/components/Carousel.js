// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import DetailedMenuItem from "../components/DetailedMenuItem";
import { useState } from "react";
import styled, {useTheme} from "styled-components";
import "swiper/css";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { CgAddR } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Carousel() {
  const { t } = useTranslation();
  const { userMenu, meals } = useSelector((reduxStore) => reduxStore.user);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const theme=useTheme();
  const selectedMeal = meals.filter((meal) => {
    return meal.id === selectedId;
  });

  const modalHandler = () => {
    selectedId && setIsOpen(isOpen ? false : true);
  };
  const selectHandler = (itemID) => {
    setSelectedId(itemID);
  };

  if (userMenu.length === 0) {
    return (
      <EmptyWrapper>
        <h1 style={{color:`${theme.second_bg}`}} >{t("add meal")}</h1>
        <NavLink to="/">
          <CgAddR
            style={{
              fontSize: "2.5rem",
              cursor: "pointer",
              boxSizing: "border-box",
              transition: "0.3s ease-in-out",
              color:`${theme.second_bg}`,
            }}
          />
        </NavLink>
      </EmptyWrapper>
    );
  } else
    return (
      <CarouselWrapper>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 3,
              direction: "horizontal",
              mousewheel: true,
            },
            1024: {
              spaceBetween: 3,
              slidesPerView: 3,
              direction: "horizontal",
              mousewheel: true,
            },
            2560: {
              spaceBetween: 3,
              slidesPerView: 3,
              direction: "horizontal",
              mousewheel: true,
            },
          }}
          style={{ width: "100%", padding: "0.5rem" }}
        >
          {meals.map((meal) => {
            return (
              <SwiperSlide key={meal.id}>
                <DetailedMenuItem
                  modalHandler={modalHandler}
                  selectHandler={selectHandler}
                  layoutId={meal.id}
                  {...meal}
                />
              </SwiperSlide>
            );
          })}
          {isOpen && (
            <ModalWrapper
              data-id="modal"
              onClick={(e) => {
                e.target.dataset.id === "modal" && modalHandler();
                e.preventDefault();
              }}
              layoutId={selectedId}
            >
              <DetailedMenuItem
                modalHandler={modalHandler}
                selectHandler={selectHandler}
                {...selectedId}
                {...selectedMeal[0]}
              />
            </ModalWrapper>
          )}
        </Swiper>
      </CarouselWrapper>
    );
}

const CarouselWrapper = styled.div`
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    width: 320px;
  }
`;

const ModalWrapper = styled(motion.div)`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  & > div {
    transform: scale(1.2);
  }
`;

const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
`;
