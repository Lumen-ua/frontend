import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiArrowLeft, FiZap } from "react-icons/fi";
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

  p {
    margin-bottom: 16px;
  }

  ul {
    margin-left: 20px;
    margin-bottom: 24px;
    list-style-type: disc;
  }

  li {
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CalculatorBox = styled.div`
  background-color: #dcfce7;
  border: 3px solid #166534;
  border-radius: 12px;
  padding: 24px;
  margin: 32px 0;
  text-align: center;
  box-shadow: 4px 4px 0px #166534;
`;

const CalcTitle = styled.h3`
  font-size: 20px;
  font-weight: 800;
  color: #14532d;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const CalcInput = styled.input`
  width: 80px;
  padding: 8px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  border: 2px solid #166534;
  border-radius: 8px;
  margin: 0 10px;
  outline: none;
  background: white;

  &:focus {
    box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.3);
  }
`;

const CalcResult = styled.div`
  margin-top: 20px;
  padding-top: 16px;
  border-top: 2px dashed #166534;
  font-size: 18px;
  font-weight: 600;
  color: #14532d;

  strong {
    font-size: 24px;
    color: #166534;
    background: #bbf7d0;
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

const LS_ENERGY_PROGRESS_KEY = "lumen.progress.energy";
const LS_ACHIEVEMENTS_KEY = "lumen.achievements";

const TOPIC_ID = "lighting";

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
    const exists = data.some((a) => a?.id === ENERGY_SECTION_ACH_ID);
    if (exists) return;

    const next = [
      ...data,
      { id: ENERGY_SECTION_ACH_ID, title: ENERGY_SECTION_ACH_TITLE, done: true },
    ];
    localStorage.setItem(LS_ACHIEVEMENTS_KEY, JSON.stringify(next));
  } else if (data && typeof data === "object") {
    if (data?.[ENERGY_SECTION_ACH_ID]?.done) return;

    const next = {
      ...data,
      [ENERGY_SECTION_ACH_ID]: { title: ENERGY_SECTION_ACH_TITLE, done: true },
    };
    localStorage.setItem(LS_ACHIEVEMENTS_KEY, JSON.stringify(next));
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

  if (completed === ENERGY_TOPIC_IDS.length) {
    grantEnergyAchievementOnce();
  }
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

export default function Lighting() {
  const navigate = useNavigate();

  useEffect(() => {
    markEnergyTopicVisited(TOPIC_ID);

    syncEnergyTopicToServer(TOPIC_ID);
  }, []);

  const [bulbs, setBulbs] = useState(5);
  const savingsPerBulb = 350;
  const totalSavings = bulbs * savingsPerBulb;

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    if (val >= 0 && val <= 100) {
      setBulbs(val);
    }
  };

  return (
    <ArticlePage>
      <Container>
        <BackButton onClick={() => navigate("/energy")}>
          <FiArrowLeft /> Повернутися до меню
        </BackButton>

        <Title>💡 Ефективне освітлення</Title>

        <ContentBlock>
          <p>
            Освітлення складає значну частину рахунку за електроенергію. 
            Правильний підхід дозволяє зменшити витрати на 50-70% без втрати комфорту.
          </p>

          {}
          <CalculatorBox>
            <CalcTitle>
               <FiZap size={24}/> Калькулятор вигоди
            </CalcTitle>
            <p style={{marginBottom: '12px'}}>Скільки звичайних ламп у вас вдома?</p>
            
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <span style={{fontSize: '24px'}}>💡</span>
              <CalcInput 
                type="number" 
                value={bulbs} 
                onChange={handleInputChange} 
                min="0" 
                max="100"
              />
              <span style={{fontWeight: 'bold'}}>шт.</span>
            </div>

            <CalcResult>
              Замінивши їх на LED, ви зекономите: <br/>
              <div style={{marginTop: '8px'}}>
                 ~ <strong>{totalSavings} грн</strong> на рік 💰
              </div>
            </CalcResult>
          </CalculatorBox>
          {}

          <h2>1. LED-лампи – це фундамент</h2>
          <p>
            Найперший крок — заміна старих ламп розжарювання на світлодіодні (LED).
          </p>
          <ul>
            <li><strong>Економія:</strong> Споживають у 8-10 разів менше енергії.</li>
            <li><strong>Довговічність:</strong> Працюють до 50 000 годин (проти 1000 годин у звичайних).</li>
            <li><strong>Безпека:</strong> Не нагріваються так сильно, як старі лампи.</li>
          </ul>

          <h2>2. Зонування світла</h2>
          <p>
            Замість однієї яскравої люстри на всю кімнату використовуйте локальне освітлення:
          </p>
          <ul>
            <li>Настільна лампа для роботи.</li>
            <li>Торшер біля крісла для читання.</li>
            <li>Підсвітка робочої зони на кухні.</li>
          </ul>
          <p>
            Це дозволяє освітлювати лише ту частину простору, яка вам потрібна прямо зараз.
          </p>

          <h2>3. Датчики руху та розумні лампи</h2>
          <p>
            У коридорах, гардеробних та ванних кімнатах датчики руху — ідеальне рішення. 
            Світло вмикається тільки тоді, коли ви там є, і автоматично вимикається, коли ви виходите.
          </p>
        </ContentBlock>
      </Container>
    </ArticlePage>
  );
}