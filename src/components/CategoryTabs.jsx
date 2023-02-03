import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { pickCategory } from "../features/productSlice";
import { useTranslation } from "react-i18next";

const CategoryTabs = () => {
  const { t } = useTranslation();
  const { categories, category } = useSelector(
    (reduxStore) => reduxStore.product
  );
  const dispatch = useDispatch();

  return (
    <CategoryWrapper>
      {Object.keys(categories).map((tabCategory, index) => {
        return (
          <CategoryTab
            key={index}
            className={tabCategory === category ? "isActive" : null}
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
  min-height: 50px;
  display: flex;
  align-items: stretch;
  border-radius: 5px;
  overflow: hidden;
  background: ${(props) => props.theme.second_bg};
  box-shadow: -5px -5px 13px ${(props) => props.theme.box_shadow1},
    5px 5px 13px ${(props) => props.theme.box_shadow2};

  @media (max-width: 992px) {
    display: flex;
    width:95vw;
    flex-wrap:wrap;
  }
`;

const CategoryTab = styled.span`
  color: ${(props) => props.theme.text_color2};
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content:center;
  text-transform: uppercase;
  transition: 0.2s ease-out;
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.hover2};
    color: ${(props) => props.theme.second_bg};
  }

  &.isActive {
    background: ${(props) => props.theme.active2};
    color: ${(props) => props.theme.second_bg};
  }

  &:focus {
    background: ${(props) => props.theme.text_color};
  }

  @media (max-width: 992px) {
    display: flex;
    flex:33%;
  }
`;

export default CategoryTabs;
