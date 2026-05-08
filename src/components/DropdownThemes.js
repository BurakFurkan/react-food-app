import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { themeHandler } from "../features/userSlice";

export const DropdownThemes = ({ colorarray = [], theme: themeName }) => {
  const dispatch = useDispatch();

  return (
    <ThemePreview
      onClick={() => dispatch(themeHandler(themeName))}
      as={motion.div}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      role="button"
      aria-label={`Switch to ${themeName}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && dispatch(themeHandler(themeName))}
    >
      {colorarray.map((color, index) => (
        <ColorDot key={index} color={color} dotindex={index} />
      ))}
    </ThemePreview>
  );
};

// ── Styles ────────────────────────────────────────────────────

const ThemePreview = styled.div`
  width: 100%;
  height: 44px;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.18s;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ColorDot = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  border: 2px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.22);
  top: 50%;
  transform: translateY(-50%);
  left: ${({ dotindex }) => 6 + dotindex * 13}px;
  z-index: ${({ dotindex }) => 10 - dotindex};
`;
