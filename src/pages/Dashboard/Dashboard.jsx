import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFire } from "react-icons/fa6";

import heroImage1 from "../../assets/images/hero-image-1.webp";
import card1 from "../../assets/images/hero-card-1.webp";
import card2 from "../../assets/images/hero-card-2.webp";
import card3 from "../../assets/images/hero-card-3.webp";

import {
  DashboardPage,
  DashboardContainer,
  DashboardTitle,
  ProgressLabel,
  ProgressRow,
  ProgressBar,
  ProgressFill,
  ProgressPercent,
  SubTitle,
  Description,
  ScenarioCard,
  ScenarioLeft,
  ScenarioRight,
  ScenarioTitle,
  ScenarioText,
  ButtonsRow,
  PrimaryButton,
  SecondaryButton,
  CardsRow,
  MiniCard,
  MiniCardImage,
  MiniCardTitle,
  MiniCardText,
  MiniCardButton,
  MiniCardButtonDark,
} from "./DashboardPage.styled";

import { useAuth } from "../../context/AuthContext.jsx";
import { budgetContentApi } from "../../api/budgetContent";
import { legalContentApi } from "../../api/legalContent";
import { dashboardApi } from "../../api/payments";

/* -------------------- Progress helpers (як у профілі) -------------------- */

const LS_BUDGET_PROGRESS_KEY = "lumen.progress.budget";
const LS_LEGAL_PROGRESS_KEY = "lumen.progress.legal";
const LS_ENERGY_PROGRESS_KEY = "lumen.progress.energy";
const LS_ACHIEVEMENTS_KEY = "lumen.achievements";

const ENERGY_SECTION_ACHIEVEMENT_ID = "energy_energy_saving";
const ENERGY_TOPICS = ["lighting", "heating", "appliances", "water", "smart-home"];

const BUDGET_SIM_TO_ACH = {
  readBillSim: "budget_read_bill",
  readIndicatorsSim: "budget_calculate_indicators",
  billDetectiveSim: "budget_why_different_sums",
  whatIfSim: "budget_forecast_calculator",
};

const LEGAL_SIM_TO_ACH = {
  landlordRightsSim: "legal_landlord_rights",
  debtsSim: "legal_debts_penalty",
  repairsGameSim: "legal_repairs_game",
};

