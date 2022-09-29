import React from "react";
import styled,{useTheme} from "styled-components";
import { VscQuestion } from "react-icons/vsc";
import { GiReturnArrow } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  const theme=useTheme()
  return (
    <Container>
      <VscQuestion
        style={{
          fontSize: "2.5rem",
          boxSizing: "border-box",
          transition: "0.3s ease-in-out",
          color: `${theme.second_bg}`,
        }}
      />
      <h2>Ooops.. Seems like You're lost?</h2>
      <NavLink to="/">
        <GiReturnArrow
          style={{
            fontSize: "2.5rem",
            cursor: "pointer",
            boxSizing: "border-box",
            transition: "0.3s ease-in-out",
            color: `${theme.second_bg}`,
          }}
        />
      </NavLink>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
