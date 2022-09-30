import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { pickCategory } from "../features/productSlice";
import { useTranslation } from "react-i18next";

const CategoryTabs = () => {
  const { t, i18n } = useTranslation();
  const { categories,category } = useSelector((reduxStore) => reduxStore.product);
  const dispatch = useDispatch();

  return (
    <CategoryWrapper>
      {Object.keys(categories).map((tabCategory, index) => {
        return (
          <CategoryTab
            key={index} className={tabCategory === category? "isActive" : null} 
            onClick={() => {
              dispatch(pickCategory(tabCategory));
            }}
          >
          {t(`${tabCategory}`)}
          </CategoryTab>
        );
      })}
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.div`
  width: 930px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  overflow: hidden;
  background: ${(props) => props.theme.second_bg};
  box-shadow: -5px -5px 13px ${(props) => props.theme.box_shadow1}, 5px 5px 13px ${(props) => props.theme.box_shadow2};

  @media (max-width: 992px) {
    width:320px;
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    gap:0.5rem;
    padding:0 10px;
  }
`;

const CategoryTab = styled.span`
  color: ${(props) => props.theme.text_color2};
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  transition: 0.2s ease-out;

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.hover2};
    color: ${(props) => props.theme.second_bg};
  }

  &.isActive{
    background: ${(props) => props.theme.active2};
    color: ${(props) => props.theme.second_bg};
  }

  &:focus {
    background: ${(props) => props.theme.text_color};
  }

  @media (max-width: 992px) {
    width: 25%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }


`;

export default CategoryTabs;
