import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiDollarSign, FiAlertTriangle } from "react-icons/fi";
// Якщо є картинка комара, розкоментуй рядок нижче
// import mosquitoImg from '../../assets/images/mosquito_money.webp';

import {
  DebtsWrapper,
  DebtsHeader,
  HeaderTitle,
  DebtsMain,
  StorySection,
  ConceptBlock,
  MascotDecoration,
  SimulatorWrapper,
  ChatHeader,
  ChatBody,
  MessageBubble,
  ChatControls,
  ChoicesGrid,
  ChoiceButton,
  ResultBadge
} from './Debts.styled';

const Debts = () => {
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  // --- СТАН ЧАТУ ---
  const [messages, setMessages] = useState([
    { id: 1, author: 'Пані Олена (Власниця)', text: 'Доброго ранку! Сьогодні 5-те число. Нагадую, що чекаю оплату за квартиру (8000 грн).', isUser: false }
  ]);
  const [chatState, setChatState] = useState('start'); // етапи: start, waiting, success, fail

  // Автоскрол вниз
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- ЛОГІКА ВИБОРУ ---
  const handleChoice = (choice) => {
    // 1. Додаємо повідомлення юзера
    const userMsg = { id: Date.now(), author: 'Ви', text: choice.text, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setChatState('waiting');

    // 2. Відповідь "власниці" через 1.5 секунди
    setTimeout(() => {
      let responseText = "";
      let nextState = "";
      
      if (choice.type === 'honest') {
        responseText = "Дякую, що попередив заздалегідь! Добре, почекаю до 8-го. Пеню нараховувати не буду, але прошу більше не затримувати.";
        nextState = 'success';
      } else if (choice.type === 'silent') {
        responseText = "Гроші не прийшли. Згідно з договором, за кожен день затримки я нараховую 0.5% пені. Твій борг росте.";
        nextState = 'fail';
      } else if (choice.type === 'partial') {
        responseText = "Я отримала тільки частину. Ми так не домовлялися. Чому ти не попередив? Решту записую в борг + штраф.";
        nextState = 'fail';
      }

      const ownerMsg = { id: Date.now() + 1, author: 'Пані Олена', text: responseText, isUser: false };
      setMessages(prev => [...prev, ownerMsg]);
      setChatState(nextState);

    }, 1500);
  };

  const restartChat = () => {
    setMessages([{ id: 1, author: 'Пані Олена', text: 'Доброго ранку! Сьогодні 5-те число. Нагадую, що чекаю оплату за квартиру (8000 грн).', isUser: false }]);
    setChatState('start');
  };

  return (
    <DebtsWrapper>
      <DebtsHeader>
        <HeaderTitle>Борги та Пеня</HeaderTitle>
        <button 
          onClick={() => navigate('/legal')} 
          style={{background:'none', border:'none', cursor:'pointer', fontWeight:'bold', display:'flex', alignItems:'center', gap:'5px'}}
        >
           Вихід <FiArrowRight />
        </button>
      </DebtsHeader>

      <DebtsMain>
        {/* --- ТЕОРІЯ --- */}
        <StorySection>
          <ConceptBlock>
            <h3><FiDollarSign /> Борг (Debt)</h3>
            <p><strong>Що це?</strong> Це гроші, які ти мав заплатити, але не заплатив вчасно.</p>
            <ul>
              <li>Оренда: Якщо не заплатив до 5-го числа, 6-го це стає боргом.</li>
              <li>Наслідки: Якщо борг росте, власник може розірвати договір.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock>
            <h3><FiAlertTriangle /> Пеня (Penalty)</h3>
            <p>Це <strong>додатковий штраф</strong> за запізнення. Як квиток, що дорожчає в останній момент.</p>
            <ul>
              <li><strong>Правило:</strong> "За кожен день прострочення +0.5% від суми".</li>
              <li><strong>Приклад:</strong> Запізнився на 10 днів з 8000 грн? Заплатиш 8400 грн!</li>
            </ul>
          </ConceptBlock>

          <MascotDecoration>
            {/* <img src={mosquitoImg} alt="Комар" style={{width: '100%'}} /> */}
            🦟
          </MascotDecoration>
        </StorySection>

        {/* --- СИМУЛЯТОР --- */}
        <h2 style={{textAlign: 'center', marginBottom: '10px'}}>🔥 Симулятор: Уникни пені!</h2>
        <p style={{textAlign: 'center', marginBottom: '20px', color: '#666'}}>
          Ситуація: У тебе не вистачає 500 грн. Зарплата буде через 3 дні. <br/>
          Твоя ціль: Відповісти так, щоб не втратити гроші.
        </p>

        <SimulatorWrapper>
          <ChatHeader>
            <div style={{marginRight:'10px'}}>👩‍💼</div> Пані Олена (Власниця)
          </ChatHeader>

          <ChatBody>
            {messages.map(msg => (
              <MessageBubble key={msg.id} isUser={msg.isUser} author={msg.author}>
                {msg.text}
              </MessageBubble>
            ))}
            <div ref={chatEndRef} />
          </ChatBody>
          
          <ChatControls>
            {chatState === 'start' && (
              <ChoicesGrid>
                <ChoiceButton onClick={() => handleChoice({ text: '(Ігнорувати і заплатити пізніше)', type: 'silent' })}>
                  🤐 Промовчати. Заплачу через 3 дні, коли прийде ЗП.
                </ChoiceButton>

                <ChoiceButton onClick={() => handleChoice({ text: 'Скидаю все, що є (7500 грн). Решту потім.', type: 'partial' })}>
                  💸 Скинути 7500 грн мовчки. Може не помітить?
                </ChoiceButton>

                <ChoiceButton onClick={() => handleChoice({ text: 'Добрий день! ЗП затримують. Можна я заплачу повну суму 8-го числа?', type: 'honest' })}>
                  🤝 Попередити чесно і попросити почекати.
                </ChoiceButton>
              </ChoicesGrid>
            )}

            {chatState === 'waiting' && <p style={{textAlign: 'center', color: '#999'}}>Пані Олена пише...</p>}

            {chatState === 'success' && (
              <ResultBadge type="good">
                🎉 Перемога! <br/>
                Чесне попередження працює краще, ніж мовчання. Ти зекономив на пені!
                <br/><button onClick={restartChat} style={{marginTop:'10px', padding:'5px 10px', cursor:'pointer'}}>Спробувати ще раз</button>
              </ResultBadge>
            )}

            {chatState === 'fail' && (
              <ResultBadge type="bad">
                💸 Провал! <br/>
                Тобі нарахували штраф. Ніколи не мовчи, якщо не можеш заплатити вчасно.
                <br/><button onClick={restartChat} style={{marginTop:'10px', padding:'5px 10px', cursor:'pointer'}}>Спробувати ще раз</button>
              </ResultBadge>
            )}

          </ChatControls>
        </SimulatorWrapper>

      </DebtsMain>
    </DebtsWrapper>
  );
};

export default Debts;