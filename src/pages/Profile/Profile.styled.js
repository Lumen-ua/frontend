import styled from 'styled-components';

/* --- ОСНОВНА ОБГОРТКА --- */
export const ProfileWrapper = styled.main`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: var(--color-accent, #F2A12D);
  border-radius: 12px;
  min-height: calc(100vh - 100px);
`;

export const ProfileTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--color-text, #121212);
  padding-left: 8px;
`;

/* --- ВЕРХНЯ КАРТКА --- */
export const UserHeaderCard = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 2px solid var(--color-text, #111);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 0 rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const AvatarPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid var(--color-text, #111);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: var(--color-text, #111);
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  @media (max-width: 768px) { align-items: center; }
`;

export const UserNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserName = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

export const EditButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: transform 0.2s;
  &:hover { transform: scale(1.1); color: #000; }
`;

export const UserLevel = styled.span`
  font-size: 16px;
  color: #666;
  font-weight: 600;
`;

export const ProgressSection = styled.div`
  width: 100%;
  max-width: 300px;
`;

export const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: 700;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid #111;
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  width: ${props => props.$percent}%;
  background-color: var(--color-accent, #F2A12D);
`;

/* --- СІТКА --- */
export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

export const ContentCard = styled.article`
  background-color: #fff;
  border: 2px solid var(--color-text, #111);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 0 rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
`;

export const List = styled.ul`
  list-style: disc;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--color-text, #111);
`;

export const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.4;
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: var(--color-accent, #F2A12D);
  color: var(--color-text, #111);
  font-weight: 700;
  border: 2px solid #111;
  border-radius: 6px;
  box-shadow: 0 4px 0 #111;
  margin-top: auto;
  cursor: pointer;
  transition: transform 0.1s;
  &:hover { transform: translateY(-2px); }
  &:active { transform: translateY(0); box-shadow: 0 2px 0 #111; }
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 24px;
  color: #111; 
  &:hover { opacity: 0.7; }
`;

export const GoalButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 12px;
  background: #fff;
  border: 2px solid #eee;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { border-color: var(--color-accent, #F2A12D); transform: translateX(4px); }
`;

/* --- НОВИЙ КОНТЕЙНЕР ДЛЯ ФОРМИ (Виправляє вирівнювання) --- */
export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px; /* Фіксуємо ширину для всієї колонки */
  gap: 20px;
`;

export const InputGroup = styled.div`
  width: 100%;
  
  label { 
    display: block; 
    font-weight: 700; 
    margin-bottom: 8px; 
    font-size: 14px; 
  }
  
  input {
    width: 100%; 
    padding: 12px; 
    border: 2px solid #ddd; 
    border-radius: 8px; 
    font-size: 16px;
    
    &:focus { 
      border-color: var(--color-accent, #F2A12D); 
      outline: none; 
    }
  }
`;

export const AchievementRow = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
  &:last-child { border-bottom: none; }
`;

export const CheckIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #333;
  color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

export const AvatarUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const UploadButton = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: #111;
  text-decoration: underline;
  cursor: pointer;
  &:hover { color: #555; }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #eee;
  margin: 10px 0;
`;

/* Заголовок секції тепер всередині FormColumn, тому вирівняється як треба */
export const SectionTitle = styled.h4`
  font-size: 16px;
  font-weight: 800;
  margin-bottom: -10px; /* Трохи підтягнемо до поля */
  margin-top: 10px;
  text-align: left;
`;