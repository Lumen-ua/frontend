import { createGlobalStyle } from "styled-components";

import NunitoRegular from "../assets/fonts/Nunito-Regular.ttf";
import NunitoSemiBold from "../assets/fonts/Nunito-SemiBold.ttf";
import NunitoBold from "../assets/fonts/Nunito-Bold.ttf";

const GlobalStyle = createGlobalStyle`
  /* FONTS */
  @font-face {
    font-family: "Nunito";
    src: url(${NunitoRegular}) format("truetype");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Nunito";
    src: url(${NunitoSemiBold}) format("truetype");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Nunito";
    src: url(${NunitoBold}) format("truetype");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  :root{
    --header-h: 64px;
    --sidebar-w: 260px;

    --sidebar-h-mobile: 104px;

    --bg: #F4F3EE;
    --orange: #F2A12D;
    --text: #121212;

    --app-bg: var(--bg);

    --color-bg: var(--bg);
    --color-surface: #ffffff;
    --color-text: var(--text);
    --color-text-muted: #444444;

    --color-border: #111111;
    --color-accent: var(--orange);
    --color-accent-strong: #ff9d00;

    --color-hover: #f2f2f2;
    --color-focus: #111111;

    --color-danger: #ef5050;
    --color-success: #2e7d32;
    --color-warning: #ed6c02;

    --font-family: "Nunito", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    --font-size-base: 16px;
    --line-height-base: 1.4;

    --radius-1: 6px;
    --radius-2: 10px;
    --radius-3: 14px;
    --radius-round: 999px;

    --shadow-0: none;
    --shadow-1: 0 6px 0 var(--color-border);
    --shadow-press: 0 2px 0 var(--color-border);

    --transition-fast: 120ms ease;

    --container-max: 980px;
    --container-padding: 24px;
  }

  *, *::before, *::after{
    box-sizing: border-box;
  }

  html, body, #root { height: 100%; }

  body {
    margin: 0;
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);

    background: var(--app-bg);
    color: var(--color-text);

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  h1, h2, h3, h4, h5, h6, p { 
    margin: 0; 
    padding: 0; 
  }

  ul, ol { 
    margin: 0; 
    padding: 0;   
    list-style: none;
  }

  a { 
    color: inherit; 
    text-decoration: none; 
  }

  img, svg, video, canvas {
    display: block;
    max-width: 100%;
    height: auto;
  }

  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  button { cursor: pointer; }

  :focus { outline: none; }
  :focus-visible {
    outline: 3px solid var(--color-focus);
    outline-offset: 3px;
  }

  .container{
    width: 100%;
    max-width: var(--container-max);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--container-padding);
    padding-right: var(--container-padding);
  }

  ::-webkit-scrollbar{ width: 8px; }
  ::-webkit-scrollbar-thumb{
    background-color: rgba(0,0,0,0.25);
    border-radius: var(--radius-round);
  }
  ::-webkit-scrollbar-track{ background-color: rgba(0,0,0,0.06); }

  /* Responsive container padding */
  @media (max-width: 768px) {
    :root { --container-padding: 16px; }
  }

  @media (max-width: 480px) {
    :root { --container-padding: 12px; }
  }
`;

export default GlobalStyle;
