import styled, { keyframes } from 'styled-components';

// Анімація для декоративних елементів
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

export const Wrapper = styled.div`
  background: #FFFFFF; 
  min-height: 100vh; 
  font-family: sans-serif;
  overflow-x: hidden; /* Щоб декорації не вилазили */
`;

export const Header = styled.header`
  background: #F59E0B; /* Насичений помаранчевий */
  padding: 20px 40px; 
  color: #1A1A1A; 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  box-shadow: 0 4px 10px rgba(245, 158, 11, 0.2);
`;

export const BackBtn = styled.button`
  background: none; 
  border: none; 
  color: #1A1A1A; 
  cursor: pointer; 
  font-weight: bold; 
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Main = styled.main`
  max-width: 900px; 
  margin: 0 auto; 
  padding: 40px 20px; 
  position: relative;
`;

/* --- НОВА ВСТУПНА СЕКЦІЯ (ШПАРГАЛКА) --- */
export const IntroSection = styled.section`
  margin-bottom: 50px;
  position: relative;
  z-index: 2;
`;

export const IntroTitle = styled.h1`
  text-align: center;
  font-size: 28px;
  color: #000000;
  margin-bottom: 30px;
  font-weight: 800;
`;

export const RulesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const RuleCard = styled.div`
  background: #FFF8E1; /* Дуже світлий жовтий фон для карток */
  border: 3px solid ${props => props.role === 'owner' ? '#F59E0B' : '#4FC3F7'}; /* Помаранчева або блакитна рамка */
  border-radius: 20px;
  padding: 25px;
  position: relative;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const IconHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px dashed #ddd;

  svg {
    /* Колір іконок відповідає ролі */
    color: ${props => props.role === 'owner' ? '#F59E0B' : '#0288D1'};
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  }
`;

export const CardTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #000000; /* Текст чорний */
  margin: 0;
`;

export const RuleList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    margin-bottom: 12px;
    font-size: 16px;
    color: #000000; /* Текст чорний */
    display: flex;
    align-items: flex-start;
    gap: 10px;

    svg {
      flex-shrink: 0;
      margin-top: 3px;
      color: ${props => props.role === 'owner' ? '#F59E0B' : '#0288D1'};
    }
  }
`;

/* --- ДЕКОРАТИВНІ ЕЛЕМЕНТИ ФОНУ --- */
export const DecorationBlob1 = styled.div`
  position: absolute;
  top: 50px;
  left: -100px;
  width: 300px;
  height: 300px;
  background: rgba(245, 158, 11, 0.1); /* Напівпрозорий помаранчевий */
  border-radius: 50%;
  z-index: 1;
  animation: ${float} 6s ease-in-out infinite;
`;

export const DecorationBlob2 = styled.div`
  position: absolute;
  bottom: 100px;
  right: -120px;
  width: 250px;
  height: 250px;
  background: rgba(79, 195, 247, 0.1); /* Напівпрозорий блакитний */
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  z-index: 1;
  animation: ${float} 8s ease-in-out infinite reverse;
`;


/* --- СТИЛІ ГРИ (Оновлені) --- */
export const GameSectionTitle = styled.h3`
    text-align: center;
    font-size: 24px;
    color: #000;
    margin-bottom: 20px;
    font-weight: 700;
    position: relative;
    z-index: 2;
`;

export const GameArea = styled.div`
  border: 3px solid #F59E0B;
  padding: 40px; 
  border-radius: 25px; 
  background: #FFFFFF; 
  position: relative;
  box-shadow: 0 10px 30px rgba(245, 158, 11, 0.15);
  z-index: 2;
  text-align: center;
`;

export const TaskCard = styled.div`
  background: #FAFAFA; 
  padding: 30px; 
  border-radius: 15px; 
  border: 2px solid #eee;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05); 
  margin-bottom: 30px;
  
  h3 { 
    font-size: 26px; 
    margin-bottom: 15px; 
    color: #000000; /* Чорний текст */
    font-weight: 800;
  }
`;

export const ButtonsRow = styled.div`
  display: flex; 
  gap: 20px; 
  justify-content: center;
  margin-bottom: 30px;
`;

export const OptionBtn = styled.button`
  padding: 15px 40px; 
  font-size: 18px; 
  border-radius: 12px; 
  border: none; 
  cursor: pointer; 
  font-weight: bold; 
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  /* Кнопки: Помаранчева для власника, Блакитна для орендаря */
  background: ${props => props.role === 'owner' ? '#F59E0B' : '#4FC3F7'};
  color: #000000; /* Текст на кнопках чорний для контрасту */

  &:hover { 
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    filter: brightness(1.1);
  }
`;

export const ScoreBoard = styled.div`
  margin-bottom: 20px; 
  font-size: 18px; 
  color: #000000; 
  font-weight: bold;
  display: inline-block;
  padding: 5px 15px;
  background: #eee;
  border-radius: 20px;
`;

export const Feedback = styled.div`
  margin-top: 20px; 
  font-size: 20px; 
  font-weight: bold;
  padding: 15px;
  border-radius: 10px;
  background: ${props => props.type === 'correct' ? '#E8F5E9' : '#FFEBEE'};
  color: #000000;
  border: 2px solid ${props => props.type === 'correct' ? '#4CAF50' : '#F44336'};
`;