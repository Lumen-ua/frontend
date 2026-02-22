import styled from "styled-components"

export const getPaymentsPageData = () => {
  return Promise.resolve({
    balance: mockData.user.balance,
    history: mockData.paymentsHistory,
    templates: mockData.templates
  })
}

export const payService = () => {
  return Promise.resolve(mockData.paymentResult)
}
/* ������� ������ */
export const PayCard = styled.div`
  background: linear-gradient(135deg, #fff3e0, #ffffff);
  border-radius: 18px;
  padding: 20px;
  margin-bottom: 20px;
  border: 2px dashed #ffd478;
  transition: 0.25s;

  &:hover {
    background: linear-gradient(135deg, #ffdea980, #f7f1e0);
    transform: translateY(-2px);
  }
`

/* ���� ����� */
export const Field = styled.input`
  width: 100%;
  padding: 11px 12px;
  border-radius: 12px;
  border: 2px solid ${({ $invalid }) => ($invalid ? "#e53935" : "#ffe0b2")};
  background: ${({ $invalid }) => ($invalid ? "#ffebee" : "white")};
  margin-bottom: 14px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ $invalid }) => ($invalid ? "#e53935" : "#ffad32")};
    background: ${({ $invalid }) => ($invalid ? "#ffebee" : "#fff8f1")};
  }
`

export const Select = styled.select`
  width: 100%;
  padding: 11px 12px;
  border-radius: 12px;
  border: 2px solid #ffe0b2;
  margin-bottom: 14px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #ff9800;
    background: #fff8f1;
  }
`

/* ������ */
export const Button = styled.button`
  width: ${({ $tab }) => ($tab ? "auto" : "100%")};
  padding: 12px 18px;
  background: ${({ $active }) => ($active ? "#ff9800" : "#fbd295")};
  color: ${({ $active }) => ($active ? "white" : "#ff6f00")};
  border: none;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.25s;
  white-space: nowrap;

  &:hover {
    background: ${({ $active }) => ($active ? "#fb8c00" : "#ffc561")};
    transform: translateY(-1px);
  }
`;


export const ErrorBox = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 12px 14px;
  border-radius: 10px;
  margin-bottom: 14px;
  font-weight: 700;
`

export const SuccessBox = styled.div`
  background: #e8f5e9;
  color: #2e7d32;
  padding: 12px 14px;
  border-radius: 10px;
  margin-bottom: 16px;
  font-weight: 700;
`

/* ������ ������� */
export const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;

  background: ${props =>
    props.$status === "refunded" ? "#f3f3f3" : "white"};

  opacity: ${props =>
    props.$status === "refunded" ? 0.6 : 1};

  filter: ${props =>
    props.$status === "refunded" ? "grayscale(30%)" : "none"};

  transition: 0.3s;
`;


export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 700;
  color: #ff8000;
  cursor: pointer;
  margin-bottom: 16px;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`

export const HistoryCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 20px;
  margin-bottom: 20px;
  border: 2px solid #ff9800;
`

/* ������� */
export const Template = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 14px 16px;
  margin-bottom: 12px;
  border-left: 5px solid #ff9900;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: #fff8f1;
    transform: translateY(-2px);
  }

  strong {
    color: #ff8400;
  }
`
export const StatusBadge = styled.div`
  display: inline-block;
  margin-top: 4px;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  color: white;

  background: ${({ status }) =>
    status === "processing" ? "#ff9800" :
    status === "approved" ? "#4caf50" :
    status === "refunded" ? "#9e9e9e" :
    "#03a9f4"};
`;

export const TimerText = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #ff6f00;
  font-weight: 700;
`;
export const TabsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const LevelSection = styled.div`
  margin-bottom: 20px;
`;

export const ProgressBarWrapper = styled.div`
  height: 8px;
  background: #eee;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 5px;
`;

export const ProgressFillBar = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  background: linear-gradient(90deg, #6C63FF, #00C9A7);
  transition: 0.3s;
`;