function safeParseJson(str, fallback) {
  try {
    const v = JSON.parse(str);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function scopedKey(base, user) {
  const suffix = user?.id ?? user?.email ?? "guest";
  return `${base}:${suffix}`;
}

function readProgressFromLS(key) {
  const raw = localStorage.getItem(key);
  return safeParseJson(raw, { sims: {} });
}

function readEnergyProgressFromLS(key) {
  const raw = localStorage.getItem(key);
  return safeParseJson(raw, { topics: {} });
}

function isEnergySectionCompleted(energyLsKey) {
  const data = readEnergyProgressFromLS(energyLsKey);
  const topics = data?.topics || {};
  return ENERGY_TOPICS.every((id) => Boolean(topics?.[id]?.visited));
}

function getCompletedAchievementsFromLS(lsKey, map) {
  const data = readProgressFromLS(lsKey);
  const sims = data?.sims || {};
  const done = new Set();

  Object.entries(map).forEach(([simId, achKey]) => {
    const completed = Boolean(sims?.[simId]?.completed);
    if (completed) done.add(achKey);
  });

  return done;
}

function readAchievementsFromLS(achLsKey) {
  const raw = localStorage.getItem(achLsKey);
  const parsed = safeParseJson(raw, null);

  if (Array.isArray(parsed)) {
    return new Set(
      parsed
        .filter((a) => Boolean(a?.done))
        .map((a) => a?.id)
        .filter(Boolean)
    );
  }

  if (parsed && typeof parsed === "object") {
    const items = parsed.items && typeof parsed.items === "object" ? parsed.items : parsed;
    return new Set(Object.keys(items || {}).filter((k) => Boolean(items?.[k]?.done)));
  }

  return new Set();
}

/* ------------------------------------------------------------------------ */

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  // ✅ scoped keys
  const budgetLsKey = useMemo(() => scopedKey(LS_BUDGET_PROGRESS_KEY, user), [user]);
  const legalLsKey = useMemo(() => scopedKey(LS_LEGAL_PROGRESS_KEY, user), [user]);
  const energyLsKey = useMemo(() => scopedKey(LS_ENERGY_PROGRESS_KEY, user), [user]);
  const achLsKey = useMemo(() => scopedKey(LS_ACHIEVEMENTS_KEY, user), [user]);

  useEffect(() => {
    const prev = getComputedStyle(document.documentElement)
      .getPropertyValue("--app-bg")
      ?.trim();

    document.documentElement.style.setProperty("--app-bg", "#F4A629");

    return () => {
      document.documentElement.style.setProperty("--app-bg", prev || "#F4F3EE");
    };
  }, []);

  const goToSimulations = () => navigate("/simulations");
  const goToEnergy = () => navigate("/energy");
  const goToPayments = () => navigate("/payments");

  // --- бекові дані (як у профілі) ---
  const [dashboardData, setDashboardData] = useState({
    approvedCount: 0,
    level: "",
  });

  const [completedBudgetSims, setCompletedBudgetSims] = useState([]);
  const [completedLegalSims, setCompletedLegalSims] = useState([]);

  useEffect(() => {
    let alive = true;

    async function loadAll() {
      try {
        if (!token) return;

        // payments stats
        try {
          const d = await dashboardApi.get(token);
          if (alive) {
            setDashboardData({
              approvedCount: d?.approvedCount || 0,
              level: d?.level || "",
            });
          }
        } catch (_) {}

        // budget completed
        try {
          const res = await budgetContentApi.get(token);
          const raw =
            res?.completedSimulationsJson ??
            res?.CompletedSimulationsJson ??
            "[]";

          const parsed = JSON.parse(raw);
          if (alive) setCompletedBudgetSims(Array.isArray(parsed) ? parsed : []);
        } catch (_) {
          if (alive) setCompletedBudgetSims([]);
        }

        // legal completed
        try {
          const res = await legalContentApi.get(token);
          const raw =
            res?.completedSimulationsJson ??
            res?.CompletedSimulationsJson ??
            "[]";

          const parsed = JSON.parse(raw);
          if (alive) setCompletedLegalSims(Array.isArray(parsed) ? parsed : []);
        } catch (_) {
          if (alive) setCompletedLegalSims([]);
        }
      } finally {
        // nothing
      }
    }

    loadAll();

    return () => {
      alive = false;
    };
  }, [token]);

  // --- LS дані (щоб прогрес оновлювався миттєво) ---
  const [completedFromLS, setCompletedFromLS] = useState(() => {
    const s = new Set();

    getCompletedAchievementsFromLS(budgetLsKey, BUDGET_SIM_TO_ACH).forEach((k) => s.add(k));
    getCompletedAchievementsFromLS(legalLsKey, LEGAL_SIM_TO_ACH).forEach((k) => s.add(k));

    // achievements + energy section
    readAchievementsFromLS(achLsKey).forEach((k) => s.add(k));
    if (isEnergySectionCompleted(energyLsKey)) s.add(ENERGY_SECTION_ACHIEVEMENT_ID);

    return Array.from(s);
  });

  useEffect(() => {
    const syncFromLS = () => {
      const s = new Set();

      getCompletedAchievementsFromLS(budgetLsKey, BUDGET_SIM_TO_ACH).forEach((k) => s.add(k));
      getCompletedAchievementsFromLS(legalLsKey, LEGAL_SIM_TO_ACH).forEach((k) => s.add(k));

      readAchievementsFromLS(achLsKey).forEach((k) => s.add(k));
      if (isEnergySectionCompleted(energyLsKey)) s.add(ENERGY_SECTION_ACHIEVEMENT_ID);

      setCompletedFromLS(Array.from(s));
    };

    const onCustom = () => syncFromLS();
    const onStorage = (e) => {
      if (e.key === budgetLsKey || e.key === legalLsKey || e.key === energyLsKey || e.key === achLsKey) {
        syncFromLS();
      }
    };

    window.addEventListener("lumen:progress-updated", onCustom);
    window.addEventListener("lumen:achievements-updated", onCustom);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("lumen:progress-updated", onCustom);
      window.removeEventListener("lumen:achievements-updated", onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, [budgetLsKey, legalLsKey, energyLsKey, achLsKey]);

  // --- об’єднуємо completed з бек+LS ---
  const completedSet = useMemo(() => {
    const s = new Set();

    completedBudgetSims.forEach((k) => s.add(k));
    completedLegalSims.forEach((k) => s.add(k));
    completedFromLS.forEach((k) => s.add(k));

    return s;
  }, [completedBudgetSims, completedLegalSims, completedFromLS]);

  // --- achievementsData як у профілі (щоб % збігався 1-в-1) ---
  const achievementsData = useMemo(
    () => [
      { key: "master_all", title: "Майстер Побуту", desc: "Пройти всі симуляції", done: false },
      { key: "easy_5", title: "Легкий на Підйом", desc: "Пройти 5 симуляцій легкого рівня", done: false },
      { key: "mid_5", title: "Захисник Комфорту", desc: "Пройти 5 симуляцій середнього рівня", done: false },

      // Budget
      { key: "budget_read_bill", title: "Як читати платіжку", desc: "Пройти симуляцію читання платіжки", done: completedSet.has("budget_read_bill") },
      { key: "budget_calculate_indicators", title: "Як рахуються показники", desc: "Пройти симуляцію розрахунку показників", done: completedSet.has("budget_calculate_indicators") },
      { key: "budget_why_different_sums", title: "Чому приходять різні суми", desc: "Пройти симуляцію пошуку причин різниці сум", done: completedSet.has("budget_why_different_sums") },
      { key: "budget_forecast_calculator", title: "Калькулятор прогнозу витрат", desc: "Пройти симуляцію прогнозування витрат", done: completedSet.has("budget_forecast_calculator") },

      // Legal
      { key: "legal_landlord_rights", title: "Права власника", desc: "Пройти тест (50%+)", done: completedSet.has("legal_landlord_rights") },
      { key: "legal_debts_penalty", title: "Борги та пеня", desc: "Успішно пройти симуляцію", done: completedSet.has("legal_debts_penalty") },
      { key: "legal_repairs_game", title: "Хто що ремонтує", desc: "Пройти гру (50%+)", done: completedSet.has("legal_repairs_game") },

      // ✅ Energy (додаємо — це і є причина різного %)
      {
        key: ENERGY_SECTION_ACHIEVEMENT_ID,
        title: "Енергоефективність: усе пройдено",
        desc: "Відвідати всі підрозділи енергоефективності",
        done: completedSet.has(ENERGY_SECTION_ACHIEVEMENT_ID),
      },

      { key: "tips_10", title: "Побутовий Філософ", desc: "Переглянути 10 порад", done: false },
      { key: "eco_all", title: "Еко-Гуру", desc: "Прочитати всі поради в розділі економії", done: false },

      { key: "first_payment", title: "Перша сплата", desc: "Ви зробили свою першу оплату в системі", done: dashboardData.approvedCount >= 1 },
      { key: "payment_master", title: "Майстер платежів", desc: "5 успішних оплат", done: dashboardData.approvedCount >= 5 },
      { key: "level_pro", title: "Досвідчений користувач", desc: "Досягнуто рівня Легенда ЖКГ", done: dashboardData.approvedCount >= 10 },

      { key: "profile_filled", title: "Я у домі!", desc: "Заповнити профіль", done: true },
    ],
    [completedSet, dashboardData]
  );

  const achievementsReceived = achievementsData.filter((a) => a.done).length;

  const progress = useMemo(() => {
    if (achievementsData.length <= 0) return 0;
    const percent = (achievementsReceived / achievementsData.length) * 100;
    return Math.round(percent);
  }, [achievementsReceived, achievementsData.length]);

  return (
    <DashboardPage>
      <DashboardContainer>
        <DashboardTitle>Welcome back, {user?.name || "User"} !</DashboardTitle>

        <ProgressLabel as="p">
          <FaFire aria-hidden="true" focusable="false" />
          <span>Запальний прогрес: {progress}%</span>
        </ProgressLabel>

        <ProgressRow>
          <ProgressBar
            role="progressbar"
            aria-label="Запальний прогрес"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <ProgressFill style={{ width: `${progress}%` }} />
          </ProgressBar>

          <ProgressPercent aria-label={`Поточний прогрес ${progress}%`}>
            {progress}%
          </ProgressPercent>
        </ProgressRow>

        <SubTitle as="h2">Твоя платформа для дорослого життя.</SubTitle>
        <Description>
          Навчись оплачувати рахунки, економити та вирішувати побутові проблеми — без стресу.
        </Description>

        <ScenarioCard aria-labelledby="scenario-of-day-title">
          <ScenarioLeft>
            <ScenarioTitle id="scenario-of-day-title">Сценарій дня:</ScenarioTitle>
            <ScenarioText>
              <b>“Ти забув передати показники”</b>
              <br />
              Уяви, що ти місяць не передавав показники за світло. Що станеться з рахунком?
              Чи буде перерахунок? Чи нарахують пеню?
            </ScenarioText>

            <ButtonsRow>
              <PrimaryButton type="button" onClick={goToSimulations}>
                Запустити симуляцію
              </PrimaryButton>
              <SecondaryButton type="button" onClick={goToPayments}>
                Перейти до оплат
              </SecondaryButton>
            </ButtonsRow>
          </ScenarioLeft>

          <ScenarioRight>
            <img
              src={heroImage1}
              alt="Hero illustration"
              style={{ width: "100%", height: "auto" }}
            />
          </ScenarioRight>
        </ScenarioCard>

        <CardsRow>
          <MiniCard>
            <MiniCardImage src={card1} alt="card 1" />
            <MiniCardTitle>Симуляції</MiniCardTitle>
            <MiniCardText>Тренуйся на реальних побутових сценаріях.</MiniCardText>
            <MiniCardButton type="button" onClick={goToSimulations}>
              Перейти
            </MiniCardButton>
          </MiniCard>

          <MiniCard>
            <MiniCardImage src={card2} alt="card 2" />
            <MiniCardTitle>Енергія</MiniCardTitle>
            <MiniCardText>Дізнайся, як економити ресурси щодня.</MiniCardText>
            <MiniCardButtonDark type="button" onClick={goToEnergy}>
              Перейти
            </MiniCardButtonDark>
          </MiniCard>

          <MiniCard>
            <MiniCardImage src={card3} alt="card 3" />
            <MiniCardTitle>Оплати</MiniCardTitle>
            <MiniCardText>Зручно керуй платежами і шаблонами.</MiniCardText>
            <MiniCardButton type="button" onClick={goToPayments}>
              Перейти
            </MiniCardButton>
          </MiniCard>
        </CardsRow>
      </DashboardContainer>
    </DashboardPage>
  );
}