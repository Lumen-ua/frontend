import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiTool, FiHome, FiUser } from "react-icons/fi";
import { GiBrickWall, GiBrokenBottle, GiTap, GiLightBulb } from "react-icons/gi";
import { MdOutlineCleaningServices, MdHandyman } from "react-icons/md";

import {
  Wrapper, Header, BackBtn, Main,
  IntroSection, IntroTitle, RulesContainer, RuleCard, IconHeader, CardTitle, RuleList,
  DecorationBlob1, DecorationBlob2,
  GameSectionTitle, GameArea, TaskCard, ButtonsRow, OptionBtn, ScoreBoard, Feedback
} from './RepairsGame.styled';

import { useAuth } from "../../../context/AuthContext";
import { legalContentApi } from "../../../api/legalContent";

const LS_LEGAL_PROGRESS_KEY = "lumen.progress.legal";
const SIM_ID = "repairsGameSim";
const ACH_KEY = "legal_repairs_game";

function safeParseJson(str, fallback) {
  try {
    const v = JSON.parse(str);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function isLegalSimAlreadyCompleted(simId) {
  const raw = localStorage.getItem(LS_LEGAL_PROGRESS_KEY);
  const data = safeParseJson(raw, { sims: {} });
  return Boolean(data?.sims?.[simId]?.completed);
}

function markLegalSimVisitedInLS(simId) {
  const raw = localStorage.getItem(LS_LEGAL_PROGRESS_KEY);
  const data = safeParseJson(raw, { sims: {} });
  const prev = data?.sims?.[simId] || {};

  const next = {
    ...data,
    sims: {
      ...(data.sims || {}),
      [simId]: {
        ...prev,
        visited: true,
        visitedAt: prev.visitedAt || new Date().toISOString(),
      },
    },
  };

  localStorage.setItem(LS_LEGAL_PROGRESS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("lumen:progress-updated"));
}

function markLegalSimCompletedInLS({ simId, score, total }) {
  const raw = localStorage.getItem(LS_LEGAL_PROGRESS_KEY);
  const data = safeParseJson(raw, { sims: {} });
  const prev = data?.sims?.[simId] || {};

  const next = {
    ...data,
    sims: {
      ...(data.sims || {}),
      [simId]: {
        ...prev,
        visited: true,
        visitedAt: prev.visitedAt || new Date().toISOString(),
        completed: true,
        score,
        total,
        completedAt: prev.completedAt || new Date().toISOString(),
      },
    },
  };

  localStorage.setItem(LS_LEGAL_PROGRESS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("lumen:progress-updated"));
}

const RepairsGame = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const questions = [
    { id: 1, text: "Прорвало стару трубу в стіні", owner: true, explanation: "Капітальний ремонт комунікацій — це обов'язок власника." },
    { id: 2, text: "Орендар розбив вікно м'ячем", owner: false, explanation: "Пошкодження з вини орендаря ремонтує орендар за свій рахунок." },
    { id: 3, text: "Згоріла лампочка в коридорі", owner: false, explanation: "Дрібні витратні матеріали (лампочки, батарейки) купує орендар." },
    { id: 4, text: "Зламався холодильник (від старості)", owner: true, explanation: "Природний знос техніки власника — це проблема власника." },
    { id: 5, text: "Орендар хоче перефарбувати стіни в чорний", owner: false, explanation: "Поточний ремонт 'для краси' робить орендар (але тільки з дозволу!)." },
    { id: 6, text: "Потік дах будинку", owner: true, explanation: "Це капітальна проблема конструкції будівлі — відповідальність власника." },
    { id: 7, text: "Забився злив у ванній (волоссям)", owner: false, explanation: "Засмічення внаслідок користування усуває орендар." },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const [savedOnce, setSavedOnce] = useState(() => isLegalSimAlreadyCompleted(SIM_ID));

  useEffect(() => {
    markLegalSimVisitedInLS(SIM_ID);
  }, []);

  const handleAnswer = (isOwnerSelected) => {
    const isCorrect = questions[current].owner === isOwnerSelected;

    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback({ type: 'correct', text: `✅ Правильно! ${questions[current].explanation}` });
    } else {
      setFeedback({ type: 'wrong', text: `❌ Помилка. ${questions[current].explanation}` });
    }

    setTimeout(() => {
      setFeedback(null);
      if (current < questions.length - 1) {
        setCurrent(current + 1);
      } else {
        setIsFinished(true);
      }
    }, 2500);
  };

  useEffect(() => {
    async function saveIfPassed() {
      if (!isFinished) return;
      if (savedOnce) return;

      const total = questions.length;
      const passed = total > 0 ? (score / total) >= 0.5 : false;
      if (!passed) return;

      setSavedOnce(true);
      markLegalSimCompletedInLS({ simId: SIM_ID, score, total });

      try {
        if (token) {
          await legalContentApi.complete(token, ACH_KEY);
        }
      } catch (_) {}
    }

    saveIfPassed();
  }, [isFinished, savedOnce, score, questions.length, token]);

  return (
    <Wrapper>
      <Header>
        <h2 style={{fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px'}}>
          <FiTool size={24}/> Хто це лагодить?
        </h2>
        <BackBtn onClick={() => navigate('/legal')}>
          <FiArrowLeft /> Вихід
        </BackBtn>
      </Header>

      <Main>
        <DecorationBlob1 />
        <DecorationBlob2 />

        <IntroSection>
          <IntroTitle>Головне правило: "Капітальне vs Поточне"</IntroTitle>

          <RulesContainer>
            <RuleCard role="owner">
              <IconHeader role="owner">
                <FiHome size={40} />
                <CardTitle>Зона ВЛАСНИКА</CardTitle>
              </IconHeader>
              <RuleList role="owner">
                <li><GiBrickWall size={20}/> <strong>Капітальний ремонт:</strong> Стіни, дах, вікна (якщо старі), проводка.</li>
                <li><GiTap size={20}/> <strong>Комунікації:</strong> Старі труби, стояки, батареї, що потекли від віку.</li>
                <li><MdHandyman size={20}/> <strong>Природний знос:</strong> Техніка чи меблі, які зламалися "від старості", а не від удару.</li>
              </RuleList>
            </RuleCard>

            <RuleCard role="tenant">
              <IconHeader role="tenant">
                <FiUser size={40} />
                <CardTitle>Зона ОРЕНДАРЯ</CardTitle>
              </IconHeader>
              <RuleList role="tenant">
                <li><GiLightBulb size={20}/> <strong>Дрібний побут:</strong> Лампочки, батарейки, прокладки для крану.</li>
                <li><GiBrokenBottle size={20}/> <strong>Власна вина:</strong> Все, що розбили, зламали чи забруднили ви самі.</li>
                <li><MdOutlineCleaningServices size={20}/> <strong>Засмічення:</strong> Чистка сифонів та труб, якщо вони забилися під час вашого проживання.</li>
              </RuleList>
            </RuleCard>
          </RulesContainer>
        </IntroSection>

        <GameSectionTitle>А тепер перевіримо на практиці! 👇</GameSectionTitle>

        <GameArea>
          {!isFinished ? (
            <>
              <ScoreBoard>Рахунок: {score} / {questions.length}</ScoreBoard>
              <TaskCard>
                <h3>{questions[current].text}</h3>
              </TaskCard>

              {!feedback ? (
                <ButtonsRow>
                  <OptionBtn role="tenant" onClick={() => handleAnswer(false)}>
                    <FiUser /> Орендар платить
                  </OptionBtn>
                  <OptionBtn role="owner" onClick={() => handleAnswer(true)}>
                    <FiHome /> Власник платить
                  </OptionBtn>
                </ButtonsRow>
              ) : (
                <Feedback type={feedback.type}>{feedback.text}</Feedback>
              )}
            </>
          ) : (
            <div>
              <h2><FiCheckCircle color="#4CAF50"/> Гру завершено!</h2>
              <p style={{fontSize: '18px', margin: '20px 0', color: '#000'}}>Твій результат: <strong>{score}</strong> правильних відповідей з {questions.length}.</p>
              <OptionBtn role="owner" onClick={() => {setIsFinished(false); setCurrent(0); setScore(0);}} style={{margin: '0 auto'}}>
                Зіграти ще раз
              </OptionBtn>
            </div>
          )}
        </GameArea>
      </Main>
    </Wrapper>
  );
};

export default RepairsGame;