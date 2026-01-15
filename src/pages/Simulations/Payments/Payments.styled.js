import styled from "styled-components"

/* Основні картки */
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

/* Поля вводу */
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

/* Кнопки */
export const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 10px;
  transition: 0.25s;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${({ disabled }) => (disabled ? "#ff9800" : "#fb8c00")};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-1px)")};
  }
`

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

/* Історія платежів */
export const HistoryItem = styled.div`
  padding: 12px 14px;
  border-bottom: 1px solid #ffe0b2;
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }
`

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

/* Шаблони */
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
