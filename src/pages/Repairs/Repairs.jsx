import { useState } from "react";

import TemplatesSection from "./sections/Templates";
import CheckListsSection from "./sections/Checklists";
import ProblemsSection from "./sections/Problems";
import ContactsSection from "./sections/Contacts";
import SafetySection from "./sections/Safety"
import ElectricianSection from "./sections/Elecrtician";
import MaintenanceSection from "./sections/Maintenance";

import {
  RepairsPage,
  RepairsContainer,
  HeroCard,
  HeroLeft,
  HeroTitle,
  HeroText,
  HeroIcon,
  CardsGrid,
  InfoCard,
  InfoIcon,
  InfoTitle,
  InfoText,
  MaterialsCard,
  MaterialsList,
  MaterialItem,
  BackButton,
  PageTitle
} from "./RepairsPage.styled";

import { FaTools, FaBolt, FaBuilding, FaUserAlt, FaEnvelope, FaExclamationTriangle, FaHammer, FaPhoneAlt, FaFileAlt} from "react-icons/fa";

const topics = [
  { id: "home", title: "Ремонт і звернення" },
  { id: "problems", title: "Типові проблеми" },
  { id: "contacts", title: "Куди звертатися при побутових поломках" },
  { id: "templates", title: "Як написати звернення/скаргу до ЖЕК або ОСББ" },
  { id: "safety", title: "Як максимально уникнути побутових проблем" },
  { id: "checklist", title: "Чеклист перевірки квартири перед орендою" },
  { id: "maintenance", title: "Підтримуй стан квартири, щоб уникнути проблем" },
  { id: "electrician", title: "Коли викликати майстра" },
  { id: "emergency", title: "Аварійна служба" },
];

export default function Repairs() {
  const [activeTopic, setActiveTopic] = useState("home");

  return (
    <RepairsPage>
      <RepairsContainer>

        <HeroCard>
          <HeroLeft>
            <HeroTitle>Ремонт і звернення</HeroTitle>
            <HeroText>
              Дізнайся, що робити при побутових несправностях і кому писати
            </HeroText>
          </HeroLeft>
          <HeroIcon><FaTools /></HeroIcon>
        </HeroCard>

        {activeTopic === "home" && (
          <>
            <CardsGrid>
              <InfoCard onClick={() => setActiveTopic("problems")}>
                <InfoIcon><FaBolt /></InfoIcon>
                <InfoTitle>Типові проблеми</InfoTitle>
                <InfoText>Світло, газ, вода</InfoText>
              </InfoCard>

              <InfoCard onClick={() => setActiveTopic("contacts")}>
                <InfoIcon><FaBuilding /></InfoIcon>
                <InfoTitle>Куди звертатися</InfoTitle>
                <InfoText>ОСББ, орендодавець, аварійна служба, постачальники</InfoText>
              </InfoCard>

              <InfoCard onClick={() => setActiveTopic("templates")}>
                <InfoIcon><FaEnvelope /></InfoIcon>
                <InfoTitle>Приклади текстів звернень</InfoTitle>
                <InfoText>Готові шаблони: електрика, скарги і т.д.</InfoText>
              </InfoCard>

              <InfoCard onClick={() => setActiveTopic("safety")}>
                <InfoIcon><FaExclamationTriangle /></InfoIcon>
                <InfoTitle>Інструкції з безпеки</InfoTitle>
                <InfoText>Як максимально уникнути побутових проблем</InfoText>
              </InfoCard>
            </CardsGrid>

            <MaterialsCard>
              <InfoTitle>Корисні матеріали</InfoTitle>
              <MaterialsList>
                <MaterialItem onClick={() => setActiveTopic("checklist")}>
                  <FaFileAlt /> Чеклист перевірки квартири
                </MaterialItem>
                <MaterialItem onClick={() => setActiveTopic("maintenance")}>
                  <FaUserAlt /> Профілактика по дому
                </MaterialItem>
                <MaterialItem onClick={() => setActiveTopic("electrician")}>
                  <FaHammer /> Коли потрібен майстер
                </MaterialItem>
                <MaterialItem onClick={() => setActiveTopic("emergency")}>
                  <FaPhoneAlt /> Коли викликати аварійну службу
                </MaterialItem>
              </MaterialsList>
            </MaterialsCard>
          </>
        )}

        {activeTopic !== "home" && (
          <BackButton onClick={() => setActiveTopic("home")}>
            ← Назад
          </BackButton>
        )}

        {activeTopic !== "home" && (
          <>
            <PageTitle>
              {topics.find(t => t.id === activeTopic)?.title}
            </PageTitle>

            {activeTopic === "problems" && <ProblemsSection/>}

            {activeTopic === "contacts" && <ContactsSection/>}

            {activeTopic === "templates" && <TemplatesSection/>}

            {activeTopic === "safety" && <SafetySection/>}

            {activeTopic === "checklist" && <CheckListsSection/>}

            {activeTopic === "maintenance" && <MaintenanceSection/>}

            {activeTopic === "electrician" && <ElectricianSection/>}

            {activeTopic === "emergency" && (
              <p>Коли дзвонити в аварійну.</p>
            )}
          </>
        )}

      </RepairsContainer>
    </RepairsPage>
  );
}
