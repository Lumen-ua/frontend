import React, { useEffect, useMemo, useState } from "react";
import { FiUser, FiMenu, FiEdit2, FiTarget, FiArrowLeft, FiAward, FiCheck, FiArrowRight, FiCamera } from 'react-icons/fi';

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
} from './Profile.styled';

import { useAuth } from "../../context/AuthContext.jsx";
import { resolveAvatarSrc } from "../../utils/avatar";
import { budgetContentApi } from "../../api/budgetContent";

const LS_PROGRESS_KEY = "lumen.progress.budget";

const SIM_TO_ACHIEVEMENT_KEY = {
  readBillSim: "budget_read_bill",
  readIndicatorsSim: "budget_calculate_indicators",
  billDetectiveSim: "budget_why_different_sums",
  whatIfSim: "budget_forecast_calculator",
};

function safeParseJson(str, fallback) {
  try {
    const v = JSON.parse(str);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function readBudgetProgressFromLS() {
  const raw = localStorage.getItem(LS_PROGRESS_KEY);
  return safeParseJson(raw, { sims: {} });
}

function getCompletedAchievementsFromLS() {
  const data = readBudgetProgressFromLS();
  const sims = data?.sims || {};
  const done = new Set();

  Object.entries(SIM_TO_ACHIEVEMENT_KEY).forEach(([simId, achievementKey]) => {
    const completed = Boolean(sims?.[simId]?.completed);
    if (completed) done.add(achievementKey);
  });

  return done;
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("main");
  const { user, token, updateProfile, uploadAvatar } = useAuth();

  const [meta, setMeta] = useState({
    level: "Новачок",
    progress: 25,
    currentGoal: "Фінансова грамотність",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setEditFormData((prev) => ({
      ...prev,
      name: user?.name || "",
    }));
  }, [user]);

  const [completedBudgetSims, setCompletedBudgetSims] = useState([]);

  useEffect(() => {
    let alive = true;

    async function loadBudgetAchievements() {
      try {
        if (!token) return;

        const res = await budgetContentApi.get(token);
        const raw =
          res?.completedSimulationsJson ??
          res?.CompletedSimulationsJson ??
          "[]";

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

  const [completedFromLS, setCompletedFromLS] = useState(() =>
    Array.from(getCompletedAchievementsFromLS())
  );

  useEffect(() => {
    const syncFromLS = () => {
      const setDone = getCompletedAchievementsFromLS();
      setCompletedFromLS(Array.from(setDone));
    };

    const onCustom = () => syncFromLS();

    const onStorage = (e) => {
      if (e.key === LS_PROGRESS_KEY) syncFromLS();
    };

    window.addEventListener("lumen:progress-updated", onCustom);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("lumen:progress-updated", onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const completedSet = useMemo(() => {
    const s = new Set();
    completedBudgetSims.forEach((k) => s.add(k));
    completedFromLS.forEach((k) => s.add(k));
    return s;
  }, [completedBudgetSims, completedFromLS]);

  const achievementsData = useMemo(
    () => [
      {
        key: "master_all",
        title: "Майстер Побуту",
        desc: "Пройти всі симуляції",
        done: false, 
      },
      {
        key: "easy_5",
        title: "Легкий на Підйом",
        desc: "Пройти 5 симуляцій легкого рівня",
        done: false,
      },
      {
        key: "mid_5",
        title: "Захисник Комфорту",
        desc: "Пройти 5 симуляцій середнього рівня",
        done: false,
      },
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

      {
        key: "tips_10",
        title: "Побутовий Філософ",
        desc: "Переглянути 10 порад",
        done: false,
      },
      {
        key: "eco_all",
        title: "Еко-Гуру",
        desc: "Прочитати всі поради в розділі економії",
        done: false,
      },
      {
        key: "profile_filled",
        title: "Я у домі!",
        desc: "Заповнити профіль",
        done: true, 
      },
    ],
    [completedSet]
  );

  const achievementsReceived = achievementsData.filter((a) => a.done).length;
  const achievementsPercent =
    achievementsData.length > 0
      ? (achievementsReceived / achievementsData.length) * 100
      : 0;

  useEffect(() => {
    const p = Math.round(achievementsPercent);
    setMeta((prev) => (prev.progress === p ? prev : { ...prev, progress: p }));
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
        editFormData.newPassword ||
        editFormData.confirmPassword ||
        editFormData.oldPassword;

      if (anyPasswordTouched) {
        if (!editFormData.oldPassword) {
          alert("Для зміни пароля введіть поточний пароль.");
          return;
        }
        if (!editFormData.newPassword) {
          alert("Введіть новий пароль.");
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
    setMeta((prev) => ({ ...prev, currentGoal: newGoal }));
    goBack();
  };

  return (
    <ProfileWrapper>
      {/* --- ГОЛОВНА СТОРІНКА --- */}
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
                  <UserName>{user?.name || "User"}</UserName>

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
            {/* Секція Досягнень */}
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

                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "14px",
                    color: "#121212",
                  }}
                >
                  {achievementsReceived} з {achievementsData.length} отримано
                </div>
              </ProgressSection>
            </ContentCard>

            <ContentCard>
              <CardTitle style={{ marginBottom: "16px" }}>
                Персональні рекомендації
              </CardTitle>
              <List>
                <ListItem>Склади персональний бюджет</ListItem>
                <ListItem>Створи регулярну оплату рахунків</ListItem>
                <ListItem>Подумати про енергоощадність</ListItem>
              </List>
            </ContentCard>

            {/* Секція Мети */}
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
                    <ListItem>Склади персональний бюджет</ListItem>
                    <ListItem>Створи регулярну оплату рахунків</ListItem>
                    <ListItem>Подумати про енергоощадність</ListItem>
                  </List>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minWidth: "200px",
                  }}
                >
                  <span
                    style={{
                      marginBottom: "12px",
                      fontWeight: "bold",
                      color: "#121212",
                    }}
                  >
                    Хочете змінити пріоритети?
                  </span>
                  <ActionButton onClick={() => setActiveTab("goals")}>
                    Обрати нову мету
                  </ActionButton>
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
            <CardTitle style={{ fontSize: "28px", marginBottom: "24px" }}>
              Всі досягнення
            </CardTitle>

            <ul style={{ listStyle: "none", padding: 0 }}>
              {achievementsData.map((item, index) => (
                <AchievementRow key={`${item.key}-${index}`}>
                  <div style={{ fontSize: "24px", color: "#111" }}>
                    <FiAward />
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "800",
                        margin: "0 0 4px",
                      }}
                    >
                      «{item.title}»
                    </h3>
                    <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
                      {item.desc}
                    </p>
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
            <CardTitle style={{ fontSize: "28px", marginBottom: "24px" }}>
              Оберіть нову мету
            </CardTitle>

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
            <CardTitle style={{ fontSize: "28px", marginBottom: "32px" }}>
              Редагувати профіль
            </CardTitle>

            <FormColumn>
              <AvatarUploadWrapper>
                <AvatarPlaceholder>
                  {avatarSrc ? <img src={avatarSrc} alt="Avatar" /> : <FiUser />}
                </AvatarPlaceholder>

                <UploadButton>
                  <FiCamera style={{ marginRight: "6px" }} />
                  Змінити фото
                  <HiddenFileInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </UploadButton>
              </AvatarUploadWrapper>

              <InputGroup>
                <label>Ваше ім'я</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData((p) => ({ ...p, name: e.target.value }))
                  }
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
                  onChange={(e) =>
                    setEditFormData((p) => ({ ...p, oldPassword: e.target.value }))
                  }
                />
              </InputGroup>

              <InputGroup>
                <label>Новий пароль</label>
                <input
                  type="password"
                  placeholder="Введіть новий пароль"
                  value={editFormData.newPassword}
                  onChange={(e) =>
                    setEditFormData((p) => ({ ...p, newPassword: e.target.value }))
                  }
                />
              </InputGroup>

              <InputGroup>
                <label>Підтвердити пароль</label>
                <input
                  type="password"
                  placeholder="Повторіть пароль"
                  value={editFormData.confirmPassword}
                  onChange={(e) =>
                    setEditFormData((p) => ({
                      ...p,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
              </InputGroup>

              <ActionButton onClick={handleSaveProfile} style={{ marginTop: "16px" }}>
                Зберегти зміни
              </ActionButton>
            </FormColumn>
          </ContentCard>
        </>
      )}
    </ProfileWrapper>
  );
}