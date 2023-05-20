// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import DetailedMenuItem from "../components/DetailedMenuItem";
import { useState } from "react";
import styled, { useTheme } from "styled-components";
import "swiper/css";
import { useSelector } from "react-redux";
import { CgAddR } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Modal from "../Pages/Modal";
import { createPortal } from "react-dom";

export default function Carousel() {
  const { t } = useTranslation();
  const { userMenu, meals } = useSelector((reduxStore) => reduxStore.user);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const selectedMeal = meals.filter((meal) => {
    return meal.id === selectedId;
  });
  const portalRoot = document.getElementById("modal-root");
  const ModalPortal = () =>
    createPortal(
      <Modal
        modalHandler={modalHandler}
        selectHandler={selectHandler}
        selectedId={selectedId}
        selectedMeal={selectedMeal}
      />,
      portalRoot
    );

  const modalHandler = () => {
    if (selectedId) {
      setIsOpen(!isOpen);
    }
  };
  const selectHandler = (itemID) => {
    setSelectedId(itemID);
  };

  if (userMenu.length === 0) {
    return (
      <EmptyWrapper>
        <h1 style={{ color: `${theme.second_bg}` }}>{t("add meal")}</h1>
        <NavLink to="/">
          <CgAddR
            style={{
              fontSize: "2.5rem",
              cursor: "pointer",
              boxSizing: "border-box",
              transition: "0.3s ease-in-out",
              color: `${theme.second_bg}`,
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
          {isOpen && <ModalPortal />}
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
