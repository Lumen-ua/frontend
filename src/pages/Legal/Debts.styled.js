import styled, { keyframes } from 'styled-components';

export const DebtsWrapper = styled.div`
  background-color: #FFFFFF;
  min-height: 100vh;
  font-family: sans-serif;
  padding-bottom: 50px;
`;

export const DebtsHeader = styled.header`
  background-color: #FFC107; /* Жовтий, як на макеті */
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

export const DebtsMain = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

/* Блок з теорією (жовтий фон) */
export const StorySection = styled.section`
  background-color: #FFF8E1;
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 40px;
  position: relative;
`;

export const ConceptBlock = styled.div`
  margin-bottom: 30px;
  
  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    font-weight: 700;
    color: #E65100;
    margin-bottom: 15px;
  }
  
  p, li {
    font-size: 16px;
    line-height: 1.6;
    color: #333;
  }

  ul {
    padding-left: 20px;
    margin-top: 10px;
  }
`;

export const MascotDecoration = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 150px;
  opacity: 0.9;
  
  @media (max-width: 900px) {
    display: none; /* Ховаємо на мобілках, щоб не заважав */
  }
`;

/* --- СТИЛІ СИМУЛЯТОРА (ЧАТ) --- */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const SimulatorWrapper = styled.div`
  border: 2px solid #E0E0E0;
  border-radius: 20px;
  overflow: hidden;
  background-color: #F5F5F5;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-top: 20px;
`;

export const ChatHeader = styled.div`
  background-color: #4CAF50; /* Колір WhatsApp/Messages */
  color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 600;
`;

export const ChatBody = styled.div`
  height: 350px;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const MessageBubble = styled.div`
  max-width: 75%;
  padding: 12px 18px;
  border-radius: 18px;
  font-size: 15px;
  line-height: 1.4;
  animation: ${fadeIn} 0.3s ease-out;
  position: relative;

  /* Якщо повідомлення від юзера - зелене справа, від власниці - біле зліва */
  background-color: ${props => props.isUser ? '#DCF8C6' : '#FFFFFF'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  border-bottom-right-radius: ${props => props.isUser ? '4px' : '18px'};
  border-bottom-left-radius: ${props => !props.isUser ? '4px' : '18px'};
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  color: #000;

  &:before {
    content: '${props => props.author}';
    display: block;
    font-size: 11px;
    color: #888;
    margin-bottom: 4px;
    text-align: ${props => props.isUser ? 'right' : 'left'};
  }
`;

export const ChatControls = styled.div`
  background-color: white;
  padding: 20px;
  border-top: 1px solid #ddd;
`;

export const ChoicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

export const ChoiceButton = styled.button`
  background-color: white;
  border: 2px solid #FFC107;
  border-radius: 10px;
  padding: 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  color: #333;
  
  &:hover {
    background-color: #FFF8E1;
    transform: translateY(-2px);
  }
`;

export const ResultBadge = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  background-color: ${props => props.type === 'good' ? '#E8F5E9' : '#FFEBEE'};
  color: ${props => props.type === 'good' ? '#2E7D32' : '#C62828'};
  border: 1px solid ${props => props.type === 'good' ? '#C8E6C9' : '#FFCDD2'};
  animation: ${fadeIn} 0.5s;
`;