import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBriefcase,
  FiZap,
  FiTool,
  FiFile,
  FiCreditCard,
  FiUser,
  FiPlayCircle,
} from "react-icons/fi";

import {
  SidebarWrap,
  MenuTitle,
  NavList,
  NavItem,
  NavItemLink,
  IconBox,
  Label,
} from "./Sidebar.styled";

const Sidebar = () => {
  return (
    <SidebarWrap aria-label="Основна навігація">
      <MenuTitle>Меню</MenuTitle>

      <NavList>
        <NavItem>
          <NavItemLink as={NavLink} to="/" end>
            <IconBox aria-hidden="true">
              <FiHome aria-hidden="true" focusable="false" />
            </IconBox>
            <Label>Головна</Label>
          </NavItemLink>
        </NavItem>

        <NavItem>
          <NavItemLink as={NavLink} to="/budget">
            <IconBox aria-hidden="true">
              <FiBriefcase aria-hidden="true" focusable="false" />
            </IconBox>
            <Label>Бюджет та рахунки</Label>
          </NavItemLink>
        </NavItem>

        <NavItem>
          <NavItemLink as={NavLink} to="/energy">
            <IconBox aria-hidden="true">
              <FiZap aria-hidden="true" focusable="false" />
            </IconBox>
            <Label>Економія та енергоефективність</Label>
          </NavItemLink>
        </NavItem>

        <NavItem>
          <NavItemLink as={NavLink} to="/repairs">
            <IconBox aria-hidden="true">
              <FiTool aria-hidden="true" focusable="false" />
            </IconBox>
            <Label>Ремонт та звернення</Label>
          </NavItemLink>
        </NavItem>

        <NavItem>
          <NavItemLink as={NavLink} to="/legal">
            <IconBox aria-hidden="true">
              <FiFile aria-hidden="true" focusable="false" />
            </IconBox>
            <Label>Правові аспекти</Label>
          </NavItemLink>
        </NavItem>

        <NavItem>
          <NavItemLink as={NavLink} to="/payments">
            <IconBox aria-hidden="true">
              <FiCreditCard aria-hidden="true" focusable="false" />
            </IconBox>
            <Label>Оплата комунальних послуг</Label>
          </NavItemLink>
        </NavItem>

        <NavItem>
          <NavItemLink as={NavLink} to="/profile">
            <IconBox aria-hidden="true">
              <FiUser aria-hidden="true" focusable="false" />
            </IconBox>
            <Label>Профіль</Label>
          </NavItemLink>
        </NavItem>

        <NavItem>
          <NavItemLink as={NavLink} to="/simulations">
            <IconBox aria-hidden="true">
              <FiPlayCircle aria-hidden="true" focusable="false" />
            </IconBox>
            <Label>Симуляції</Label>
          </NavItemLink>
        </NavItem>
      </NavList>
    </SidebarWrap>
  );
};

export default Sidebar;


