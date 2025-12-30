import styled from "styled-components";

export const ReadBillPage = styled.section`
  width: 100%;
  min-height: calc(100vh - var(--header-h));
  padding: 18px 12px 28px;
`;

export const ReadBillContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

export const ReadBillHeader = styled.header`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
`;

export const ReadBillHeaderTop = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: start;
  padding: 16px 18px 12px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const ReadBillTitle = styled.h1`
  margin: 0 0 6px;
  font-size: 22px;
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: 0.2px;

  @media (max-width: 520px) {
    font-size: 18px;
  }
`;

export const ReadBillSubTitle = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.35;
  color: var(--color-text-muted);
  max-width: 620px;
`;

export const ReadBillProgress = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 12px;
  padding: 8px 12px;

  font-size: 12px;
  font-weight: 900;
  line-height: 1;
  height: fit-content;

  @media (max-width: 520px) {
    justify-self: start;
  }
`;

export const ReadBillOrangeBar = styled.div`
  background: var(--color-accent);
  color: #111;
  padding: ${({ $big }) => ($big ? "10px 18px" : "8px 14px")};
  font-size: ${({ $big }) => ($big ? "13px" : "12px")};
  font-weight: 900;
  letter-spacing: 0.2px;
  text-transform: ${({ $big }) => ($big ? "none" : "none")};

  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

export const ReadBillBillImageWrap = styled.div`
  padding: 12px 18px 18px;

  /* ✅ обмеження розміру, щоб не милити */
  display: flex;
  justify-content: center;
`;

export const ReadBillBillImage = styled.img`
  width: 100%;
  height: auto;
  display: block;

  /* ✅ головне: не розтягуємо фото надмірно */
  max-width: 980px;

  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  background: #f7f7f7;
`;

/* ✅ НОВЕ: замість колонок — сітка секцій */
export const ReadBillMainGrid = styled.div`
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const ReadBillSectionCard = styled.section`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100%;

  /* ✅ щоб "Порахуємо суму" стояло під першою колонкою */
  ${({ $span1 }) =>
    $span1
      ? `
    grid-column: 1 / span 1;
  `
      : ""}

  @media (max-width: 980px) {
    grid-column: auto;
  }
`;

export const ReadBillSectionHeader = styled.div`
  ${"" /* ✅ помаранчева смуга як у макеті */}
  background: var(--color-accent);
  padding: 10px 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

export const ReadBillSectionTitle = styled.h2`
  margin: 0;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.2px;
`;

export const ReadBillCardText = styled.div`
  padding: 12px 12px 0;
  font-size: 11.5px;
  font-weight: 700;
  line-height: 1.45;
  color: #111;
`;

export const ReadBillList = styled.ul`
  margin: 8px 0 0;
  padding-left: 16px;
  font-size: 11.5px;
  font-weight: 700;
  line-height: 1.45;
  color: #111;

  li {
    margin: 4px 0;
  }
`;

export const ReadBillDivider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 10px 12px;
`;

export const ReadBillMiniCard = styled.div`
  background: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  padding: 10px;
  margin: 12px 12px 0;
`;

export const ReadBillMiniCardTitle = styled.h3`
  margin: 0 0 6px;
  font-size: 11.5px;
  font-weight: 900;
`;

export const ReadBillMiniCardText = styled.p`
  margin: 0;
  font-size: 11.5px;
  font-weight: 700;
  line-height: 1.45;
`;

export const ReadBillCalcBox = styled.div`
  background: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  padding: 10px;
  margin: 12px 12px 0;
`;

export const ReadBillCalcTitle = styled.div`
  font-size: 11.5px;
  font-weight: 900;
  margin-bottom: 8px;
`;

export const ReadBillCalcRow = styled.div`
  margin-bottom: 8px;
`;

export const ReadBillInput = styled.input`
  width: 100%;
  height: 36px;
  padding: 0 10px;

  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  background: #fff;

  font-size: 11.5px;
  font-weight: 700;

  &::placeholder {
    color: rgba(0, 0, 0, 0.45);
    font-weight: 700;
  }

  &:focus-visible {
    outline: 3px solid #111;
    outline-offset: 2px;
  }
`;

export const ReadBillButton = styled.button`
  width: 100%;
  height: 38px;

  border: 2px solid #111;
  border-radius: 10px;

  background: var(--color-accent);
  color: #111;

  font-size: 12px;
  font-weight: 900;

  box-shadow: 0 3px 0 #111;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 0 #111;
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0 2px 0 #111;
  }

  &:focus-visible {
    outline: 3px solid #111;
    outline-offset: 3px;
  }
`;

export const ReadBillFootnote = styled.p`
  margin: 10px 12px 12px;
  font-size: 10.5px;
  font-weight: 700;
  line-height: 1.35;
  color: #111;
`;

export const ReadBillMuted = styled.span`
  color: var(--color-text-muted);
`;

export const ReadBillTable = styled.table`
  width: calc(100% - 24px);
  margin: 12px 12px 0;
  border-collapse: collapse;
  overflow: hidden;

  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
`;

export const ReadBillTableHead = styled.tr`
  background: #f6f6f6;
`;

export const ReadBillTableRow = styled.tr`
  background: ${({ $total }) => ($total ? "#f9f2d3" : "#fff")};

  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }
`;

export const ReadBillTableCell = styled.td`
  padding: 8px 10px;
  font-size: 11px;
  font-weight: 800;
  color: #111;

  text-align: ${({ $right }) => ($right ? "right" : "left")};

  ${({ as }) =>
    as === "th"
      ? `
    font-weight: 900;
    font-size: 11px;
  `
      : ""}
`;
