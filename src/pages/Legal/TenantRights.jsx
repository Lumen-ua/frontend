import React from 'react';
import { useNavigate } from 'react-router-dom';
// Імпорт іконок
import { FiShield, FiTool, FiRefreshCw, FiArrowRight } from "react-icons/fi";
// Імпорт маскота (заміни шлях на реальний, коли буде картинка)
// import mosquitoImg from '../../assets/images/mosquito.webp'; 

import {
  TenantWrapper,
  TenantHeader,
  HeaderTitle,
  ExitButton,
  TenantMain,
  PageTitle,
  ContentGrid,
  InfoSection,
  InfoBlock,
  BlockHeader,
  BlockTitle,
  BlockText,
  MascotWrapper,
  NextButton
} from './TenantRights.styled';

const TenantRights = () => {
  const navigate = useNavigate();

  // ІМІТАЦІЯ БЕКЕНДУ: Дані винесені окремо. 
  // В майбутньому цей масив приходитиме через API.
  const rightsData = [
    {
      id: 1,
      title: "Право на спокій і приватність",
      icon: <FiShield size={24} color="#E69500" />,
      content: (
        <ul>
          <li><strong>Твій дім — твоя фортеця:</strong> Коли ти орендуєш квартиру, вона стає твоїм приватним простором. Власник не може просто так заходити.</li>
          <li><strong>Правило стуку:</strong> Якщо власникові потрібно зайти, він має тебе попередити заздалегідь.</li>
        </ul>
      )
    },
    {
      id: 2,
      title: "Право на житло, яке працює",
      icon: <FiTool size={24} color="#E69500" />,
      content: (
        <ul>
          <li><strong>Все має бути цілим:</strong> Ти маєш право жити в квартирі, де світло горить, вода тече, а вікна зачиняються.</li>
          <li><strong>Хто платить за поломки:</strong> Якщо щось ламається саме по собі (труба, холодильник від старості), ремонт оплачує власник.</li>
        </ul>
      )
    },
    {
      id: 3,
      title: "Право на угоду (Договір)",
      icon: <FiRefreshCw size={24} color="#E69500" />,
      content: (
        <ul>
          <li><strong>Договір — твій захист:</strong> Це документ, де записані всі правила: скільки платити, на скільки заселяєшся.</li>
          <li><strong>Читай договір!</strong> Перш ніж підписати, уважно прочитай умови.</li>
        </ul>
      )
    }
  ];

  return (
    <TenantWrapper>
      {/* Шапка */}
      <TenantHeader>
        <HeaderTitle>Права споживачів</HeaderTitle>
        <ExitButton onClick={() => navigate('/legal')}>
           Вихід <FiArrowRight />
        </ExitButton>
      </TenantHeader>

      <TenantMain>
        <PageTitle>Ваші права як орендаря</PageTitle>

        <ContentGrid>
          {/* Ліва частина: Текст з масиву */}
          <InfoSection>
            {rightsData.map((item) => (
              <InfoBlock key={item.id}>
                <BlockHeader>
                  {item.icon}
                  <BlockTitle>{item.title}</BlockTitle>
                </BlockHeader>
                <BlockText>
                  {item.content}
                </BlockText>
              </InfoBlock>
            ))}
            
            <NextButton>Наступний розділ</NextButton>
          </InfoSection>

          {/* Права частина: Маскот */}
          <MascotWrapper>
            {/* Поки картинки немає, буде заглушка або alt текст */}
            {/* <img src={mosquitoImg} alt="Маскот комар у худі" /> */}
            <div style={{width: '300px', height: '400px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px'}}>
              Тут буде картинка комара
            </div>
          </MascotWrapper>
        </ContentGrid>
      </TenantMain>
    </TenantWrapper>
  );
};

export default TenantRights;