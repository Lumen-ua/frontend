import styled from "styled-components";

const accent = "var(--color-accent, #ffb340)";
const muted = "var(--color-text-muted, rgba(0,0,0,0.55))";

export const Page = styled.section`
  width: 100%;
  padding: 18px 12px 28px;
`;

export const Shell = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 18px 45px rgba(0,0,0,0.08);
  overflow: hidden;
`;

export const Header = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: center;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(0,0,0,0.08);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const Logo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 900;

  .bulb {
    width: 34px;
    height: 34px;
    border-radius: 12px;
    background: rgba(255, 179, 64, 0.22);
    border: 1px solid rgba(255, 179, 64, 0.35);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .name {
    font-size: 16px;
    letter-spacing: 0.2px;
  }
`;

export const Title = styled.h1`
  margin: 0 0 4px;
  font-size: 26px;
  font-weight: 900;

  @media (max-width: 520px) {
    font-size: 20px;
  }
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
  color: ${muted};
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 16px;
  padding: 16px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const BillArea = styled.div`
  min-width: 0;
`;

export const BillFrame = styled.div`
  position: relative;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  background: #f7f7f7;
  overflow: hidden;
`;

export const BillImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const Hotspot = styled.button`
  position: absolute;
  border-radius: 12px;
  border: 2px solid rgba(0,0,0,0.0);
  background: rgba(255, 179, 64, 0.00);
  cursor: pointer;
  padding: 0;

  /* subtle hover */
  &:hover {
    border-color: rgba(255, 179, 64, 0.9);
    background: rgba(255, 179, 64, 0.10);
  }

  ${({ $active }) =>
    $active
      ? `
    border-color: rgba(255, 179, 64, 1);
    background: rgba(255, 179, 64, 0.14);
  `
      : ""}

  ${({ $solved }) =>
    $solved
      ? `
    border-color: rgba(20, 160, 90, 1);
    background: rgba(20, 160, 90, 0.10);
  `
      : ""}

  &:focus-visible {
    outline: 3px solid rgba(0, 120, 255, 0.35);
    outline-offset: 2px;
  }
`;

export const RightPanel = styled.aside`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MissionCard = styled.section`
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  padding: 12px;
`;

export const MissionTitle = styled.div`
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 10px;
`;

export const MissionList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
`;

export const MissionItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 10px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.08);
  background: #fafafa;

  ${({ $current }) =>
    $current
      ? `
    background: rgba(0, 90, 200, 0.08);
    border-color: rgba(0, 90, 200, 0.18);
  `
      : ""}

  ${({ $done }) =>
    $done
      ? `
    background: rgba(20, 160, 90, 0.08);
    border-color: rgba(20, 160, 90, 0.18);
  `
      : ""}
`;

export const MissionDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  border: 2px solid rgba(0,0,0,0.18);

  ${({ $current }) =>
    $current
      ? `
    border-color: rgba(0, 90, 200, 0.65);
  `
      : ""}

  ${({ $done }) =>
    $done
      ? `
    border-color: rgba(20, 160, 90, 0.85);
    background: rgba(20, 160, 90, 0.85);
  `
      : ""}
`;

export const SmallMuted = styled.p`
  margin: 10px 0 0;
  font-size: 12px;
  font-weight: 700;
  color: ${muted};
  line-height: 1.35;
`;

export const QuizCard = styled.section`
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  padding: 12px;
`;

export const QuizTitle = styled.div`
  font-size: 14px;
  font-weight: 900;
  margin-bottom: 10px;
`;

export const Options = styled.div`
  display: grid;
  gap: 10px;
`;

export const OptionBtn = styled.button`
  width: 100%;
  text-align: left;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.10);
  background: #fff;
  padding: 10px 10px;
  display: grid;
  grid-template-columns: 18px 1fr auto;
  gap: 10px;
  align-items: center;
  cursor: pointer;

  .radio {
    width: 14px;
    height: 14px;
    border-radius: 999px;
    border: 2px solid rgba(0,0,0,0.18);
  }

  .text {
    font-size: 13px;
    font-weight: 800;
    color: rgba(0,0,0,0.78);
  }

  .mark {
    font-weight: 900;
    color: rgba(20, 160, 90, 0.95);
  }

  ${({ disabled }) =>
    disabled
      ? `
    opacity: 0.65;
    cursor: not-allowed;
  `
      : ""}

  ${({ $chosen }) =>
    $chosen
      ? `
    border-color: rgba(0,0,0,0.18);
    background: rgba(255, 179, 64, 0.14);

    .radio {
      border-color: rgba(0,0,0,0.25);
      background: ${accent};
    }
  `
      : ""}

  ${({ $correct }) =>
    $correct
      ? `
    border-color: rgba(20, 160, 90, 0.35);
    background: rgba(20, 160, 90, 0.10);
  `
      : ""}

  ${({ $wrong }) =>
    $wrong
      ? `
    border-color: rgba(220, 60, 60, 0.35);
    background: rgba(220, 60, 60, 0.10);
  `
      : ""}

  &:focus-visible {
    outline: 3px solid rgba(0, 120, 255, 0.35);
    outline-offset: 2px;
  }
`;

export const PrimaryBtn = styled.button`
  margin-top: 12px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.10);
  background: ${accent};
  padding: 12px 12px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    filter: brightness(0.98);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const FooterBar = styled.div`
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  padding: 12px;
  display: grid;
  gap: 10px;
`;

export const ProgressText = styled.div`
  font-size: 12px;
  font-weight: 900;
  color: rgba(0,0,0,0.70);
`;

export const Feedback = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 12.5px;
  font-weight: 800;
  color: rgba(0,0,0,0.62);
  line-height: 1.35;
`;

export const FeedbackOk = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: rgba(20, 160, 90, 0.12);
  border: 1px solid rgba(20, 160, 90, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: rgba(20, 160, 90, 0.95);
  flex: 0 0 auto;
`;

export const FeedbackBad = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: rgba(220, 60, 60, 0.10);
  border: 1px solid rgba(220, 60, 60, 0.22);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: rgba(220, 60, 60, 0.95);
  flex: 0 0 auto;
`;

export const BadgeCard = styled.section`
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.10);
  padding: 14px;
`;

export const BadgeTitle = styled.div`
  font-size: 16px;
  font-weight: 900;
`;

export const BadgeSub = styled.div`
  margin-top: 8px;
  font-size: 13px;
  font-weight: 800;
  color: rgba(0,0,0,0.74);

  span {
    color: ${muted};
    font-weight: 800;
  }
`;