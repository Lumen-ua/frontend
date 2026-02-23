import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Імпорт нових іконок
import { FiArrowLeft, FiCheckCircle, FiTool, FiHome, FiUser } from "react-icons/fi";
import { GiBrickWall, GiBrokenBottle, GiTap, GiLightBulb } from "react-icons/gi";
import { MdOutlineCleaningServices, MdHandyman } from "react-icons/md";

import {
  Wrapper, Header, BackBtn, Main,
  // Нові стилі для вступу
  IntroSection, IntroTitle, RulesContainer, RuleCard, IconHeader, CardTitle, RuleList,
  DecorationBlob1, DecorationBlob2,
  // Стилі гри
  GameSectionTitle, GameArea, TaskCard, ButtonsRow, OptionBtn, ScoreBoard, Feedback
} from './RepairsGame.styled';

const RepairsGame = () => {
  const navigate = useNavigate();
  
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

  const handleAnswer = (isOwnerSelected) => {
    const isCorrect = questions[current].owner === isOwnerSelected;
    
    if (isCorrect) {
      setScore(score + 1);
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
        {/* Декоративні фонові елементи */}
        <DecorationBlob1 />
        <DecorationBlob2 />

        {/* --- НОВА ВСТУПНА СЕКЦІЯ (ШПАРГАЛКА) --- */}
        <IntroSection>
            <IntroTitle>Головне правило: "Капітальне vs Поточне"</IntroTitle>
            
            <RulesContainer>
                {/* Картка Власника */}
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

                {/* Картка Орендаря */}
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

        {/* --- СЕКЦІЯ ГРИ --- */}
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