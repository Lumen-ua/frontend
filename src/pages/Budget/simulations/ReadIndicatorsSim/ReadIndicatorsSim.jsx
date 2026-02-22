import React, { useMemo, useState } from "react";
import {
  Page,
  Card,
  CardHeader,
  Badge,
  Title,
  SubTitle,
  CardBody,
  Grid,
  Block,
  BlockTitle,
  BigNumber,
  InputsRow,
  Input,
  InputLabel,
  InlineUnit,
  Btn,
  Radios,
  RadioItem,
  Separator,
  ResultBox,
  ResultTitle,
  Formula,
  HintBox,
  HintTitle,
  HintList,
  Chips,
  Chip,
  FooterRow,
  ResetBtn,
} from "./ReadIndicatorsSim.styled";

const OLD_READING = 12540;
const NEW_READING = 12620;

const TARIF_SINGLE = 2.64; 
const TARIF_DAY = 2.64;
const TARIF_NIGHT = 1.32;

const DEFAULT_DAY_SHARE = 0.7; 
const DEFAULT_NIGHT_SHARE = 0.3; 

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function onlyNumberLike(value) {
  const v = (value ?? "").toString().replace(",", ".").trim();
  if (v === "") return null;
  if (!/^\d+(\.\d+)?$/.test(v)) return NaN;
  return Number(v);
}

