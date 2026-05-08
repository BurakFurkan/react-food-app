import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { removeFromUserMeals, removeFromUserMenu } from "../features/userSlice";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import styled, { useTheme } from "styled-components";
const Placeholder = '/images/placeholder.png';
import { GoLocation } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi";

const SideCart = () => {
  const { meals } = useSelector((store) => store.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dragStart, setDragStart] = useState(0);
  const theme = useTheme();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    iconColor: theme.primary,
    background: theme.bg_elevated,
    color: theme.text,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleDragEnd = (e, info, mealID) => {
    if (dragStart - info.point.x > 180) {
      dispatch(removeFromUserMenu(mealID));
      dispatch(removeFromUserMeals(mealID));
      Toast.fire({ icon: "error", title: t("ItemRemoved") });
    }
  };

  const handleDelete = (mealID) => {
    dispatch(removeFromUserMenu(mealID));
    dispatch(removeFromUserMeals(mealID));
    Toast.fire({ icon: "error", title: t("ItemRemoved") });
  };

  const addDefaultSrc = (ev) => {
    ev.target.src = Placeholder;
  };

  return (
    <CartContainer
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
    >
      <CartHeader>
        <CartTitleRow>
          <CartIcon>
            <BsCart3 />
          </CartIcon>
          <CartTitle>{t("userinventory")}</CartTitle>
        </CartTitleRow>
        {meals.length > 0 && <CountBadge>{meals.length}</CountBadge>}
      </CartHeader>

      <ItemsList>
        <AnimatePresence initial={false}>
          {meals.length === 0 ? (
            <EmptyState
              key="empty"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyEmoji>🛒</EmptyEmoji>
              <EmptyHeading>No items yet</EmptyHeading>
              <EmptySubtext>Add meals from the menu to get started</EmptySubtext>
            </EmptyState>
          ) : (
            meals
              .slice(0)
              .reverse()
              .map((meal) => (
                <CartItemWrapper
                  key={meal.id}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 60, transition: { duration: 0.2 } }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={{ left: 0.12, right: 0.01 }}
                  onDragStart={(e, info) => setDragStart(info.point.x)}
                  onDragEnd={(e, info) => handleDragEnd(e, info, meal.id)}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 12 }}
                >
                  <ItemThumb
                    src={meal.images?.[0]}
                    alt={meal.title}
                    onError={addDefaultSrc}
                  />
                  <ItemInfo>
                    <ItemTitle>{meal.title}</ItemTitle>
                    <ItemMeta>
                      <GoLocation aria-hidden="true" />
                      <span>{meal.restaurantChain}</span>
                    </ItemMeta>
                  </ItemInfo>
                  <DeleteBtn
                    onClick={() => handleDelete(meal.id)}
                    aria-label="Remove item"
                    as={motion.button}
                    whileTap={{ scale: 0.88 }}
                  >
                    <RiDeleteBin6Line />
                  </DeleteBtn>
                </CartItemWrapper>
              ))
          )}
        </AnimatePresence>
      </ItemsList>

      {meals.length > 0 && (
        <CartFooter>
          <CheckoutBtn
            as={motion.button}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
          >
            Checkout
            <HiArrowRight />
          </CheckoutBtn>
        </CartFooter>
      )}
    </CartContainer>
  );
};

export default SideCart;

// ── Styles ────────────────────────────────────────────────────

const CartContainer = styled(motion.aside)`
  width: 272px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.bg_elevated};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadow_lg};
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 100px);
  overflow: hidden;
  align-self: flex-start;
  position: sticky;
  top: 80px;

  @media (max-width: 1200px) {
    width: 240px;
  }

  @media (max-width: 992px) {
    width: 100%;
    max-height: 320px;
    position: static;
  }
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.125rem 1.125rem 0.875rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  flex-shrink: 0;
`;

const CartTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CartIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary_muted};
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
`;

const CartTitle = styled.h2`
  font-size: 0.925rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  letter-spacing: 0.005em;
`;

const CountBadge = styled.span`
  background: ${({ theme }) => theme.primary};
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.border};
    border-radius: 3px;
  }
`;

const CartItemWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.625rem;
  border-radius: 14px;
  background: ${({ theme }) => theme.surface};
  cursor: grab;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
`;

const ItemThumb = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
  background: ${({ theme }) => theme.border};
`;

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemTitle = styled.p`
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.18rem;
`;

const ItemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.68rem;
  color: ${({ theme }) => theme.text_muted};

  svg {
    flex-shrink: 0;
    font-size: 0.72rem;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const DeleteBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text_muted};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  flex-shrink: 0;
  transition: color 0.18s, background 0.18s;

  &:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }
`;

const EmptyState = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1rem;
  gap: 0.5rem;
  text-align: center;
`;

const EmptyEmoji = styled.div`
  font-size: 2.25rem;
  opacity: 0.5;
  margin-bottom: 0.25rem;
`;

const EmptyHeading = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
`;

const EmptySubtext = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text_muted};
  line-height: 1.5;
`;

const CartFooter = styled.div`
  padding: 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  flex-shrink: 0;
`;

const CheckoutBtn = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadow_primary};
  transition: background 0.18s;
  letter-spacing: 0.01em;

  svg {
    font-size: 1rem;
  }

  &:hover {
    background: ${({ theme }) => theme.primary_hover};
  }
`;
