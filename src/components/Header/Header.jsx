import React from "react";
import { NavLink } from "react-router-dom";

import {
  HeaderWrapper,
  LogoLink,
  LogoImage,
  LogoText,
  RightBlock,
} from "./Header.styled";

import logo from "../../assets/images/lumen-logo.webp";

const Header = () => {
  return (
    <HeaderWrapper>
      <LogoLink to="/" aria-label="Перейти на головну сторінку Lumen">
        <LogoImage src={logo} alt="Lumen logo" />
        <LogoText>LUMEN</LogoText>
      </LogoLink>
      
      <RightBlock>
        *future user logo*
      </RightBlock>
    </HeaderWrapper>
  );
};

export default Header;
