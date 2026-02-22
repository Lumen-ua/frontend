import React from "react";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const ArticlePage = styled.div`width: 100%; padding-bottom: 80px; color: var(--color-text);`;
const Container = styled.div`max-width: 800px; margin: 0 auto;`;
const BackButton = styled.button`display: flex; align-items: center; gap: 8px; background: none; border: none; font-size: 16px; font-weight: 700; color: var(--color-text-muted); cursor: pointer; margin-bottom: 24px; padding: 8px 0; &:hover { color: #166534; text-decoration: underline; }`;
const Title = styled.h1`font-size: 36px; font-weight: 900; margin-bottom: 32px; color: #166534;`;
const ContentBlock = styled.div`background: var(--color-surface); border: 2px solid var(--color-border); border-radius: var(--radius-3); padding: 32px; line-height: 1.6; font-size: 18px; box-shadow: var(--shadow-1); h2 { font-size: 24px; font-weight: 800; margin-top: 32px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; } p { margin-bottom: 16px; } ul { margin-left: 20px; margin-bottom: 24px; list-style-type: disc; } li { margin-bottom: 8px; } @media (max-width: 768px) { padding: 20px; }`;

export default function Water() {
  const navigate = useNavigate();

  return (
    <ArticlePage>
      <Container>
        <BackButton onClick={() => navigate("/energy")}>
          <FiArrowLeft /> Повернутися до меню
        </BackButton>

        <Title>Вода та бойлер</Title>

        <ContentBlock>
          <p>Гаряча вода — один із найдорожчих ресурсів. Оптимізація тут дає миттєвий результат у платіжці.</p>

          <h2>1. Бойлер: не перегрівайте</h2>
          <p>Встановіть температуру на 55-60°C. Якщо вище — накип утворюється швидше, а енергії йде більше. Якщо нижче — можуть завестися бактерії.</p>

          <h2>2. Аератори на крани</h2>
          <p>Копійчана насадка на кран, яка змішує воду з повітрям. Струмінь залишається потужним, а витрата води падає вдвічі.</p>

          <h2>3. Душ замість ванни</h2>
          <p>Прийняття ванни — це 150-200 літрів води. Душ (5 хвилин) — це близько 30-50 літрів. Економія очевидна.</p>
        </ContentBlock>
      </Container>
    </ArticlePage>
  );
}