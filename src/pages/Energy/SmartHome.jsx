import React from "react";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// ... (стилі)
const ArticlePage = styled.div`width: 100%; padding-bottom: 80px; color: var(--color-text);`;
const Container = styled.div`max-width: 800px; margin: 0 auto;`;
const BackButton = styled.button`display: flex; align-items: center; gap: 8px; background: none; border: none; font-size: 16px; font-weight: 700; color: var(--color-text-muted); cursor: pointer; margin-bottom: 24px; padding: 8px 0; &:hover { color: #166534; text-decoration: underline; }`;
const Title = styled.h1`font-size: 36px; font-weight: 900; margin-bottom: 32px; color: #166534;`;
const ContentBlock = styled.div`background: var(--color-surface); border: 2px solid var(--color-border); border-radius: var(--radius-3); padding: 32px; line-height: 1.6; font-size: 18px; box-shadow: var(--shadow-1); h2 { font-size: 24px; font-weight: 800; margin-top: 32px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; } p { margin-bottom: 16px; } ul { margin-left: 20px; margin-bottom: 24px; list-style-type: disc; } li { margin-bottom: 8px; } @media (max-width: 768px) { padding: 20px; }`;

export default function SmartHome() {
  const navigate = useNavigate();

  return (
    <ArticlePage>
      <Container>
        <BackButton onClick={() => navigate("/energy")}>
          <FiArrowLeft /> Повернутися до меню
        </BackButton>

        <Title>Розумний дім</Title>

        <ContentBlock>
          <p>Технології дозволяють автоматизувати економію. Вам навіть не треба думати про вимикачі.</p>

          <h2>1. Розумні розетки</h2>
          <p>Дозволяють налаштувати графік роботи для бойлера або обігрівача (наприклад, вмикати тільки вночі за нічним тарифом).</p>

          <h2>2. Термостати</h2>
          <p>Розумний термостат може знижувати температуру опалення, коли вас немає вдома, і нагрівати кімнати до вашого повернення.</p>

          <h2>3. Майстер-вимкнення</h2>
          <p>Один вимикач біля виходу, який знеструмлює все світло і некритичні розетки (праску, телевізор) одним натисканням.</p>
        </ContentBlock>
      </Container>
    </ArticlePage>
  );
}