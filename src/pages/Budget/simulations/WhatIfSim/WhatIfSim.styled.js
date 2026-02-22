import styled from "styled-components";

const accent = "var(--color-accent, #ffb340)";
const mutedText = "var(--color-text-muted, rgba(0,0,0,0.55))";

export const Wrap = styled.section`
  width: 100%;
`;

export const Head = styled.div`
  background: rgba(255, 179, 64, 0.18);
  border: 1px solid rgba(255, 179, 64, 0.30);
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
  color: ${mutedText};
  max-width: 980px;

  b {
    color: rgba(0,0,0,0.72);
  }
`;

export const Card = styled.section`
  margin-top: 12px;
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
  padding: 12px;
`;

export const StepTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 900;
  margin-bottom: 10px;
`;

export const StepBadge = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: ${accent};
  border: 1px solid rgba(0,0,0,0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;

  ${({ $small }) =>
    $small
      ? `
    width: 24px;
    height: 24px;
    font-size: 12px;
  `
      : ""}
`;

export const ScenarioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ScenarioItem = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.02);
  padding: 12px;
`;

export const ScenarioLabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ScenarioName = styled.div`
  font-size: 13px;
  font-weight: 900;
  color: rgba(0,0,0,0.78);
`;

export const ScenarioValue = styled.div`
  margin-top: 10px;
  font-size: 26px;
  font-weight: 900;
  color: rgba(0,0,0,0.80);

  b {
    font-size: 34px;
  }

  @media (max-width: 520px) {
    font-size: 22px;
    b {
      font-size: 30px;
    }
  }
`;

export const ControlRow = styled.div`
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

  &:active {
    transform: translateY(1px);
  }
`;

export const Range = styled.input`
  width: 100%;
  accent-color: ${accent};
`;

export const SmallHint = styled.div`
  margin-top: 8px;
  font-size: 12px;
  font-weight: 800;
  color: rgba(0,0,0,0.55);
  text-align: center;
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.08);
  margin: 12px 0;
`;

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const InputLabel = styled.div`
  font-size: 12.5px;
  font-weight: 900;
  color: rgba(0,0,0,0.72);
  margin-bottom: 6px;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.12);
  background: rgba(0,0,0,0.02);
  padding: 0 12px;
  font-size: 14px;
  font-weight: 900;
  color: rgba(0,0,0,0.78);
  outline: none;

  &:focus {
    border-color: rgba(255,179,64,0.55);
    box-shadow: 0 0 0 3px rgba(255,179,64,0.18);
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

  ${({ $secondary }) =>
    $secondary
      ? `
    background: rgba(0,0,0,0.03);
  `
      : ""}

  &:active {
    transform: translateY(1px);
  }
`;

export const ResultBlock = styled.div`
  margin-top: 14px;
`;

export const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ResultCard = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.02);
  padding: 12px;
`;

export const ResultIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: rgba(255,179,64,0.22);
  border: 1px solid rgba(255,179,64,0.28);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const ResultValue = styled.div`
  margin-top: 10px;
  font-size: 28px;
  font-weight: 900;
  color: rgba(0,0,0,0.82);

  span {
    font-size: 14px;
    font-weight: 900;
    color: rgba(0,0,0,0.55);
    margin-left: 6px;
  }
`;

export const ResultCaption = styled.div`
  margin-top: 4px;
  font-size: 12.5px;
  font-weight: 800;
  color: rgba(0,0,0,0.58);
`;

export const CompareCard = styled.div`
  grid-column: 1 / -1;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.02);
  padding: 12px;
`;

export const CompareTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

export const CompareTitle = styled.div`
  font-size: 13px;
  font-weight: 900;
`;

export const DiffPill = styled.div`
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(255,179,64,0.22);
  border: 1px solid rgba(255,179,64,0.30);
  font-size: 12.5px;
  font-weight: 900;
  color: rgba(0,0,0,0.7);
`;

export const BarWrap = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-items: end;

  > div {
    display: grid;
    gap: 8px;
    align-items: end;
  }
`;

export const BarLabel = styled.div`
  font-size: 12px;
  font-weight: 900;
  color: rgba(0,0,0,0.55);
`;

export const Bar = styled.div`
  width: 100%;
  min-height: 24px;
  border-radius: 14px;
  border: 1px solid rgba(255,179,64,0.35);
  background: rgba(255,179,64,0.75);
  box-shadow: 0 10px 20px rgba(255,179,64,0.12);

  ${({ $muted }) =>
    $muted
      ? `
    background: rgba(0,0,0,0.22);
    border-color: rgba(0,0,0,0.18);
    box-shadow: none;
  `
      : ""}
`;

export const BarValue = styled.div`
  font-size: 13px;
  font-weight: 900;
  color: rgba(0,0,0,0.72);
`;

export const Note = styled.div`
  margin-top: 12px;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.02);
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

export const NoteDot = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 12px;
  background: rgba(255,179,64,0.22);
  border: 1px solid rgba(255,179,64,0.28);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

export const NoteText = styled.div`
  font-size: 12.5px;
  font-weight: 800;
  line-height: 1.35;
  color: rgba(0,0,0,0.68);
`;