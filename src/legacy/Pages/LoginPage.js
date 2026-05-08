import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUserName, login } from "../features/userSlice";
const knifeImage = '/images/knife.jpg';

const LoginPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUserName(data.nameInput));
    dispatch(login());
  };

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      {/* ── Left: Hero ─────────────────────────── */}
      <HeroPanel>
        <HeroImg src={knifeImage} alt="" aria-hidden="true" />
        <HeroOverlay />
        <HeroContent>
          <HeroBadge>
            <BadgeDot />
            Premium Food Delivery
          </HeroBadge>

          <HeroHeading>
            Great food,<br />delivered<br />to you.
          </HeroHeading>

          <HeroSubline>
            Discover the finest restaurants near you and get
            your favourite meals delivered fast.
          </HeroSubline>

          <StatRow>
            <StatCell>
              <StatNum>50k+</StatNum>
              <StatLbl>Menu Items</StatLbl>
            </StatCell>
            <StatSep />
            <StatCell>
              <StatNum>200+</StatNum>
              <StatLbl>Restaurants</StatLbl>
            </StatCell>
            <StatSep />
            <StatCell>
              <StatNum>4.9★</StatNum>
              <StatLbl>Rating</StatLbl>
            </StatCell>
          </StatRow>
        </HeroContent>
      </HeroPanel>

      {/* ── Right: Form ────────────────────────── */}
      <FormPanel
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.12, type: "spring", stiffness: 260, damping: 24 }}
      >
        <FormInner>
          {/* Brand */}
          <BrandRow>
            <BrandMark>H</BrandMark>
            <BrandName>HealthFree</BrandName>
          </BrandRow>

          <FormHeading>Create your account</FormHeading>
          <FormSubheading>Join thousands of food lovers today</FormSubheading>

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Name */}
            <FieldGroup>
              <FieldLabel htmlFor="nameInput">Full Name</FieldLabel>
              <FieldInput
                id="nameInput"
                autoComplete="off"
                haserror={errors.nameInput ? 1 : 0}
                placeholder="John Doe"
                {...register("nameInput", { required: true })}
              />
              {errors.nameInput && (
                <FieldError>Please enter your name</FieldError>
              )}
            </FieldGroup>

            {/* Password */}
            <FieldGroup>
              <FieldLabel htmlFor="passwordInput">Password</FieldLabel>
              <FieldInput
                id="passwordInput"
                type="password"
                autoComplete="new-password"
                haserror={errors.passwordInput ? 1 : 0}
                placeholder="Min. 8 characters"
                {...register("passwordInput", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters required",
                  },
                  maxLength: 20,
                })}
              />
              {errors.passwordInput && (
                <FieldError>
                  {errors.passwordInput.message || "Minimum 8 characters required"}
                </FieldError>
              )}
            </FieldGroup>

            {/* Email */}
            <FieldGroup>
              <FieldLabel htmlFor="mailInput">Email Address</FieldLabel>
              <FieldInput
                id="mailInput"
                type="email"
                autoComplete="email"
                haserror={errors.mailInput ? 1 : 0}
                placeholder="you@example.com"
                {...register("mailInput", {
                  required: true,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.mailInput && (
                <FieldError>
                  {errors.mailInput.message || "Enter a valid email address"}
                </FieldError>
              )}
            </FieldGroup>

            <SubmitBtn
              type="submit"
              as={motion.button}
              whileHover={{ scale: 1.018 }}
              whileTap={{ scale: 0.975 }}
            >
              Get Started — It's Free
            </SubmitBtn>
          </Form>

          <FormFootnote>
            By joining, you agree to our Terms of Service and Privacy Policy.
          </FormFootnote>
        </FormInner>
      </FormPanel>
    </PageContainer>
  );
};

export default LoginPage;

// ── Styles ────────────────────────────────────────────────────

const PageContainer = styled(motion.div)`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/* Hero ─────────────────────── */
const HeroPanel = styled.div`
  flex: 1.15;
  position: relative;
  overflow: hidden;
  min-height: 100vh;

  @media (max-width: 768px) {
    min-height: 38vh;
    flex: none;
  }
`;

const HeroImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    140deg,
    rgba(10, 6, 2, 0.88) 0%,
    rgba(160, 44, 12, 0.62) 55%,
    rgba(10, 6, 2, 0.78) 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 3rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1.375rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    justify-content: center;
    gap: 1rem;
  }
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 87, 34, 0.22);
  border: 1px solid rgba(255, 87, 34, 0.38);
  color: #ffb299;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  padding: 0.32rem 0.7rem;
  border-radius: 999px;
  width: fit-content;
`;

const BadgeDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff5722;
  flex-shrink: 0;
`;

const HeroHeading = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 900;
  color: #fff;
  line-height: 1.04;
  letter-spacing: -0.025em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubline = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.68);
  line-height: 1.65;
  max-width: 380px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StatCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const StatNum = styled.span`
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
`;

const StatLbl = styled.span`
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.04em;
`;

const StatSep = styled.div`
  width: 1px;
  height: 34px;
  background: rgba(255, 255, 255, 0.18);
`;

/* Form ─────────────────────── */
const FormPanel = styled(motion.div)`
  width: 480px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.bg_elevated};
  display: flex;
  align-items: center;
  overflow-y: auto;

  @media (max-width: 1100px) {
    width: 420px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormInner = styled.div`
  width: 100%;
  padding: 2.75rem 2.5rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const BrandMark = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 1rem;
`;

const BrandName = styled.span`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15rem;
  color: ${({ theme }) => theme.text};
  letter-spacing: -0.02em;
`;

const FormHeading = styled.h2`
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  letter-spacing: -0.025em;
  line-height: 1.15;
  margin-bottom: 0.4rem;
`;

const FormSubheading = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const FieldLabel = styled.label`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  letter-spacing: 0.01em;
`;

const FieldInput = styled.input`
  height: 48px;
  background: ${({ theme }) => theme.surface};
  border: 1.5px solid
    ${({ theme, haserror }) => (haserror ? "#EF4444" : theme.border)};
  border-radius: 12px;
  padding: 0 0.875rem;
  font-size: 0.925rem;
  color: ${({ theme }) => theme.text};
  font-family: inherit;
  transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.text_muted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary_muted};
    background: ${({ theme }) => theme.bg_elevated};
  }
`;

const FieldError = styled.span`
  font-size: 0.74rem;
  color: #ef4444;
  font-weight: 500;
`;

const SubmitBtn = styled.button`
  height: 52px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 0.975rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  margin-top: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadow_primary};
  transition: background 0.18s;
  letter-spacing: 0.015em;

  &:hover {
    background: ${({ theme }) => theme.primary_hover};
  }
`;

const FormFootnote = styled.p`
  margin-top: 1.375rem;
  font-size: 0.72rem;
  color: ${({ theme }) => theme.text_muted};
  text-align: center;
  line-height: 1.55;
`;
