import React, { useMemo, useState } from "react";
import {
  Wrap,
  Head,
  Title,
  Sub,
  Card,
  StepTitle,
  ScenarioGrid,
  ScenarioItem,
  ScenarioLabelRow,
  StepBadge,
  ScenarioName,
  ScenarioValue,
  ControlRow,
  MiniBtn,
  Range,
  SmallHint,
  ActionRow,
  PrimaryBtn,
  ResultBlock,
  ResultGrid,
  ResultCard,
  ResultIcon,
  ResultValue,
  ResultCaption,
  CompareCard,
  CompareTop,
  CompareTitle,
  BarWrap,
  Bar,
  BarValue,
  BarLabel,
  DiffPill,
  Note,
  NoteDot,
  NoteText,
  Divider,
  InputRow,
  InputLabel,
  Input,
} from "./WhatIfSim.styled";

const fmtMoney = (n) =>
  new Intl.NumberFormat("uk-UA", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(n));

const fmtKwh = (n) =>
  new Intl.NumberFormat("uk-UA", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(n));

export default function WhatIfSim() {
  const [power, setPower] = useState(2); 
  const [hours, setHours] = useState(8); 
  const [days, setDays] = useState(30); 
  const [tariff, setTariff] = useState(2.64); 
  const [baseBill, setBaseBill] = useState(836); 

  const [isCalculated, setIsCalculated] = useState(false);

  const calc = useMemo(() => {
    const extraKwh = power * hours * days; 
    const extraMoney = extraKwh * tariff; 
    const after = baseBill + extraMoney; 
    return { extraKwh, extraMoney, after };
  }, [power, hours, days, tariff, baseBill]);

  const onCalculate = () => setIsCalculated(true);
  const onReset = () => {
    setPower(2);
    setHours(8);
    setDays(30);
    setTariff(2.64);
    setBaseBill(836);
    setIsCalculated(false);
  };

  const maxBar = Math.max(baseBill, calc.after);
  const baseH = maxBar ? (baseBill / maxBar) * 100 : 0;
  const afterH = maxBar ? (calc.after / maxBar) * 100 : 0;

  return (
    <Wrap>
      <Head>
        <Title>Симуляція: “Що буде якщо…”</Title>
        <Sub>
          Встанови параметри обігрівача та подивись, як зміниться рахунок. Симулятор порахує
          <b> додаткові кВт·год</b> і <b>додаткову суму</b>.
        </Sub>
      </Head>

      <Card>
        <StepTitle>
          <StepBadge>1</StepBadge> Ваш сценарій
        </StepTitle>

        <ScenarioGrid>
          {/* Потужність */}
          <ScenarioItem>
            <ScenarioLabelRow>
              <StepBadge $small>1</StepBadge>
              <ScenarioName>Обігрівач</ScenarioName>
            </ScenarioLabelRow>

            <ScenarioValue>
              <b>{power}</b> кВт
            </ScenarioValue>

            <ControlRow>
              <MiniBtn
                type="button"
                onClick={() => setPower((p) => Math.max(0.5, +(p - 0.5).toFixed(1)))}
                aria-label="Зменшити потужність"
              >
                −
              </MiniBtn>

              <Range
                type="range"
                min="0.5"
                max="3.5"
                step="0.5"
                value={power}
                onChange={(e) => setPower(Number(e.target.value))}
              />

              <MiniBtn
                type="button"
                onClick={() => setPower((p) => Math.min(3.5, +(p + 0.5).toFixed(1)))}
                aria-label="Збільшити потужність"
              >
                +
              </MiniBtn>
            </ControlRow>

            <SmallHint>потужність (кВт)</SmallHint>
          </ScenarioItem>

          {/* Години */}
          <ScenarioItem>
            <ScenarioLabelRow>
              <StepBadge $small>2</StepBadge>
              <ScenarioName>На годин</ScenarioName>
            </ScenarioLabelRow>

            <ScenarioValue>
              <b>{hours}</b> годин в день
            </ScenarioValue>

            <ControlRow>
              <MiniBtn
                type="button"
                onClick={() => setHours((h) => Math.max(1, h - 1))}
                aria-label="Зменшити години"
              >
                −
              </MiniBtn>

              <Range
                type="range"
                min="1"
                max="16"
                step="1"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
              />

              <MiniBtn
                type="button"
                onClick={() => setHours((h) => Math.min(16, h + 1))}
                aria-label="Збільшити години"
              >
                +
              </MiniBtn>
            </ControlRow>

            <SmallHint>годин/день</SmallHint>
          </ScenarioItem>

          {/* Дні */}
          <ScenarioItem>
            <ScenarioLabelRow>
              <StepBadge $small>3</StepBadge>
              <ScenarioName>Протягом днів</ScenarioName>
            </ScenarioLabelRow>

            <ScenarioValue>
              <b>{days}</b> днів
            </ScenarioValue>

            <ControlRow>
              <MiniBtn
                type="button"
                onClick={() => setDays((d) => Math.max(1, d - 1))}
                aria-label="Зменшити дні"
              >
                −
              </MiniBtn>

              <Range
                type="range"
                min="1"
                max="31"
                step="1"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              />

              <MiniBtn
                type="button"
                onClick={() => setDays((d) => Math.min(31, d + 1))}
                aria-label="Збільшити дні"
              >
                +
              </MiniBtn>
            </ControlRow>

            <SmallHint>днів/місяць</SmallHint>
          </ScenarioItem>
        </ScenarioGrid>

        <Divider />

        {/* Налаштування тарифу та "до" */}
        <InputRow>
          <div>
            <InputLabel>Тариф (грн/кВт·год)</InputLabel>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={tariff}
              onChange={(e) => setTariff(Number(e.target.value))}
            />
          </div>

          <div>
            <InputLabel>Поточна сума “До” (грн)</InputLabel>
            <Input
              type="number"
              step="1"
              min="0"
              value={baseBill}
              onChange={(e) => setBaseBill(Number(e.target.value))}
            />
          </div>
        </InputRow>

        <ActionRow>
          <PrimaryBtn type="button" onClick={onCalculate}>
            Порахувати
          </PrimaryBtn>
          <PrimaryBtn type="button" $secondary onClick={onReset}>
            Скинути
          </PrimaryBtn>
        </ActionRow>

        {/* РЕЗУЛЬТАТ */}
        {isCalculated ? (
          <ResultBlock>
            <StepTitle>
              <StepBadge>4</StepBadge> Результат
            </StepTitle>

            <ResultGrid>
              <ResultCard>
                <ResultIcon>⚡</ResultIcon>
                <ResultValue>
                  + {fmtKwh(calc.extraKwh)} <span>кВт·год</span>
                </ResultValue>
                <ResultCaption>додаткове споживання</ResultCaption>
              </ResultCard>

              <ResultCard>
                <ResultIcon>💰</ResultIcon>
                <ResultValue>
                  + {fmtMoney(calc.extraMoney)} <span>грн</span>
                </ResultValue>
                <ResultCaption>до поточної суми</ResultCaption>
              </ResultCard>

              <CompareCard>
                <CompareTop>
                  <CompareTitle>Порівняння “До / Буде”</CompareTitle>
                  <DiffPill>Різниця: +{fmtMoney(calc.extraMoney)} грн</DiffPill>
                </CompareTop>

                <BarWrap>
                  <div>
                    <BarLabel>До</BarLabel>
                    <Bar style={{ height: `${Math.max(10, baseH)}%` }} $muted />
                    <BarValue>{fmtMoney(baseBill)} грн</BarValue>
                  </div>

                  <div>
                    <BarLabel>Буде</BarLabel>
                    <Bar style={{ height: `${Math.max(10, afterH)}%` }} />
                    <BarValue>{fmtMoney(calc.after)} грн</BarValue>
                  </div>
                </BarWrap>
              </CompareCard>
            </ResultGrid>

            <Note>
              <NoteDot>💡</NoteDot>
              <NoteText>
                Нотатка: якщо в тебе є <b>борг</b> або <b>переплата</b> — врахуй це окремо, бо ця
                симуляція показує саме <b>додаткову</b> суму від обігрівача.
              </NoteText>
            </Note>
          </ResultBlock>
        ) : null}
      </Card>
    </Wrap>
  );
}