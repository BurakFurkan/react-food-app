import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { pickCategory } from "../features/productSlice";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const categoryEmojis = {
  Beef: "🥩",
  Breakfast: "🍳",
  Chicken: "🍗",
  Dessert: "🍰",
  Lamb: "🐑",
  Pasta: "🍝",
  Seafood: "🦞",
  Side: "🥗",
  Starter: "🥣",
  Vegan: "🌿",
  Vegetarian: "🥦",
};

const CategoryTabs = () => {
  const { t } = useTranslation();
  const { categories, category } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  return (
    <TabsWrapper>
      <TabsScroll>
        {Object.keys(categories).map((tabCategory, index) => {
          const isActive = tabCategory === category;
          return (
            <Tab
              key={index}
              isactive={isActive ? 1 : 0}
              onClick={() => dispatch(pickCategory(tabCategory))}
              as={motion.button}
              whileTap={{ scale: 0.94 }}
              aria-pressed={isActive}
            >
              <TabEmoji aria-hidden="true">
                {categoryEmojis[tabCategory] || "🍽️"}
              </TabEmoji>
              <TabLabel>{t(tabCategory)}</TabLabel>
            </Tab>
          );
        })}
      </TabsScroll>
    </TabsWrapper>
  );
};

export default CategoryTabs;

const TabsWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const TabsScroll = styled.div`
  display: flex;
  gap: 0.4rem;
  overflow-x: auto;
  padding: 0.125rem 0;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.875rem;
  border-radius: 999px;
  border: 1.5px solid
    ${({ theme, isactive }) => (isactive ? theme.primary : theme.border)};
  background: ${({ theme, isactive }) =>
    isactive ? theme.primary_muted : theme.bg_elevated};
  color: ${({ theme, isactive }) =>
    isactive ? theme.primary : theme.text_secondary};
  font-size: 0.83rem;
  font-weight: ${({ isactive }) => (isactive ? 600 : 500)};
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: border-color 0.18s, background 0.18s, color 0.18s;
  font-family: inherit;
  letter-spacing: 0.01em;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary_muted};
  }
`;

const TabEmoji = styled.span`
  font-size: 0.95rem;
  line-height: 1;
`;

const TabLabel = styled.span`
  text-transform: capitalize;
`;
