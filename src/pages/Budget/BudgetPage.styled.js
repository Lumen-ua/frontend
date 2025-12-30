import styled from "styled-components";

export const BudgetPage = styled.section`
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

export const BudgetContainer = styled.div`
  max-width: var(--container-max);
  margin: 0 auto;
`;

export const BudgetHero = styled.header`
  position: relative;
  background: var(--color-accent);
  border: 2px solid #111;
  border-radius: 14px;
  padding: 22px 22px 36px;

  display: grid;
  grid-template-columns: 1fr auto;
  gap: 18px;
  align-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 18px 16px 44px;
  }
`;

export const BudgetHeroText = styled.div``;

export const BudgetHeroTitle = styled.h1`
  margin: 0 0 8px;
  font-size: 34px;
  font-weight: 900;
  letter-spacing: 0.2px;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const BudgetHeroDescription = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.35;
  max-width: 520px;
`;

export const BudgetHeroIllustrationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  svg {
    width: 132px;
    height: auto;
  }

  @media (max-width: 600px) {
    justify-content: flex-start;
  }
`;

export const BudgetProgressBadge = styled.div`
  position: absolute;
  right: 18px;
  bottom: -18px;

  background: #a9e2f3;
  border: 2px solid #111;
  border-radius: 10px;
  padding: 8px 14px;

  font-size: 13px;
  font-weight: 900;
  line-height: 1;

  box-shadow: 0 4px 0 #111;

  @media (max-width: 600px) {
    right: 14px;
  }
`;

export const BudgetTopicsGrid = styled.div`
  margin-top: 34px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const cardBase = `
  width: 100%;
  text-align: left;

  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 16px;

  display: grid;
  grid-template-columns: 38px 1fr;
  align-items: start;
  gap: 12px;

  transition: transform var(--transition-fast), box-shadow var(--transition-fast),
    border-color var(--transition-fast);

  &:hover {
    border-color: rgba(0, 0, 0, 0.16);
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.07);
  }

  &:focus-visible {
    outline: 3px solid #111;
    outline-offset: 3px;
  }
`;

export const BudgetTopicCard = styled.button`
  ${cardBase}
`;

export const BudgetTopicIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 10px;

  display: grid;
  place-items: center;

  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.08);

  svg {
    width: 20px;
    height: 20px;
    color: #111;
  }
`;

export const BudgetTopicTitle = styled.h2`
  margin: 0;
  font-size: 14px;
  font-weight: 900;
  line-height: 1.25;
`;

export const BudgetTopicText = styled.p`
  margin: 6px 0 0;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.35;
  color: var(--color-text-muted);
`;
