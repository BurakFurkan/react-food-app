import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextPage, previousPage } from "../features/productSlice";
import styled, { useTheme } from "styled-components";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

export function HomePagination() {
  const { page,error } = useSelector((reduxStore) => reduxStore.product);
  const dispatch = useDispatch();
  const theme=useTheme();

  if (error===true) {
    return ("")}
  
  
  return (
    <PaginationWrapper>
      {(page>1)?<BiLeftArrowAlt
        aria-label="Increment value"
        onClick={() => dispatch(previousPage())}
        style={{ cursor: "pointer", fontSize: "2rem",boxShadow:`0px 4px 6px -1px ${theme.box_shadow1}`,borderRadius:"50%",backdropFilter:"blur(12px)" }}
        color={theme.text_color}
      />:<BiLeftArrowAlt
      aria-label="Increment value"
      style={{fontSize: "2rem",boxShadow:`0px 4px 6px -1px ${theme.box_shadow1}`,borderRadius:"50%",backdropFilter:"blur(12px)" }}
      color={theme.disabled}
    />}
      <span style={{ fontSize: "1.5rem" }}>{page}</span>
      <BiRightArrowAlt
        aria-label="Decrement value"
        onClick={() => dispatch(nextPage())}
        style={{ cursor: "pointer", fontSize: "2rem",boxShadow:`0px 4px 6px -1px ${theme.box_shadow1}`,borderRadius:"50%",backdropFilter:"blur(12px)" }}
        color={theme.text_color}
      />
    </PaginationWrapper>
  );
}

const PaginationWrapper = styled.div`
  width: 6rem;
  height: 1.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  span{
    color:${(props) => props.theme.text_color};
  }
`;
