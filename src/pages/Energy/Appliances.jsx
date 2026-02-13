import React from "react";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// ... (стилі ті самі, що і вище)
const ArticlePage = styled.div`width: 100%; padding-bottom: 80px; color: var(--color-text);`;
const Container = styled.div`max-width: 800px; margin: 0 auto;`;
const BackButton = styled.button`display: flex; align-items: center; gap: 8px; background: none; border: none; font-size: 16px; font-weight: 700; color: var(--color-text-muted); cursor: pointer; margin-bottom: 24px; padding: 8px 0; &:hover { color: #166534; text-decoration: underline; }`;
const Title = styled.h1`font-size: 36px; font-weight: 900; margin-bottom: 32px; color: #166534;`;
const ContentBlock = styled.div`background: var(--color-surface); border: 2px solid var(--color-border); border-radius: var(--radius-3); padding: 32px; line-height: 1.6; font-size: 18px; box-shadow: var(--shadow-1); h2 { font-size: 24px; font-weight: 800; margin-top: 32px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; } p { margin-bottom: 16px; } ul { margin-left: 20px; margin-bottom: 24px; list-style-type: disc; } li { margin-bottom: 8px; } @media (max-width: 768px) { padding: 20px; }`;

export default function Appliances() {
  const navigate = useNavigate();

  return (
    <ArticlePage>
      <Container>
        <BackButton onClick={() => navigate("/energy")}>
          <FiArrowLeft /> Повернутися до меню
        </BackButton>

        <Title>Побутова техніка</Title>

        <ContentBlock>
          <p>Сучасна техніка може бути економною, якщо її правильно використовувати. Клас енергоефективності A+++ — це не просто маркетинг.</p>

          <h2>1. Холодильник</h2>
          <ul>
            <li>Не ставте його поруч із плитою або батареєю.</li>
            <li>Регулярно розморожуйте (лід працює як ізолятор холоду).</li>
            <li>Не ставте всередину гарячі страви.</li>
          </ul>

          <h2>2. Пральна машина</h2>
          <p>90% енергії йде на нагрів води. Прання при 30-40°C замість 60°C економить купу енергії, а сучасні порошки чудово перуть і в прохолодній воді.</p>

          <h2>3. Еко-режими</h2>
          <p>Майже вся сучасна техніка має режим "Eco". Він займає більше часу, але споживає значно менше води та електрики.</p>
        </ContentBlock>
      </Container>
    </ArticlePage>
  );
}