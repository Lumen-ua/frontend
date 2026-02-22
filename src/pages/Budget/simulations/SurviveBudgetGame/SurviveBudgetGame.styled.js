import styled from "styled-components";

const accent = "var(--color-accent, #ffb340)";
const muted = "var(--color-text-muted, rgba(0,0,0,0.55))";

export const Wrap = styled.section`
  width: 100%;
`;

export const Header = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(255,179,64,0.30);
  background: rgba(255,179,64,0.18);
  padding: 14px;
`;

export const TitleRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

export const Icon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 14px;
  background: rgba(255,179,64,0.22);
  border: 1px solid rgba(255,179,64,0.30);
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 900;
`;

export const Paragraph = styled.p`
  margin: 8px 0;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.45;
  color: rgba(0,0,0,0.78);

  b {
    color: rgba(0,0,0,0.86);
  }
`;

export const Sub = styled.p`
  margin: 6px 0 0;
  font-size: 13px;
  font-weight: 800;
  color: ${muted};
`;

export const Card = styled.section`
  margin-top: 12px;
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
  padding: 12px;
`;

export const GoalBar = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const GoalItem = styled.div`
  display: inline-flex;
  gap: 10px;
  align-items: center;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.10);
  background: ${({ $ok }) => ($ok ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.45)")};
`;

export const GoalDot = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 9px;
  background: ${({ $ok }) => ($ok ? "rgba(255,179,64,0.75)" : "rgba(0,0,0,0.12)")};
  border: 1px solid rgba(0,0,0,0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 12px;
`;

export const GoalText = styled.div`
  font-size: 12.5px;
  font-weight: 900;
  color: rgba(0,0,0,0.70);
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 12px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Left = styled.div``;
export const Right = styled.div``;

export const BlockTitle = styled.div`
  font-size: 14px;
  font-weight: 900;
  margin-bottom: 10px;
`;

export const BudgetBox = styled.div`
  display: grid;
  gap: 12px;
`;

export const SliderCard = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.02);
  padding: 12px;
`;

export const SliderTop = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
`;

export const SliderName = styled.div`
  font-size: 13px;
  font-weight: 900;
  color: rgba(0,0,0,0.78);
`;

export const SliderValue = styled.div`
  font-size: 16px;
  font-weight: 900;
  color: rgba(0,0,0,0.78);
`;

export const RangeRow = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  gap: 10px;
  align-items: center;
`;

export const MiniBtn = styled.button`
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.12);
  background: rgba(255,255,255,0.9);
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const Range = styled.input`
  width: 100%;
  accent-color: ${accent};

  &:disabled {
    opacity: 0.45;
  }
`;

export const RangeHint = styled.div`
  margin-top: 8px;
  font-size: 12px;
  font-weight: 800;
  color: rgba(0,0,0,0.55);
`;

export const ToggleRow = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const ToggleBtn = styled.button`
  height: 36px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.12);
  background: ${({ $active }) => ($active ? "rgba(255,179,64,0.75)" : "rgba(255,255,255,0.9)")};
  font-weight: 900;
  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }
`;

export const DangerChip = styled.div`
  height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,179,64,0.35);
  background: rgba(255,179,64,0.18);
  font-size: 12px;
  font-weight: 900;
  color: rgba(0,0,0,0.65);
`;

export const SummaryCard = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.02);
  padding: 12px;
`;

export const SummaryTitle = styled.div`
  font-size: 13px;
  font-weight: 900;
  color: rgba(0,0,0,0.78);
`;

export const BigNumber = styled.div`
  margin-top: 8px;
  font-size: 36px;
  font-weight: 900;
  color: ${({ $neg }) => ($neg ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.82)")};

  span {
    font-size: 14px;
    font-weight: 900;
    color: rgba(0,0,0,0.55);
    margin-left: 6px;
  }
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryStat = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.65);
  padding: 10px;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  font-weight: 900;
  color: rgba(0,0,0,0.55);
`;

export const StatValue = styled.div`
  margin-top: 6px;
  font-size: 14px;
  font-weight: 900;
  color: rgba(0,0,0,0.78);
`;

export const ReserveCard = styled.div`
  margin-top: 12px;
  border-radius: 14px;
  border: 1px solid rgba(255,179,64,0.30);
  background: rgba(255,179,64,0.18);
  padding: 12px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

export const Piggy = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 14px;
  background: rgba(255,179,64,0.25);
  border: 1px solid rgba(255,179,64,0.30);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

export const ResultRow = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ResultPill = styled.div`
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.65);
  font-size: 12.5px;
  font-weight: 900;
  color: rgba(0,0,0,0.70);

  ${({ $kind }) => {
    if ($kind === "Мінус")
      return `
        background: rgba(0,0,0,0.06);
      `;
    if ($kind === "Успіх")
      return `
        background: rgba(255,179,64,0.22);
        border-color: rgba(255,179,64,0.30);
      `;
    if ($kind === "info")
      return `
        background: rgba(255,179,64,0.18);
        border-color: rgba(255,179,64,0.26);
      `;
    return "";
  }}
`;

export const Advice = styled.div`
  margin-top: 12px;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.02);
  padding: 12px;
`;

export const AdviceTitle = styled.div`
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 8px;
`;

export const AdviceList = styled.ul`
  margin: 0;
  padding-left: 18px;

  li {
    margin: 7px 0;
    font-size: 12.5px;
    font-weight: 800;
    line-height: 1.35;
    color: rgba(0,0,0,0.70);
  }
`;

export const ActionRow = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const PrimaryBtn = styled.button`
  flex: 1 1 180px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.12);
  background: ${accent};
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }
`;

export const SecondaryBtn = styled.button`
  flex: 1 1 180px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.12);
  background: rgba(0,0,0,0.03);
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.08);
  margin: 12px 0;
`;