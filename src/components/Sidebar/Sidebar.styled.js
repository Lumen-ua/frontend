import styled from "styled-components";

export const SidebarWrap = styled.nav`
  padding: 16px 14px;

  @media (max-width: 768px) {
    padding: 10px 12px;
    height: 100%;
  }
`;

export const MenuTitle = styled.h2`
  background: #2f2f2f;
  color: #fff;
  font-weight: 800;
  font-size: 18px;

  padding: 14px 16px;
  border-radius: 10px;
  margin: 0 0 12px;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 12px;
    margin-bottom: 10px;
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 6px;
    scroll-snap-type: x proximity;
  }
`;

export const NavItem = styled.li`
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }
`;

export const NavItemLink = styled.a`
  display: grid;
  grid-template-columns: 34px 1fr;
  align-items: center;
  gap: 12px;

  padding: 10px 10px;
  border-radius: 10px;

  color: #1f1f1f;
  font-weight: 700;
  font-size: 15px;

  transition: background-color var(--transition-fast), transform var(--transition-fast),
    outline-color var(--transition-fast);

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover { 
    background: var(--color-hover); 
  }

  &:active { 
    transform: translateY(1px); 
  }

  &:focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 2px;
  }

  &.active {
    background: #ffffff;
    outline: 2px solid var(--color-border);
  }

  
  @media (max-width: 768px) {
    grid-template-columns: 34px auto;
    gap: 10px;
    white-space: nowrap;
    padding: 10px 12px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 9px 10px;
  }
`;

export const IconBox = styled.span`
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  color: #1f1f1f;
`;

export const Label = styled.span`
  line-height: 1.15;
`;

