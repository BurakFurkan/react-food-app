import React, { useEffect } from "react";
import styled from "styled-components";
import MenuItem from "../../components/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

function Tabs() {
  const cssOverride = {
    display: "block",
    margin: "3rem",
    borderColor: "#f4f4f5",
  };

  const { products, isLoading, category } = useSelector(
    (store) => store.product
  );
  const { meals } = useSelector(
    (store) => store.user
  );

    useEffect(() =>{

    },[meals])

  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <LoadingDiv>
        <ClipLoader loading={isLoading} cssOverride={cssOverride} size={150} />
      </LoadingDiv>
    );
  }

  return (
    <Container>
      <MenuWrapper>
        {products.menuItems.map((product, index) => {
          return <MenuItem key={index} {...product} />;
        })}
      </MenuWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  border-radius: 26px;
  box-sizing: border-box;
  position: relative;
  margin-top: 0.8rem;
  background-color: #bccccd;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 992px) {
    width: 330px;
  }

`;

const MenuWrapper = styled.div`
  width: 95%;
  height: 95%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  overflow: scroll;
  padding: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LoadingDiv = styled.div`
  width: 100%;
  height: 70vh;
  margin-top: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;

`;

export default Tabs;
