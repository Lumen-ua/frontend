import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMenu,
  FiEdit2,
  FiTarget,
  FiArrowLeft,
  FiAward,
  FiCheck,
  FiArrowRight,
  FiCamera,
} from "react-icons/fi";

import {
  ProfileWrapper,
  ProfileTitle,
  UserHeaderCard,
  UserInfo,
  AvatarPlaceholder,
  UserDetails,
  UserNameRow,
  UserName,
  EditButton,
  UserLevel,
  ProgressSection,
  ProgressLabel,
  ProgressBarContainer,
  ProgressBarFill,
  ProfileGrid,
  ContentCard,
  CardHeader,
  CardTitle,
  List,
  ListItem,
  ActionButton,
  BackButton,
  GoalButton,
  InputGroup,
  AchievementRow,
  CheckIcon,
  AvatarUploadWrapper,
  HiddenFileInput,
  UploadButton,
  Divider,
  SectionTitle,
  FormColumn,
} from "./Profile.styled";

import { useAuth } from "../../context/AuthContext.jsx";
import { resolveAvatarSrc } from "../../utils/avatar";
import { budgetContentApi } from "../../api/budgetContent";
import { legalContentApi } from "../../api/legalContent";
import { dashboardApi } from "../../api/payments";
import { repairsApi } from "../../api/repairsApi";

/* ----------------- LocalStorage keys ----------------- */
/**
 * БАЗОВІ ключі (legacy)
 * (у "його" файлі був тільки budget без scope)
 */
const LS_BUDGET_PROGRESS_KEY = "lumen.progress.budget";
const LS_LEGAL_PROGRESS_KEY = "lumen.progress.legal";
const LS_ENERGY_PROGRESS_KEY = "lumen.progress.energy";
const LS_ACHIEVEMENTS_KEY = "lumen.achievements";

/* ----------------- Achievements maps ----------------- */
const BUDGET_SIM_TO_ACHIEVEMENT_KEY = {
  readBillSim: "budget_read_bill",
  readIndicatorsSim: "budget_calculate_indicators",
  billDetectiveSim: "budget_why_different_sums",
  whatIfSim: "budget_forecast_calculator",
};

const LEGAL_SIM_TO_ACHIEVEMENT_KEY = {
  landlordRightsSim: "legal_landlord_rights",
  debtsSim: "legal_debts_penalty",
  repairsGameSim: "legal_repairs_game",
};

// ✅ Energy section achievement
const ENERGY_SECTION_ACHIEVEMENT_ID = "energy_energy_saving";
const ENERGY_SECTION_ACH_TITLE = "Енергоефективність: усе пройдено";
const ENERGY_TOPICS = ["lighting", "heating", "appliances", "water", "smart-home"];

/* ---------------- helpers ---------------- */

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

/**
 * ✅ читає з scoped ключа, але якщо там порожньо — fallback на legacy ключ
 * щоб нічого не "зникло" після мерджу.
 */
function readFromLSWithFallback(scopedLsKey, legacyLsKey, fallbackValue) {
  const scopedRaw = localStorage.getItem(scopedLsKey);
  if (scopedRaw) return safeParseJson(scopedRaw, fallbackValue);

  const legacyRaw = localStorage.getItem(legacyLsKey);
  if (legacyRaw) return safeParseJson(legacyRaw, fallbackValue);

  return fallbackValue;
}

function getCompletedFromProgressLS(progressObj, map) {
  const sims = progressObj?.sims || {};
  const done = new Set();

  Object.entries(map).forEach(([simId, achievementKey]) => {
    const completed = Boolean(sims?.[simId]?.completed);
    if (completed) done.add(achievementKey);
  });

  return done;
}

function isEnergySectionCompleted(energyProgressObj) {
  const topics = energyProgressObj?.topics || {};
  return ENERGY_TOPICS.every((id) => Boolean(topics?.[id]?.visited));
}

/**
 * Підтримує формати achievements:
 * 1) [{id,title,done}, ...]
 * 2) { items: { key: {done:true}, ... } }
 * 3) { key: {done:true}, ... }
 */
