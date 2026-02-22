import React from "react";
import { NavLink } from "react-router-dom";

import {
  SidebarWrap,
  MenuTitle,
  NavList,
  NavItem,
  NavItemLink,
  IconBox,
  Label,
} from "./Sidebar.styled";

import { NAV_ITEMS } from "../navigation/navItems";

const Sidebar = () => {
  return (
    <SidebarWrap aria-label="Основна навігація">
      <MenuTitle>Меню</MenuTitle>

      <NavList>
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavItem key={to}>
            <NavItemLink as={NavLink} to={to} end={end}>
              <IconBox aria-hidden="true">
                <Icon aria-hidden="true" focusable="false" />
              </IconBox>
              <Label>{label}</Label>
            </NavItemLink>
          </NavItem>
        ))}
      </NavList>
    </SidebarWrap>
  );
};

export default Sidebar;