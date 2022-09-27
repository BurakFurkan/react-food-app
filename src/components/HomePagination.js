import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextPage, previousPage } from "../features/productSlice";
import styled from "styled-components";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

export function HomePagination() {
  const { page,error } = useSelector((reduxStore) => reduxStore.product);
  const dispatch = useDispatch();

  if (error===true) {
    return ("")}
  
  
  return (
    <PaginationWrapper>
      {(page>1)?<BiLeftArrowAlt
        aria-label="Increment value"
        onClick={() => dispatch(previousPage())}
        style={{ cursor: "pointer", fontSize: "2rem",boxShadow:"0 8px 32px 0 rgba(31, 38, 135, 0.37)",borderRadius:"50%",backdropFilter:"blur(12px)" }}
        color="#777785"
      />:<BiLeftArrowAlt
      aria-label="Increment value"
      style={{fontSize: "2rem",boxShadow:"0 8px 32px 0 rgba(31, 38, 135, 0.37)",borderRadius:"50%",backdropFilter:"blur(12px)" }}
      color="#adadad"
    />}
      <span style={{ fontSize: "1.5rem" }}>{page}</span>
      <BiRightArrowAlt
        aria-label="Decrement value"
        onClick={() => dispatch(nextPage())}
        style={{ cursor: "pointer", fontSize: "2rem",boxShadow:"0 8px 32px 0 rgba(31, 38, 135, 0.37)",borderRadius:"50%",backdropFilter:"blur(12px)" }}
        color="#777785"
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
`;
