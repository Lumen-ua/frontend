import React, { useMemo, useState } from "react";
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
  BigNumber,
  SuccessBox,
  SuccessTitle,
  SuccessText,
  Confetti,
} from "./SubmitReadingsSim.styled";

const OLD_READING = 12540;
const DEFAULT_NEW = 12620;

const TARIF_OPTIONS = [
  { id: "t1", label: "2.64 грн/кВт·год (стандарт)", value: 2.64 },
  { id: "t2", label: "1.32 грн/кВт·год (пільговий/приклад)", value: 1.32 },
  { id: "t3", label: "Ввести вручну…", value: "custom" },
];

function toNumberSafe(v) {
  if (v === "" || v === null || v === undefined) return NaN;
  const n = Number(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

export default function SubmitReadingsSim() {
  // steps: 1) new reading + consumption, 2) choose tariff, 3) calculate sum, 4) success
  const [step, setStep] = useState(1);

  const [newReading, setNewReading] = useState(String(DEFAULT_NEW));
  const [consumption, setConsumption] = useState(""); // user input

  const [tariffChoice, setTariffChoice] = useState("t1");
  const [customTariff, setCustomTariff] = useState("");

  const [sumInput, setSumInput] = useState("");

  const [hint, setHint] = useState({ type: "none", title: "", text: "" });

  const expectedConsumption = useMemo(() => {
    const nNew = toNumberSafe(newReading);
    if (!Number.isFinite(nNew)) return NaN;
    return nNew - OLD_READING;
  }, [newReading]);

  const tariffValue = useMemo(() => {
    const found = TARIF_OPTIONS.find((t) => t.id === tariffChoice);
    if (!found) return NaN;
    if (found.value === "custom") return toNumberSafe(customTariff);
    return found.value;
  }, [tariffChoice, customTariff]);

  const expectedSum = useMemo(() => {
    if (!Number.isFinite(expectedConsumption) || !Number.isFinite(tariffValue)) return NaN;
    if (expectedConsumption < 0) return NaN;
    return round2(expectedConsumption * tariffValue);
  }, [expectedConsumption, tariffValue]);

  const setOk = (text, title = "Вірно") =>
    setHint({ type: "ok", title, text });

  const setBad = (text, title = "Помилка") =>
    setHint({ type: "bad", title, text });

  const resetHint = () => setHint({ type: "none", title: "", text: "" });

  // ---- validations ----
  const validateStep1 = () => {
    resetHint();

    const nNew = toNumberSafe(newReading);
    const nCons = toNumberSafe(consumption);

    if (!Number.isFinite(nNew)) {
      setBad("Введи нові показники числом (без літер). Напр.: 12620.");
      return false;
    }
    if (nNew < OLD_READING) {
      setBad(
        `Нові показники не можуть бути менші за старі. Старі: ${OLD_READING}.`
      );
      return false;
    }
    if (!Number.isFinite(nCons)) {
      setBad("Введи споживання числом. Воно має бути різницею між показниками.");
      return false;
    }
    if (nCons !== expectedConsumption) {
      setBad(
        `Споживання пораховано неправильно. Правило: Поточні − Попередні. Тут: ${nNew} − ${OLD_READING} = ${expectedConsumption}.`
      );
      return false;
    }

    setOk(`Так! Споживання = ${expectedConsumption} кВт·год. Переходимо до тарифу.`);
    return true;
  };

  const validateStep2 = () => {
    resetHint();

    if (!Number.isFinite(expectedConsumption) || expectedConsumption < 0) {
      setBad("Спочатку правильно порахуй споживання (крок 1).");
      return false;
    }

    if (!Number.isFinite(tariffValue) || tariffValue <= 0) {
      setBad("Обери тариф або введи свій (позитивне число).");
      return false;
    }

    setOk(`Ок! Тариф = ${tariffValue} грн/кВт·год. Тепер порахуємо суму.`);
    return true;
  };

  const validateStep3 = () => {
    resetHint();

    const nSum = toNumberSafe(sumInput);

    if (!Number.isFinite(expectedSum)) {
      setBad("Неможливо порахувати суму: перевір споживання та тариф.");
      return false;
    }

    if (!Number.isFinite(nSum)) {
      setBad("Введи суму числом. Напр.: 211.20");
      return false;
    }

    if (round2(nSum) !== expectedSum) {
      setBad(
        `Сума не збігається. Формула: Споживання × Тариф. Тут: ${expectedConsumption} × ${tariffValue} = ${expectedSum} грн.`
      );
      return false;
    }

    setOk("Чудово! Розрахунок правильний — можна “передавати показники”.", "Готово");
    return true;
  };

  // ---- actions ----
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
    setNewReading(String(DEFAULT_NEW));
    setConsumption("");
    setTariffChoice("t1");
    setCustomTariff("");
    setSumInput("");
    resetHint();
  };

  const stepLabel = (n) => {
    if (n === 1) return "Порахуй споживання";
    if (n === 2) return "Обери тариф";
    if (n === 3) return "Порахуй суму";
    return "Готово";
  };

  return (
    <Wrap>
      <Header>
        <div>
          <HeaderTitle>Симуляція: “Передай показники правильно”</HeaderTitle>
          <HeaderSub>
            Сценарій: старі показники <b>{OLD_READING}</b>. Ти вводиш нові, рахуєш
            споживання, обираєш тариф і перевіряєш суму.
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

          {/* STEP 1 */}
          {step === 1 ? (
            <>
              <Row>
                <Label>Старі показники</Label>
                <ValuePill>{OLD_READING}</ValuePill>
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
                  <div className="v">Поточні − Попередні</div>
                </SummaryItem>
                <SummaryItem>
                  <div className="k">Очікуване споживання</div>
                  <div className="v">
                    {Number.isFinite(expectedConsumption) ? expectedConsumption : "—"}
                  </div>
                </SummaryItem>
              </SummaryGrid>
            </>
          ) : null}

          {/* STEP 2 */}
          {step === 2 ? (
            <>
              <SummaryGrid>
                <SummaryItem>
                  <div className="k">Старі</div>
                  <div className="v">{OLD_READING}</div>
                </SummaryItem>
                <SummaryItem>
                  <div className="k">Нові</div>
                  <div className="v">{newReading || "—"}</div>
                </SummaryItem>
                <SummaryItem>
                  <div className="k">Споживання</div>
                  <div className="v">
                    {Number.isFinite(expectedConsumption) ? `${expectedConsumption} кВт·год` : "—"}
                  </div>
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
              ) : (
                <Row>
                  <Label>Обраний тариф</Label>
                  <ValuePill>
                    {Number.isFinite(tariffValue) ? `${tariffValue} грн/кВт·год` : "—"}
                  </ValuePill>
                </Row>
              )}

              <Hint $type="info">
                <HintIcon>ℹ️</HintIcon>
                <div>
                  <HintTitle>Для чого тариф?</HintTitle>
                  <HintText>
                    Тариф — це ціна 1 кВт·год. На наступному кроці ми помножимо споживання на тариф.
                  </HintText>
                </div>
              </Hint>
            </>
          ) : null}

          {/* STEP 3 */}
          {step === 3 ? (
            <>
              <SummaryGrid>
                <SummaryItem>
                  <div className="k">Споживання</div>
                  <div className="v">{Number.isFinite(expectedConsumption) ? `${expectedConsumption} кВт·год` : "—"}</div>
                </SummaryItem>
                <SummaryItem>
                  <div className="k">Тариф</div>
                  <div className="v">{Number.isFinite(tariffValue) ? `${tariffValue} грн/кВт·год` : "—"}</div>
                </SummaryItem>
                <SummaryItem>
                  <div className="k">Очікувана сума</div>
                  <div className="v">{Number.isFinite(expectedSum) ? `${expectedSum} грн` : "—"}</div>
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
                  <HintTitle>Формула суми</HintTitle>
                  <HintText>
                    <b>Сума = Споживання × Тариф</b>. Якщо вийшло число з копійками — округлюй до 2 знаків.
                  </HintText>
                </div>
              </Hint>
            </>
          ) : null}

          {/* FEEDBACK */}
          {hint.type !== "none" ? (
            <Hint $type={hint.type}>
              <HintIcon>{hint.type === "ok" ? "✅" : "❗"}</HintIcon>
              <div>
                <HintTitle>{hint.title}</HintTitle>
                <HintText>{hint.text}</HintText>
              </div>
            </Hint>
          ) : null}

          {/* ACTIONS */}
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
            Нові показники: <b>{newReading}</b> • Споживання:{" "}
            <b>{Number.isFinite(expectedConsumption) ? expectedConsumption : "—"}</b> кВт·год • Сума:{" "}
            <b>{Number.isFinite(expectedSum) ? expectedSum : "—"}</b> грн
          </SuccessText>

          <Divider />

          <Row>
            <SummaryItem style={{ width: "100%" }}>
              <div className="k">Пам’ятка</div>
              <div className="v">
                1) Поточні − Попередні → 2) × Тариф → 3) перевір округлення і одиниці виміру
              </div>
            </SummaryItem>
          </Row>

          <Row style={{ marginTop: 12 }}>
            <Btn onClick={onReset}>Пройти ще раз</Btn>
          </Row>
        </SuccessBox>
      )}

      <Card style={{ marginTop: 12 }}>
        <CardTitle>Що перевіряє симуляція</CardTitle>
        <SummaryGrid>
          <SummaryItem>
            <div className="k">Логіка показників</div>
            <div className="v">Нові ≥ Старі, споживання = різниця</div>
          </SummaryItem>
          <SummaryItem>
            <div className="k">Тариф</div>
            <div className="v">Обраний або введений вручну</div>
          </SummaryItem>
          <SummaryItem>
            <div className="k">Сума</div>
            <div className="v">Споживання × тариф (округлення до 2 знаків)</div>
          </SummaryItem>
        </SummaryGrid>

        <Divider />

        <BigNumber>
          Очікуване споживання за сценарієм:{" "}
          <b>{DEFAULT_NEW - OLD_READING}</b> кВт·год
        </BigNumber>
      </Card>
    </Wrap>
  );
}