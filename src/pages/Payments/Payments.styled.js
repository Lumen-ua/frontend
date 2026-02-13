import styled from "styled-components";

export const HighlightSection = styled.div`
  background: #fff3e0;
  border-left: 4px solid #ff9800;
  padding: 12px 16px;
  margin: 12px 0;
  border-radius: 8px;
  font-weight: 600;
  color: #e65100;
`;

export const TipSection = styled.div`
  background: #f1f8e9;
  border: 2px dashed #c39b4aff;
  padding: 14px 16px;
  margin-top: 16px;
  border-radius: 10px;
  color: #69451eff;
  margin-bottom: 24px;
  &::before {
    display: block;
    font-weight: 700;
    margin-bottom: 8px;
    content: "";
  }
`;

export const RightColumn = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100%;
`;

export const TextTop = styled.div`
  font-size: 12px;
  margin-top: 40px;
  align-self: start;
`;

export const TextBottom = styled.div`
  font-size: 12px;
  margin-bottom: 45px;
  align-self: end;
`;

export const Hint = styled.div`
  position: relative;
  color: #000000ff;

  &::after {
    content: "";
    position: absolute;
    left: -223px;
    top: 190%;
    border-width: 4px 8px 4px 0;
    border-style: solid;
    border-color: transparent #bbb transparent transparent;
    transform-origin: left center;
  }

  &::before {
    content: "";
    position: absolute;
    left: -220px;              
    top: 201%;
    width: 220px;
    height: 1.2px;
    transform: rotate(-13deg);
    transform-origin: left center;
    background: #ffaa00ff;
  }
`;

export const Hint1 = styled.div`
  position: relative;
  color: #000000ff;

  &::after {
    content: "";
    position: absolute;
    left: -203px;
    top: -15%;
    border-width: 4px 8px 4px 0;
    border-style: solid;
    border-color: transparent #bbb transparent transparent;
    transform-origin: left center;
  }

  &::before {
    content: "";
    position: absolute;
    left: -200px;              
    top: -8%;
    width: 195px;
    height: 1.2px;
    transform: rotate(6deg);
    transform-origin: left center;
    background: #ffaa00ff;
  }
`;

export const CenterHalf = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
`;

export const HalfSection = styled.div`
  width: 50%;
  min-width: 280px;   
`;

export const GroupTitle = styled.div`
  margin: 24px 0 16px;
  padding: 10px 16px;
  border-radius: 10px;
  background: #fff;
  border: 2px solid #ffcc80;
  font-weight: 700;
  font-size: 16px;
  color: #ef6c00;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PageTitle = styled.div`
  margin: 16px 0 24px;
  padding-bottom: 12px;
  font-size: 22px;
  font-weight: 700;
  color: #e65100;
  border-bottom: 3px solid #ffe0b2;
`;

export const WhenSection = styled.div`
  background: #fff8f1;
  border-left: 3px solid #ffb74d;
  padding: 8px 14px;
  margin: 10px 0 6px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  color: #ef6c00;
`;

export const Page = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--container-padding);
`;

export const Header = styled.div`
  background: var(--color-accent);
  border-radius: var(--radius-3);
  padding: 32px;
  display: flex;
  gap: 20px;
`;

export const HeaderIcon = styled.div`
  font-size: 40px;
  background: var(--color-surface);
  border-radius: var(--radius-1);
  padding: 10px;
`;

export const Grid = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

export const GridTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const GridVertical = styled.div`
  columns: 2;
  column-gap: 20px;
`;

export const Card = styled.button`
  background: var(--color-surface);
  border-radius: var(--radius-3);
  padding: 32px 20px;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: transform var(--transition-fast);

  &:hover {
    transform: translateY(-2px);
  }
`;

export const CardIcon = styled.div`
  font-size: 36px;
  margin-bottom: 12px;
`;

export const CardTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

export const ContentBox = styled.div`
  background: var(--color-surface);
  border-radius: var(--radius-3);
  padding: 24px;
  margin-top: 20px;
`;

export const Section = styled.div`
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2);
  padding: 16px;
  break-inside: avoid;
  margin-bottom: 16px;
  ul {
    list-style: disc;
    padding-left: 20px;
    margin: 8px 0;
  }
  ol {
    list-style: decimal;
    padding-left: 20px;
    margin: 8px 0;
  }
  li {
    margin-bottom: 6px;
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

export const Container = styled.div`
  max-width: 100%;
`;

export const PaymentsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-2);
  overflow: hidden;
  box-shadow: var(--shadow-1);
  margin-top: 24px;
`;

export const Th = styled.th`
  text-align: left;
  padding: 16px;
  background-color: #f3f4f6;
  border-bottom: 2px solid var(--color-border);
  font-weight: 800;
  font-size: 14px;
  text-transform: uppercase;
  color: var(--color-text-muted);
`;

export const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
  font-size: 16px;
  font-weight: 600;

  &:last-child {
    text-align: right;
  }
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: var(--radius-round);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  border: 2px solid var(--color-border);
  background-color: ${props => props.status === 'paid' ? 'var(--color-eco, #4ADE80)' : '#fbbf24'};
  color: #000;
`;