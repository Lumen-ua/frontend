import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiFileText,
  FiActivity,
  FiTrendingUp,
  FiCreditCard,
  FiCalendar,
} from "react-icons/fi";

import {
  FaCalculator,
} from "react-icons/fa";

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

function BudgetHeroIllustration() {
  return (
    <svg
      width="132"
      height="88"
      viewBox="0 0 132 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ілюстрація: квитанція та монета"
    >
      <rect x="8" y="10" width="68" height="72" rx="10" fill="#FFF" stroke="#111" strokeWidth="2" />
      <path d="M26 28H58" stroke="#111" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 40H58" stroke="#111" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 52H50" stroke="#111" strokeWidth="2" strokeLinecap="round" />

      <circle cx="96" cy="54" r="22" fill="#FFC94A" stroke="#111" strokeWidth="2" />
      <path
        d="M98.5 41.5C93.9 41.5 90.7 44 90.7 47.5C90.7 51.3 94.3 52.9 98.1 53.8C101.9 54.7 105.3 55.2 105.3 58.2C105.3 60.7 103 62.4 99.3 62.4C96 62.4 93.6 61.2 91.3 58.7"
        stroke="#111"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M98.8 39V66" stroke="#111" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Budget() {
  const navigate = useNavigate();
  const progress = 25;

  const topics = [
    {
      title: "Як читати платіжку",
      text: "Структура, тарифікація, пеня",
      Icon: FiFileText,
      path: "/budget/read-bill", // ✅ NEW
    },
    {
      title: "Як рахуються показники",
      text: "Одноставковий чи двоставковий тариф, денний, нічний",
      Icon: FiActivity,
    },
    {
      title: "Формується кінцева сума",
      text: "Період, прогнозовані витрати",
      Icon: FiTrendingUp,
    },
    {
      title: "Чому приходять різні суми",
      text: "Абонплата, несподівані рядки",
      Icon: FiCreditCard,
    },
    {
      title: "Калькулятор прогнозу витрат",
      text: "Що буде, якщо…",
      Icon: FaCalculator,
    },
    {
      title: "Місячне бюджетування",
      text: "Як спланувати витрати на місяць",
      Icon: FiCalendar,
    },
  ];

  return (
    <BudgetPage>
      <BudgetContainer>
        <BudgetHero aria-label="Бюджет та рахунки">
          <BudgetHeroText>
            <BudgetHeroTitle>Бюджет та рахунки</BudgetHeroTitle>
            <BudgetHeroDescription>
              Тут ти навчишся розуміти свої платіжки
              <br />
              читати тарифи та прогнозувати витрати
            </BudgetHeroDescription>
          </BudgetHeroText>

          <BudgetHeroIllustrationWrapper>
            <BudgetHeroIllustration />
          </BudgetHeroIllustrationWrapper>

          <BudgetProgressBadge aria-label={`Прогрес ${progress}%`}>
            Прогрес {progress}%
          </BudgetProgressBadge>
        </BudgetHero>

        <BudgetTopicsGrid aria-label="Теми модуля">
          {topics.map(({ title, text, Icon, path }) => (
            <BudgetTopicCard
              type="button"
              key={title}
              aria-label={title}
              onClick={() => {
                if (path) navigate(path);
              }}
            >
              <BudgetTopicIcon as={Icon} aria-hidden="true" focusable="false" />
              <div>
                <BudgetTopicTitle>{title}</BudgetTopicTitle>
                <BudgetTopicText>{text}</BudgetTopicText>
              </div>
            </BudgetTopicCard>
          ))}
        </BudgetTopicsGrid>
      </BudgetContainer>
    </BudgetPage>
  );
}
