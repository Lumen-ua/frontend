import styled from "styled-components";

const accent = "var(--color-accent, #ffb340)";
const muted = "var(--color-text-muted, rgba(0,0,0,0.55))";

export const Wrap = styled.section`
  width: 100%;
`;

export const Header = styled.header`
  background: rgba(255, 179, 64, 0.22);
  border: 1px solid rgba(255, 179, 64, 0.35);
  border-radius: 14px;
  padding: 14px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 900;
`;

export const Sub = styled.p`
  margin: 8px 0 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
  color: ${muted};
  max-width: 900px;
`;

export const Grid = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr;
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.section`
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

export const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0;
`;

export const Pill = styled.div`
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.10);
  font-size: 13px;
  font-weight: 800;
  color: rgba(0,0,0,0.75);

  b {
    color: rgba(0,0,0,0.82);
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.08);
  margin: 12px 0;
`;

export const CalcLine = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255,179,64,0.15);
  border: 1px solid rgba(255,179,64,0.28);
  font-size: 13px;
  font-weight: 900;

  span {
    color: rgba(0,0,0,0.65);
  }
  b {
    color: rgba(0,0,0,0.82);
    white-space: nowrap;
  }
`;

export const SmallMuted = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: 800;
  color: rgba(0,0,0,0.55);
`;

export const BlocksArea = styled.div``;

export const BlocksTitle = styled.div`
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 10px;
`;

export const BlocksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

export const Block = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 10px;
  border-radius: 12px;
  border: 1px dashed rgba(0,0,0,0.18);
  background: rgba(0,0,0,0.02);
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const BlockIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,179,64,0.20);
  border: 1px solid rgba(255,179,64,0.25);
  font-size: 16px;
  flex: 0 0 auto;
`;

export const BlockName = styled.div`
  font-size: 13px;
  font-weight: 900;
`;

export const BlockValue = styled.div`
  margin-top: 2px;
  font-size: 12.5px;
  font-weight: 900;
  color: rgba(0,0,0,0.62);
`;

export const DropZone = styled.div``;

export const DropTitle = styled.div`
  font-size: 14px;
  font-weight: 900;
`;

export const DropHint = styled.div`
  margin-top: 6px;
  font-size: 12.5px;
  font-weight: 800;
  color: rgba(0,0,0,0.55);
`;

export const Slots = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 12px;
`;

export const Slot = styled.div``;

export const SlotLabel = styled.div`
  font-size: 12.5px;
  font-weight: 900;
  color: rgba(0,0,0,0.72);
  margin-bottom: 6px;
`;

export const SlotBox = styled.div`
  border-radius: 12px;
  padding: 10px;
  min-height: 44px;
  background: rgba(0,0,0,0.02);
  border: 2px dashed rgba(0,0,0,0.14);

  ${({ $warn }) =>
    $warn
      ? `
    border-color: rgba(220,60,60,0.35);
    background: rgba(220,60,60,0.06);
  `
      : ""}
`;

export const SlotEmpty = styled.div`
  font-size: 12.5px;
  font-weight: 900;
  color: rgba(0,0,0,0.40);
`;

export const SlotFilled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  span {
    font-size: 12.5px;
    font-weight: 900;
    color: rgba(0,0,0,0.78);
  }
`;

export const SlotRemove = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.12);
  background: rgba(0,0,0,0.04);
  font-weight: 900;
  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }
`;

export const Summary = styled.div``;

export const SummaryRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  font-weight: 800;
  color: rgba(0,0,0,0.65);

  b {
    color: rgba(0,0,0,0.82);
    font-weight: 900;
    white-space: nowrap;
  }
`;

export const SumBig = styled.div`
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(20,160,90,0.10);
  border: 1px solid rgba(20,160,90,0.22);
  font-size: 13px;
  font-weight: 900;
  color: rgba(0,0,0,0.72);

  b {
    color: rgba(20,160,90,0.95);
    font-size: 16px;
  }
`;

export const BtnRow = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Btn = styled.button`
  flex: 1 1 200px;
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
  flex: 1 1 200px;
  padding: 12px 12px;
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

export const Hint = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 10px 10px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.03);

  ${({ $type }) =>
    $type === "ok"
      ? `
    background: rgba(20,160,90,0.10);
    border-color: rgba(20,160,90,0.22);
  `
      : ""}

  ${({ $type }) =>
    $type === "bad"
      ? `
    background: rgba(220,60,60,0.10);
    border-color: rgba(220,60,60,0.22);
  `
      : ""}
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