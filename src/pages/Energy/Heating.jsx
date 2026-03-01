import React, { useEffect } from "react";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { energyContentApi } from "../../api/energyContent";

const ArticlePage = styled.div`
  width: 100%;
  padding-bottom: 80px;
  color: var(--color-text);
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text-muted);
  cursor: pointer;
  margin-bottom: 24px;
  padding: 8px 0;

  &:hover {
    color: #166534;
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 900;
  margin-bottom: 32px;
  color: #166534;
`;

const ContentBlock = styled.div`
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-3);
  padding: 32px;
  line-height: 1.6;
  font-size: 18px;
  box-shadow: var(--shadow-1);

  h2 {
    font-size: 24px;
    font-weight: 800;
    margin-top: 32px;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #e5e7eb;
  }

  p { margin-bottom: 16px; }
  ul { margin-left: 20px; margin-bottom: 24px; list-style-type: disc; }
  li { margin-bottom: 8px; }

  @media (max-width: 768px) { padding: 20px; }
`;

const LS_ENERGY_PROGRESS_KEY = "lumen.progress.energy";
const LS_ACHIEVEMENTS_KEY = "lumen.achievements";

const TOPIC_ID = "heating";

const ENERGY_TOPIC_IDS = ["lighting", "heating", "appliances", "water", "smart-home"];
const ENERGY_SECTION_ACH_ID = "energy_efficiency_completed";
const ENERGY_SECTION_ACH_TITLE = "Енергоефективність: усі теми пройдено";

function safeParseJson(str, fallback) {
  try {
    const v = JSON.parse(str);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

async function syncEnergyTopicToServer(topicId) {
  const token = localStorage.getItem("lumen_token");
  if (!token) return;

  try {
    await energyContentApi.complete(token, topicId);
  } catch (e) {
    console.warn("[Energy] complete() failed:", e);
  }
}

function grantEnergyAchievementOnce() {
  const raw = localStorage.getItem(LS_ACHIEVEMENTS_KEY);
  const data = safeParseJson(raw, []);

  if (Array.isArray(data)) {
    if (data.some((a) => a?.id === ENERGY_SECTION_ACH_ID)) return;
    localStorage.setItem(
      LS_ACHIEVEMENTS_KEY,
      JSON.stringify([...data, { id: ENERGY_SECTION_ACH_ID, title: ENERGY_SECTION_ACH_TITLE, done: true }])
    );
  } else if (data && typeof data === "object") {
    if (data?.[ENERGY_SECTION_ACH_ID]?.done) return;
    localStorage.setItem(
      LS_ACHIEVEMENTS_KEY,
      JSON.stringify({ ...data, [ENERGY_SECTION_ACH_ID]: { title: ENERGY_SECTION_ACH_TITLE, done: true } })
    );
  } else {
    localStorage.setItem(
      LS_ACHIEVEMENTS_KEY,
      JSON.stringify([{ id: ENERGY_SECTION_ACH_ID, title: ENERGY_SECTION_ACH_TITLE, done: true }])
    );
  }

  window.dispatchEvent(new Event("lumen:achievements-updated"));
}

function maybeGrantEnergyAchievement(progressData) {
  const topics = progressData?.topics || {};
  const completed = ENERGY_TOPIC_IDS.reduce(
    (acc, id) => acc + (topics?.[id]?.visited ? 1 : 0),
    0
  );
  if (completed === ENERGY_TOPIC_IDS.length) grantEnergyAchievementOnce();
}

function markEnergyTopicVisited(topicId) {
  const raw = localStorage.getItem(LS_ENERGY_PROGRESS_KEY);
  const data = safeParseJson(raw, { topics: {} });
  if (data?.topics?.[topicId]?.visited) return;

  const next = {
    ...data,
    topics: {
      ...(data.topics || {}),
      [topicId]: { visited: true, visitedAt: new Date().toISOString() },
    },
  };

  localStorage.setItem(LS_ENERGY_PROGRESS_KEY, JSON.stringify(next));
  maybeGrantEnergyAchievement(next);
  window.dispatchEvent(new Event("lumen:progress-updated"));
}

export default function Heating() {
  const navigate = useNavigate();

  useEffect(() => {
    markEnergyTopicVisited(TOPIC_ID);
    syncEnergyTopicToServer(TOPIC_ID);
  }, []);

  return (
    <ArticlePage>
      <Container>
        <BackButton onClick={() => navigate("/energy")}>
          <FiArrowLeft /> Повернутися до меню
        </BackButton>

        <Title>Збереження тепла</Title>

        <ContentBlock>
          <p>Найбільші витрати в комунальних платежах взимку — це опалення. Навіть невеликі зміни можуть зберегти до 20% тепла.</p>

          <h2>1. Не перекривайте радіатори</h2>
          <p>Штори, меблі або декоративні панелі перед батареєю крадуть тепло. Радіатор має «дихати», щоб нагрівати повітря в кімнаті, а не диван.</p>

          <h2>2. Тепловідображувальний екран</h2>
          <p>Встановіть за батареєю спеціальний фольгований екран. Він буде відбивати тепло всередину кімнати, замість того щоб гріти холодну стіну.</p>

          <h2>3. Провітрюйте правильно</h2>
          <p>Краще відкрити вікна навстіж на 5 хвилин (залпове провітрювання), ніж тримати їх на мікропровітрюванні годинами. Так повітря оновиться, а стіни не встигнуть охолонути.</p>
        </ContentBlock>
      </Container>
    </ArticlePage>
  );
}