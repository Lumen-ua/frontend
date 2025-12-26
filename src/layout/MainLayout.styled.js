import styled from "styled-components";

export const AppShell = styled.div`
  min-height: 100vh;
  background: var(--app-bg);
`;

export const FixedHeaderArea = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  height: var(--header-h);
  width: 100%;
  z-index: 1000;

  background: #fff;
  border-bottom: 2px solid #1f1f1f;
`;

export const FixedSidebarArea = styled.aside`
  position: fixed;
  top: var(--header-h);
  left: 0;

  width: var(--sidebar-w);
  height: calc(100vh - var(--header-h));
  overflow-y: auto;

  background: #fff;
  border-right: 2px solid #1f1f1f;

  @media (max-width: 768px) {
    width: 100%;
    height: var(--sidebar-h-mobile);
    overflow-y: hidden;
    overflow-x: auto;

    border-right: none;
    border-bottom: 2px solid #1f1f1f;
  }
`;

export const MainContentArea = styled.main`
  padding-top: var(--header-h);
  padding-left: var(--sidebar-w);
  padding-right: 24px;
  padding-bottom: 24px;

  min-height: 100vh;
  background: transparent;

  @media (max-width: 768px) {
    padding-left: 0;
    padding-top: calc(var(--header-h) + var(--sidebar-h-mobile));
    padding-right: 16px;
    padding-bottom: 16px;
  }

  @media (max-width: 480px) {
    padding-right: 12px;
    padding-bottom: 12px;
  }
`;





