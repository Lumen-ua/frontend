import React from 'react';
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
        
        <LegalCard>
          <MdTabletMac size={40} color="#333" />
          <LegalCardTitle>Права орендаря</LegalCardTitle>
        </LegalCard>

        <LegalCard>
          <FiSearch size={40} color="#333" />
          <LegalCardTitle>Права власника</LegalCardTitle>
        </LegalCard>

        <LegalCard>
          <FaKeyboard size={40} color="#333" />
          <LegalCardTitle>Борги та пеня</LegalCardTitle>
        </LegalCard>

        <LegalCard>
          <MdHelpOutline size={40} color="#333" />
          <LegalCardTitle>Норми споживання</LegalCardTitle>
        </LegalCard>

        <LegalCard>
          <FiStar size={40} color="#333" />
          <LegalCardTitle>Кому що належить ремонтувати</LegalCardTitle>
        </LegalCard>

        <LegalCard>
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
