import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiStar, FiLogOut } from "react-icons/fi";
import { MdGavel, MdTabletMac, MdHelpOutline } from "react-icons/md";
import { FaKeyboard } from "react-icons/fa";

import {
  LegalPageWrapper,
  LegalContainer,
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
  LegalMaterialsItem,
} from "./LegalPage.styled";

const LS_LEGAL_PROGRESS_KEY = "lumen.progress.legal";

const LEGAL_SECTIONS = [
  "tenantRights",
  "landlordRights",
  "debts",
  "consumption",
  "repairs",
  "communication",
];

function safeParseJson(str, fallback) {
  try {
    const v = JSON.parse(str);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function readLegalProgressFromLS() {
  const raw = localStorage.getItem(LS_LEGAL_PROGRESS_KEY);
  return safeParseJson(raw, { sims: {}, sections: {} });
}

function markLegalSectionOpened(sectionKey) {
  const raw = localStorage.getItem(LS_LEGAL_PROGRESS_KEY);
  const data = safeParseJson(raw, { sims: {}, sections: {} });

  const next = {
    ...data,
    sections: {
      ...(data.sections || {}),
      [sectionKey]: {
        opened: true,
        openedAt: new Date().toISOString(),
      },
    },
  };

  localStorage.setItem(LS_LEGAL_PROGRESS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("lumen:progress-updated"));
}

function calcLegalProgressPercent() {
  const data = readLegalProgressFromLS();
  const sections = data?.sections || {};
  const openedCount = LEGAL_SECTIONS.filter((k) => Boolean(sections?.[k]?.opened)).length;
  const total = LEGAL_SECTIONS.length || 1;
  return Math.round((openedCount / total) * 100);
}

const Legal = () => {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(() => calcLegalProgressPercent());

  useEffect(() => {
    const sync = () => setProgress(calcLegalProgressPercent());

    const onCustom = () => sync();
    const onStorage = (e) => {
      if (e.key === LS_LEGAL_PROGRESS_KEY) sync();
    };

    window.addEventListener("lumen:progress-updated", onCustom);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("lumen:progress-updated", onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const progressText = useMemo(() => `Прогрес ${progress}%`, [progress]);


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
      <LegalContainer>
        <LegalHeader>
          <LegalHeaderContent>
            <LegalTitle>Правові Аспекти</LegalTitle>
            <LegalDescription>
              Розберися у своїх правах та обов&apos;язках як орендар / власник.
              Дізнайся, хто і що має ремонтувати, як нараховують пеню,
              як правильно оформлювати документи.
            </LegalDescription>
          </LegalHeaderContent>

          <LegalHeaderIconWrapper>
            <MdGavel size={80} />
          </LegalHeaderIconWrapper>

          <LegalProgressBadge>{progressText}</LegalProgressBadge>
        </LegalHeader>

        <LegalGrid>
          <LegalCard onClick={handleTenantClick}>
            <MdTabletMac size={40} color="#333" />
            <LegalCardTitle>Права орендаря</LegalCardTitle>
          </LegalCard>

          <LegalCard onClick={handleLandlordClick}>
            <FiSearch size={40} color="#333" />
            <LegalCardTitle>Права власника</LegalCardTitle>
          </LegalCard>

          <LegalCard onClick={handleDebtsClick}>
            <FaKeyboard size={40} color="#333" />
            <LegalCardTitle>Борги та пеня</LegalCardTitle>
          </LegalCard>

          <LegalCard onClick={handleConsumptionClick}>
            <MdHelpOutline size={40} color="#333" />
            <LegalCardTitle>Норми споживання</LegalCardTitle>
          </LegalCard>

          <LegalCard onClick={handleRepairsClick}>
            <FiStar size={40} color="#333" />
            <LegalCardTitle>Кому що належить ремонтувати</LegalCardTitle>
          </LegalCard>

          <LegalCard onClick={handleCommunicationClick}>
            <FiLogOut size={40} color="#333" />
            <LegalCardTitle>Як вести юридичну комунікацію</LegalCardTitle>
          </LegalCard>
        </LegalGrid>

        <LegalMaterialsSection>
          <LegalMaterialsTitle>Корисні матеріали</LegalMaterialsTitle>
          <LegalMaterialsList>
            <LegalMaterialsItem>Зразки договорів</LegalMaterialsItem>
            <LegalMaterialsItem>Пам&apos;ятка власника</LegalMaterialsItem>
            <LegalMaterialsItem>Пам&apos;ятка орендаря</LegalMaterialsItem>
          </LegalMaterialsList>
        </LegalMaterialsSection>
      </LegalContainer>
    </LegalPageWrapper>
  );
};

export default Legal; 
