import React from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  addToUserMenu,
  removeFromUserMenu,
  removeFromUserMeals,
  addToFavList,
  removeFromFavList,
  getUserMeals,
} from "../features/userSlice";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { HiPlus, HiCheck } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import ReactStars from "react-stars";
import Swal from "sweetalert2";
const Placeholder = '/images/placeholder.png';
import useRandomNumber from "./useRandomNumber";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 26 },
  },
};

const MenuItem = ({ id, title, image, restaurantChain }) => {
  const { userMenu, favList } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();

  const price = useRandomNumber(50, 150);
  const discount = useRandomNumber(5, 25);
  const discountedPrice = price - discount;
  const rating = useRandomNumber(1, 5);
  const reviewCount = useRandomNumber(100, 2500);
  const discountPct = Math.round((discount / price) * 100);

  const isInMenu = userMenu.includes(id);
  const isFav = favList.includes(id);

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

  const addDefaultSrc = (ev) => {
    ev.target.src = Placeholder;
  };

  const favClickHandler = () => {
    isFav ? dispatch(removeFromFavList(id)) : dispatch(addToFavList(id));
  };

  const cartClickHandler = () => {
    if (isInMenu) {
      dispatch(removeFromUserMenu(id));
      dispatch(removeFromUserMeals(id));
      Toast.fire({ icon: "error", title: t("ItemRemoved") });
    } else {
      dispatch(addToUserMenu(id));
      dispatch(getUserMeals(id));
      Toast.fire({ icon: "success", title: t("ItemAdded") });
    }
  };

  return (
    <CardContainer
      variants={cardVariants}
      whileHover={{
        y: -5,
        transition: { type: "spring", stiffness: 380, damping: 22 },
      }}
    >
      {/* Image */}
      <ImageArea>
        <CardImage src={image} alt={title} onError={addDefaultSrc} />
        <ImageOverlay />

        <FavBtn
          onClick={favClickHandler}
          isfav={isFav ? 1 : 0}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          as={motion.button}
          whileTap={{ scale: 0.88 }}
        >
          {isFav ? <BsHeartFill /> : <BsHeart />}
        </FavBtn>

        {discountPct > 0 && (
          <DiscountBadge>-{discountPct}%</DiscountBadge>
        )}
      </ImageArea>

      {/* Body */}
      <CardBody>
        <CardTitle title={title}>{title}</CardTitle>

        <RatingRow>
          <ReactStars
            edit={false}
            half={true}
            size={15}
            count={5}
            value={rating}
            color2={theme.accent}
            color1={theme.border}
          />
          <ReviewCount>({reviewCount})</ReviewCount>
        </RatingRow>

        <RestaurantRow>
          <GoLocation aria-hidden="true" />
          <span>{restaurantChain}</span>
        </RestaurantRow>

        <CardFooter>
          <PriceGroup>
            <OriginalPrice>{price}TL</OriginalPrice>
            <DiscountedPrice>{discountedPrice}TL</DiscountedPrice>
          </PriceGroup>

          <AddBtn
            onClick={cartClickHandler}
            isinmenu={isInMenu ? 1 : 0}
            aria-label={isInMenu ? "Remove from order" : "Add to order"}
            as={motion.button}
            whileTap={{ scale: 0.88 }}
          >
            {isInMenu ? <HiCheck /> : <HiPlus />}
          </AddBtn>
        </CardFooter>
      </CardBody>
    </CardContainer>
  );
};

export default MenuItem;

// ── Styles ────────────────────────────────────────────────────

const CardContainer = styled(motion.article)`
  border-radius: 20px;
  background: ${({ theme }) => theme.bg_card};
  box-shadow: ${({ theme }) => theme.shadow_md};
  border: 1px solid ${({ theme }) => theme.border};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.28s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow_lg};
  }
`;

const ImageArea = styled.div`
  position: relative;
  height: 188px;
  overflow: hidden;
  background: ${({ theme }) => theme.surface};
  flex-shrink: 0;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;

  ${CardContainer}:hover & {
    transform: scale(1.06);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.22) 0%, transparent 55%);
  pointer-events: none;
`;

const FavBtn = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.bg_elevated};
  color: ${({ theme, isfav }) => (isfav ? "#EF4444" : theme.text_secondary)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.95rem;
  box-shadow: ${({ theme }) => theme.shadow_md};
  transition: color 0.18s, transform 0.18s;

  &:hover {
    color: #ef4444;
    transform: scale(1.12);
  }
`;

const DiscountBadge = styled.span`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.18rem 0.45rem;
  border-radius: 6px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

const CardBody = styled.div`
  padding: 0.875rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const ReviewCount = styled.span`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.text_muted};
  margin-top: 1px;
`;

const RestaurantRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.28rem;
  font-size: 0.73rem;
  color: ${({ theme }) => theme.text_secondary};

  svg {
    flex-shrink: 0;
    font-size: 0.82rem;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 0.625rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const PriceGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
`;

const OriginalPrice = styled.del`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.text_muted};
`;

const DiscountedPrice = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const AddBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 9px;
  border: none;
  background: ${({ theme, isinmenu }) =>
    isinmenu ? theme.surface : theme.primary};
  color: ${({ theme, isinmenu }) =>
    isinmenu ? theme.text_secondary : "#fff"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  box-shadow: ${({ theme, isinmenu }) =>
    isinmenu ? "none" : theme.shadow_primary};
  transition: background 0.18s, box-shadow 0.18s;

  &:hover {
    background: ${({ theme, isinmenu }) =>
      isinmenu ? theme.border : theme.primary_hover};
  }
`;
