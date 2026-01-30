import React from 'react';
import { useNavigate } from 'react-router-dom';
// Імпорт іконок
import { FiSearch, FiStar, FiLogOut } from "react-icons/fi";
import { MdGavel, MdTabletMac, MdHelpOutline } from "react-icons/md";
import { FaKeyboard } from "react-icons/fa";

// Імпорт стилів із файлу .styled.js
import {
  LegalPageWrapper,
  LegalHeader,
  LegalHeaderContent,
  LegalTitle,
  LegalDescription,
  LegalHeaderIconWrapper,
  LegalProgressBadge,
  LegalGrid,
  LegalCard,
  LegalCardTitle,
  LegalMaterialsSection,
  LegalMaterialsTitle,
  LegalMaterialsList,
  LegalMaterialsItem
} from './LegalPage.styled';

const Legal = () => {
  const navigate = useNavigate();

  // --- ФУНКЦІЇ ДЛЯ ПЕРЕХОДУ НА СТОРІНКИ ---
  
  const handleTenantClick = () => {
    navigate('/legal/tenant-rights');
  };

  const handleLandlordClick = () => {
    navigate('/legal/landlord-rights');
  };

  const handleDebtsClick = () => {
    navigate('/legal/debts');
  };

  const handleConsumptionClick = () => {
    navigate('/legal/consumption');
  };

  const handleRepairsClick = () => {
    navigate('/legal/repairs');
  };

  const handleCommunicationClick = () => {
    navigate('/legal/communication');
  };

  return (
    <LegalPageWrapper>
      
      <LegalHeader>
        <LegalHeaderContent>
          <LegalTitle>Правові Аспекти</LegalTitle>
          <LegalDescription>
            Розберися у своїх правах та обов'язках як орендар / власник. 
            Дізнайся, хто і що має ремонтувати, як нараховують пеню, 
            як правильно оформлювати документи.
          </LegalDescription>
        </LegalHeaderContent>
        
        <LegalHeaderIconWrapper>
          <MdGavel size={80} />
        </LegalHeaderIconWrapper>
        
        <LegalProgressBadge>
          Прогрес 0%
        </LegalProgressBadge>
      </LegalHeader>

      <LegalGrid>
        
        {/* 1. Права орендаря */}
        <LegalCard onClick={handleTenantClick}>
          <MdTabletMac size={40} color="#333" />
          <LegalCardTitle>Права орендаря</LegalCardTitle>
        </LegalCard>

        {/* 2. Права власника */}
        <LegalCard onClick={handleLandlordClick}>
          <FiSearch size={40} color="#333" />
          <LegalCardTitle>Права власника</LegalCardTitle>
        </LegalCard>

        {/* 3. Борги та пеня */}
        <LegalCard onClick={handleDebtsClick}>
          <FaKeyboard size={40} color="#333" />
          <LegalCardTitle>Борги та пеня</LegalCardTitle>
        </LegalCard>

        {/* 4. Норми споживання (Калькулятор) */}
        <LegalCard onClick={handleConsumptionClick}>
          <MdHelpOutline size={40} color="#333" />
          <LegalCardTitle>Норми споживання</LegalCardTitle>
        </LegalCard>

        {/* 5. Ремонти (Гра) */}
        <LegalCard onClick={handleRepairsClick}>
          <FiStar size={40} color="#333" />
          <LegalCardTitle>Кому що належить ремонтувати</LegalCardTitle>
        </LegalCard>

        {/* 6. Комунікація (Конструктор) */}
        <LegalCard onClick={handleCommunicationClick}>
          <FiLogOut size={40} color="#333" />
          <LegalCardTitle>Як вести юридичну комунікацію</LegalCardTitle>
        </LegalCard>

      </LegalGrid>

      <LegalMaterialsSection>
        <LegalMaterialsTitle>Корисні матеріали</LegalMaterialsTitle>
        <LegalMaterialsList>
          <LegalMaterialsItem>Зразки договорів</LegalMaterialsItem>
          <LegalMaterialsItem>Пам'ятка власника</LegalMaterialsItem>
          <LegalMaterialsItem>Пам'ятка орендаря</LegalMaterialsItem>
        </LegalMaterialsList>
      </LegalMaterialsSection>

    </LegalPageWrapper>
  );
};

export default Legal; 
