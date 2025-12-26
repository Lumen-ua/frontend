import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFire } from "react-icons/fa6";

import heroImage1 from "../../assets/images/hero-image-1.webp";
import card1 from "../../assets/images/hero-card-1.webp";
import card2 from "../../assets/images/hero-card-2.webp";
import card3 from "../../assets/images/hero-card-3.webp";

import {
  Page,
  Container,
  Title,
  ProgressLabel,
  ProgressRow,
  ProgressBar,
  ProgressFill,
  ProgressPercent,
  SubTitle,
  Description,
  ScenarioCard,
  ScenarioLeft,
  ScenarioRight,
  ScenarioTitle,
  ScenarioText,
  ButtonsRow,
  PrimaryButton,
  SecondaryButton,
  CardsRow,
  MiniCard,
  MiniCardImage,
  MiniCardTitle,
  MiniCardText,
  MiniCardButton,
  MiniCardButtonDark,
} from "./DashboardPage.styled";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const prev = getComputedStyle(document.documentElement)
      .getPropertyValue("--app-bg")
      ?.trim();

    document.documentElement.style.setProperty("--app-bg", "#F4A629"); 

    return () => {
      document.documentElement.style.setProperty("--app-bg", prev || "#F4F3EE");
    };
  }, []);

  const progress = 10;

  const goToSimulations = () => navigate("/simulations");
  const goToEnergy = () => navigate("/energy");
  const goToPayments = () => navigate("/payments");

  return (
    <Page>
      <Container>
        <Title>Welcome back, UserName !</Title>

        <ProgressLabel as="p">
          <FaFire aria-hidden="true" focusable="false" />
          <span>Запальний прогрес: {progress}%</span>
        </ProgressLabel>

        <ProgressRow>
          <ProgressBar
            role="progressbar"
            aria-label="Запальний прогрес"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <ProgressFill style={{ width: `${progress}%` }} />
          </ProgressBar>
          <ProgressPercent aria-label={`Поточний прогрес ${progress}%`}>
            {progress}%
          </ProgressPercent>
        </ProgressRow>

        <SubTitle as="h2">Твоя платформа для дорослого життя.</SubTitle>
        <Description>
          Навчись оплачувати рахунки, економити та вирішувати побутові проблеми — без стресу.
        </Description>

        <ScenarioCard aria-labelledby="scenario-of-day-title">
          <ScenarioLeft>
            <ScenarioTitle id="scenario-of-day-title">Сценарій дня:</ScenarioTitle>
            <ScenarioText>
              <b>“Ти забув передати показники”</b>
              <br />
              Уяви, що ти місяць не передавав показники за світло. Що станеться з рахунком?
              Чи буде перерахунок? Чи нарахують пеню?
            </ScenarioText>

            <ButtonsRow>
              <PrimaryButton type="button" onClick={goToSimulations}>
                Запустити симуляцію
              </PrimaryButton>
              <SecondaryButton type="button" onClick={goToSimulations}>
                Обрати інший сценарій
              </SecondaryButton>
            </ButtonsRow>
          </ScenarioLeft>

          <ScenarioRight>
            <img
              src={heroImage1}
              alt="Ілюстрація: людина дивиться у телефон і хвилюється через побутову ситуацію"
            />
          </ScenarioRight>
        </ScenarioCard>

        <CardsRow aria-label="Швидкі дії">
          <MiniCard>
            <MiniCardImage src={card1} alt="Ілюстрація до розділу: базові навички" />
            <MiniCardTitle as="h3">Базові навички:</MiniCardTitle>
            <MiniCardText as="p">від кВт·год до платіжки</MiniCardText>

            <MiniCardText as="p" style={{ marginTop: 8 }}>
              Пройдено: <b>{progress}%</b>
            </MiniCardText>

            <MiniCardButton type="button" onClick={goToSimulations}>
              Продовжити навчання
            </MiniCardButton>
          </MiniCard>

          <MiniCard>
            <MiniCardImage
              src={card2}
              alt="Ілюстрація до розділу: економія та енергоефективність"
            />
            <MiniCardTitle as="h3">Економія та енергоефективність</MiniCardTitle>
            <MiniCardText as="p">
              Поради, скільки “з’їдає” кожен прилад і як зменшити витрати без дискомфорту.
            </MiniCardText>
            <MiniCardButtonDark type="button" onClick={goToEnergy}>
              Переглянути поради
            </MiniCardButtonDark>
          </MiniCard>

          <MiniCard>
            <MiniCardImage
              src={card3}
              alt="Ілюстрація до розділу: демо-оплата комунальних послуг"
            />
            <MiniCardTitle as="h3">Онлайн-оплата без помилок</MiniCardTitle>
            <MiniCardText as="p">
              Пройди демо-оплату: крок за кроком, як у банківському застосунку, але без реальних
              списань.
            </MiniCardText>
            <MiniCardButton type="button" onClick={goToPayments}>
              Спробувати демо-оплату
            </MiniCardButton>
          </MiniCard>
        </CardsRow>
      </Container>
    </Page>
  );
}



