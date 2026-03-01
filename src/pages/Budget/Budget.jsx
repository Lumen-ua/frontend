import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiFileText,
  FiActivity,
  FiTrendingUp,
  FiCreditCard,
  FiCalendar,
} from "react-icons/fi";
import { FaCalculator } from "react-icons/fa";

import {
  BudgetPage,
  BudgetContainer,
  BudgetHero,
  BudgetHeroText,
  BudgetHeroTitle,
  BudgetHeroDescription,
  BudgetHeroIllustrationWrapper,
  BudgetProgressBadge,
  BudgetTopicsGrid,
  BudgetTopicCard,
  BudgetTopicIcon,
  BudgetTopicTitle,
  BudgetTopicText,
} from "./BudgetPage.styled";

import economyData from "../../mocks/economyData.json";
import { useAuth } from "../../context/AuthContext.jsx";
import { budgetContentApi } from "../../api/budgetContent";

function BudgetHeroIllustration() {
  return (
    <svg width="132" height="88" viewBox="0 0 132 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="68" height="72" rx="10" fill="#FFF" stroke="#111" strokeWidth="2" />
      <path d="M26 28H58" stroke="#111" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 40H58" stroke="#111" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 52H50" stroke="#111" strokeWidth="2" strokeLinecap="round" />
      <circle cx="96" cy="54" r="22" fill="#FFC94A" stroke="#111" strokeWidth="2" />
      <path d="M98.5 41.5C93.9 41.5 90.7 44 90.7 47.5C90.7 51.3 94.3 52.9 98.1 53.8C101.9 54.7 105.3 55.2 105.3 58.2C105.3 60.7 103 62.4 99.3 62.4C96 62.4 93.6 61.2 91.3 58.7" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M98.8 39V66" stroke="#111" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Budget() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [data, setData] = useState(null);
  const [completedKeys, setCompletedKeys] = useState([]);

  useEffect(() => {
    setData(economyData.budget);
  }, []);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const res = await budgetContentApi.get(token);
        const parsed = JSON.parse(res?.completedSimulationsJson ?? "[]");
        setCompletedKeys(Array.isArray(parsed) ? parsed : []);
      } catch (err) {
        console.error(err);
        setCompletedKeys([]);
      }
    };

    if (token) loadProgress();
  }, [token]);

  const topics = useMemo(
    () => [
      {
        id: "read-bill",
        completeKey: "budget_read_bill",
        title: "Як читати платіжку",
        text: "Структура, тарифікація, пеня",
        Icon: FiFileText,
        path: "/budget/read-bill",
      },
      {
        id: "read-indicators",
        completeKey: "budget_read_indicators",
        title: "Як рахуються показники",
        text: "Одноставковий чи двоставковий тариф",
        Icon: FiActivity,
        path: "/budget/read-indicators",
      },
      {
        id: "final-sum",
        completeKey: "budget_final_sum",
        title: "Формується кінцева сума",
        text: "Період, прогнозовані витрати",
        Icon: FiTrendingUp,
        path: "/budget/final-sum",
      },
      {
        id: "why-different-sums",
        completeKey: "budget_why_different_sums",
        title: "Чому приходять різні суми",
        text: "Абонплата, несподівані рядки",
        Icon: FiCreditCard,
        path: "/budget/why-different-sums",
      },
      {
        id: "forecast-calculator",
        completeKey: "budget_forecast_calculator",
        title: "Калькулятор прогнозу",
        text: "Що буде, якщо…",
        Icon: FaCalculator,
        path: "/budget/forecast-calculator",
      },
      {
        id: "monthly-budgeting",
        completeKey: "budget_monthly_budgeting",
        title: "Місячне бюджетування",
        text: "Як спланувати витрати на місяць",
        Icon: FiCalendar,
        path: "/budget/monthly-budgeting",
      },
    ],
    []
  );

  const topicKeys = topics.map((t) => t.completeKey);
  const completedTopicsCount = completedKeys.filter((k) => topicKeys.includes(k))
    .length;

  const totalSteps = topics.length;
  const progress = totalSteps
    ? Math.round((completedTopicsCount / totalSteps) * 100)
    : 0;

  const onOpenTopic = async (topic) => {
    if (!topic?.path) return;

    
    if (token && topic.completeKey && !completedKeys.includes(topic.completeKey)) {
      const next = [...completedKeys, topic.completeKey];
      setCompletedKeys(next);

      try {
        await budgetContentApi.complete(token, topic.completeKey);
      } catch (_) {
      }
    }

    navigate(topic.path);
  };

  if (!data) return <div>Завантаження даних...</div>;

  return (
    <BudgetPage>
      <BudgetContainer>
        <BudgetHero aria-label="Бюджет та рахунки">
          <BudgetHeroText>
            <BudgetHeroTitle>
              Бюджет
            </BudgetHeroTitle>
            <BudgetHeroDescription>
              Тут ти навчишся розуміти свої платіжки, читати тарифи та
              прогнозувати витрати.
            </BudgetHeroDescription>
          </BudgetHeroText>

          <BudgetHeroIllustrationWrapper>
            <BudgetHeroIllustration />
          </BudgetHeroIllustrationWrapper>

          <BudgetProgressBadge>Прогрес {progress}%</BudgetProgressBadge>
        </BudgetHero>

        <BudgetTopicsGrid>
          {topics.map((topic) => (
            <BudgetTopicCard
              type="button"
              key={topic.id}
              onClick={() => onOpenTopic(topic)}
            >
              <BudgetTopicIcon as={topic.Icon} />
              <div>
                <BudgetTopicTitle>{topic.title}</BudgetTopicTitle>
                <BudgetTopicText>{topic.text}</BudgetTopicText>
              </div>
            </BudgetTopicCard>
          ))}
        </BudgetTopicsGrid>
      </BudgetContainer>
    </BudgetPage>
  );
}