import styled from "styled-components";

const accent = "var(--color-accent, #ffb340)";
const muted = "var(--color-text-muted, rgba(0,0,0,0.55))";

export const Page = styled.section`
  width: 100%;
`;

export const Card = styled.section`
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 18px 45px rgba(0,0,0,0.06);
  overflow: hidden;
`;

export const CardHeader = styled.header`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px 16px 12px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
`;

export const Badge = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: rgba(255, 179, 64, 0.22);
  border: 1px solid rgba(255, 179, 64, 0.35);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  flex: 0 0 auto;
`;

export const Title = styled.h3`
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 900;
`;

export const SubTitle = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
  color: ${muted};

  b {
    color: rgba(0,0,0,0.72);
    font-weight: 900;
  }
`;

export const CardBody = styled.div`
  padding: 14px 16px 16px;
`;

export const Chips = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 14px;
`;

export const Chip = styled.div`
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.08);
  font-size: 12px;
  font-weight: 900;
  color: rgba(0,0,0,0.65);
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Block = styled.section`
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: #fff;
  padding: 12px;
`;

export const BlockTitle = styled.div`
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 10px;
`;

export const InputsRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const InputLabel = styled.div`
  margin: 8px 0 6px;
  font-size: 12px;
  font-weight: 900;
  color: rgba(0,0,0,0.72);
`;

export const BigNumber = styled.div`
  font-size: 24px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgba(0,0,0,0.84);
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.12);
  background: #fff;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 900;
  color: rgba(0,0,0,0.78);

  &:focus {
    outline: 3px solid rgba(0, 120, 255, 0.18);
    border-color: rgba(0,0,0,0.20);
  }
`;

export const InlineUnit = styled.div`
  padding: 0 10px;
  font-size: 12px;
  font-weight: 900;
  color: rgba(0,0,0,0.55);
  white-space: nowrap;
`;

export const Btn = styled.button`
  height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.10);
  background: ${accent};
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    filter: brightness(0.98);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const Separator = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.08);
  margin: 12px 0;
`;

export const Radios = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const RadioItem = styled.div`
  flex: 1 1 180px;
  min-height: 42px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.10);
  background: ${({ $active }) => ($active ? "rgba(255, 179, 64, 0.18)" : "#fff")};
  padding: 10px 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  user-select: none;

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 999px;
    border: 2px solid rgba(0,0,0,0.18);
    background: ${({ $active }) => ($active ? accent : "transparent")};
  }

  font-size: 13px;
  font-weight: 900;
  color: rgba(0,0,0,0.72);

  &:focus-visible {
    outline: 3px solid rgba(0, 120, 255, 0.18);
  }
`;

export const ResultBox = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  padding: 12px;

  background: ${({ $ok, $bad }) =>
    $ok ? "rgba(20, 160, 90, 0.10)" : $bad ? "rgba(220, 60, 60, 0.08)" : "rgba(0,0,0,0.03)"};

  border-color: ${({ $ok, $bad }) =>
    $ok ? "rgba(20, 160, 90, 0.25)" : $bad ? "rgba(220, 60, 60, 0.22)" : "rgba(0,0,0,0.10)"};
`;

export const ResultTitle = styled.div`
  font-size: 14px;
  font-weight: 900;
  margin-bottom: 8px;
  color: rgba(0,0,0,0.75);
`;

export const Formula = styled.div`
  font-size: 13px;
  font-weight: 800;
  color: rgba(0,0,0,0.72);
  line-height: 1.45;

  .muted {
    color: ${muted};
    font-weight: 800;
  }
`;

export const HintBox = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(255, 179, 64, 0.35);
  background: rgba(255, 179, 64, 0.16);
  padding: 12px;
`;

export const HintTitle = styled.div`
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 8px;
`;

export const HintList = styled.ul`
  margin: 0;
  padding-left: 18px;

  li {
    margin: 6px 0;
    font-size: 13px;
    font-weight: 800;
    color: rgba(0,0,0,0.72);
    line-height: 1.35;
  }
`;

export const FooterRow = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

export const ResetBtn = styled.button`
  height: 36px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.03);
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    filter: brightness(0.98);
  }
`;