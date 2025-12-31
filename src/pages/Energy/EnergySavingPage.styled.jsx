import styled from "styled-components";

export const Page = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 80px;
  --color-eco: #4ADE80;
  --color-eco-dark: #166534;
`;

export const Container = styled.div`
  max-width: 100%;
`;

export const HeroSection = styled.div`
  background-color: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-3);
  padding: 32px;
  margin-bottom: 40px;
  box-shadow: var(--shadow-1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 8px;
    background-color: var(--color-eco);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

export const HeroTextContent = styled.div`
  max-width: 600px;
  z-index: 1;
`;

export const HeroTitle = styled.h1`
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 12px;
  
  span {
    color: var(--color-eco-dark);
    text-decoration: underline;
    text-decoration-thickness: 4px;
    text-decoration-color: var(--color-eco);
  }
`;

export const HeroDescription = styled.p`
  font-size: 18px;
  color: var(--color-text-muted);
  line-height: 1.5;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

export const Card = styled.div`
  background-color: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-2);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.05);
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 6px 6px 0 var(--color-border);
    border-color: var(--color-text);
    
    .icon-wrapper {
      background-color: var(--color-eco);
      color: #000;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 2px 2px 0 var(--color-border);
  }
`;

export const CardIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background-color: #f0fdf4;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--color-eco-dark);
  transition: background-color 0.2s ease;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
`;

export const CardText = styled.p`
  font-size: 15px;
  color: var(--color-text-muted);
  flex-grow: 1;
`;

export const ArrowLink = styled.span`
  font-weight: 800;
  font-size: 14px;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
`;