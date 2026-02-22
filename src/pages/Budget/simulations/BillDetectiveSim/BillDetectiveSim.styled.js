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
  max-width: 980px;
`;

export const Grid = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Left = styled.div`
  display: grid;
  gap: 14px;
`;

export const Right = styled.div`
  display: grid;
  gap: 14px;
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

export const BillGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const BillCard = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.015);
  overflow: hidden;

  ${({ $highlight }) =>
    $highlight
      ? `
    border-color: rgba(255,179,64,0.45);
    box-shadow: 0 10px 24px rgba(255,179,64,0.12);
  `
      : ""}
`;

export const BillTop = styled.div`
  padding: 12px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  background: rgba(255,179,64,0.18);
  border-bottom: 1px solid rgba(0,0,0,0.08);
`;

export const BillMonth = styled.div`
  font-size: 13px;
  font-weight: 900;
`;

export const BillSum = styled.div`
  font-size: 16px;
  font-weight: 900;
  color: rgba(0,0,0,0.82);

  ${({ $big }) => ($big ? "font-size: 18px;" : "")}
`;

export const BillBody = styled.div`
  padding: 12px;
`;

export const Row = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 0;
`;

export const Label = styled.div`
  font-size: 12.5px;
  font-weight: 800;
  color: rgba(0,0,0,0.55);
`;

export const Value = styled.div`
  font-size: 12.5px;
  font-weight: 900;
  color: rgba(0,0,0,0.78);
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.08);
  margin: 10px 0;
`;

export const MiniNote = styled.div`
  font-size: 12.5px;
  font-weight: 800;
  color: rgba(0,0,0,0.62);
  line-height: 1.35;
`;

export const TagRow = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.div`
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.85);
  font-size: 12px;
  font-weight: 900;
  color: rgba(0,0,0,0.7);
`;

export const ReasonsCard = styled.section`
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
  padding: 12px;
`;

export const ReasonsTitle = styled.div`
  font-size: 14px;
  font-weight: 900;
  margin-bottom: 10px;
`;

export const ReasonList = styled.div`
  display: grid;
  gap: 8px;
`;

export const ReasonItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 10px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.02);
  cursor: pointer;
  text-align: left;

  &:active {
    transform: translateY(1px);
  }
`;

export const Check = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${accent};
  cursor: pointer;
`;

export const ReasonText = styled.div`
  font-size: 13px;
  font-weight: 900;
  color: rgba(0,0,0,0.75);
`;

export const Controls = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Btn = styled.button`
  flex: 1 1 160px;
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
  flex: 1 1 160px;
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

export const Evidence = styled.section`
  background: rgba(255,179,64,0.16);
  border: 1px solid rgba(255,179,64,0.30);
  border-radius: 14px;
  padding: 12px;
`;

export const EvidenceTitle = styled.div`
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 8px;
`;

export const EvidenceList = styled.ul`
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