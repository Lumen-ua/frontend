import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiFileText } from "react-icons/fi";

import {
  LandlordWrapper,
  LandlordHeader,
  HeaderTitle,
  ExitButton,
  LandlordMain,
  IntroSection,
  MainTitle,
  SubText,
  RightsGrid,
  RightBlock,
  BlockContent,
  BlockTitle,
  BlockDescription,
  ActionButtonWrapper,
  QuizButton,
  ModalOverlay,
  ModalContent,
  QuestionTitle,
  OptionsList,
  OptionButton,
  ResultText
} from './LandlordRights.styled';

import { useAuth } from "../../context/AuthContext.jsx";
import { legalContentApi } from "../../api/legalContent";

const LS_LEGAL_PROGRESS_KEY = "lumen.progress.legal";
const SIM_ID = "landlordRightsSim";
const ACH_KEY = "legal_landlord_rights";

function safeParseJson(str, fallback) {
  try {
    const v = JSON.parse(str);
    return v ?? fallback;
  } catch {
    return fallback;
  }
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

const LandlordRights = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    markLegalSimVisitedInLS(SIM_ID);
  }, []);

  const questions = [
    {
      question: "Яке найголовніше право власника?",
      options: [
        "Заходити в квартиру коли завгодно",
        "Отримувати орендну плату вчасно",
        "Змінювати замки без попередження",
        "Зберігати речі орендаря собі"
      ],
      correct: 1
    },
    {
      question: "Для чого потрібен залог (депозит)?",
      options: [
        "Це подарунок власнику",
        "Для оплати комуналки наперед",
        "Для ремонту пошкоджень, якщо орендар щось зламає",
        "Щоб купити нові меблі"
      ],
      correct: 2
    },
    {
      question: "В якому документі мають бути записані права сторін?",
      options: [
        "У Договорі оренди",
        "У паспорті",
        "У чеку з магазину",
        "У листуванні в Viber"
      ],
      correct: 0
    },
    {
      question: "Що робити власнику, якщо орендар зламав стіл?",
      options: [
        "Вигнати його на вулицю",
        "Використати гроші з депозиту на ремонт",
        "Викликати поліцію",
        "Нічого, купити новий самому"
      ],
      correct: 1
    }
  ];

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].correct) {
      setScore((s) => s + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const closeTest = async () => {
    const total = questions.length;
    const passed = total > 0 ? (score / total) >= 0.5 : false;

    if (passed) {
      markLegalSimCompletedInLS({ simId: SIM_ID, score, total });

      try {
        if (token) {
          await legalContentApi.complete(token, ACH_KEY);
        }
      } catch (_) {}
    }

    setShowModal(false);
    navigate('/legal');
  };

  return (
    <LandlordWrapper>
      <LandlordHeader>
        <HeaderTitle>Права власника</HeaderTitle>
        <ExitButton onClick={() => navigate('/legal')}>
          Вихід <FiArrowRight />
        </ExitButton>
      </LandlordHeader>

      <LandlordMain>
        <IntroSection>
          <MainTitle>
            Тепер поглянемо на ситуацію з іншого боку: які ж "суперсили" та права має ВЛАСНИК квартири?
          </MainTitle>
          <SubText>
            Ці права потрібні йому, щоб захистити своє майно і бути впевненим, що ти дотримуєшся правил.
          </SubText>
        </IntroSection>

        <RightsGrid>
          <RightBlock>
            <FiFileText size={40} color="#E69500" style={{flexShrink: 0}} />
            <BlockContent>
              <BlockTitle>Право на отримання плати</BlockTitle>
              <BlockDescription>
                Отримання грошей: Найголовніше право власника — отримувати орендну плату вчасно та в повному обсязі, як ви домовились у договорі.
              </BlockDescription>
            </BlockContent>
          </RightBlock>

          <RightBlock>
            <FiFileText size={40} color="#E69500" style={{flexShrink: 0}} />
            <BlockContent>
              <BlockTitle>Право на відшкодування збитків</BlockTitle>
              <BlockDescription>
                <ul>
                   <li>Повернення всього цілого: Власник має право вимагати, щоб після закінчення оренди ти повернув квартиру в тому ж стані.</li>
                   <li>Застава (Депозит): Якщо ти щось пошкодиш (наприклад, зламаєш стіл), він може використати ці гроші на ремонт.</li>
                </ul>
              </BlockDescription>
            </BlockContent>
          </RightBlock>

          <RightBlock>
            <FiFileText size={40} color="#E69500" style={{flexShrink: 0}} />
            <BlockContent>
              <BlockTitle>Право на договір та правила</BlockTitle>
              <BlockDescription>
                Встановлення умов: Власник має право прописати у договорі всі умови: скільки можна жити, скільки коштує, хто платить за комунальні послуги тощо.
              </BlockDescription>
            </BlockContent>
          </RightBlock>

          <RightBlock>
            <FiFileText size={40} color="#E69500" style={{flexShrink: 0}} />
            <BlockContent>
              <BlockTitle>Головне:</BlockTitle>
              <BlockDescription>
                Права власника і твої права збалансовані. Ти маєш право жити спокійно, а він має право бути впевненим, що його майно ціле. Усі ці права найкраще працюють, коли вони чітко записані у договорі!
              </BlockDescription>
            </BlockContent>
          </RightBlock>
        </RightsGrid>

        <ActionButtonWrapper>
          <QuizButton onClick={() => setShowModal(true)}>
            Наступний розділ (Пройти тест)
          </QuizButton>
        </ActionButtonWrapper>

      </LandlordMain>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            {!showResult ? (
              <>
                <div style={{marginBottom: '10px', color: '#888', fontSize: '14px'}}>
                   Питання {currentQuestion + 1} з {questions.length}
                </div>
                <QuestionTitle>{questions[currentQuestion].question}</QuestionTitle>
                <OptionsList>
                  {questions[currentQuestion].options.map((option, index) => (
                    <OptionButton key={index} onClick={() => handleAnswer(index)}>
                      {option}
                    </OptionButton>
                  ))}
                </OptionsList>
              </>
            ) : (
              <ResultText>
                <h3>Тест завершено!</h3>
                <p>Твій результат: <b>{score}</b> з {questions.length} правильних.</p>
                <QuizButton onClick={closeTest}>Чудово, зрозуміло!</QuizButton>
              </ResultText>
            )}
          </ModalContent>
        </ModalOverlay>
      )}      
    </LandlordWrapper>
  );
};

export default LandlordRights;