function readAchievementsFromLS(achObjOrRaw) {
  const parsed =
    typeof achObjOrRaw === "string" ? safeParseJson(achObjOrRaw, null) : achObjOrRaw;

  // Array format
  if (Array.isArray(parsed)) {
    return new Set(
      parsed
        .filter((a) => Boolean(a?.done))
        .map((a) => a?.id)
        .filter(Boolean)
    );
  }

  // Object format
  if (parsed && typeof parsed === "object") {
    const items =
      parsed.items && typeof parsed.items === "object" ? parsed.items : parsed;

    return new Set(Object.keys(items || {}).filter((k) => Boolean(items?.[k]?.done)));
  }

  return new Set();
}

/* ---------------------------------------- */

export default function Profile() {
  const [activeTab, setActiveTab] = useState("main");
  const navigate = useNavigate();

  const { user, token, updateProfile, uploadAvatar, logout } = useAuth();

  // ✅ scoped keys під конкретного юзера (твій функціонал)
  const budgetLsKey = useMemo(() => scopedKey(LS_BUDGET_PROGRESS_KEY, user), [user]);
  const legalLsKey = useMemo(() => scopedKey(LS_LEGAL_PROGRESS_KEY, user), [user]);
  const energyLsKey = useMemo(() => scopedKey(LS_ENERGY_PROGRESS_KEY, user), [user]);
  const achLsKey = useMemo(() => scopedKey(LS_ACHIEVEMENTS_KEY, user), [user]);

  const [dashboardData, setDashboardData] = useState({ approvedCount: 0, level: "" });

  const [completedRepairsAchievements, setCompletedRepairsAchievements] = useState([]);
  const [completedBudgetSims, setCompletedBudgetSims] = useState([]);
  const [completedLegalSims, setCompletedLegalSims] = useState([]);

  const goalRecommendations = useMemo(
    () => ({
      "Фінансова грамотність": [
        "Склади персональний бюджет",
        "Створи регулярну оплату рахунків",
        "Створи фінансову подушку безпеки",
      ],
      "Енергоефективність": [
        "Заміни лампочки на енергоощадні (LED)",
        "Вимикай прилади з розеток на ніч",
        "Встанови терморегулятори на батареї",
      ],
      "Без боргів": [
        "Склади список усіх заборгованостей",
        "Налаштуй автоплатежі для кредитів",
        "Відмовся від непотрібних підписок",
      ],
    }),
    []
  );

  const calculateLevel = (progress) => {
    if (progress < 30) return "Новачок";
    if (progress < 70) return "Впевнений користувач";
    return "Майстер Побуту";
  };

  const [meta, setMeta] = useState(() => {
    const savedGoal = localStorage.getItem("lumen_current_goal") || "Фінансова грамотність";
    return {
      level: "Новачок",
      progress: 0,
      currentGoal: savedGoal,
    };
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setEditFormData((prev) => ({ ...prev, name: user?.name || "" }));
  }, [user]);

  /* ------------------- Load from backend ------------------- */

  useEffect(() => {
    let alive = true;

    async function loadBudgetAchievements() {
      try {
        if (!token) return;

        const res = await budgetContentApi.get(token);
        const raw = res?.completedSimulationsJson ?? res?.CompletedSimulationsJson ?? "[]";
        const parsed = JSON.parse(raw);

        if (alive) setCompletedBudgetSims(Array.isArray(parsed) ? parsed : []);
      } catch {
        if (alive) setCompletedBudgetSims([]);
      }
    }

    loadBudgetAchievements();
    return () => {
      alive = false;
    };
  }, [token]);

  useEffect(() => {
    let alive = true;

    async function loadLegalAchievements() {
      try {
        if (!token) return;

        const res = await legalContentApi.get(token);
        const raw = res?.completedSimulationsJson ?? res?.CompletedSimulationsJson ?? "[]";
        const parsed = JSON.parse(raw);

        if (alive) setCompletedLegalSims(Array.isArray(parsed) ? parsed : []);
      } catch {
        if (alive) setCompletedLegalSims([]);
      }
    }

    loadLegalAchievements();
    return () => {
      alive = false;
    };
  }, [token]);

  useEffect(() => {
    async function loadDashboardStats() {
      try {
        if (!token) return;

        const res = await dashboardApi.get(token);
        setDashboardData({
          approvedCount: res.approvedCount || 0,
          level: res.level || "",
        });
      } catch (err) {
        console.error("Помилка завантаження статистики", err);
      }
    }
    loadDashboardStats();
  }, [token]);

  useEffect(() => {
    let alive = true;

    async function loadRepairsAchievements() {
      try {
        if (!token) return;

        const res = await repairsApi.getAll(token);
        const raw = res?.completedAchievementsJson ?? "[]";
        const parsed = JSON.parse(raw);

        if (alive) setCompletedRepairsAchievements(Array.isArray(parsed) ? parsed : []);
      } catch {
        if (alive) setCompletedRepairsAchievements([]);
      }
    }

    loadRepairsAchievements();
    return () => {
      alive = false;
    };
  }, [token]);

  /* ------------------- Load from localStorage (budget + legal + energy + achievements) ------------------- */

  const [completedFromLS, setCompletedFromLS] = useState(() => {
    const s = new Set();

    const budgetProgress = readFromLSWithFallback(
      budgetLsKey,
      LS_BUDGET_PROGRESS_KEY,
      { sims: {} }
    );
    getCompletedFromProgressLS(budgetProgress, BUDGET_SIM_TO_ACHIEVEMENT_KEY).forEach((k) =>
      s.add(k)
    );

    const legalProgress = readFromLSWithFallback(
      legalLsKey,
      LS_LEGAL_PROGRESS_KEY,
      { sims: {} }
    );
    getCompletedFromProgressLS(legalProgress, LEGAL_SIM_TO_ACHIEVEMENT_KEY).forEach((k) =>
      s.add(k)
    );

    const energyProgress = readFromLSWithFallback(
      energyLsKey,
      LS_ENERGY_PROGRESS_KEY,
      { topics: {} }
    );
    if (isEnergySectionCompleted(energyProgress)) s.add(ENERGY_SECTION_ACHIEVEMENT_ID);

    // achievements storage
    const achRaw = localStorage.getItem(achLsKey) ?? localStorage.getItem(LS_ACHIEVEMENTS_KEY);
    readAchievementsFromLS(achRaw).forEach((k) => s.add(k));

    return Array.from(s);
  });

  useEffect(() => {
    const syncFromLS = () => {
      const s = new Set();

      const budgetProgress = readFromLSWithFallback(
        budgetLsKey,
        LS_BUDGET_PROGRESS_KEY,
        { sims: {} }
      );
      getCompletedFromProgressLS(budgetProgress, BUDGET_SIM_TO_ACHIEVEMENT_KEY).forEach((k) =>
        s.add(k)
      );

      const legalProgress = readFromLSWithFallback(
        legalLsKey,
        LS_LEGAL_PROGRESS_KEY,
        { sims: {} }
      );
      getCompletedFromProgressLS(legalProgress, LEGAL_SIM_TO_ACHIEVEMENT_KEY).forEach((k) =>
        s.add(k)
      );

      const energyProgress = readFromLSWithFallback(
        energyLsKey,
        LS_ENERGY_PROGRESS_KEY,
        { topics: {} }
      );
      if (isEnergySectionCompleted(energyProgress)) s.add(ENERGY_SECTION_ACHIEVEMENT_ID);

      const achRaw = localStorage.getItem(achLsKey) ?? localStorage.getItem(LS_ACHIEVEMENTS_KEY);
      readAchievementsFromLS(achRaw).forEach((k) => s.add(k));

      setCompletedFromLS(Array.from(s));
    };

    const onCustom = () => syncFromLS();

    const onStorage = (e) => {
      // підтримуємо і scoped, і legacy ключі
      const watchKeys = new Set([
        budgetLsKey,
        legalLsKey,
        energyLsKey,
        achLsKey,
        LS_BUDGET_PROGRESS_KEY,
        LS_LEGAL_PROGRESS_KEY,
        LS_ENERGY_PROGRESS_KEY,
        LS_ACHIEVEMENTS_KEY,
      ]);

      if (watchKeys.has(e.key)) syncFromLS();
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

  /* ------------------- Unified completed set (backend + LS + repairs) ------------------- */

  const completedSet = useMemo(() => {
    const s = new Set();
    completedBudgetSims.forEach((k) => s.add(k));
    completedLegalSims.forEach((k) => s.add(k));
    completedFromLS.forEach((k) => s.add(k));
    completedRepairsAchievements.forEach((k) => s.add(k));
    return s;
  }, [completedBudgetSims, completedLegalSims, completedFromLS, completedRepairsAchievements]);

  /* ------------------- Achievements list ------------------- */

  const achievementsData = useMemo(
    () => [
      { key: "master_all", title: "Майстер Побуту", desc: "Пройти всі симуляції", done: false },
      { key: "easy_5", title: "Легкий на Підйом", desc: "Пройти 5 симуляцій легкого рівня", done: false },
      { key: "mid_5", title: "Захисник Комфорту", desc: "Пройти 5 симуляцій середнього рівня", done: false },

      // ✅ Budget
      {
        key: "budget_read_bill",
        title: "Як читати платіжку",
        desc: "Пройти симуляцію читання платіжки",
        done: completedSet.has("budget_read_bill"),
      },
      {
        key: "budget_calculate_indicators",
        title: "Як рахуються показники",
        desc: "Пройти симуляцію розрахунку показників",
        done: completedSet.has("budget_calculate_indicators"),
      },
      {
        key: "budget_why_different_sums",
        title: "Чому приходять різні суми",
        desc: "Пройти симуляцію пошуку причин різниці сум",
        done: completedSet.has("budget_why_different_sums"),
      },
      {
        key: "budget_forecast_calculator",
        title: "Калькулятор прогнозу витрат",
        desc: "Пройти симуляцію прогнозування витрат",
        done: completedSet.has("budget_forecast_calculator"),
      },

      // ✅ Legal (твій функціонал)
      {
        key: "legal_landlord_rights",
        title: "Права власника",
        desc: "Пройти тест (50%+ правильних)",
        done: completedSet.has("legal_landlord_rights"),
      },
      {
        key: "legal_debts_penalty",
        title: "Борги та пеня",
        desc: "Успішно пройти симуляцію (чесна відповідь)",
        done: completedSet.has("legal_debts_penalty"),
      },
      {
        key: "legal_repairs_game",
        title: "Хто це лагодить?",
        desc: "Пройти гру (50%+ правильних)",
        done: completedSet.has("legal_repairs_game"),
      },

      // ✅ Energy section (твій функціонал)
      {
        key: ENERGY_SECTION_ACHIEVEMENT_ID,
        title: ENERGY_SECTION_ACH_TITLE,
        desc: "Відвідати всі підрозділи енергоефективності",
        done: completedSet.has(ENERGY_SECTION_ACHIEVEMENT_ID),
      },

      { key: "tips_10", title: "Побутовий Філософ", desc: "Переглянути 10 порад", done: false },
      { key: "eco_all", title: "Еко-Гуру", desc: "Прочитати всі поради в розділі економії", done: false },

      // ✅ Payments (його функціонал)
      {
        key: "first_payment",
        title: "Перша сплата",
        desc: "Ви зробили свою першу оплату в системі",
        done: dashboardData.approvedCount >= 1,
      },
      { key: "payment_master", title: "Майстер платежів", desc: "5 успішних оплат", done: dashboardData.approvedCount >= 5 },
      { key: "level_pro", title: "Досвідчений користувач", desc: "Досягнуто рівня Легенда ЖКГ", done: dashboardData.approvedCount >= 10 },

      // ✅ Repairs (його функціонал)
      {
        key: "perfect_flat",
        title: "Ідеальна квартира",
        desc: "Проведіть чистку всіх приладів",
        done: completedSet.has("perfect_flat"),
      },

      { key: "profile_filled", title: "Я у домі!", desc: "Заповнити профіль", done: true },
    ],
    [completedSet, dashboardData]
  );

  const achievementsReceived = achievementsData.filter((a) => a.done).length;
  const achievementsPercent =
    achievementsData.length > 0 ? (achievementsReceived / achievementsData.length) * 100 : 0;

  useEffect(() => {
    const p = Math.round(achievementsPercent);
    const newLevel = calculateLevel(p);

    setMeta((prev) => {
      if (prev.progress === p && prev.level === newLevel) return prev;
      return { ...prev, progress: p, level: newLevel };
    });
  }, [achievementsPercent]);

  const avatarSrc = resolveAvatarSrc(user?.avatarUrl);

  const goBack = () => setActiveTab("main");

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadAvatar(file);
    } catch (err) {
      alert(err?.message || "Не вдалося завантажити фото");
    } finally {
      e.target.value = "";
    }
  };

  const handleSaveProfile = async () => {
    try {
      const payload = {};

      const nameTrim = (editFormData.name || "").trim();
      if (nameTrim && nameTrim !== (user?.name || "")) payload.name = nameTrim;

      const anyPasswordTouched =
        editFormData.newPassword || editFormData.confirmPassword || editFormData.oldPassword;

      if (anyPasswordTouched) {
        if (!editFormData.oldPassword) {
          alert("Для зміни пароля введіть поточний пароль.");
          return;
        }
        if (!editFormData.newPassword || editFormData.newPassword.length < 6) {
          alert("Новий пароль має бути щонайменше 6 символів.");
          return;
        }
        if (editFormData.newPassword !== editFormData.confirmPassword) {
          alert("Новий пароль і підтвердження не співпадають.");
          return;
        }

        payload.oldPassword = editFormData.oldPassword;
        payload.newPassword = editFormData.newPassword;
      }

      if (Object.keys(payload).length > 0) {
        await updateProfile(payload);
      }

      setEditFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      goBack();
    } catch (err) {
      alert(err?.message || "Не вдалося зберегти зміни");
    }
  };

  const handleChangeGoal = (newGoal) => {
    localStorage.setItem("lumen_current_goal", newGoal);
    setMeta((prev) => ({ ...prev, currentGoal: newGoal }));
    goBack();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login");
    }
  };

  return (
    <ProfileWrapper>
      {activeTab === "main" && (
        <>
          <ProfileTitle>Профіль</ProfileTitle>

          <UserHeaderCard>
            <UserInfo>
              <AvatarPlaceholder>
                {avatarSrc ? <img src={avatarSrc} alt="Avatar" /> : <FiUser />}
              </AvatarPlaceholder>

              <UserDetails>
                <UserNameRow>
                  {/* Компроміс: як у тебе (name/email), але UX edit-кнопки як у нього */}
                  <UserName>{user?.name || user?.email || "User"}</UserName>

                  <EditButton
                    aria-label="Редагувати"
                    onClick={() => {
                      setEditFormData((prev) => ({
                        ...prev,
                        name: user?.name || "",
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      }));
                      setActiveTab("edit");
                    }}
                  >
                    <FiEdit2 size={18} />
                  </EditButton>
                </UserNameRow>

                <UserLevel>Рівень: {meta.level}</UserLevel>
              </UserDetails>
            </UserInfo>

            <ProgressSection>
              <ProgressLabel>
                <span>Загальний прогрес:</span>
                <span>{meta.progress}%</span>
              </ProgressLabel>
              <ProgressBarContainer>
                <ProgressBarFill $percent={meta.progress} />
              </ProgressBarContainer>
            </ProgressSection>
          </UserHeaderCard>

          <ProfileGrid>
            <ContentCard>
              <CardHeader>
                <CardTitle>Досягнення</CardTitle>
                <FiMenu
                  style={{ cursor: "pointer", fontSize: "24px" }}
                  onClick={() => setActiveTab("achievements")}
                />
              </CardHeader>

              <ProgressSection>
                <ProgressBarContainer>
                  <ProgressBarFill $percent={achievementsPercent} />
                </ProgressBarContainer>
                <div style={{ marginTop: "8px", fontSize: "14px", color: "#121212" }}>
                  {achievementsReceived} з {achievementsData.length} отримано
                </div>
              </ProgressSection>
            </ContentCard>

            <ContentCard>
              <CardTitle style={{ marginBottom: "16px" }}>Персональні рекомендації</CardTitle>
              <List>
                {goalRecommendations[meta.currentGoal]?.map((rec, i) => (
                  <ListItem key={i}>{rec}</ListItem>
                ))}
              </List>
            </ContentCard>

            <ContentCard style={{ gridColumn: "1 / -1" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <div style={{ flex: "1 1 300px" }}>
                  <CardHeader>
                    <CardTitle>Поточна мета: «{meta.currentGoal}»</CardTitle>
                    <FiTarget size={24} />
                  </CardHeader>

                  <List>
                    {goalRecommendations[meta.currentGoal]?.map((rec, i) => (
                      <ListItem key={i}>{rec}</ListItem>
                    ))}
                  </List>
                </div>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: "200px" }}>
                  <span style={{ marginBottom: "12px", fontWeight: "bold", color: "#121212" }}>
                    Хочете змінити пріоритети?
                  </span>
                  <ActionButton onClick={() => setActiveTab("goals")}>Обрати нову мету</ActionButton>
                </div>
              </div>
            </ContentCard>
          </ProfileGrid>
        </>
      )}

      {activeTab === "achievements" && (
        <>
          <BackButton onClick={goBack}>
            <FiArrowLeft /> Назад до профілю
          </BackButton>

          <ContentCard style={{ minHeight: "auto" }}>
            <CardTitle style={{ fontSize: "28px", marginBottom: "24px" }}>Всі досягнення</CardTitle>

            <ul style={{ listStyle: "none", padding: "0" }}>
              {achievementsData.map((item, index) => (
                <AchievementRow key={`${item.key}-${index}`}>
                  <div style={{ fontSize: "24px", color: "#111" }}>
                    <FiAward />
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 4px" }}>
                      «{item.title}»
                    </h3>
                    <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>{item.desc}</p>
                  </div>

                  {item.done && (
                    <CheckIcon>
                      <FiCheck />
                    </CheckIcon>
                  )}
                </AchievementRow>
              ))}
            </ul>
          </ContentCard>
        </>
      )}

      {activeTab === "goals" && (
        <>
          <BackButton onClick={goBack}>
            <FiArrowLeft /> Скасувати
          </BackButton>

          <ContentCard style={{ minHeight: "auto" }}>
            <CardTitle style={{ fontSize: "28px", marginBottom: "24px" }}>Оберіть нову мету</CardTitle>

            <GoalButton onClick={() => handleChangeGoal("Фінансова грамотність")}>
              <div>
                <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "800" }}>
                  Фінансова грамотність
                </h3>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                  Навчитись вести бюджет та розуміти платіжки
                </p>
              </div>
              <FiArrowRight size={24} />
            </GoalButton>

            <GoalButton onClick={() => handleChangeGoal("Енергоефективність")}>
              <div>
                <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "800" }}>
                  Енергоефективність
                </h3>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                  Зменшити споживання та зберегти планету
                </p>
              </div>
              <FiArrowRight size={24} />
            </GoalButton>

            <GoalButton onClick={() => handleChangeGoal("Без боргів")}>
              <div>
                <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "800" }}>
                  Без боргів
                </h3>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                  Розібратись з боргами та пенею
                </p>
              </div>
              <FiArrowRight size={24} />
            </GoalButton>
          </ContentCard>
        </>
      )}

      {activeTab === "edit" && (
        <>
          <BackButton onClick={goBack}>
            <FiArrowLeft /> Назад
          </BackButton>

          <ContentCard style={{ alignItems: "center", minHeight: "auto", padding: "40px" }}>
            <CardTitle style={{ fontSize: "28px", marginBottom: "32px" }}>Редагувати профіль</CardTitle>

            <FormColumn>
              <AvatarUploadWrapper>
                <AvatarPlaceholder>
                  {avatarSrc ? <img src={avatarSrc} alt="Avatar" /> : <FiUser />}
                </AvatarPlaceholder>

                <UploadButton>
                  <FiCamera style={{ marginRight: "6px" }} />
                  Змінити фото
                  <HiddenFileInput type="file" accept="image/*" onChange={handleImageChange} />
                </UploadButton>
              </AvatarUploadWrapper>

              <InputGroup>
                <label>Ваше ім'я</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData((p) => ({ ...p, name: e.target.value }))}
                />
              </InputGroup>

              <Divider />
              <SectionTitle>Зміна пароля</SectionTitle>

              <InputGroup>
                <label>Поточний пароль</label>
                <input
                  type="password"
                  placeholder="Введіть поточний пароль"
                  value={editFormData.oldPassword}
                  onChange={(e) => setEditFormData((p) => ({ ...p, oldPassword: e.target.value }))}
                />
              </InputGroup>

              <InputGroup>
                <label>Новий пароль</label>
                <input
                  type="password"
                  placeholder="Введіть новий пароль"
                  value={editFormData.newPassword}
                  onChange={(e) => setEditFormData((p) => ({ ...p, newPassword: e.target.value }))}
                />
              </InputGroup>

              <InputGroup>
                <label>Підтвердити пароль</label>
                <input
                  type="password"
                  placeholder="Повторіть пароль"
                  value={editFormData.confirmPassword}
                  onChange={(e) =>
                    setEditFormData((p) => ({ ...p, confirmPassword: e.target.value }))
                  }
                />
              </InputGroup>

              <ActionButton onClick={handleSaveProfile} style={{ marginTop: "16px" }}>
                Зберегти зміни
              </ActionButton>

              <ActionButton
                onClick={handleLogout}
                style={{
                  marginTop: "16px",
                  backgroundColor: "transparent",
                  border: "2px solid crimson",
                  color: "crimson",
                }}
              >
                Вийти з акаунту
              </ActionButton>
            </FormColumn>
          </ContentCard>
        </>
      )}
    </ProfileWrapper>
  );
}