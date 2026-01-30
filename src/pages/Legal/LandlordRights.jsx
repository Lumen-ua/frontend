import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiFileText } from "react-icons/fi"; // Іконка документа

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
  // Модальні стилі
  ModalOverlay,
  ModalContent,
  QuestionTitle,
  OptionsList,
  OptionButton,
  ResultText
} from './LandlordRights.styled';

const LandlordRights = () => {
  const navigate = useNavigate();
  
  // --- СТАНИ ДЛЯ ТЕСТУ ---
  const [showModal, setShowModal] = useState(false); // Чи відкрито вікно
  const [currentQuestion, setCurrentQuestion] = useState(0); // Яке питання показуємо
  const [score, setScore] = useState(0); // Рахунок
  const [showResult, setShowResult] = useState(false); // Чи показувати фінал

  // --- ДАНІ ДЛЯ ТЕСТУ (4 питання) ---
  const questions = [
    {
      question: "Яке найголовніше право власника?",
      options: [
        "Заходити в квартиру коли завгодно",
        "Отримувати орендну плату вчасно",
        "Змінювати замки без попередження",
        "Зберігати речі орендаря собі"
      ],
      correct: 1 // Індекс правильної відповіді (починаючи з 0)
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

  // --- ЛОГІКА ТЕСТУ ---
  const handleAnswer = (index) => {
    // Перевірка відповіді
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true); // Показати результат
    }
  };

  const closeTest = () => {
    setShowModal(false);
    navigate('/legal'); // Після тесту повертаємо в меню
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

        {/* СІТКА З ПРАВАМИ */}
        <RightsGrid>
          {/* Блок 1 */}
          <RightBlock>
            <FiFileText size={40} color="#E69500" style={{flexShrink: 0}} />
            <BlockContent>
              <BlockTitle>Право на отримання плати</BlockTitle>
              <BlockDescription>
                Отримання грошей: Найголовніше право власника — отримувати орендну плату вчасно та в повному обсязі, як ви домовились у договорі.
              </BlockDescription>
            </BlockContent>
          </RightBlock>

          {/* Блок 2 */}
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

          {/* Блок 3 */}
          <RightBlock>
            <FiFileText size={40} color="#E69500" style={{flexShrink: 0}} />
            <BlockContent>
              <BlockTitle>Право на договір та правила</BlockTitle>
              <BlockDescription>
                Встановлення умов: Власник має право прописати у договорі всі умови: скільки можна жити, скільки коштує, хто платить за комунальні послуги тощо.
              </BlockDescription>
            </BlockContent>
          </RightBlock>

          {/* Блок 4 (Підсумок) */}
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

      {/* --- МОДАЛЬНЕ ВІКНО (POP-UP) --- */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            {!showResult ? (
              // Показуємо питання
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
              // Показуємо результат
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