import { useEffect, useState } from "react";
import { repairsApi } from "../../api/repairsApi";

import TemplatesSection from "./sections/Templates";
import CheckListsSection from "./sections/Checklists";
import ProblemsSection from "./sections/Problems";
import ContactsSection from "./sections/Contacts";
import SafetySection from "./sections/Safety"
import ElectricianSection from "./sections/Elecrtician";
import MaintenanceSection from "./sections/Maintenance";
import EmergencySection from "./sections/Emergency";

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
  PageTitle,
  ProgressBadge,
  AnimatedSection
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
  { id: "emergency", title: "Тривожна валіза на крайній випадок" },
];

export default function Repairs() {
  const [activeTopic, setActiveTopic] = useState("home");
  const [checkedTopics, setCheckedTopics] = useState([]);

  const token = localStorage.getItem("lumen_token");

  //завантаження прогресу із сервера
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await repairsApi.getAll(token);

        setCheckedTopics(JSON.parse(data.completedTopicsJson));
      } catch (err) {
        console.error(err);
      }
    };

    if (token) loadData();
  }, [token]);

  const handleChange = async (topicId) => {
    setActiveTopic(topicId); // перехід на обраний розділ

    // відслідковування прогресу
    if (topicId !== "home" && !checkedTopics.includes(topicId)) {
      const newTopics = [...checkedTopics, topicId];
      setCheckedTopics(newTopics);

      // збереження прогресу на сервер
      if (token) {
        await repairsApi.saveProgress(
          { completedTopicsJson: JSON.stringify(newTopics) },
          token
        ).catch(() => null);
      }
    }
  };

  const totalSteps = topics.length - 1;
  const progress = Math.round((checkedTopics.length / totalSteps) * 100);
  
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

        <ProgressBadge>Прогрес {progress}%</ProgressBadge>

        {activeTopic === "home" && (
          <>
            <CardsGrid>
              <InfoCard onClick={() => handleChange("problems")}>
                <InfoIcon><FaBolt /></InfoIcon>
                <InfoTitle>Типові проблеми</InfoTitle>
                <InfoText>Світло, газ, вода</InfoText>
              </InfoCard>

              <InfoCard onClick={() => handleChange("contacts")}>
                <InfoIcon><FaBuilding /></InfoIcon>
                <InfoTitle>Куди звертатися</InfoTitle>
                <InfoText>ОСББ, орендодавець, аварійна служба, постачальники</InfoText>
              </InfoCard>

              <InfoCard onClick={() => handleChange("templates")}>
                <InfoIcon><FaEnvelope /></InfoIcon>
                <InfoTitle>Приклади текстів звернень</InfoTitle>
                <InfoText>Готові шаблони: електрика, скарги і т.д.</InfoText>
              </InfoCard>

              <InfoCard onClick={() => handleChange("safety")}>
                <InfoIcon><FaExclamationTriangle /></InfoIcon>
                <InfoTitle>Інструкції з безпеки</InfoTitle>
                <InfoText>Як максимально уникнути побутових проблем</InfoText>
              </InfoCard>
            </CardsGrid>

            <MaterialsCard>
              <InfoTitle>Корисні матеріали</InfoTitle>
              <MaterialsList>
                <MaterialItem onClick={() => handleChange("checklist")}>
                  <FaFileAlt /> Чеклист перевірки квартири
                </MaterialItem>
                <MaterialItem onClick={() => handleChange("maintenance")}>
                  <FaUserAlt /> Профілактика по дому
                </MaterialItem>
                <MaterialItem onClick={() => handleChange("electrician")}>
                  <FaHammer /> Коли потрібен майстер
                </MaterialItem>
                <MaterialItem onClick={() => handleChange("emergency")}>
                  <FaPhoneAlt /> Збери тривожну валізу
                </MaterialItem>
              </MaterialsList>
            </MaterialsCard>
          </>
        )}

        {activeTopic !== "home" && (
          <BackButton onClick={() => handleChange("home")}>
            ← Назад
          </BackButton>
        )}

        {activeTopic !== "home" && (
          <>
            <PageTitle>
              {topics.find(t => t.id === activeTopic)?.title}
            </PageTitle>

            {activeTopic === "problems" && <AnimatedSection><ProblemsSection /></AnimatedSection>}

            {activeTopic === "contacts" && <AnimatedSection><ContactsSection /></AnimatedSection>}

            {activeTopic === "templates" && <AnimatedSection><TemplatesSection /></AnimatedSection>}

            {activeTopic === "safety" && <AnimatedSection><SafetySection /></AnimatedSection>}

            {activeTopic === "checklist" && <AnimatedSection><CheckListsSection /></AnimatedSection>}

            {activeTopic === "maintenance" && <AnimatedSection><MaintenanceSection /></AnimatedSection>}

            {activeTopic === "electrician" && <AnimatedSection><ElectricianSection /></AnimatedSection>}

            {activeTopic === "emergency" && <AnimatedSection><EmergencySection /></AnimatedSection>}
          </>
        )}

      </RepairsContainer>
    </RepairsPage>
  );
}
