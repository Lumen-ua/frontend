import React from "react";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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

export default function Lighting() {
  const navigate = useNavigate();

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