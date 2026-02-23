import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Іконки
import { FiArrowLeft, FiMail, FiMessageCircle, FiFileText, FiPenTool, FiCheck, FiX, FiInfo } from "react-icons/fi";
import { BsEmojiSunglasses } from "react-icons/bs"; 
import { MdGavel } from "react-icons/md";

import {
  Wrapper, Header, BackBtn, Main,
  SectionTitle, CardsGrid, InfoCard,
  FunFactBox,
  ConstructorWrapper, ToolsArea, StepCard, Option, PaperPreview, InfoSection
} from './Communication.styled';

const Communication = () => {
  const navigate = useNavigate();
  
  // Стан для конструктора
  const [header, setHeader] = useState('');
  const [body, setBody] = useState('');
  const [footer, setFooter] = useState('');

  return (
    <Wrapper>
      <Header>
        <h2 style={{fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px'}}>
            <FiPenTool /> Юридичне листування
        </h2>
        <BackBtn onClick={() => navigate('/legal')}>
            <FiArrowLeft /> Вихід
        </BackBtn>
      </Header>

      <Main>
        
        {/* --- СЕКЦІЯ 1: ТЕОРІЯ (ХІТ-ПАРАД КАНАЛІВ ЗВ'ЯЗКУ) --- */}
        <InfoSection>
            <SectionTitle>Де краще спілкуватися? <span>(Рейтинг суду)</span></SectionTitle>
            <CardsGrid>
                <InfoCard color="#FF5252">
                    <h3><FiMessageCircle size={24} color="#FF5252"/> Месенджери</h3>
                    <p><strong>(Viber, Telegram)</strong><br/> Найшвидше, але найризикованіше. Повідомлення можна видалити або відредагувати. Суд приймає скріншоти, але їх легко підробити.</p>
                </InfoCard>

                <InfoCard color="#F59E0B">
                    <h3><FiMail size={24} color="#F59E0B"/> Електронна пошта</h3>
                    <p><strong>(E-mail)</strong><br/> Золотий стандарт. Листи не можна видалити у отримувача "заднім числом". Ідеально для домовленостей про оплату чи ремонт.</p>
                </InfoCard>

                <InfoCard color="#4CAF50">
                    <h3><FiFileText size={24} color="#4CAF50"/> Заказний лист</h3>
                    <p><strong>(Укрпошта)</strong><br/> "Ядерна зброя". Використовується для розірвання договору або претензій. Якщо у вас є "корінець" про вручення — ви переможець.</p>
                </InfoCard>
            </CardsGrid>

            {/* --- СЕКЦІЯ 2: ЦІКАВИЙ ФАКТ --- */}
            <FunFactBox>
                <BsEmojiSunglasses size={40} />
                <div>
                    <h4>А ти знав? Емодзі мають силу! 👍</h4>
                    <p>
                        У 2023 році канадський суд визнав емодзі "палець вгору" (👍) у відповідь на надісланий контракт як <strong>офіційний цифровий підпис</strong>. 
                        Це означало згоду з умовами. Тож обережно зі смайликами власнику!
                    </p>
                </div>
            </FunFactBox>
        </InfoSection>

        {/* --- СЕКЦІЯ 3: КОНСТРУКТОР --- */}
        <SectionTitle>📝 Конструктор: Акт прийому-передачі</SectionTitle>
        <p style={{textAlign: 'center', marginBottom: '30px', color: '#666'}}>
            Склади правильний документ, щоб зафіксувати стан квартири і захистити свій депозит.
        </p>

        <ConstructorWrapper>
            
            {/* Ліва колонка: Інструменти */}
            <ToolsArea>
                <StepCard>
                    <h4>1. Шапка документа</h4>
                    <Option isSelected={header.includes('АКТ')} onClick={() => setHeader('АКТ ПРИЙОМУ-ПЕРЕДАЧІ КВАРТИРИ\nм. Київ, 01.01.2025')}>
                        <FiCheck color={header.includes('АКТ') ? '#F59E0B' : '#ccc'}/> 
                        Офіційна назва, місто, дата
                    </Option>
                    <Option isSelected={header.includes('Привіт')} onClick={() => setHeader('Привіт! Це акт про квартиру.\nСьогоднішнє число')}>
                        <FiX color={header.includes('Привіт') ? '#FF5252' : '#ccc'}/> 
                        Неформальне вітання
                    </Option>
                </StepCard>

                <StepCard>
                    <h4>2. Опис майна (Тіло)</h4>
                    <Option isSelected={body.includes('задовільному')} onClick={() => setBody('Квартира передається у задовільному стані. \n\nПОКАЗНИКИ:\n- Електрика: 004500\n- Вода: 00120\n\nНЕДОЛІКИ:\n- Подряпина на дверях (фото додається).\n- Пляма на дивані.')}>
                        <FiCheck color={body.includes('задовільному') ? '#F59E0B' : '#ccc'}/> 
                        Детально: стан + показники + недоліки
                    </Option>
                    <Option isSelected={body.includes('норм')} onClick={() => setBody('Квартира норм. Меблі є. Все ок.')}>
                        <FiX color={body.includes('норм') ? '#FF5252' : '#ccc'}/> 
                        "Квартира норм" (Занадто розмито)
                    </Option>
                </StepCard>

                <StepCard>
                    <h4>3. Фінал (Підпис)</h4>
                    <Option isSelected={footer.includes('Підписи')} onClick={() => setFooter('Сторони претензій одна до одної не мають.\n\nПІДПИСИ:\nВласник: ___________   Орендар: ___________')}>
                        <FiCheck color={footer.includes('Підписи') ? '#F59E0B' : '#ccc'}/> 
                        Підписи сторін (Обов'язково!)
                    </Option>
                    <Option isSelected={footer.includes('Бувай')} onClick={() => setFooter('На цьому все. Дзвони, якщо що!')}>
                        <FiX color={footer.includes('Бувай') ? '#FF5252' : '#ccc'}/> 
                        Просте прощання
                    </Option>
                </StepCard>
            </ToolsArea>

            {/* Права колонка: Результат (Папір) */}
            <PaperPreview>
                {header || body || footer ? (
                    <>
                        <h3 style={{whiteSpace: 'pre-wrap'}}>{header}</h3>
                        <p style={{whiteSpace: 'pre-wrap'}}>{body}</p>
                        <div style={{whiteSpace: 'pre-wrap', marginTop: '50px', fontWeight: 'bold'}}>{footer}</div>
                        
                        {/* Декор: Печатка з'являється, коли все заповнено правильно */}
                        {header.includes('АКТ') && body.includes('задовільному') && footer.includes('Підписи') && (
                            <div className="stamp-placeholder">
                                ДОКУМЕНТ<br/>СХВАЛЕНО<br/>LUMEN
                            </div>
                        )}
                    </>
                ) : (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc'}}>
                        <MdGavel size={60} style={{marginBottom: '20px', opacity: 0.5}}/>
                        <p>Обери пункти зліва, щоб сформувати документ</p>
                    </div>
                )}
            </PaperPreview>

        </ConstructorWrapper>

      </Main>
    </Wrapper>
  );
};

export default Communication;