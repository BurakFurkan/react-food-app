import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import userImage from "../../assets/userPhoto.png";
import { BiWorld } from "react-icons/bi";
import { IoOptionsOutline } from "react-icons/io5";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import { Dropdown } from "../../components/Dropdown";
import { motion } from "framer-motion";

const Navbar = () => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const portalRef = useRef();
  const avatarRef = useRef();
  const leaveTimer = useRef(null);
  const avatarLeaveTimer = useRef(null);
  const portalRoot = document.getElementById("modal-root");
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const [info, setInfo] = useState({ isOpen: false, top: 0, left: 0 });
  const [profileMenu, setProfileMenu] = useState({ isOpen: false, top: 0, left: 0 });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.user.userName);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const DropdownPortal = () =>
    createPortal(
      <Dropdown
        info={info}
        onMouseEnter={() => clearTimeout(leaveTimer.current)}
        onMouseLeave={leaveHandler}
      />,
      portalRoot
    );

  const openAvatarMenu = () => {
    clearTimeout(avatarLeaveTimer.current);
    const rect = avatarRef.current.getBoundingClientRect();
    setProfileMenu({ isOpen: true, top: rect.top, left: rect.left });
  };

  const closeAvatarMenu = () => {
    avatarLeaveTimer.current = setTimeout(() => {
      setProfileMenu((prev) => ({ ...prev, isOpen: false }));
    }, 120);
  };

  const handleLogout = () => {
    dispatch(logout());
    setProfileMenu((prev) => ({ ...prev, isOpen: false }));
    navigate("/login");
  };

  const ProfileMenuPortal = () =>
    createPortal(
      <ProfileMenuContainer
        onMouseEnter={() => clearTimeout(avatarLeaveTimer.current)}
        onMouseLeave={closeAvatarMenu}
        style={{
          top: `${profileMenu.top + 50}px`,
          left: `${profileMenu.left - 140}px`,
        }}
        initial={{ opacity: 0, y: -8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        <ProfileHeader>
          <ProfileAvatar src={userImage} alt="User" />
          <ProfileInfo>
            <ProfileName>{userName || "Guest"}</ProfileName>
            <ProfileStatus>{isLoggedIn ? "Online" : "Offline"}</ProfileStatus>
          </ProfileInfo>
        </ProfileHeader>

        <ProfileDivider />

        <ProfileMenuItem
          as={Link}
          to="/dashboard"
          onClick={() => setProfileMenu((p) => ({ ...p, isOpen: false }))}
        >
          <FiUser />
          <span>Dashboard</span>
        </ProfileMenuItem>

        <ProfileDivider />

        <LogoutBtn onClick={handleLogout}>
          <FiLogOut />
          <span>{t("logout") || "Logout"}</span>
        </LogoutBtn>
      </ProfileMenuContainer>,
      portalRoot
    );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const clickHandler = () => {
    clearTimeout(leaveTimer.current);
    const rect = portalRef.current.getBoundingClientRect();
    setInfo({ isOpen: true, top: rect.top, left: rect.left });
  };

  const leaveHandler = () => {
    leaveTimer.current = setTimeout(() => {
      setInfo((prev) => ({ ...prev, isOpen: false }));
    }, 120);
  };

  return (
    <NavContainer scrolled={scrolled ? 1 : 0}>
      <NavInner>
        <LogoLink to="/">
          <LogoMark>H</LogoMark>
          <LogoText>HealthFree</LogoText>
        </LogoLink>

        <NavActions>
          <NavBtn
            onClick={() => openInNewTab("https://bftportfolio.netlify.app/")}
            aria-label="Portfolio"
          >
            <BiWorld />
            <span>{t("portfolio")}</span>
          </NavBtn>

          <NavBtn
            ref={portalRef}
            onMouseOver={clickHandler}
            onMouseLeave={leaveHandler}
            aria-label="Options"
          >
            <IoOptionsOutline />
            <span>{t("options")}</span>
            {info.isOpen ? DropdownPortal() : null}
          </NavBtn>

          <AvatarBtn
            ref={avatarRef}
            onMouseOver={openAvatarMenu}
            onMouseLeave={closeAvatarMenu}
            aria-label="User profile"
          >
            <AvatarImg src={userImage} alt="User" />
            <AvatarStatus />
            {profileMenu.isOpen ? ProfileMenuPortal() : null}
          </AvatarBtn>
        </NavActions>
      </NavInner>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 500;
  background: ${({ theme }) => theme.nav_bg};
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid
    ${({ theme, scrolled }) => (scrolled ? theme.nav_border : "transparent")};
  box-shadow: ${({ theme, scrolled }) =>
    scrolled ? theme.shadow_md : "none"};
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
`;

const NavInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 640px) {
    padding: 0 1rem;
    height: 56px;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`;

const LogoMark = styled.div`
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
  font-size: 1.05rem;
  box-shadow: ${({ theme }) => theme.shadow_primary};
  flex-shrink: 0;
  letter-spacing: -0.01em;
`;

const LogoText = styled.span`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  letter-spacing: -0.02em;

  @media (max-width: 480px) {
    display: none;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const NavBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease;
  position: relative;
  font-family: inherit;

  svg {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
  }

  @media (max-width: 640px) {
    span {
      display: none;
    }
    padding: 0.5rem;
  }
`;

const AvatarBtn = styled.button`
  position: relative;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
`;

const AvatarImg = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.border_strong};
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const AvatarStatus = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid ${({ theme }) => theme.bg};
`;

const ProfileMenuContainer = styled(motion.div)`
  position: fixed;
  z-index: 9999;
  width: 200px;
  background: ${({ theme }) => theme.bg_elevated};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow_xl};
  padding: 0.625rem;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.375rem 0.25rem 0.5rem;
`;

const ProfileAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.border_strong};
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`;

const ProfileName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProfileStatus = styled.span`
  font-size: 0.68rem;
  font-weight: 500;
  color: #22c55e;
  letter-spacing: 0.02em;
`;

const ProfileDivider = styled.hr`
  border: none;
  height: 1px;
  background: ${({ theme }) => theme.border};
  margin: 0.375rem 0;
`;

const ProfileMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.625rem;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
  font-family: inherit;

  svg {
    font-size: 1rem;
    flex-shrink: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
  }
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.625rem;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.destructive || "#ef4444"};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  font-family: inherit;

  svg {
    font-size: 1rem;
    flex-shrink: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.destructive_muted || "rgba(239,68,68,0.1)"};
  }
`;
