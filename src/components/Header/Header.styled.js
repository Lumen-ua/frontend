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



