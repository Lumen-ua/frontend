import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiDroplet, FiZap } from "react-icons/fi";
import { Wrapper, Header, Title, BackBtn, Main, Section, SectionTitle, Text, CalcBox, RangeContainer, RangeLabel, RangeInput, ResultBox } from './Consumption.styled';

const Consumption = () => {
  const navigate = useNavigate();
  const [water, setWater] = useState(2); // Куби води
  const [electricity, setElectricity] = useState(50); // кВт світла

  // Умовні ціни (ігрові)
  const waterRate = 30; // грн за куб
  const elecRateNormal = 2.64; // грн до 100 кВт
  const elecRateHigh = 4.50; // грн після 100 кВт (умовно)

  const totalWater = water * waterRate;
  const totalElec = electricity > 100 
    ? (100 * elecRateNormal) + ((electricity - 100) * elecRateHigh)
    : electricity * elecRateNormal;
  
  const totalBill = totalWater + totalElec;
  const isOverLimit = electricity > 100;

  return (
    <Wrapper>
      <Header>
        <Title>Норми споживання</Title>
        <BackBtn onClick={() => navigate('/legal')}>Вихід <FiArrowRight /></BackBtn>
      </Header>
      <Main>
        <Section>
          <SectionTitle>Що таке "Соціальна норма"?</SectionTitle>
          <Text>Це обсяг води чи світла, якого має вистачати людині для комфортного життя. Держава часто дає знижки (субсидії) лише на цей обсяг.</Text>
          <Text>Якщо ти використовуєш більше норми — ти платиш за "зайве" по повному (іноді дорожчому) тарифу.</Text>
        </Section>

        <Section>
          <SectionTitle>⚡ Симулятор платіжки</SectionTitle>
          <Text>Потягни повзунки і подивись, як різко зростає ціна, якщо "напалити" зайвого світла.</Text>
          
          <CalcBox>
            <RangeContainer>
              <RangeLabel>
                <span><FiDroplet /> Вода (м³)</span>
                <span>{water} м³</span>
              </RangeLabel>
              <RangeInput type="range" min="0" max="20" value={water} onChange={(e) => setWater(Number(e.target.value))} />
            </RangeContainer>

            <RangeContainer>
              <RangeLabel>
                <span><FiZap /> Електрика (кВт)</span>
                <span>{electricity} кВт</span>
              </RangeLabel>
              <RangeInput type="range" min="0" max="300" value={electricity} onChange={(e) => setElectricity(Number(e.target.value))} />
            </RangeContainer>

            <ResultBox isOver={isOverLimit}>
              <h4>Орієнтовна сума за місяць:</h4>
              <div className="price">{totalBill.toFixed(0)} грн</div>
              <div className="note">⚠️ Увага! Ви перевищили ліміт 100 кВт. Тариф зріс!</div>
            </ResultBox>
          </CalcBox>
        </Section>
      </Main>
    </Wrapper>
  );
};
export default Consumption;