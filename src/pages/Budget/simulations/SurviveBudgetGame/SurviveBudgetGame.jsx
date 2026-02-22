import React, { useMemo, useState } from "react";
import {
  Wrap,
  Header,
  TitleRow,
  Icon,
  Title,
  Sub,
  Card,
  GoalBar,
  GoalItem,
  GoalDot,
  GoalText,
  Layout,
  Left,
  Right,
  BlockTitle,
  BudgetBox,
  SliderCard,
  SliderTop,
  SliderName,
  SliderValue,
  RangeRow,
  MiniBtn,
  Paragraph,
  Range,
  RangeHint,
  ToggleRow,
  ToggleBtn,
  DangerChip,
  SummaryCard,
  SummaryTitle,
  BigNumber,
  SummaryGrid,
  SummaryStat,
  StatLabel,
  StatValue,
  ReserveCard,
  Piggy,
  ResultRow,
  ResultPill,
  Advice,
  AdviceTitle,
  AdviceList,
  ActionRow,
  PrimaryBtn,
  SecondaryBtn,
  Divider,
} from "./SurviveBudgetGame.styled";

const fmt = (n) =>
  new Intl.NumberFormat("uk-UA", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(n));

export default function SurviveBudgetGame() {
  const income = 18000;

  const [utilities, setUtilities] = useState(3500);
  const [food, setFood] = useState(5000);
  const [transport, setTransport] = useState(1800);

  const [repairEnabled, setRepairEnabled] = useState(true);
  const [repairCost, setRepairCost] = useState(1600);

  const reserveTarget = 1000;

  const totals = useMemo(() => {
    const repair = repairEnabled ? repairCost : 0;
    const spent = utilities + food + transport + repair;
    const balance = income - spent; 
    const reserve = Math.max(0, balance); 
    const isPositive = balance >= 0;
    const hasReserve = reserve >= reserveTarget;

    const tips = [];
    if (!isPositive) tips.push("Ти пішов(ла) в мінус: зменш змінні витрати або вимкни подію ремонту.");
    if (isPositive && !hasReserve) tips.push("Баланс позитивний, але резерв замалий — спробуй урізати змінні витрати.");
    if (utilities > 4000) tips.push("Комуналка висока: перевір споживання/резерв +15% і сезонність.");
    if (food > 6000) tips.push("Продукти — найбільша стаття: спробуй встановити ліміт або план покупок.");
    if (transport > 2500) tips.push("Транспорт високий: подумай про проїзний/оптимізацію поїздок.");
    if (repairEnabled) tips.push("Несподіваний ремонт — типова причина “мінуса”. Резерв потрібен саме для цього.");

    return { repair, spent, balance, reserve, isPositive, hasReserve, tips };
  }, [utilities, food, transport, repairEnabled, repairCost]);

  const statusLabel = totals.balance < 0 ? "Мінус" : totals.hasReserve ? "Успіх" : "Ок, але мало резерву";

  const reset = () => {
    setUtilities(3500);
    setFood(5000);
    setTransport(1800);
    setRepairEnabled(true);
    setRepairCost(1600);
  };

  return (
    <Wrap>
      <Header>
        <TitleRow>
          <Icon>🎮</Icon>
          <div>
            <Title>Гра: “Виживи з бюджетом”</Title>
            <Sub>Твоя мета: не піти в мінус і створити резерв (мінімум {fmt(reserveTarget)} грн)</Sub>
          </div>
        </TitleRow>

        <GoalBar>
          <GoalItem $ok={totals.isPositive}>
            <GoalDot $ok={totals.isPositive}>{totals.isPositive ? "✔" : "!"}</GoalDot>
            <GoalText>Баланс ≥ 0</GoalText>
          </GoalItem>

          <GoalItem $ok={totals.hasReserve}>
            <GoalDot $ok={totals.hasReserve}>{totals.hasReserve ? "✔" : "!"}</GoalDot>
            <GoalText>Резерв ≥ {fmt(reserveTarget)} грн</GoalText>
          </GoalItem>
        </GoalBar>
      </Header>

      <Card>
        <Layout>
          {/* LEFT: Inputs */}
          <Left>
            <BlockTitle>1) Твої витрати</BlockTitle>

            <BudgetBox>
              {/* Комуналка */}
              <SliderCard>
                <SliderTop>
                  <SliderName>Комуналка</SliderName>
                  <SliderValue>{fmt(utilities)} грн</SliderValue>
                </SliderTop>

                <RangeRow>
                  <MiniBtn type="button" onClick={() => setUtilities((v) => Math.max(2500, v - 100))}>
                    −
                  </MiniBtn>
                  <Range
                    type="range"
                    min="2500"
                    max="4500"
                    step="100"
                    value={utilities}
                    onChange={(e) => setUtilities(Number(e.target.value))}
                  />
                  <MiniBtn type="button" onClick={() => setUtilities((v) => Math.min(4500, v + 100))}>
                    +
                  </MiniBtn>
                </RangeRow>
                <RangeHint>Діапазон: 2500–4500 грн</RangeHint>
              </SliderCard>

              {/* Продукти */}
              <SliderCard>
                <SliderTop>
                  <SliderName>Продукти</SliderName>
                  <SliderValue>{fmt(food)} грн</SliderValue>
                </SliderTop>

                <RangeRow>
                  <MiniBtn type="button" onClick={() => setFood((v) => Math.max(3000, v - 200))}>
                    −
                  </MiniBtn>
                  <Range
                    type="range"
                    min="3000"
                    max="7000"
                    step="200"
                    value={food}
                    onChange={(e) => setFood(Number(e.target.value))}
                  />
                  <MiniBtn type="button" onClick={() => setFood((v) => Math.min(7000, v + 200))}>
                    +
                  </MiniBtn>
                </RangeRow>
                <RangeHint>Діапазон: 3000–7000 грн</RangeHint>
              </SliderCard>

              {/* Транспорт */}
              <SliderCard>
                <SliderTop>
                  <SliderName>Транспорт</SliderName>
                  <SliderValue>{fmt(transport)} грн</SliderValue>
                </SliderTop>

                <RangeRow>
                  <MiniBtn type="button" onClick={() => setTransport((v) => Math.max(1000, v - 100))}>
                    −
                  </MiniBtn>
                  <Range
                    type="range"
                    min="1000"
                    max="3000"
                    step="100"
                    value={transport}
                    onChange={(e) => setTransport(Number(e.target.value))}
                  />
                  <MiniBtn type="button" onClick={() => setTransport((v) => Math.min(3000, v + 100))}>
                    +
                  </MiniBtn>
                </RangeRow>
                <RangeHint>Діапазон: 1000–3000 грн</RangeHint>
              </SliderCard>

              {/* Несподіваний ремонт */}
              <SliderCard>
                <SliderTop>
                  <SliderName>Несподіваний ремонт</SliderName>
                  <SliderValue>{repairEnabled ? `${fmt(repairCost)} грн` : "вимкнено"}</SliderValue>
                </SliderTop>

                <ToggleRow>
                  <ToggleBtn
                    type="button"
                    $active={repairEnabled}
                    onClick={() => setRepairEnabled(true)}
                  >
                    Є подія
                  </ToggleBtn>
                  <ToggleBtn
                    type="button"
                    $active={!repairEnabled}
                    onClick={() => setRepairEnabled(false)}
                  >
                    Нема події
                  </ToggleBtn>

                  <DangerChip>⚠ подія</DangerChip>
                </ToggleRow>

                <RangeRow>
                  <MiniBtn
                    type="button"
                    onClick={() => setRepairCost((v) => Math.max(0, v - 200))}
                    disabled={!repairEnabled}
                    aria-disabled={!repairEnabled}
                  >
                    −
                  </MiniBtn>
                  <Range
                    type="range"
                    min="0"
                    max="3000"
                    step="200"
                    value={repairCost}
                    onChange={(e) => setRepairCost(Number(e.target.value))}
                    disabled={!repairEnabled}
                  />
                  <MiniBtn
                    type="button"
                    onClick={() => setRepairCost((v) => Math.min(3000, v + 200))}
                    disabled={!repairEnabled}
                    aria-disabled={!repairEnabled}
                  >
                    +
                  </MiniBtn>
                </RangeRow>

                <RangeHint>Діапазон: 0–3000 грн</RangeHint>
              </SliderCard>
            </BudgetBox>

            <ActionRow>
              <PrimaryBtn type="button" onClick={() => { /* авто-перерахунок і так є */ }}>
                Перерахувати
              </PrimaryBtn>
              <SecondaryBtn type="button" onClick={reset}>
                Скинути
              </SecondaryBtn>
            </ActionRow>
          </Left>

          {/* RIGHT: Summary */}
          <Right>
            <BlockTitle>2) Твій бюджет</BlockTitle>

            <SummaryCard>
              <SummaryTitle>Підсумок</SummaryTitle>

              <BigNumber $neg={totals.balance < 0}>
                {totals.balance < 0 ? "−" : "+"}
                {fmt(Math.abs(totals.balance))} <span>грн</span>
              </BigNumber>

              <Divider />

              <SummaryGrid>
                <SummaryStat>
                  <StatLabel>Дохід</StatLabel>
                  <StatValue>{fmt(income)} грн</StatValue>
                </SummaryStat>
                <SummaryStat>
                  <StatLabel>Витрати</StatLabel>
                  <StatValue>{fmt(totals.spent)} грн</StatValue>
                </SummaryStat>
                <SummaryStat>
                  <StatLabel>Комуналка</StatLabel>
                  <StatValue>{fmt(utilities)} грн</StatValue>
                </SummaryStat>
                <SummaryStat>
                  <StatLabel>Подія ремонту</StatLabel>
                  <StatValue>{totals.repair ? `${fmt(totals.repair)} грн` : "—"}</StatValue>
                </SummaryStat>
              </SummaryGrid>

              <ResultRow>
                <ResultPill $kind={statusLabel}>{statusLabel}</ResultPill>
                <ResultPill $kind="info">
                  Резерв: {fmt(totals.reserve)} грн
                </ResultPill>
              </ResultRow>
            </SummaryCard>

            <ReserveCard>
              <Piggy>🐷</Piggy>
              <div>
                <SummaryTitle>Резерв (запасний фонд)</SummaryTitle>
                <Paragraph>
                  Резерв у цій грі = <b>позитивний залишок</b>. Він потрібен, щоб пережити несподівані витрати
                  без боргів.
                </Paragraph>
                <Paragraph>
                  Ціль: <b>{fmt(reserveTarget)} грн+</b>. Зараз: <b>{fmt(totals.reserve)} грн</b>.
                </Paragraph>
              </div>
            </ReserveCard>

            <Advice>
              <AdviceTitle>Підказки системи</AdviceTitle>
              <AdviceList>
                {totals.tips.slice(0, 5).map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </AdviceList>
            </Advice>
          </Right>
        </Layout>
      </Card>
    </Wrap>
  );
}