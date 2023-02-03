import React from "react";
import styled from "styled-components";
import { TbFaceIdError } from "react-icons/tb";

const ErrorHandler = () => {
  return (
    <Container>
      <TbFaceIdError
        style={{
          fontSize: "2.5rem",
          boxSizing: "border-box",
          transition: "0.3s ease-in-out",
          color: "rgb(237, 234, 222)",
        }}
      />
      <h2>Ooops.. Seems like Something Bad Happened :S</h2>
    </Container>
  );
};

export default ErrorHandler;

const Container = styled.div`
  padding-top:80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;
