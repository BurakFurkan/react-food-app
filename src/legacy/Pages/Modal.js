import React from "react";
import styled from "styled-components";
import DetailedMenuItem from "../components/DetailedMenuItem";
import { motion } from "framer-motion";

function Modal({modalHandler,selectHandler,selectedId,selectedMeal}) {
  return (
    <ModalWrapper
      data-id="modal"
      onClick={(e) => {
        e.target.dataset.id === "modal" && modalHandler();
        e.preventDefault();
      }}
      layoutId={selectedId}
    >
      <DetailedMenuItem
        modalHandler={modalHandler}
        selectHandler={selectHandler}
        {...selectedId}
        {...selectedMeal[0]}
      />
    </ModalWrapper>
  );
}

const ModalWrapper = styled(motion.div)`
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  & > div {
    transform: scale(1.2);
  }
`;

export default Modal;
