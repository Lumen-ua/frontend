import React, { useState, useEffect } from 'react';
import { FiUser, FiMenu, FiEdit2, FiTarget, FiArrowLeft, FiAward, FiCheck, FiArrowRight, FiCamera } from 'react-icons/fi';

import {
  ProfileWrapper, ProfileTitle, UserHeaderCard, UserInfo, AvatarPlaceholder, UserDetails,
  UserNameRow, UserName, EditButton, UserLevel, ProgressSection, ProgressLabel,
  ProgressBarContainer, ProgressBarFill, ProfileGrid, ContentCard, CardHeader, CardTitle,
  List, ListItem, ActionButton, BackButton, GoalButton, InputGroup, AchievementRow,
  CheckIcon, AvatarUploadWrapper, HiddenFileInput, UploadButton, Divider, SectionTitle, FormColumn
} from './Profile.styled';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('main');

  const [user, setUser] = useState({
    name: "Завантаження...",
    email: "",
    avatar: null,
    level: "Новачок",
    progress: 25,
    currentGoal: "Фінансова грамотність"
  });

  const [editFormData, setEditFormData] = useState(user);

  // Завантаження даних з бази
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.warn("Немає токена. Користувач не авторизований.");
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/Users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(prev => ({
            ...prev,
            name: data.name || "Без імені",
            email: data.email || ""
          }));
        }
      } catch (error) {
        console.error("Помилка завантаження профілю:", error);
      }
    };

    fetchUserData();
  }, []);

  // Словник: Мета -> Список рекомендацій
  const goalRecommendations = {
    "Фінансова грамотність": [
      "Склади персональний бюджет",
      "Створи регулярну оплату рахунків",
      "Створи фінансову подушку безпеки"
    ],
    "Енергоефективність": [
      "Заміни лампочки на енергоощадні (LED)",
      "Вимикай прилади з розеток на ніч",
      "Встанови терморегулятори на батареї"
    ],
    "Без боргів": [
      "Склади список усіх заборгованостей",
      "Налаштуй автоплатежі для кредитів",
      "Відмовся від непотрібних підписок"
    ]
  };

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditFormData({ ...editFormData, avatar: imageUrl });
    }
  };

  const handleSaveProfile = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/Users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          name: editFormData.name
        })
      });

      if (response.ok) {
        setUser({
          ...user,
          name: editFormData.name,
          avatar: editFormData.avatar
        });
        alert("Дані успішно збережено!");
        goBack();
      } else {
        alert("Не вдалося зберегти зміни на сервері.");
      }
    } catch (error) {
      console.error("Помилка збереження:", error);
      alert("Немає зв'язку з сервером.");
    }
  };

  const handleChangeGoal = (newGoal) => {
    setUser({ ...user, currentGoal: newGoal });
    goBack();
  };

  useEffect(() => {
    setEditFormData(user);
  }, [user]);

  return (
    <ProfileWrapper>
      
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
                  <UserName>{user.name}</UserName>
                  <EditButton 
                    aria-label="Редагувати" 
                    onClick={() => {
                      setEditFormData(user);
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
                {/* Динамічний вивід рекомендацій з нашого словника */}
                {goalRecommendations[user.currentGoal]?.map((rec, index) => (
                  <ListItem key={index}>{rec}</ListItem>
                ))}
              </List>
            </ContentCard>

            <ContentCard style={{ gridColumn: '1 / -1' }}> 
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <CardHeader>
                    <CardTitle>Поточна мета: «{user.currentGoal}»</CardTitle>
                    <FiTarget size={24} />
                  </CardHeader>
                  <List>
                    {/* Динамічний вивід рекомендацій для мети */}
                    {goalRecommendations[user.currentGoal]?.map((rec, index) => (
                      <ListItem key={index}>{rec}</ListItem>
                    ))}
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
                <input 
                  type="text" 
                  value={editFormData.name} 
                  onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} 
                />
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

              <ActionButton onClick={handleSaveProfile} style={{ marginTop: '16px' }}>
                Зберегти зміни
              </ActionButton>

            </FormColumn>
          </ContentCard>
        </>
      )}

    </ProfileWrapper>
  );
}