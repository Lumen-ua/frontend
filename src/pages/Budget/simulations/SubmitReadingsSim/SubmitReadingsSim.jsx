import React, { useEffect, useMemo, useState } from "react";
import {
  Wrap,
  Header,
  HeaderTitle,
  HeaderSub,
  Stepper,
  StepDot,
  StepLine,
  Card,
  CardTitle,
  Row,
  Label,
  ValuePill,
  Input,
  Select,
  Btn,
  BtnSecondary,
  Hint,
  HintIcon,
  HintTitle,
  HintText,
  Divider,
  SummaryGrid,
  SummaryItem,
  SuccessBox,
  SuccessTitle,
  SuccessText,
  Confetti,
} from "./SubmitReadingsSim.styled";

import { useAuth } from "../../../../context/AuthContext.jsx";
import { budgetContentApi } from "../../../../api/budgetContent";

const TARIF_OPTIONS = [
  { id: "t1", label: "2.64 грн/кВт·год (стандарт)", value: 2.64 },
  { id: "t2", label: "1.32 грн/кВт·год (пільговий/приклад)", value: 1.32 },
  { id: "t3", label: "Ввести вручну…", value: "custom" },
];

function toNumberSafe(v) {
  const s = (v ?? "").toString().replace(",", ".").trim();
  if (s === "") return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export default function SubmitReadingsSim() {
  const { token } = useAuth();
  const [achievementSent, setAchievementSent] = useState(false);

  const [step, setStep] = useState(1);

  // ✅ Тепер користувач вводить і старі, і нові
  const [oldReading, setOldReading] = useState("");
  const [newReading, setNewReading] = useState("");
  const [consumption, setConsumption] = useState("");

  const [tariffChoice, setTariffChoice] = useState("t1");
  const [customTariff, setCustomTariff] = useState("");

  // ✅ Користувач сам рахує суму
  const [sumInput, setSumInput] = useState("");

  const [hint, setHint] = useState({ type: "none", title: "", text: "" });

  const parsedOld = useMemo(() => toNumberSafe(oldReading), [oldReading]);
  const parsedNew = useMemo(() => toNumberSafe(newReading), [newReading]);

  const correctConsumption = useMemo(() => {
    if (!Number.isFinite(parsedOld) || !Number.isFinite(parsedNew)) return NaN;
    return parsedNew - parsedOld;
  }, [parsedOld, parsedNew]);

  const tariffValue = useMemo(() => {
    const found = TARIF_OPTIONS.find((t) => t.id === tariffChoice);
    if (!found) return NaN;
    if (found.value === "custom") return toNumberSafe(customTariff);
    return found.value;
  }, [tariffChoice, customTariff]);

  const correctSum = useMemo(() => {
    if (!Number.isFinite(correctConsumption) || !Number.isFinite(tariffValue)) return NaN;
    if (correctConsumption < 0) return NaN;
    return round2(correctConsumption * tariffValue);
  }, [correctConsumption, tariffValue]);

  const setOk = (text, title = "Вірно") => setHint({ type: "ok", title, text });
  const setBad = (text, title = "Помилка") => setHint({ type: "bad", title, text });
  const resetHint = () => setHint({ type: "none", title: "", text: "" });

  const validateStep1 = () => {
    resetHint();

    const nOld = toNumberSafe(oldReading);
    const nNew = toNumberSafe(newReading);
    const nCons = toNumberSafe(consumption);

    if (!Number.isFinite(nOld)) {
      setBad("Введи старі показники числом. Напр.: 12540.");
      return false;
    }
    if (!Number.isFinite(nNew)) {
      setBad("Введи нові показники числом. Напр.: 12620.");
      return false;
    }
    if (nNew < nOld) {
      setBad("Нові показники не можуть бути менші за старі. Перевір, чи не переплутав(ла) місцями.");
      return false;
    }
    if (!Number.isFinite(nCons)) {
      setBad("Введи споживання числом. Воно має бути різницею між показниками.");
      return false;
    }

    const expected = nNew - nOld;
    if (nCons !== expected) {
      setBad(`Споживання пораховано неправильно. Правило: Поточні − Попередні. Тут: ${nNew} − ${nOld} = ${expected}.`);
      return false;
    }

    setOk("Так! Логіка правильна. Переходимо до тарифу.");
    return true;
  };

  const validateStep2 = () => {
    resetHint();

    if (!Number.isFinite(correctConsumption) || correctConsumption < 0) {
      setBad("Спочатку правильно порахуй споживання (крок 1).");
      return false;
    }
    if (!Number.isFinite(tariffValue) || tariffValue <= 0) {
      setBad("Обери тариф або введи свій (позитивне число).");
      return false;
    }

    setOk("Ок! Тепер порахуй суму за формулою.");
    return true;
  };

  const validateStep3 = () => {
    resetHint();

    const nSum = toNumberSafe(sumInput);
    if (!Number.isFinite(correctSum)) {
      setBad("Неможливо перевірити суму: перевір показники/споживання/тариф.");
      return false;
    }
    if (!Number.isFinite(nSum)) {
      setBad("Введи суму числом. Напр.: 211.20");
      return false;
    }

    if (round2(nSum) !== correctSum) {
      setBad(
        `Сума не збігається. Формула: Споживання × Тариф. Перевір множення та округлення до 2 знаків.`,
        "Не зійшлося"
      );
      return false;
    }

    setOk("Чудово! Розрахунок правильний — можна “передавати показники”.", "Готово");
    return true;
  };

  const onNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
      return;
    }
    if (step === 2) {
      if (validateStep2()) setStep(3);
      return;
    }
    if (step === 3) {
      if (validateStep3()) setStep(4);
      return;
    }
  };

  const onBack = () => {
    resetHint();
    setStep((s) => Math.max(1, s - 1));
  };

  const onReset = () => {
    setStep(1);
    setOldReading("");
    setNewReading("");
    setConsumption("");
    setTariffChoice("t1");
    setCustomTariff("");
    setSumInput("");
    resetHint();
    setAchievementSent(false);
  };

  const stepLabel = (n) => {
    if (n === 1) return "Введи показники і споживання";
    if (n === 2) return "Обери тариф";
    if (n === 3) return "Порахуй суму";
    return "Готово";
  };

  // ✅ Досягнення (залишив як було — якщо хочеш окремий ключ, скажеш)
  useEffect(() => {
    const send = async () => {
      if (!token) return;
      if (step !== 4) return;
      if (achievementSent) return;

      try {
        await budgetContentApi.complete(token, "budget_calculate_indicators");
        setAchievementSent(true);
      } catch (_) {}
    };
    send();
  }, [token, step, achievementSent]);

  return (
    <Wrap>
      <Header>
        <div>
          <HeaderTitle>Симуляція: “Передай показники правильно”</HeaderTitle>
          <HeaderSub>
            Тренування без підказок: введи <b>старі</b> і <b>нові</b> показники, порахуй споживання, обери тариф і порахуй суму.
          </HeaderSub>
        </div>

        <Stepper aria-label="progress">
          <StepDot $active={step === 1} $done={step > 1}>1</StepDot>
          <StepLine $done={step > 1} />
          <StepDot $active={step === 2} $done={step > 2}>2</StepDot>
          <StepLine $done={step > 2} />
          <StepDot $active={step === 3} $done={step > 3}>3</StepDot>
        </Stepper>
      </Header>

      {step !== 4 ? (
        <Card>
          <CardTitle>
            {step}. {stepLabel(step)}
          </CardTitle>

          {step === 1 ? (
            <>
              <Row>
                <Label>Старі показники</Label>
                <Input
                  value={oldReading}
                  onChange={(e) => setOldReading(e.target.value)}
                  inputMode="numeric"
                  placeholder="Напр.: 12540"
                />
                <ValuePill>кВт·год</ValuePill>
              </Row>

              <Row>
                <Label>Нові показники</Label>
                <Input
                  value={newReading}
                  onChange={(e) => setNewReading(e.target.value)}
                  inputMode="numeric"
                  placeholder="Напр.: 12620"
                />
                <ValuePill>кВт·год</ValuePill>
              </Row>

              <Row>
                <Label>Споживання (порахуй і введи)</Label>
                <Input
                  value={consumption}
                  onChange={(e) => setConsumption(e.target.value)}
                  inputMode="numeric"
                  placeholder="Напр.: 80"
                />
                <ValuePill>кВт·год</ValuePill>
              </Row>

              <Divider />

              <SummaryGrid>
                <SummaryItem>
                  <div className="k">Підказка формули</div>
                  <div className="v">Споживання = Нові − Старі</div>
                </SummaryItem>
                <SummaryItem>
                  <div className="k">Перевірка</div>
                  <div className="v">Нові ≥ Старі</div>
                </SummaryItem>
              </SummaryGrid>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <SummaryGrid>
                <SummaryItem>
                  <div className="k">Формула суми</div>
                  <div className="v">Сума = Споживання × Тариф</div>
                </SummaryItem>
              </SummaryGrid>

              <Divider />

              <Row>
                <Label>Обери тариф</Label>
                <Select value={tariffChoice} onChange={(e) => setTariffChoice(e.target.value)}>
                  {TARIF_OPTIONS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </Select>
              </Row>

              {tariffChoice === "t3" ? (
                <Row>
                  <Label>Твій тариф</Label>
                  <Input
                    value={customTariff}
                    onChange={(e) => setCustomTariff(e.target.value)}
                    inputMode="decimal"
                    placeholder="Напр.: 2.64"
                  />
                  <ValuePill>грн/кВт·год</ValuePill>
                </Row>
              ) : null}

              <Hint $type="info">
                <HintIcon>ℹ️</HintIcon>
                <div>
                  <HintTitle>Тариф</HintTitle>
                  <HintText>Це ціна 1 кВт·год. На наступному кроці помножиш споживання на тариф.</HintText>
                </div>
              </Hint>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <SummaryGrid>
                <SummaryItem>
                  <div className="k">Нагадування</div>
                  <div className="v">Округлення до 2 знаків</div>
                </SummaryItem>
              </SummaryGrid>

              <Divider />

              <Row>
                <Label>Введи суму (порахуй)</Label>
                <Input
                  value={sumInput}
                  onChange={(e) => setSumInput(e.target.value)}
                  inputMode="decimal"
                  placeholder="Напр.: 211.20"
                />
                <ValuePill>грн</ValuePill>
              </Row>

              <Hint $type="info">
                <HintIcon>🧮</HintIcon>
                <div>
                  <HintTitle>Формула</HintTitle>
                  <HintText>
                    <b>Сума = Споживання × Тариф</b>. Результат округлюй до 2 знаків.
                  </HintText>
                </div>
              </Hint>
            </>
          ) : null}

          {hint.type !== "none" ? (
            <Hint $type={hint.type}>
              <HintIcon>{hint.type === "ok" ? "✅" : "❗️"}</HintIcon>
              <div>
                <HintTitle>{hint.title}</HintTitle>
                <HintText>{hint.text}</HintText>
              </div>
            </Hint>
          ) : null}

          <Row style={{ marginTop: 14 }}>
            <BtnSecondary onClick={onBack} disabled={step === 1}>
              Назад
            </BtnSecondary>

            <Btn onClick={onNext}>
              {step === 3 ? "Передати показники" : "Далі"}
            </Btn>
          </Row>

          <Row>
            <BtnSecondary onClick={onReset}>Скинути симуляцію</BtnSecondary>
          </Row>
        </Card>
      ) : (
        <SuccessBox>
          <Confetti aria-hidden="true">🎉</Confetti>
          <SuccessTitle>Вітаю! Ти передав(ла) показники правильно!</SuccessTitle>
          <SuccessText>
            Логіка зійшлася: <b>споживання</b> = <b>нові</b> − <b>старі</b>, а сума = <b>споживання × тариф</b>.
          </SuccessText>

          <Divider />

          <Row style={{ marginTop: 12 }}>
            <Btn onClick={onReset}>Пройти ще раз</Btn>
          </Row>
        </SuccessBox>
      )}
    </Wrap>
  );
}