import styled from "styled-components";

const accent = "var(--color-accent, #ffb340)";
const muted = "var(--color-text-muted, rgba(0,0,0,0.55))";

export const Wrap = styled.section`
  width: 100%;
  max-width: 980px;
`;

export const Header = styled.header`
  display: flex;
  gap: 14px;
  align-items: flex-start;
  justify-content: space-between;
  padding: 14px 14px 10px;
  background: rgba(255, 179, 64, 0.22);
  border: 1px solid rgba(255, 179, 64, 0.35);
  border-radius: 14px;
`;

export const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 900;
`;

export const HeaderSub = styled.p`
  margin: 6px 0 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.4;
  color: ${muted};
  max-width: 720px;
`;

export const Stepper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding-top: 2px;
`;

export const StepDot = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  border: 1px solid rgba(0,0,0,0.12);
  background: rgba(255,255,255,0.9);
  color: rgba(0,0,0,0.7);

  ${({ $active }) => $active ? `
    background: ${accent};
    color: rgba(0,0,0,0.82);
  ` : ""}

  ${({ $done }) => $done ? `
    background: rgba(20,160,90,0.18);
    border-color: rgba(20,160,90,0.22);
    color: rgba(20,160,90,0.95);
  ` : ""}
`;

export const StepLine = styled.div`
  width: 26px;
  height: 4px;
  border-radius: 999px;
  background: rgba(0,0,0,0.10);

  ${({ $done }) => $done ? `
    background: rgba(20,160,90,0.35);
  ` : ""}
`;

export const Card = styled.section`
  margin-top: 12px;
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
  padding: 12px;
`;

export const CardTitle = styled.div`
  font-size: 14px;
  font-weight: 900;
  margin-bottom: 10px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin: 10px 0;
`;

export const Label = styled.div`
  min-width: 160px;
  font-size: 13px;
  font-weight: 900;
  color: rgba(0,0,0,0.78);
`;

export const ValuePill = styled.div`
  padding: 8px 10px;
  border-radius: 12px;
  background: rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.10);
  font-size: 13px;
  font-weight: 900;
  color: rgba(0,0,0,0.76);
`;

export const Input = styled.input`
  flex: 1 1 220px;
  min-width: 180px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 2px solid rgba(255,179,64,0.0);
  background: rgba(255,255,255,0.95);
  border: 1px solid rgba(0,0,0,0.12);
  font-size: 14px;
  font-weight: 900;
  color: rgba(0,0,0,0.8);

  &:focus {
    outline: none;
    border-color: rgba(255,179,64,0.9);
    box-shadow: 0 0 0 4px rgba(255,179,64,0.18);
  }
`;

export const Select = styled.select`
  flex: 1 1 260px;
  min-width: 220px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.12);
  background: rgba(255,255,255,0.95);
  font-size: 13px;
  font-weight: 900;
  color: rgba(0,0,0,0.78);

  &:focus {
    outline: none;
    border-color: rgba(255,179,64,0.9);
    box-shadow: 0 0 0 4px rgba(255,179,64,0.18);
  }
`;

export const Btn = styled.button`
  flex: 1 1 220px;
  padding: 12px 12px;
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

export const BtnSecondary = styled.button`
  flex: 1 1 220px;
  padding: 12px 12px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.12);
  background: rgba(0,0,0,0.03);
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const Hint = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 10px 10px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.03);

  ${({ $type }) => $type === "ok" ? `
    background: rgba(20,160,90,0.10);
    border-color: rgba(20,160,90,0.22);
  ` : ""}

  ${({ $type }) => $type === "bad" ? `
    background: rgba(220,60,60,0.10);
    border-color: rgba(220,60,60,0.22);
  ` : ""}

  ${({ $type }) => $type === "info" ? `
    background: rgba(0,90,200,0.08);
    border-color: rgba(0,90,200,0.18);
  ` : ""}
`;

export const HintIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.9);
  border: 1px solid rgba(0,0,0,0.10);
  font-size: 14px;
  flex: 0 0 auto;
`;

export const HintTitle = styled.div`
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 2px;
`;

export const HintText = styled.div`
  font-size: 12.5px;
  font-weight: 800;
  color: rgba(0,0,0,0.68);
  line-height: 1.35;
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.08);
  margin: 10px 0;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryItem = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.02);
  padding: 10px 10px;

  .k {
    font-size: 12px;
    font-weight: 900;
    color: rgba(0,0,0,0.58);
    margin-bottom: 4px;
  }

  .v {
    font-size: 13px;
    font-weight: 900;
    color: rgba(0,0,0,0.78);
  }
`;

export const BigNumber = styled.div`
  font-size: 13px;
  font-weight: 900;
  color: rgba(0,0,0,0.72);

  b {
    color: rgba(0,0,0,0.82);
  }
`;

export const SuccessBox = styled.section`
  margin-top: 12px;
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
  padding: 14px;
  position: relative;
  overflow: hidden;
`;

export const Confetti = styled.div`
  position: absolute;
  top: 8px;
  right: 10px;
  font-size: 22px;
  opacity: 0.9;
`;

export const SuccessTitle = styled.div`
  font-size: 16px;
  font-weight: 900;
`;

export const SuccessText = styled.div`
  margin-top: 8px;
  font-size: 13px;
  font-weight: 800;
  color: rgba(0,0,0,0.70);
  line-height: 1.35;
`;