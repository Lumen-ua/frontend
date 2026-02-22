import styled from "styled-components";

const accent = "var(--color-accent, #ffb340)";
const muted = "var(--color-text-muted, rgba(0,0,0,0.55))";

export const Page = styled.section`
  width: 100%;
  padding: 22px 12px 34px;
`;

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

export const TopTitle = styled.h1`
  margin: 0;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 0.2px;

  span {
    font-size: 18px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.55);
  }

  @media (max-width: 520px) {
    font-size: 22px;

    span {
      font-size: 14px;
    }
  }
`;

export const TopSubTitle = styled.p`
  margin: 10px 0 18px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
  color: ${muted};
  max-width: 920px;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.section`
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  overflow: hidden;

  ${({ $span2 }) => ($span2 ? "grid-column: 1 / -1;" : "")}

  @media (max-width: 980px) {
    grid-column: auto;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 14px 10px;
`;

export const Badge = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: ${accent};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 900;

  @media (max-width: 520px) {
    font-size: 16px;
  }
`;

export const CardBody = styled.div`
  padding: 0 14px 14px;
`;

export const Paragraph = styled.p`
  margin: 8px 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
  color: rgba(0, 0, 0, 0.78);
`;

export const MiniTitle = styled.div`
  margin-top: 10px;
  font-size: 13px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.85);
`;

export const BulletList = styled.ul`
  margin: 10px 0 0;
  padding-left: 18px;

  li {
    margin: 6px 0;
    font-size: 13px;
    font-weight: 700;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.75);
  }
`;

export const NoteBox = styled.div`
  margin-top: 10px;
  background: rgba(255, 179, 64, 0.18);
  border: 1px solid rgba(255, 179, 64, 0.35);
  border-radius: 12px;
  padding: 10px 10px;
`;

export const NoteTitle = styled.div`
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 6px;
`;

export const BackBtn = styled.button`
  margin-bottom: 14px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(255, 179, 64, 0.18);
  font-weight: 900;
  font-size: 13px;
  cursor: pointer;
  transition: 0.15s ease;

  &:hover {
    background: rgba(255, 179, 64, 0.32);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const NoteList = styled.ul`
  margin: 0;
  padding-left: 18px;

  li {
    margin: 6px 0;
    font-size: 13px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.78);
  }
`;

export const TwoCols = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 6px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Bubble = styled.div`
  margin-top: 12px;
  background: rgba(255, 179, 64, 0.25);
  border: 1px solid rgba(255, 179, 64, 0.35);
  border-radius: 999px;
  padding: 10px 12px;
  font-size: 12.5px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.7);
  width: fit-content;
`;

export const FormulaBox = styled.div`
  margin-top: 10px;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 10px 10px;
`;

export const BigFormula = styled.div`
  margin-top: 6px;
  font-size: 14px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.78);
`;

export const ExampleBox = styled.div`
  margin-top: 10px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 10px 10px;
`;

export const ExampleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 0;

  span {
    font-size: 13px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.65);
  }

  b {
    font-size: 13px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.82);
    white-space: nowrap;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 10px 0;
`;

export const StepsList = styled.ol`
  margin: 10px 0 0;
  padding-left: 18px;

  li {
    margin: 6px 0;
    font-size: 13px;
    font-weight: 800;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.72);
  }
`;

export const TagsRow = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Tag = styled.div`
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.10);
  font-size: 12px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.65);
`;