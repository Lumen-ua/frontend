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
  UploadButton,
  Divider,
  SectionTitle,
  FormColumn
} from './Profile.styled';

export default function Profile() {
  // Залишаємо тільки стан для перемикання вкладок (це частина UI-навігації)
  const [activeTab, setActiveTab] = useState('main');

  // Статичні дані для верстки
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

  const goBack = () => setActiveTab('main');

  return (
    <ProfileWrapper>
      
      {/* --- ГОЛОВНА --- */}
      {activeTab === 'main' && (
        <>
          <ProfileTitle>Профіль</ProfileTitle>

          <UserHeaderCard>
            <UserInfo>
              <AvatarPlaceholder>
                <FiUser />
              </AvatarPlaceholder>
              <UserDetails>
                <UserNameRow>
                  <UserName>Name</UserName>
                  <EditButton aria-label="Редагувати" onClick={() => setActiveTab('edit')}>
                    <FiEdit2 size={18} />
                  </EditButton>
                </UserNameRow>
                <UserLevel>Рівень: Новачок</UserLevel>
              </UserDetails>
            </UserInfo>

            <ProgressSection>
              <ProgressLabel>
                <span>Загальний прогрес:</span>
                <span>25%</span>
              </ProgressLabel>
              <ProgressBarContainer>
                <ProgressBarFill $percent={25} />
              </ProgressBarContainer>
            </ProgressSection>
          </UserHeaderCard>

          <ProfileGrid>
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

            <ContentCard style={{ gridColumn: '1 / -1' }}> 
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <CardHeader>
                    <CardTitle>Поточна мета: «Фінансова грамотність»</CardTitle>
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

      {/* --- ВСІ ДОСЯГНЕННЯ --- */}
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

      {/* --- ЗМІНА МЕТИ --- */}
      {activeTab === 'goals' && (
        <>
          <BackButton onClick={goBack}>
            <FiArrowLeft /> Скасувати
          </BackButton>

          <ContentCard style={{ minHeight: 'auto' }}>
            <CardTitle style={{ fontSize: '28px', marginBottom: '24px' }}>Оберіть нову мету</CardTitle>
            
            <GoalButton onClick={goBack}>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800' }}>Фінансова грамотність</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Навчитись вести бюджет та розуміти платіжки</p>
              </div>
              <FiArrowRight size={24} />
            </GoalButton>

            <GoalButton onClick={goBack}>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800' }}>Енергоефективність</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Зменшити споживання та зберегти планету</p>
              </div>
              <FiArrowRight size={24} />
            </GoalButton>

            <GoalButton onClick={goBack}>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800' }}>Без боргів</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Розібратись з боргами та пенею</p>
              </div>
              <FiArrowRight size={24} />
            </GoalButton>
          </ContentCard>
        </>
      )}

      {/* --- РЕДАГУВАННЯ (Тільки UI) --- */}
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
                  {/* Завжди показуємо іконку, бо це тільки верстка */}
                  <FiUser />
                </AvatarPlaceholder>
                {/* Кнопка виглядає як клікабельна, але нічого не робить (або відкриває вікно, але не зберігає) */}
                <UploadButton>
                  <FiCamera style={{ marginRight: '6px' }} />
                  Змінити фото
                  {/* input прибрали або залишили без onChange, щоб він не викликав помилок */}
                </UploadButton>
              </AvatarUploadWrapper>

              <InputGroup>
                <label>Ваше ім'я</label>
                {/* defaultValue дозволяє писати текст, але не вимагає функцій */}
                <input type="text" defaultValue="Name" />
              </InputGroup>

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

              <ActionButton onClick={goBack} style={{ marginTop: '16px' }}>
                Зберегти зміни
              </ActionButton>

            </FormColumn>
          </ContentCard>
        </>
      )}

    </ProfileWrapper>
  );
};