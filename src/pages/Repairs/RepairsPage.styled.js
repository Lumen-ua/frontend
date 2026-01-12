import styled from "styled-components";

export const RepairsPage = styled.div`
  width: 100%;
  padding: 28px 28px 40px;

  @media (max-width: 768px) {
    padding: 18px 12px 24px;
  }

  @media (max-width: 480px) {
    padding: 14px 10px 20px;
  }
`;

export const RepairsContainer = styled.div`
  max-width: var(--container-max);
  margin: 0 auto;
`;

export const HeroCard = styled.section`
  background: var(--color-accent);
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: center;
  position: relative;
  border: 2px solid var(--color-border);
`;

export const HeroLeft = styled.div``;

export const HeroTitle = styled.h1`
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0.2px;
  font-family: var(--font-family);

  @media (max-width: 768px) {
    font-size: 24px;
  }
  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const HeroText = styled.p`
  font-size: 13px;
  font-weight: 600;
  max-width: 520px;
  font-family: var(--font-family);
`;

export const HeroIcon = styled.div`
  font-size: 48px;
  display: flex;
  align-items: center;
`;

export const ProgressBadge = styled.div`
  position: absolute;
  bottom: -14px;
  right: 20px;
  background: #9ee7ff;
  color: var(--color-text);
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  font-family: var(--font-family);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-1);
`;

export const CardsGrid = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  background: var(--color-surface);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer; 
  transition: transform 150ms ease, box-shadow 150ms ease, filter 150ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    filter: brightness(1.03);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 3px rgba(0,0,0,0.1);
  }
`;

export const InfoIcon = styled.div`
  font-size: 20px;
`;

export const InfoTitle = styled.h3`
  font-size: 14px;
  font-weight: 800;
  font-family: var(--font-family);
`;

export const InfoText = styled.p`
  font-size: 12px;
  font-weight: 600;
  line-height: 1.35;
  font-family: var(--font-family);
`;

export const MaterialsCard = styled.section`
  margin-top: 18px;
  background: var(--color-surface);
  padding: 16px;
`;

export const MaterialsList = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const MaterialItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-family);
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 4px;
  transition: transform 120ms ease, background 120ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(0, 0, 0, 0.03);
  }

  &:active {
    transform: translateY(1px);
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  margin-top: 20px;
  padding: 0;
  font-weight: 600;
  color: var(--color-text);
`;

export const PageTitle = styled.div`
  margin: 16px 0 24px;
  padding-bottom: 12px;

  font-size: 22px;
  font-weight: 700;
  color: #000000;

  border-bottom: 3px solid #000000;
`;

export const ProblemRow = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  margin-bottom: 20px;

  ${({ reverse }) =>
    reverse &&
    `
    grid-template-columns: 1fr 220px;

    & > div:first-child {
      order: 2;
    }
  `}

  @media (max-width: 720px) {
    grid-template-columns: 1fr;

    & > div {
      order: unset !important;
    }
  }
`;

export const ProblemMedia = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ProblemImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    max-width: 160px;
    width: 100%;
    height: auto;
  }
`;

export const ProblemTextCard = styled.div`
  background: var(--color-surface);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;
