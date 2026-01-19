import React, { useState } from 'react';
import { FiUser, FiMenu, FiEdit2, FiTarget, FiArrowLeft, FiAward, FiCheck, FiArrowRight, FiCamera } from 'react-icons/fi';

import {
  ProfileWrapper,
  ProfileTitle,
  UserHeaderCard,
  UserInfo,
  AvatarPlaceholder,
  UserDetails,
  UserNameRow,
  UserName,
  EditButton,
  UserLevel,
  ProgressSection,
  ProgressLabel,
  ProgressBarContainer,
  ProgressBarFill,
  ProfileGrid,
  ContentCard,
  CardHeader,
  CardTitle,
  List,
  ListItem,
  ActionButton,
  BackButton,
  GoalButton,
  InputGroup,
  AchievementRow,
  CheckIcon,
  AvatarUploadWrapper,
  HiddenFileInput,
  UploadButton,
  Divider,
  SectionTitle,
  FormColumn
} from './Profile.styled';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('main');

  // 1. ПОЧАТКОВІ ДАНІ (Стан)
  // Всі дані зберігаються тут, усередині компонента
  const [user, setUser] = useState({
    name: "Name",
    email: "user@example.com",
    avatar: null,
    level: "Новачок",
    progress: 25,
    currentGoal: "Фінансова грамотність"
  });

  // Тимчасовий стан для форми редагування
  const [editFormData, setEditFormData] = useState(user);

  // Список досягнень (статичний, бо редагувати досягнення ми не будемо)
  const achievementsData = [
    { title: "Майстер Побуту", desc: "Пройти всі симуляції", done: false },
    { title: "Легкий на Підйом", desc: "Пройти 5 симуляцій легкого рівня", done: true },
    { title: "Захисник Комфорту", desc: "Пройти 5 симуляцій середнього рівня", done: false },
    { title: "Платіжний Дебют", desc: "Перший раз оплатити платіжку", done: false },
    { title: "Побутовий Філософ", desc: "Переглянути 10 порад", done: false },
    { title: "Еко-Гуру", desc: "Прочитати всі поради в розділі економії", done: false },
    { title: "Я у домі!", desc: "Заповнити профіль", done: true },
    { title: "Домашній Супергерой", desc: "Успішно пройти всі модулі курсу", done: false },
    { title: "Універсальний Учень", desc: "Пройти хоча б одну симуляцію", done: false },
    { title: "Пішло поїхало", desc: "Зробити перший клік у симуляції", done: false },
  ];

  const achievementsReceived = achievementsData.filter(a => a.done).length;
  const achievementsPercent = (achievementsReceived / achievementsData.length) * 100;

  // --- ФУНКЦІЇ ДЛЯ ІНТЕРАКТИВУ ---

  const goBack = () => setActiveTab('main');

  // Обробка зміни фото (Тільки візуально в браузері)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditFormData({ ...editFormData, avatar: imageUrl });
    }
  };

  // Збереження форми редагування
  const handleSaveProfile = () => {
    // Переносимо дані з форми в основний об'єкт користувача
    setUser({
      ...user,
      name: editFormData.name,
      avatar: editFormData.avatar
    });
    goBack();
  };

  // Зміна мети
  const handleChangeGoal = (newGoal) => {
    setUser({ ...user, currentGoal: newGoal });
    goBack();
  };

  return (
    <ProfileWrapper>
      
      {/* --- ГОЛОВНА СТОРІНКА --- */}
      {activeTab === 'main' && (
        <>
          <ProfileTitle>Профіль</ProfileTitle>

          <UserHeaderCard>
            <UserInfo>
              <AvatarPlaceholder>
                {user.avatar ? <img src={user.avatar} alt="Avatar" /> : <FiUser />}
              </AvatarPlaceholder>
              <UserDetails>
                <UserNameRow>
                  {/* Дані беруться зі State */}
                  <UserName>{user.name}</UserName>
                  <EditButton 
                    aria-label="Редагувати" 
                    onClick={() => {
                      setEditFormData(user); // Заповнюємо форму поточними даними
                      setActiveTab('edit');
                    }}
                  >
                    <FiEdit2 size={18} />
                  </EditButton>
                </UserNameRow>
                <UserLevel>Рівень: {user.level}</UserLevel>
              </UserDetails>
            </UserInfo>

            <ProgressSection>
              <ProgressLabel>
                <span>Загальний прогрес:</span>
                <span>{user.progress}%</span>
              </ProgressLabel>
              <ProgressBarContainer>
                <ProgressBarFill $percent={user.progress} />
              </ProgressBarContainer>
            </ProgressSection>
          </UserHeaderCard>

          <ProfileGrid>
            {/* Секція Досягнень */}
            <ContentCard>
              <CardHeader>
                <CardTitle>Досягнення</CardTitle>
                <FiMenu 
                  style={{ cursor: 'pointer', fontSize: '24px' }} 
                  onClick={() => setActiveTab('achievements')} 
                />
              </CardHeader>
              <ProgressSection>
                 <ProgressBarContainer>
                    <ProgressBarFill $percent={achievementsPercent} />
                 </ProgressBarContainer>
                 <div style={{ marginTop: '8px', fontSize: '14px', color: '#121212' }}>
                    {achievementsReceived} з {achievementsData.length} отримано
                 </div>
              </ProgressSection>
            </ContentCard>

            <ContentCard>
              <CardTitle style={{ marginBottom: '16px' }}>Персональні рекомендації</CardTitle>
              <List>
                <ListItem>Склади персональний бюджет</ListItem>
                <ListItem>Створи регулярну оплату рахунків</ListItem>
                <ListItem>Подумати про енергоощадність</ListItem>
              </List>
            </ContentCard>

            {/* Секція Мети */}
            <ContentCard style={{ gridColumn: '1 / -1' }}> 
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <CardHeader>
                    {/* Мета динамічна */}
                    <CardTitle>Поточна мета: «{user.currentGoal}»</CardTitle>
                    <FiTarget size={24} />
                  </CardHeader>
                  <List>
                    <ListItem>Склади персональний бюджет</ListItem>
                    <ListItem>Створи регулярну оплату рахунків</ListItem>
                    <ListItem>Подумати про енергоощадність</ListItem>
                  </List>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '200px' }}>
                   <span style={{ marginBottom: '12px', fontWeight: 'bold', color: '#121212' }}>
                     Хочете змінити пріоритети?
                   </span>
                   <ActionButton onClick={() => setActiveTab('goals')}>
                     Обрати нову мету
                   </ActionButton>
                </div>
              </div>
            </ContentCard>
          </ProfileGrid>
        </>
      )}

      {/* --- ВКЛАДКА: ВСІ ДОСЯГНЕННЯ --- */}
      {activeTab === 'achievements' && (
        <>
          <BackButton onClick={goBack}>
            <FiArrowLeft /> Назад до профілю
          </BackButton>
          
          <ContentCard style={{ minHeight: 'auto' }}>
            <CardTitle style={{ fontSize: '28px', marginBottom: '24px' }}>Всі досягнення</CardTitle>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {achievementsData.map((item, index) => (
                <AchievementRow key={index}>
                  <div style={{ fontSize: '24px', color: '#111' }}><FiAward /></div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 4px' }}>«{item.title}»</h3>
                    <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{item.desc}</p>
                  </div>
                  {item.done && (
                    <CheckIcon><FiCheck /></CheckIcon>
                  )}
                </AchievementRow>
              ))}
            </ul>
          </ContentCard>
        </>
      )}

      {/* --- ВКЛАДКА: ЗМІНА МЕТИ --- */}
      {activeTab === 'goals' && (
        <>
          <BackButton onClick={goBack}>
            <FiArrowLeft /> Скасувати
          </BackButton>

          <ContentCard style={{ minHeight: 'auto' }}>
            <CardTitle style={{ fontSize: '28px', marginBottom: '24px' }}>Оберіть нову мету</CardTitle>
            
            <GoalButton onClick={() => handleChangeGoal("Фінансова грамотність")}>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800' }}>Фінансова грамотність</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Навчитись вести бюджет та розуміти платіжки</p>
              </div>
              <FiArrowRight size={24} />
            </GoalButton>

            <GoalButton onClick={() => handleChangeGoal("Енергоефективність")}>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800' }}>Енергоефективність</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Зменшити споживання та зберегти планету</p>
              </div>
              <FiArrowRight size={24} />
            </GoalButton>

            <GoalButton onClick={() => handleChangeGoal("Без боргів")}>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800' }}>Без боргів</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Розібратись з боргами та пенею</p>
              </div>
              <FiArrowRight size={24} />
            </GoalButton>
          </ContentCard>
        </>
      )}

      {/* --- ВКЛАДКА: РЕДАГУВАННЯ --- */}
      {activeTab === 'edit' && (
        <>
          <BackButton onClick={goBack}>
            <FiArrowLeft /> Назад
          </BackButton>

          <ContentCard style={{ alignItems: 'center', minHeight: 'auto', padding: '40px' }}>
            <CardTitle style={{ fontSize: '28px', marginBottom: '32px' }}>Редагувати профіль</CardTitle>
            
            <FormColumn>
              
              <AvatarUploadWrapper>
                <AvatarPlaceholder>
                  {editFormData.avatar ? <img src={editFormData.avatar} alt="New Avatar" /> : <FiUser />}
                </AvatarPlaceholder>
                <UploadButton>
                  <FiCamera style={{ marginRight: '6px' }} />
                  Змінити фото
                  <HiddenFileInput type="file" accept="image/*" onChange={handleImageChange} />
                </UploadButton>
              </AvatarUploadWrapper>

              <InputGroup>
                <label>Ваше ім'я</label>
                {/* Двостороннє зв'язування: value + onChange */}
                <input 
                  type="text" 
                  value={editFormData.name} 
                  onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} 
                />
              </InputGroup>

              {/* Пошта відсутня за вашим проханням */}

              <Divider />

              <SectionTitle>Зміна пароля</SectionTitle>
              
              <InputGroup>
                <label>Новий пароль</label>
                <input type="password" placeholder="Введіть новий пароль" />
              </InputGroup>

              <InputGroup>
                <label>Підтвердити пароль</label>
                <input type="password" placeholder="Повторіть пароль" />
              </InputGroup>

              {/* Кнопка зберігає зміни і оновлює головний екран */}
              <ActionButton onClick={handleSaveProfile} style={{ marginTop: '16px' }}>
                Зберегти зміни
              </ActionButton>

            </FormColumn>
          </ContentCard>
        </>
      )}

    </ProfileWrapper>
  );
};