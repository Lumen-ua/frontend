import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Wrapper = styled.div`
  background: #F9FAFB; 
  min-height: 100vh; 
  font-family: sans-serif;
  padding-bottom: 60px;
`;

export const Header = styled.header`
  background: #F59E0B; /* Насичений помаранчевий */
  padding: 20px 40px; 
  color: #1A1A1A; 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.2);
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
  gap: 8px;
`;

export const Main = styled.main`
  max-width: 1000px; 
  margin: 0 auto; 
  padding: 40px 20px;
  animation: ${fadeIn} 0.5s ease-out;
`;

/* --- СЕКЦІЯ ІНФОГРАФІКИ --- */
export const InfoSection = styled.section`
  margin-bottom: 50px;
`;

export const SectionTitle = styled.h2`
  font-size: 28px;
  color: #1A1A1A;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 800;
  
  span {
    color: #F59E0B;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.03);
  border-top: 5px solid ${props => props.color || '#ccc'};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    margin-bottom: 15px;
    color: #1A1A1A;
  }

  p {
    font-size: 14px;
    line-height: 1.5;
    color: #555;
  }
`;

/* --- ЦІКАВИЙ ФАКТ --- */
export const FunFactBox = styled.div`
  background: linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%);
  border-radius: 20px;
  padding: 30px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 50px;
  border: 1px solid #FFE082;

  svg {
    flex-shrink: 0;
    color: #F59E0B;
  }

  div {
    h4 { font-size: 18px; margin-bottom: 8px; color: #E65100; }
    p { font-size: 15px; color: #333; line-height: 1.5; }
  }
`;

/* --- КОНСТРУКТОР --- */
export const ConstructorWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ToolsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StepCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);

  h4 {
    margin-bottom: 15px;
    color: #F59E0B;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const Option = styled.div`
  padding: 12px 15px;
  border: 2px solid ${props => props.isSelected ? '#F59E0B' : '#EEE'};
  background: ${props => props.isSelected ? '#FFF3E0' : 'white'};
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 14px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    border-color: #FFB74D;
  }
`;

/* Стиль паперу А4 */
export const PaperPreview = styled.div`
  background: white;
  padding: 40px;
  min-height: 500px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  position: relative;
  font-family: 'Times New Roman', serif;
  color: #000;
  
  /* Ефект аркуша паперу */
  &:before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    border: 1px solid #e0e0e0;
  }

  h3 { text-align: center; text-decoration: underline; margin-bottom: 30px; font-size: 22px; }
  p { font-size: 16px; line-height: 1.6; margin-bottom: 20px; white-space: pre-wrap; }
  
  .signature-block {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
  }
  
  .stamp-placeholder {
    position: absolute;
    bottom: 80px;
    right: 50px;
    width: 100px;
    height: 100px;
    border: 3px double #F59E0B;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F59E0B;
    font-size: 12px;
    transform: rotate(-15deg);
    opacity: 0.5;
    text-align: center;
  }
`;