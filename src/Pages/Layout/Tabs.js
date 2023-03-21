import React, { useEffect } from "react";
import styled from "styled-components";
import MenuItem from "../../components/MenuItem";
import { useSelector} from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorHandler from "../../components/ErrorHandler";

function Tabs() {
  const cssOverride = {
    display: "block",
    margin: "3rem",
    borderColor: "#f4f4f5",
  };

  const { products, isLoading,error } = useSelector(
    (store) => store.product
  );
  const { meals } = useSelector(
    (store) => store.user
  );

    useEffect(() =>{

    },[meals])


  if (isLoading) {
    return (
      <LoadingDiv>
        <ClipLoader loading={isLoading}  cssOverride={cssOverride} size={100} />
      </LoadingDiv>
    );
  }else if (error){
    return <ErrorHandler/>
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
  min-height:65vh;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  border-radius: 26px;
  box-sizing: border-box;
  position: relative;
  margin-top: 0.8rem;
  background-color: ${(props) => props.theme.main_bg};
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
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
  min-height: 65vh;
  margin-top: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;

`;

export default Tabs;
