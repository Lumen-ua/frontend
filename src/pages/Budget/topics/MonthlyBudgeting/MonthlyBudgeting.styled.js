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

export const TopHeader = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.02);
  padding: 16px;
  margin-bottom: 14px;
`;

export const TopBadge = styled.span`
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(255,179,64,0.25);
  border: 1px solid rgba(255,179,64,0.35);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  margin-right: 10px;
`;

export const TopTitle = styled.h1`
  margin: 0;
  font-size: 30px;
  font-weight: 900;
  display: flex;
  align-items: center;

  @media (max-width: 520px) {
    font-size: 22px;
  }
`;

export const TopSubTitle = styled.p`
  margin: 8px 0 0;
  font-size: 13px;
  font-weight: 800;
  color: ${muted};
`;

export const Lead = styled.p`
  margin: 10px 0 0;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.45;
  color: rgba(0,0,0,0.75);
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
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
  overflow: hidden;

  ${({ $span2 }) =>
    $span2
      ? `
    grid-column: 1 / -1;
  `
      : ""}
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
  border: 1px solid rgba(0,0,0,0.12);
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 900;
`;

export const CardBody = styled.div`
  padding: 0 14px 14px;
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

export const Muted = styled.div`
  margin-top: 8px;
  font-size: 12.5px;
  font-weight: 800;
  color: ${muted};
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.08);
  margin: 12px 0;
`;

export const Section = styled.div`
  margin-top: 10px;
`;

export const ThreeCols = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 10px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const MiniCard = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.02);
  padding: 12px;
`;

export const MiniHead = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const MiniIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 14px;
  background: rgba(255,179,64,0.20);
  border: 1px solid rgba(255,179,64,0.30);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

export const MiniTitle = styled.div`
  font-size: 14px;
  font-weight: 900;
`;

export const MiniTag = styled.div`
  margin-top: 2px;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  background: rgba(255,179,64,0.18);
  border: 1px solid rgba(255,179,64,0.28);
  color: rgba(0,0,0,0.62);
`;

export const BulletList = styled.ul`
  margin: 10px 0 0;
  padding-left: 18px;

  li {
    margin: 6px 0;
    font-size: 13px;
    font-weight: 800;
    color: rgba(0,0,0,0.72);
    line-height: 1.35;
  }
`;

export const Pill = styled.div`
  margin-top: 10px;
  width: fit-content;
  padding: 8px 10px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 900;

  ${({ $tone }) => {
    if ($tone === "warn")
      return `
        background: rgba(255,179,64,0.22);
        border: 1px solid rgba(255,179,64,0.30);
        color: rgba(0,0,0,0.70);
      `;
    if ($tone === "good")
      return `
        background: rgba(0,0,0,0.05);
        border: 1px solid rgba(0,0,0,0.12);
        color: rgba(0,0,0,0.65);
      `;
    if ($tone === "info")
      return `
        background: rgba(255,179,64,0.18);
        border: 1px solid rgba(255,179,64,0.26);
        color: rgba(0,0,0,0.65);
      `;
    return `
      background: rgba(0,0,0,0.04);
      border: 1px solid rgba(0,0,0,0.10);
      color: rgba(0,0,0,0.65);
    `;
  }}
`;

export const PieWrap = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 14px;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const Pie = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.10);

  /* ✅ як на скріні:
     50% — справа (сірий півкруг),
     30% — знизу-ліворуч (помаранчевий),
     20% — зверху-ліворуч (світлий)
  */
  background: conic-gradient(
    rgba(0,0,0,0.22) 0 50%,
    rgba(255,179,64,0.75) 50% 80%,
    rgba(255,179,64,0.28) 80% 100%
  );

  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;

  span {
    position: absolute;
    font-weight: 900;
    color: rgba(0,0,0,0.75);
  }

  /* Очікуємо:
     <span>50%</span>
     <span>30%</span>
     <span>20%</span>
  */

  /* 50% — у правій (сірій) частині зверху */
  span:nth-child(1) {
    right: 44px;
    top: 80px;
  }

  /* 30% — зліва (помаранчевий сектор) */
  span:nth-child(2) {
    left: 30px;
    top: 120px;
  }

  /* 20% — у правій (сірій) частині знизу */
  span:nth-child(3) {
    right: 120px;
    top: 28px;
  }
`;

export const PieLegend = styled.div`
  display: grid;
  gap: 8px;
`;

export const LegendItem = styled.div`
  font-size: 13px;
  font-weight: 800;
  color: rgba(0,0,0,0.72);

  b {
    font-weight: 900;
  }
`;

export const CheckList = styled.ul`
  margin: 10px 0 0;
  padding-left: 0;
  list-style: none;

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 8px 0;
    font-size: 13px;
    font-weight: 800;
    color: rgba(0,0,0,0.72);
    line-height: 1.35;
  }

  li::before {
    content: "✔";
    width: 22px;
    height: 22px;
    border-radius: 9px;
    background: rgba(255,179,64,0.22);
    border: 1px solid rgba(255,179,64,0.28);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 900;
    flex: 0 0 auto;
    margin-top: 1px;
  }
`;

export const NoteRow = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(0,0,0,0.02);
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

export const NoteIcon = styled.div`
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
  color: rgba(0,0,0,0.70);
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