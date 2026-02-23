import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #FFF; min-height: 100vh; font-family: sans-serif; padding-bottom: 50px;
`;
export const Header = styled.header`
  background: #F59E0B; 
  padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; color: white;
`;
export const Title = styled.h2`font-size: 20px; font-weight: 700;`;
export const BackBtn = styled.button`
  background: transparent; border: none; color: white; font-weight: 600; cursor: pointer; display: flex; gap: 8px; align-items: center;
`;
export const Main = styled.main`max-width: 900px; margin: 0 auto; padding: 40px 20px;`;
export const Section = styled.section`margin-bottom: 40px;`;
export const SectionTitle = styled.h3`font-size: 22px; color:rgb(10, 10, 10); margin-bottom: 15px;`;
export const Text = styled.p`font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 10px;`;

/* Стилі для Калькулятора */
export const CalcBox = styled.div`
  background:rgb(128, 125, 120); padding: 30px; border-radius: 20px; border: 2px solid #F59E0B;
`;
export const RangeContainer = styled.div`margin-bottom: 30px;`;
export const RangeLabel = styled.div`display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 10px;`;
export const RangeInput = styled.input`
  width: 100%; cursor: pointer; accent-color: #F59E0B;
`;
export const ResultBox = styled.div`
  background: white; padding: 20px; border-radius: 12px; text-align: center;
  h4 { color: #555; margin-bottom: 10px; }
  .price { font-size: 32px; font-weight: 800; color: ${props => props.isOver ? '#F59E0B' : '#F59E0B'}; }
  .note { font-size: 14px; color:rgb(206, 29, 29); margin-top: 5px; opacity: ${props => props.isOver ? 1 : 0}; }
`;