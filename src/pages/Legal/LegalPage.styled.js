import styled from 'styled-components';

export const LegalPageWrapper = styled.div`
  background-color: #F8F9FA;
  min-height: 100vh;
  padding-bottom: 40px;
  font-family: sans-serif;
`;
export const LegalContainer = styled.div`
  max-width: var(--container-max, 1120px);
  margin: 0 auto;
`;

export const LegalHeader = styled.header`
  background-color: #FFA726;
  padding: 30px;
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  margin-bottom: 30px;
  color: #1A1A1A;
`;

export const LegalHeaderContent = styled.div`
  max-width: 70%;
`;

export const LegalTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 15px;
`;

export const LegalDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #333;
`;

export const LegalHeaderIconWrapper = styled.div`
  opacity: 0.8;
  color: #1A1A1A;
`;

export const LegalProgressBadge = styled.div`
  position: absolute;
  bottom: -15px;
  right: 30px;
  background-color: #81D4FA;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const LegalGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0 30px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const LegalCard = styled.article`
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.2s;
  cursor: pointer;
  min-height: 160px;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const LegalCardTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1A1A1A;
  margin-top: 15px;
`;

export const LegalMaterialsSection = styled.section`
  background-color: #FFFFFF;
  margin: 0 30px;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;

export const LegalMaterialsTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1A1A1A;
`;

export const LegalMaterialsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style: disc;
  padding-left: 20px;
  gap: 10px;
`;

export const LegalMaterialsItem = styled.li`
  font-size: 14px;
  color: #333;
`;