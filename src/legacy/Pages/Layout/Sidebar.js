import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { BsFillCalendarCheckFill, BsGraphUp } from "react-icons/bs";
import { useTranslation } from "react-i18next";

function Sidebar() {
  const { t } = useTranslation();

  const navItems = [
    { to: "/", icon: <GiForkKnifeSpoon />, label: t("meals"), exact: true },
    { to: "/todaymenu", icon: <BsFillCalendarCheckFill />, label: t("todaymenu") },
    { to: "/dashboard", icon: <BsGraphUp />, label: t("dashboard") },
  ];

  return (
    <SidebarContainer>
      <NavList>
        {navItems.map((item, index) => (
          <NavItem key={index}>
            <StyledLink to={item.to} end={item.exact || undefined}>
              <IconWrapper>{item.icon}</IconWrapper>
              <LabelText>{item.label}</LabelText>
            </StyledLink>
          </NavItem>
        ))}
      </NavList>
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.aside`
  width: 200px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.sidebar_bg};
  border-radius: 16px;
  padding: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadow_sm};
  border: 1px solid ${({ theme }) => theme.border};
  align-self: flex-start;
  position: sticky;
  top: 80px;

  @media (max-width: 1100px) {
    width: 68px;
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    border-radius: 0;
    border-top: 1px solid ${({ theme }) => theme.border};
    border-left: none;
    border-right: none;
    border-bottom: none;
    z-index: 400;
    padding: 0.25rem 0.75rem;
    padding-bottom: calc(0.25rem + env(safe-area-inset-bottom, 0px));
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background: ${({ theme }) => theme.nav_bg};
    box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.08);
    top: auto;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 0;
    height: 52px;
  }
`;

const NavItem = styled.li`
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.7rem 0.875rem;
  border-radius: 10px;
  color: ${({ theme }) => theme.sidebar_text};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: background 0.18s ease, color 0.18s ease;
  letter-spacing: 0.01em;

  &:hover {
    background: ${({ theme }) => theme.sidebar_hover_bg};
    color: ${({ theme }) => theme.text};
  }

  &.active {
    background: ${({ theme }) => theme.sidebar_active_bg};
    color: ${({ theme }) => theme.sidebar_active_text};
    font-weight: 600;
  }

  @media (max-width: 1100px) {
    padding: 0.7rem;
    justify-content: center;
    gap: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.375rem 0.25rem;
    gap: 0.15rem;
    border-radius: 8px;
    height: 100%;
    font-size: 0.68rem;
  }
`;

const IconWrapper = styled.span`
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const LabelText = styled.span`
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: 1100px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: block;
    overflow: visible;
  }
`;