export default function ReadIndicatorsSim() {
  const correctConsumption = useMemo(() => NEW_READING - OLD_READING, []);
  const [consumptionInput, setConsumptionInput] = useState("");
  const [tariffMode, setTariffMode] = useState("single"); 
  const [amountInput, setAmountInput] = useState("");

  const [checked, setChecked] = useState(false);

  const parsedConsumption = useMemo(
    () => onlyNumberLike(consumptionInput),
    [consumptionInput]
  );
  const parsedAmount = useMemo(() => onlyNumberLike(amountInput), [amountInput]);

  const expectedAmount = useMemo(() => {
    if (tariffMode === "single") {
      return round2(correctConsumption * TARIF_SINGLE);
    }
    const dayKwh = correctConsumption * DEFAULT_DAY_SHARE;
    const nightKwh = correctConsumption * DEFAULT_NIGHT_SHARE;
    return round2(dayKwh * TARIF_DAY + nightKwh * TARIF_NIGHT);
  }, [correctConsumption, tariffMode]);

  const breakdown = useMemo(() => {
    if (tariffMode === "single") {
      return {
        label: "Звичайний тариф",
        parts: [
          { name: "Споживання", value: `${correctConsumption} кВт·год` },
          { name: "Тариф", value: `${TARIF_SINGLE} грн/кВт·год` },
        ],
        formula: `${correctConsumption} × ${TARIF_SINGLE} = ${expectedAmount} грн`,
      };
    }

    const dayKwh = round2(correctConsumption * DEFAULT_DAY_SHARE);
    const nightKwh = round2(correctConsumption * DEFAULT_NIGHT_SHARE);
    const daySum = round2(dayKwh * TARIF_DAY);
    const nightSum = round2(nightKwh * TARIF_NIGHT);

    return {
      label: "День / ніч (приклад)",
      parts: [
        { name: "День", value: `${dayKwh} кВт·год × ${TARIF_DAY} = ${daySum} грн` },
        { name: "Ніч", value: `${nightKwh} кВт·год × ${TARIF_NIGHT} = ${nightSum} грн` },
      ],
      formula: `${daySum} + ${nightSum} = ${expectedAmount} грн`,
    };
  }, [correctConsumption, expectedAmount, tariffMode]);

  const errors = useMemo(() => {
    if (!checked) return [];

    const list = [];

    if (parsedConsumption === null) {
      list.push({
        where: "Споживання",
        text: "Ти не ввів(ла) споживання. Порахуй різницю: поточні − попередні.",
        example: `${NEW_READING} − ${OLD_READING} = ${correctConsumption} кВт·год`,
      });
    } else if (Number.isNaN(parsedConsumption)) {
      list.push({
        where: "Споживання",
        text: "Споживання має бути числом (без літер).",
        example: `Приклад: ${correctConsumption}`,
      });
    } else if (parsedConsumption !== correctConsumption) {
      list.push({
        where: "Споживання",
        text: "Неправильно пораховане споживання.",
        example: `Має бути: ${NEW_READING} − ${OLD_READING} = ${correctConsumption} кВт·год`,
      });
    }

    if (parsedAmount === null) {
      list.push({
        where: "Сума",
        text: "Ти не ввів(ла) суму. Вона рахується за формулою нижче.",
        example:
          tariffMode === "single"
            ? `Сума = ${correctConsumption} × ${TARIF_SINGLE}`
            : `Сума = (День × ${TARIF_DAY}) + (Ніч × ${TARIF_NIGHT})`,
      });
    } else if (Number.isNaN(parsedAmount)) {
      list.push({
        where: "Сума",
        text: "Сума має бути числом (можна з копійками).",
        example: `Приклад: ${expectedAmount}`,
      });
    } else {
      const ok = Math.abs(parsedAmount - expectedAmount) <= 0.01;
      if (!ok) {
        list.push({
          where: "Сума",
          text:
            tariffMode === "single"
              ? "Сума по одноставковому тарифу порахована неправильно."
              : "Сума по тарифу день/ніч порахована неправильно (перевір множення і додавання).",
          example: breakdown.formula,
        });
      }
    }

    return list;
  }, [
    checked,
    parsedConsumption,
    parsedAmount,
    correctConsumption,
    expectedAmount,
    tariffMode,
    breakdown.formula,
  ]);

  const success = checked && errors.length === 0;

  const onCheck = () => setChecked(true);

  const onReset = () => {
    setConsumptionInput("");
    setTariffMode("single");
    setAmountInput("");
    setChecked(false);
  };

  return (
    <Page>
      <Card>
        <CardHeader>
          <Badge>🏠</Badge>
          <div>
            <Title>Симуляція: Передай показники правильно</Title>
            <SubTitle>
              Порахуй споживання за місяць, обери тариф і перевір суму. Якщо помилишся — система підкаже,
              <b> де саме</b>.
            </SubTitle>
          </div>
        </CardHeader>

        <CardBody>
          <Chips>
            <Chip>Середній час: 1–2 хв</Chip>
            <Chip>Формула: поточні − попередні</Chip>
          </Chips>

          <Grid>
            {/* LEFT */}
            <Block>
              <BlockTitle>Дані лічильника</BlockTitle>

              <InputsRow>
                <div>
                  <InputLabel>Старі показники</InputLabel>
                  <BigNumber>{OLD_READING}</BigNumber>
                </div>
                <div>
                  <InputLabel>Нові показники</InputLabel>
                  <BigNumber>{NEW_READING}</BigNumber>
                </div>
              </InputsRow>

              <Separator />

              <InputLabel>1) Введи споживання за місяць</InputLabel>
              <InputsRow>
                <div style={{ width: "100%" }}>
                  <Input
                    value={consumptionInput}
                    onChange={(e) => setConsumptionInput(e.target.value)}
                    placeholder="Наприклад: 80"
                    inputMode="numeric"
                  />
                </div>
                <InlineUnit>кВт·год</InlineUnit>

                <Btn type="button" onClick={onCheck}>
                  Перевірити
                </Btn>
              </InputsRow>

              <Separator />

              <InputLabel>2) Обери тариф</InputLabel>
              <Radios>
                <RadioItem
                  role="button"
                  tabIndex={0}
                  onClick={() => setTariffMode("single")}
                  $active={tariffMode === "single"}
                >
                  <span className="dot" />
                  Звичайний
                </RadioItem>

                <RadioItem
                  role="button"
                  tabIndex={0}
                  onClick={() => setTariffMode("dn")}
                  $active={tariffMode === "dn"}
                >
                  <span className="dot" />
                  День / ніч
                </RadioItem>
              </Radios>

              <Separator />

              <InputLabel>3) Порахуй суму</InputLabel>
              <InputsRow>
                <div style={{ width: "100%" }}>
                  <Input
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    placeholder="Наприклад: 211.20"
                    inputMode="decimal"
                  />
                </div>
                <InlineUnit>грн</InlineUnit>

                <Btn type="button" onClick={onCheck}>
                  Порахувати
                </Btn>
              </InputsRow>

              <FooterRow>
                <ResetBtn type="button" onClick={onReset}>
                  Скинути
                </ResetBtn>
              </FooterRow>
            </Block>

            {/* RIGHT */}
            <Block>
              <BlockTitle>Підказки та результат</BlockTitle>

              <HintBox>
                <HintTitle>Шпаргалка</HintTitle>
                <HintList>
                  <li>
                    <b>Споживання</b> = {NEW_READING} − {OLD_READING} ={" "}
                    <b>{correctConsumption} кВт·год</b>
                  </li>
                  <li>
                    <b>Одноставковий</b>: сума = кВт·год × тариф
                  </li>
                  <li>
                    <b>День/ніч</b>: сума = (день × тариф_день) + (ніч × тариф_ніч)
                  </li>
                </HintList>
              </HintBox>

              <ResultBox $ok={success} $bad={checked && !success}>
                <ResultTitle>
                  {success ? "✅ Точно!" : checked ? "⚠ Є помилка" : "🔎 Готово до перевірки"}
                </ResultTitle>

                {success ? (
                  <>
                    <Formula>
                      {breakdown.label}: <b>{breakdown.formula}</b>
                    </Formula>
                    {tariffMode === "dn" ? (
                      <Formula style={{ marginTop: 8 }}>
                        Пояснення: {breakdown.parts[0].value} <br />
                        {breakdown.parts[1].value}
                      </Formula>
                    ) : (
                      <Formula style={{ marginTop: 8 }}>
                        Пояснення: {correctConsumption} кВт·год × {TARIF_SINGLE} грн/кВт·год
                      </Formula>
                    )}
                  </>
                ) : checked ? (
                  <>
                    {errors.map((e, idx) => (
                      <Formula key={`${e.where}-${idx}`} style={{ marginTop: idx === 0 ? 0 : 10 }}>
                        <b>{e.where}:</b> {e.text}
                        <br />
                        <span className="muted">Приклад: {e.example}</span>
                      </Formula>
                    ))}
                  </>
                ) : (
                  <Formula>
                    Натисни <b>“Перевірити”</b> або <b>“Порахувати”</b>, щоб отримати фідбек.
                  </Formula>
                )}
              </ResultBox>

              <Separator />

              <HintBox>
                <HintTitle>Тарифи в симуляції</HintTitle>
                <HintList>
                  <li>Звичайний: <b>{TARIF_SINGLE} грн/кВт·год</b></li>
                  <li>День: <b>{TARIF_DAY} грн/кВт·год</b></li>
                  <li>Ніч: <b>{TARIF_NIGHT} грн/кВт·год</b></li>
                </HintList>
              </HintBox>
            </Block>
          </Grid>
        </CardBody>
      </Card>
    </Page>
  );
}