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

export const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StepCard = styled.div`
  background: linear-gradient(135deg, #fff3e0, #ffffff);
  border-radius: 18px;
  padding: 18px;
  text-align: center;
  border: 2px dashed #ff9800;
  transition: 0.3s;

  &:hover {
    transform: translateY(-4px);
    background: linear-gradient(135deg, #ffe0b2, #ffffff);
  }
`;

export const StepNumber = styled.div`
  width: 36px;
  height: 36px;
  background: #ff9800;
  color: white;
  font-weight: 700;
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const StepText = styled.div`
  font-size: 14px;
  line-height: 1.4;
  color: #555;
`;

export const ScreenBox = styled.div`
  background: #111;
  border-radius: 12px;
  padding: 16px;
  color: #fff;
  font-family: monospace;
  font-size: 13px;
`;
export const ModeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;
export const RefundMap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin: 24px 0;
`;

export const RefundStep = styled.div`
  background: #f9f9f9;
  border-radius: 16px;
  padding: 14px;
  text-align: center;
  border-top: 5px solid ${p => p.color || "#ff9800"};
`;

export const RefundIcon = styled.div`
  font-size: 28px;
  margin-bottom: 8px;
`;

export const RefundTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
`;

export const RefundDesc = styled.div`
  font-size: 12px;
  color: #555;
  margin-top: 6px;
`;

export const StatusBar = styled.div`
  display: flex;
  gap: 12px;
  margin: 20px 0;
`;

export const Status = styled.div`
  flex: 1;
  background: ${p => p.active ? "#fff3e0" : "#f1f1f1"};
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  font-size: 13px;
  font-weight: ${p => p.active ? "700" : "400"};
`;

export const ModeCard = styled.div`
  padding: 20px;
  border-radius: 14px;
  border: 2px solid #ffe0b2;
  background: #fff;
  cursor: pointer;
  transition: .2s;
  margin-bottom: 16px;
  &:hover {
    background: #fff8f1;
    border-color: #ff9800;
    transform: translateY(-2px);
  }
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
export const Path = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 24px 0;
`;

export const StepIcon = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`;

export const StepTitle = styled.div`
  font-weight: 700;
  color: #e65100;
  margin-bottom: 6px;
`;

export const ModeTitle = styled.div`
  font-weight: 800;
  font-size: 20px;
  color: #e65100;
  margin-bottom: 6px;
`;

export const ModeDesc = styled.div`
  font-size: 13px;
  color: #555;

  ul {
    margin-top: 8px;
    padding-left: 18px;
  }

  li {
    margin-bottom: 4px;
  }
`;
export const MeterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

export const MeterIcon = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
`;

export const MeterTitle = styled.div`
  font-weight: 700;
  color: #e65100;
`;
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

export const InfoCard = styled.div`
  background: #fff;
  border: 2px solid #ffe0b2;
  border-radius: 14px;
  padding: 16px;
  text-align: center;
`;

export const InfoIcon = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
`;

export const InfoTitle = styled.div`
  font-weight: 700;
  color: #e65100;
`;

export const InfoDesc = styled.div`
  font-size: 13px;
  color: #555;
`;

export const Matrix = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 24px 0;
  border-radius: 14px;
  overflow: hidden;
`;

export const MatrixCell = styled.div`
  padding: 14px;
  background: ${p => p.header ? "#fff3e0" : "white"};
  border: 1px solid #ffe0b2;
  font-weight: ${p => p.header ? "700" : "400"};
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

export const CenterHalf = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
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

  &::before {
  }
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

export const BackButton = styled.button`
  background: none;
  border: none;
  margin-top: 20px;
  padding: 0;
  font-weight: 600;
  color: var(--color-text);
`;
