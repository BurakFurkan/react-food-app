import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { DropdownThemes } from "./DropdownThemes";
import { useDispatch } from "react-redux";
import { langHandler } from "../features/userSlice";
import TurkeyFlag from "../assets/turkey-flag.png";
import USAFlag from "../assets/usa-flag.png";
import { useTranslation } from "react-i18next";

export const Dropdown = ({ info, onMouseEnter, onMouseLeave }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <DropdownContainer
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ top: `${info.top + 50}px`, left: `${info.left - 28}px` }}
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      {/* Language */}
      <Section>
        <SectionLabel>Language</SectionLabel>
        <FlagRow>
          <FlagBtn
            onClick={() => dispatch(langHandler("en"))}
            aria-label="Switch to English"
          >
            <FlagImg src={USAFlag} alt="English" />
            <FlagCode>EN</FlagCode>
          </FlagBtn>
          <FlagBtn
            onClick={() => dispatch(langHandler("tr"))}
            aria-label="Türkçeye geç"
          >
            <FlagImg src={TurkeyFlag} alt="Türkçe" />
            <FlagCode>TR</FlagCode>
          </FlagBtn>
        </FlagRow>
      </Section>

      <Divider />

      {/* Theme */}
      <Section>
        <SectionLabel>{t("navTheme")}</SectionLabel>
        <ThemeRow>
          <ThemeOption>
            <DropdownThemes
              colorarray={["#FAFAF7", "#E8451A", "#F4F1EA", "#1C1C1E"]}
              theme="lightTheme"
            />
            <ThemeLabel>Light</ThemeLabel>
          </ThemeOption>
          <ThemeOption>
            <DropdownThemes
              colorarray={["#0C0C0C", "#FF5722", "#1E1E1E", "#F2F2F0"]}
              theme="darkTheme"
            />
            <ThemeLabel>Dark</ThemeLabel>
          </ThemeOption>
        </ThemeRow>
      </Section>
    </DropdownContainer>
  );
};

// ── Styles ────────────────────────────────────────────────────

const DropdownContainer = styled(motion.div)`
  position: fixed;
  z-index: 9999;
  width: 224px;
  background: ${({ theme }) => theme.bg_elevated};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow_xl};
  padding: 0.75rem;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SectionLabel = styled.p`
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: ${({ theme }) => theme.text_muted};
  padding: 0 0.2rem;
`;

const FlagRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FlagBtn = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.375rem;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  cursor: pointer;
  transition: border-color 0.18s, background 0.18s;
  font-family: inherit;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary_muted};
  }
`;

const FlagImg = styled.img`
  width: 34px;
  height: auto;
  border-radius: 3px;
`;

const FlagCode = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_secondary};
  letter-spacing: 0.05em;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: ${({ theme }) => theme.border};
  margin: 0.5rem 0;
`;

const ThemeRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ThemeOption = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
`;

const ThemeLabel = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  letter-spacing: 0.02em;
`;
