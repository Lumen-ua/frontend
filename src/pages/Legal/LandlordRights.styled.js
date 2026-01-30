import styled from 'styled-components';

export const LandlordWrapper = styled.div`
  background-color: #FFFFFF;
  min-height: 100vh;
  font-family: sans-serif;
  padding-bottom: 50px;
`;

export const LandlordHeader = styled.header`
  background-color: #FFB300; /* Трохи яскравіший жовтий як на скріні */
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
  &:hover { opacity: 0.7; }
`;

export const LandlordMain = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const IntroSection = styled.div`
  margin-bottom: 40px;
`;

export const MainTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #1A1A1A;
`;

export const SubText = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.5;
`;

// Сітка для контенту (2 колонки)
export const RightsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const RightBlock = styled.article`
  display: flex;
  gap: 15px;
  align-items: flex-start;
`;

export const BlockContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BlockTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #E69500; /* Темно-жовтий для заголовків */
`;

export const BlockDescription = styled.div`
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  
  ul {
    list-style-type: disc;
    padding-left: 20px;
  }
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

export const QuizButton = styled.button`
  background-color: #E69500;
  color: #1A1A1A;
  padding: 14px 40px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #CC8400;
  }
`;

/* --- СТИЛІ МОДАЛЬНОГО ВІКНА (ТЕСТ) --- */

// Темний фон на весь екран
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Напівпрозорий чорний */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Саме біле віконце
export const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const QuestionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  color: #1A1A1A;
`;

export const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const OptionButton = styled.button`
  padding: 12px;
  border: 2px solid #EEE;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;

  &:hover {
    background-color: #FFF8E1;
    border-color: #FFB300;
  }
`;

export const ResultText = styled.div`
  h3 { font-size: 24px; margin-bottom: 10px; }
  p { font-size: 16px; color: #666; margin-bottom: 20px; }
`;