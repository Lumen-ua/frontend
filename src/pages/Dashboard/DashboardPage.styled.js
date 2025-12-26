import styled from "styled-components";


export const DashboardPage = styled.div`
  width: 100%;
  min-height: calc(100vh - var(--header-h));
  padding: 28px 28px 40px;

  @media (max-width: 768px) {
    padding: 18px 12px 24px;
  }

  @media (max-width: 480px) {
    padding: 14px 10px 20px;
  }
`;

export const DashboardContainer = styled.div`
  max-width: var(--container-max);
  margin: 0 auto;
`;


export const DashboardTitle = styled.h1`
  margin: 0 0 8px;
  font-size: 36px;
  font-weight: 800;
  letter-spacing: 0.2px;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const ProgressLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  margin-top: 4px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ProgressRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 12px;
  margin: 8px 0 14px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const ProgressBar = styled.div`
  height: 10px;
  border: 2px solid #111;
  border-radius: 999px;
  background: #fff;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: var(--color-accent-strong);
  width: 0%;
`;

export const ProgressPercent = styled.div`
  font-size: 14px;
  font-weight: 800;
`;

export const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 800;
  margin-top: 6px;
`;

export const Description = styled.p`
  margin: 6px 0 18px;
  font-size: 13px;
  font-weight: 600;
  max-width: 720px;
`;


export const ScenarioCard = styled.section`
  background: #ffffff;
  border: 2px solid #111;
  border-radius: 14px;
  padding: 18px;

  display: grid;
  grid-template-columns: minmax(260px, 1fr) minmax(220px, 320px);
  gap: 18px;
  align-items: center;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 480px) {
    padding: 14px;
    gap: 14px;
  }
`;

export const ScenarioLeft = styled.div``;

export const ScenarioRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-width: 320px;
    border-radius: 12px;
  }

  @media (max-width: 860px) {
    img {
      max-width: 280px;
    }
  }

  @media (max-width: 480px) {
    img {
      max-width: 240px;
    }
  }
`;

export const ScenarioTitle = styled.h2`
  margin: 0 0 6px;
  font-size: 22px;
  font-weight: 900;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const ScenarioText = styled.p`
  margin: 0 0 12px;
  font-size: 13px;
  line-height: 1.35;
  font-weight: 600;
`;

export const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;


const baseButton = `
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  border: 2px solid #111;
  font-weight: 800;
  cursor: pointer;

  transition: transform 120ms ease, filter 120ms ease, box-shadow 120ms ease,
    outline-color 120ms ease;

  &:hover {
    filter: brightness(0.98);
    box-shadow: 0 6px 0 #111;
    transform: translateY(-1px);
  }

  &:active {
    box-shadow: 0 2px 0 #111;
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 3px solid #111;
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const PrimaryButton = styled.button`
  ${baseButton}
  background: #ffb400;
`;

export const SecondaryButton = styled.button`
  ${baseButton}
  background: #fff;
`;


export const CardsRow = styled.div`
  margin-top: 18px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  align-items: stretch; 
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const MiniCard = styled.div`
  background: #ffffff;
  border: 2px solid #111;
  border-radius: 14px;
  padding: 16px;

  display: flex;          
  flex-direction: column; 
  gap: 10px;

  height: 100%;
`;

export const MiniCardImage = styled.img`
  width: 120px;
  height: auto;
`;

export const MiniCardTitle = styled.div`
  font-weight: 900;
  font-size: 16px;
`;

export const MiniCardText = styled.div`
  font-size: 12px;
  font-weight: 600;
  line-height: 1.35;
`;

export const MiniCardButton = styled.button`
  ${baseButton}
  height: 42px;
  font-weight: 900;
  background: #ffb400;

  margin-top: auto; 
`;

export const MiniCardButtonDark = styled.button`
  ${baseButton}
  height: 42px;
  font-weight: 900;
  background: #2f2f2f;
  color: #fff;

  margin-top: auto; 

  &:hover {
    filter: brightness(1.03);
  }
`;


