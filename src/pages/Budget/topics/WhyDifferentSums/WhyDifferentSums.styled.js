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

export const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

export const TitleBlock = styled.div`
  flex: 1;
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

export const Content = styled.div`
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 16px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Side = styled.aside`
  display: grid;
  gap: 14px;
`;

export const SideCard = styled.section`
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
  padding: 12px;
`;

export const SideFooterCard = styled(SideCard)``;

export const SideTitle = styled.div`
  font-size: 14px;
  font-weight: 900;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SideList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
`;

export const SideItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 8px;
  border-radius: 12px;
  background: rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.08);
  font-size: 13px;
  font-weight: 800;
  color: rgba(0,0,0,0.75);
`;

export const SideBadge = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: ${accent};
  border: 1px solid rgba(0,0,0,0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 12px;
  flex: 0 0 auto;
`;

export const Main = styled.main`
  display: grid;
  gap: 16px;
`;

export const Card = styled.section`
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
  overflow: hidden;

  ${({ $span2 }) => ($span2 ? "grid-column: 1 / -1;" : "")}
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
  color: rgba(0,0,0,0.78);
`;

export const MiniTitle = styled.div`
  margin-top: 10px;
  font-size: 13px;
  font-weight: 900;
  color: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Icon = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,179,64,0.18);
  border: 1px solid rgba(255,179,64,0.25);
  font-size: 13px;
`;

export const BulletList = styled.ul`
  margin: 10px 0 0;
  padding-left: 18px;

  li {
    margin: 6px 0;
    font-size: 13px;
    font-weight: 700;
    line-height: 1.4;
    color: rgba(0,0,0,0.75);
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

export const ExampleTable = styled.div`
  display: grid;
  gap: 8px;
`;

export const ExampleRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 8px;
`;

export const ExampleCell = styled.div`
  border-radius: 12px;
  padding: 8px 10px;
  background: rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.08);
  font-size: 12.5px;
  font-weight: ${({ $bold }) => ($bold ? 900 : 800)};
  color: ${({ $muted }) => ($muted ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.75)")};
`;

export const CheckBox = styled.div`
  margin-top: 10px;
  background: rgba(255,179,64,0.16);
  border: 1px solid rgba(255,179,64,0.30);
  border-radius: 12px;
  padding: 10px 10px;
`;

export const CheckTitle = styled.div`
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 8px;
`;

export const CheckList = styled.ul`
  margin: 0;
  padding-left: 18px;

  li {
    margin: 6px 0;
    font-size: 13px;
    font-weight: 800;
    color: rgba(0,0,0,0.75);
    line-height: 1.35;
  }
`;

export const Bubble = styled.div`
  margin-top: 12px;
  background: rgba(255,179,64,0.25);
  border: 1px solid rgba(255,179,64,0.35);
  border-radius: 999px;
  padding: 10px 12px;
  font-size: 12.5px;
  font-weight: 900;
  color: rgba(0,0,0,0.7);
  width: fit-content;
`;

export const StepsList = styled.ol`
  margin: 10px 0 0;
  padding-left: 18px;

  li {
    margin: 6px 0;
    font-size: 13px;
    font-weight: 800;
    line-height: 1.4;
    color: rgba(0,0,0,0.72);
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.08);
  margin: 10px 0;
`;

export const Tip = styled.div`
  margin-top: 10px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.08);
  background: rgba(0,0,0,0.02);
  padding: 10px 10px;
`;

export const TipTitle = styled.div`
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 4px;
`;

export const TipText = styled.div`
  font-size: 12.5px;
  font-weight: 800;
  color: rgba(0,0,0,0.65);
  line-height: 1.35;
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