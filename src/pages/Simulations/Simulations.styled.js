import styled from "styled-components"

export const Page = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--container-padding);
`

export const Header = styled.div`
  background: var(--color-accent);
  border-radius: var(--radius-3);
  padding: 32px;
  display: flex;
  gap: 20px;
`;
export const HeaderIcon = styled.div`
  width: 54px;
  height: 54px;
  background: white;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-size: 28px;
  border: 3px solid black;
`

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
`

export const PageTitle = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #4e2600;
  font-family: "Inter", system-ui, sans-serif;
`

export const PageSub = styled.div`
  font-size: 14px;
  color: #6d4c41;
  margin-top: 2px;
`

export const CenterHalf = styled.div`
  display: flex;
  justify-content: center;
  margin: 48px 0;
`

export const PayCard = styled.button`
  background: white;
  border-radius: 14px;
  padding: 18px 28px;
  border: 3px solid black;
  cursor: pointer;

  font-size: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 12px;

  box-shadow: 0 6px 0 black;
  transition: .12s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 0 black;
  }

  &:active {
    transform: translateY(4px);
    box-shadow: 0 2px 0 black;
  }
`

export const ButtonIcon = styled.div`
  font-size: 22px;
`
