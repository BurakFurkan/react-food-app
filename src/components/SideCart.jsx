import React from "react";
import styled from "styled-components";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

const SideCart = () => {
  return <Container initial={{opacity:0 , y:-100}} animate={{opacity:1 , y:0}} exit={{opacity:0 , y:20 , transition:{duration:0.1}}} >User Inventory</Container>;
};

const Container = styled(motion.div)`
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
