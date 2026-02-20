import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut, FiUser, FiLogIn, FiUserPlus } from "react-icons/fi";

import {
  HeaderWrapper,
  LeftBlock,
  BurgerButton,
  LogoLink,
  LogoImage,
  LogoText,
  RightBlock,
  UserButton,
  UserAvatar,
  UserName,
  Dropdown,
  DropdownItem,
  DropdownDivider,
  MobileOverlay,
  MobileDrawer,
  DrawerHeader,
  DrawerTitle,
  DrawerNav,
  DrawerNavItem,
  DrawerAccount,
  DrawerAccountTitle,
  DrawerAccountRow,
  CloseDrawerButton,
} from "./Header.styled";

import logo from "../../assets/images/lumen-logo.webp";
import { useAuth } from "../../context/AuthContext.jsx";
import { NAV_ITEMS } from "../navigation/navItems";
import { resolveAvatarSrc } from "../../utils/avatar";

function getInitials(nameOrEmail) {
  const v = (nameOrEmail || "").trim();
  if (!v) return "U";
  const parts = v.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const userMenuRef = useRef(null);

  const displayName = useMemo(() => user?.name || user?.email || "", [user]);

  useEffect(() => {
    function onDocMouseDown(e) {
      if (!isUserMenuOpen) return;
      if (!userMenuRef.current) return;
      if (userMenuRef.current.contains(e.target)) return;
      setIsUserMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [isUserMenuOpen]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== "Escape") return;
      setIsUserMenuOpen(false);
      setIsDrawerOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    setIsDrawerOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const avatarSrc = resolveAvatarSrc(user?.avatarUrl);

  return (
    <HeaderWrapper>
      <LeftBlock>
        <BurgerButton
          type="button"
          aria-label={isDrawerOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={isDrawerOpen}
          onClick={() => setIsDrawerOpen((v) => !v)}
        >
          {isDrawerOpen ? <FiX /> : <FiMenu />}
        </BurgerButton>

        <LogoLink to="/" aria-label="Перейти на головну сторінку Lumen">
          <LogoImage src={logo} alt="Lumen logo" />
          <LogoText>LUMEN</LogoText>
        </LogoLink>
      </LeftBlock>

      <RightBlock>
        <div ref={userMenuRef} style={{ position: "relative" }}>
          <UserButton
            type="button"
            onClick={() => setIsUserMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={isUserMenuOpen}
          >
            <UserAvatar aria-hidden="true">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt="Avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "999px",
                  }}
                />
              ) : (
                getInitials(displayName)
              )}
            </UserAvatar>

            {user?.name ? <UserName>{user.name}</UserName> : null}
          </UserButton>

          {isUserMenuOpen && (
            <Dropdown role="menu" aria-label="Меню акаунта">
              {!user ? (
                <>
                  <DropdownItem as={NavLink} to="/login" role="menuitem">
                    <FiLogIn aria-hidden="true" />
                    Увійти
                  </DropdownItem>

                  <DropdownItem as={NavLink} to="/register" role="menuitem">
                    <FiUserPlus aria-hidden="true" />
                    Зареєструватись
                  </DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem as={NavLink} to="/profile" role="menuitem">
                    <FiUser aria-hidden="true" />
                    Профіль
                  </DropdownItem>

                  <DropdownDivider />

                  <DropdownItem
                    as="button"
                    type="button"
                    onClick={handleLogout}
                    role="menuitem"
                    data-danger="true"
                  >
                    <FiLogOut aria-hidden="true" />
                    Вийти
                  </DropdownItem>
                </>
              )}
            </Dropdown>
          )}
        </div>
      </RightBlock>

      {isDrawerOpen && (
        <MobileOverlay role="presentation" onClick={() => setIsDrawerOpen(false)}>
          <MobileDrawer
            role="dialog"
            aria-modal="true"
            aria-label="Мобільне меню"
            onClick={(e) => e.stopPropagation()}
          >
            <DrawerHeader>
              <DrawerTitle>Меню</DrawerTitle>
              <CloseDrawerButton
                type="button"
                aria-label="Закрити меню"
                onClick={() => setIsDrawerOpen(false)}
              >
                <FiX />
              </CloseDrawerButton>
            </DrawerHeader>

            <DrawerNav>
              {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                <DrawerNavItem key={to} as={NavLink} to={to} end={end}>
                  <Icon aria-hidden="true" />
                  {label}
                </DrawerNavItem>
              ))}
            </DrawerNav>

            <DrawerAccount>
              <DrawerAccountTitle>Акаунт</DrawerAccountTitle>

              {!user ? (
                <>
                  <DrawerAccountRow as={NavLink} to="/login">
                    <FiLogIn aria-hidden="true" />
                    Увійти
                  </DrawerAccountRow>
                  <DrawerAccountRow as={NavLink} to="/register">
                    <FiUserPlus aria-hidden="true" />
                    Зареєструватись
                  </DrawerAccountRow>
                </>
              ) : (
                <>
                  <DrawerAccountRow as={NavLink} to="/profile">
                    <FiUser aria-hidden="true" />
                    Профіль
                  </DrawerAccountRow>
                  <DrawerAccountRow as="button" type="button" onClick={handleLogout} data-danger="true">
                    <FiLogOut aria-hidden="true" />
                    Вийти
                  </DrawerAccountRow>
                </>
              )}
            </DrawerAccount>
          </MobileDrawer>
        </MobileOverlay>
      )}
    </HeaderWrapper>
  );
}