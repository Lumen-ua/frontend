import styled from 'styled-components';

export const TenantWrapper = styled.div`
  background-color: #FFFFFF;
  min-height: 100vh;
  font-family: sans-serif;
  padding-bottom: 50px;
`;

// Помаранчева шапка
export const TenantHeader = styled.header`
  background-color: #FFA726;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1A1A1A;
`;

export const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
`;

export const ExitButton = styled.button`
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    opacity: 0.7;
  }
`;

// Основний контент
export const TenantMain = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #1A1A1A;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr; /* Ліва колонка ширша, права вужча */
  gap: 40px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr; /* На мобілках одна колонка */
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const InfoBlock = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const BlockTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #CC7A00; /* Темно-помаранчевий для заголовків */
`;

export const BlockText = styled.div`
  margin-left: 40px; /* Відступ, щоб текст був під заголовком, а не під іконкою */
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  
  ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 8px;
  }
`;

// Права колонка з маскотом
export const MascotWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const NextButton = styled.button`
  background-color: #E69500;
  color: #1A1A1A;
  padding: 12px 30px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  align-self: flex-start;

  &:hover {
    background-color: #CC8400;
  }
`;