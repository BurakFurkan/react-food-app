import React from "react";
import styled from "styled-components";

const SideCart = () => {
  return <Container>User Inventory</Container>;
};

const Container = styled.div`
  width: 15vw;
  height: 65vh;
  border-radius: 26px;
  background: #bccccd;
  box-shadow: -5px -5px 13px #848f90, 5px 5px 13px #f4ffff;
  align-items: flex-start;
  justify-content: center;
  display: flex;
  position: relative;
  overflow: hidden;
  padding: 1rem 0.5rem;
`;

export default SideCart;
