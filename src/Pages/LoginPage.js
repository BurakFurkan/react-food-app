import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {  useDispatch } from "react-redux";
import { registerUserName,login } from "../features/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUserName(data.nameInput));
    dispatch(login());
  };
  const watchName = watch("nameInput");
  const watchPassword = watch("passwordInput");
  const watchMail = watch("mailInput");

  return (
    <Container initial={{opacity:0 , y:-100}} animate={{opacity:1 , y:0}} exit={{opacity:0 , y:200 , transition:{duration:0.1}}}>
      <LogoDiv>
        <MainLogo>HealthFree</MainLogo>
      </LogoDiv>
      <PageWrapper>
        <h1 style={{ color: "#777785" }}>Register for free</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup inputcontrol={watchName}>
            <label>Name</label>
            <input
              autoComplete="off"
              {...register("nameInput", { required: true })}
            />
            {errors.nameInput && (
              <span style={{ alignSelf: "flex-start", color: "#777785" }}>
                Provide a valid name
              </span>
            )}
          </InputGroup>

          <InputGroup inputcontrol={watchPassword}>
            <label>Password</label>
            <input
              autoComplete="off"
              {...register("passwordInput", { required: true })}
            />
            {errors.passwordInput && (
              <span style={{ alignSelf: "flex-start", color: "#777785" }}>
                Provide a valid password
              </span>
            )}
          </InputGroup>

          <InputGroup inputcontrol={watchMail}>
            <label>Email</label>
            <input
              autoComplete="off"
              {...register("mailInput", { required: true })}
            />
            {errors.mailInput && (
              <span style={{ alignSelf: "flex-start", color: "#777785" }}>
                Provide a valid mail
              </span>
            )}
          </InputGroup>

          <SubmitInput type="submit" value="Register" />
        </form>
      </PageWrapper>
    </Container>
  );
};

const Container = styled(motion.div)`
  background: #bccccd;
  width: 80vw;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
  gap: 2rem;

  @media (max-width: 768px) {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const LogoDiv = styled.div`
  width: 98vw;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 992px) {
    padding: 5px;
    width: 95vw;
    height: 250px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const MainLogo = styled.span`
  width: 200px;
  height: 100px;
  font-size: 35px;
  cursor: pointer;
  src: url("https://fonts.googleapis.com/css2?family=Rubik+Dirt&display=swap");
  font-family: "Rubik Dirt", cursive;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f4f4f5;
  filter: drop-shadow(0 0 0.5rem #888895);
`;

const PageWrapper = styled.div`
  width: 30vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
  padding: 1rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
  }

  @media (max-width: 768px) {
    width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px;
  }
`;

const InputGroup = styled.div`
  width: 90%;
  height: 50px;
  position: relative;

  input {
    width: 98%;
    height: 100%;
    background: transparent;
    border: 2px solid #777785;
    border-radius: 5px;
    outline: none;
    padding: 0 10px;
    font-size: 20px;
    color: #777785;
  }

  label {
    position: absolute;
    top: ${(props) =>
      props.inputcontrol && props.inputcontrol.length > 0 ? "-9px" : "15px"};
    left: 10px;
    color: #777785;
    text-transform: capitalize;
    font-size: ${(props) =>
      props.inputcontrol && props.inputcontrol.length > 0 ? "1rem" : "1.15rem"};
    transition: all 0.5s;
    padding: 0 5px;
    cursor: text;
    background-color: ${(props) =>
      props.inputcontrol && props.inputcontrol.length > 0 ? "#C9D6D7" : "none"};
  }

  &:hover > label {
    top: -9px;
    background-color: #c9d6d7;
    font-size: 1rem;
  }
  &:focus-within > label {
    top: -9px;
    background-color: #c9d6d7;
    font-size: 1rem;
  }
`;

const SubmitInput = styled.input.attrs({
  type: "submit",
})`
  background: #c9d6d7;
  border-radius: 5px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #777785;
  cursor: pointer;
  margin: 15px 0 0 0;
  width: 100%;
  height: 45px;
  font-size: 1rem;
  border-color: transparent;
  outline: none;
  transition: 0.15s;
  text-align: center;
  &:hover {
    background-color: rgba(31, 38, 135, 0.37);
  }
  &:active {
    background-color: #f1ac15;
  }
`;

export default LoginPage;
