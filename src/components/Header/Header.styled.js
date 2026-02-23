import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: var(--header-h);
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 24px;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const BurgerButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 42px;
    height: 42px;
    border-radius: 10px;
    border: 2px solid var(--color-border);
    background: #fff;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
    }

    &:active {
      transform: translateY(1px);
    }

    &:focus-visible {
      outline: 3px solid #1f1f1f;
      outline-offset: 2px;
    }
  }
`;

export const LogoLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 12px;

  padding: 6px 8px;
  border-radius: 10px;

  transition: background-color 120ms ease, transform 120ms ease, outline-color 120ms ease;

  &:hover {
    background: #f2f2f2;
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 3px solid #1f1f1f;
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;

  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
  }
`;

export const LogoText = styled.span`
  font-family: "Nunito", sans-serif;
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.5px;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const RightBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UserButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  border: 2px solid var(--color-border);
  background: #fff;
  border-radius: 999px;
  padding: 6px 10px 6px 6px;

  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 3px solid #1f1f1f;
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

export const UserAvatar = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 999px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: var(--color-accent);
  color: #111;
  font-weight: 800;
  border: 2px solid var(--color-border);
  overflow: hidden;
`;

export const UserName = styled.span`
  font-weight: 700;
  font-size: 14px;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;

  min-width: 220px;
  background: #fff;
  border: 2px solid var(--color-border);
  border-radius: 14px;
  box-shadow: 0 10px 0 rgba(17, 17, 17, 0.08);

  padding: 8px;
  z-index: 1100;
`;

export const DropdownItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  padding: 10px 10px;
  border-radius: 10px;

  font-weight: 700;
  font-size: 14px;

  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;

  &:hover {
    background: #f2f2f2;
  }

  &[data-danger="true"] {
    color: #b3261e;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

DropdownItem.defaultProps = { as: "a" };

export const DropdownDivider = styled.div`
  height: 1px;
  background: #e5e5e5;
  margin: 6px 0;
`;

/* MOBILE DRAWER */
export const MobileOverlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 1200;
  }
`;

export const MobileDrawer = styled.div`
  width: min(86vw, 360px);
  height: 100%;
  background: #fff;
  border-right: 2px solid var(--color-border);

  display: flex;
  flex-direction: column;
`;

export const DrawerHeader = styled.div`
  height: var(--header-h);
  padding: 0 12px;
  border-bottom: 2px solid var(--color-border);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DrawerTitle = styled.div`
  font-weight: 900;
  font-size: 16px;
`;

export const CloseDrawerButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 2px solid var(--color-border);
  background: #fff;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const DrawerNav = styled.nav`
  padding: 12px;
  display: grid;
  gap: 8px;
`;

export const DrawerNavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 12px;
  border-radius: 12px;
  border: 2px solid transparent;

  font-weight: 800;

  &:hover {
    background: #f2f2f2;
  }

  &.active {
    border-color: var(--color-border);
    background: #fff7ea;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const DrawerAccount = styled.div`
  margin-top: auto;
  padding: 12px;
  border-top: 2px solid var(--color-border);

  display: grid;
  gap: 8px;
`;

export const DrawerAccountTitle = styled.div`
  font-weight: 900;
  font-size: 14px;
  margin-bottom: 6px;
`;

export const DrawerAccountRow = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;

  font-weight: 800;
  border: 2px solid var(--color-border);
  background: #fff;

  cursor: pointer;

  &:hover {
    background: #f2f2f2;
  }

  &[data-danger="true"] {
    border-color: #b3261e;
    color: #b3261e;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

DrawerAccountRow.defaultProps = { as: "a" };