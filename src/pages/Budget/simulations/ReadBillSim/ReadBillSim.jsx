// ReadBillSim.jsx (оновлений)
// ✅ Мінімальні зміни: додано лише збереження прогресу/результату (localStorage) + optional callback onComplete.
// ❗️Верстку/елементи НЕ чіпав — усе як у твоєму файлі.

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Page,
  Shell,
  Header,
  Logo,
  Title,
  Subtitle,
  Layout,
  BillArea,
  BillFrame,
  BillImg,
  Hotspot,
  RightPanel,
  MissionCard,
  MissionTitle,
  MissionList,
  MissionItem,
  MissionDot,
  QuizCard,
  QuizTitle,
  Options,
  OptionBtn,
  PrimaryBtn,
  FooterBar,
  ProgressText,
  Feedback,
  FeedbackOk,
  FeedbackBad,
  BadgeCard,
  BadgeTitle,
  BadgeSub,
  SmallMuted,
} from "./ReadBillSim.styled";

import billMock from "../../../../assets/images/bill-photo.jpg";

const HOTSPOTS = {
  tariff: { x: 2, y: 65, w: 33, h: 27 },
  debt: { x: 36, y: 6, w: 62, h: 48 },
  distribution: { x: 36, y: 54, w: 29, h: 17 },
  consumption: { x: 2, y: 41, w: 33, h: 22 },
};

const STEPS = [
  {
    id: "tariff",
    label: "де вказано тариф",
    help: "Тариф — це ціна за 1 кВт·год (грн/кВт·год).",
    quiz: {
      title: 'Що означає "2.64" в платіжці?',
      options: [
        { id: "a", text: "Сума для оплати" },
        { id: "b", text: "Ціна за 1 кВт·год", correct: true },
        { id: "c", text: "Попередні показники" },
        { id: "d", text: "Сума за розподіл" },
      ],
      explanation: "Тариф — це ціна за 1 кВт·год, яку множать на споживання.",
    },
  },
  {
    id: "debt",
    label: "де борг",
    help: "Борг — це недоплата з попередніх періодів, яка додається до рахунку.",
    quiz: {
      title: "Борг у платіжці — це…",
      options: [
        { id: "a", text: "сума за поточний місяць" },
        { id: "b", text: "платіж за доставку електроенергії" },
        { id: "c", text: "недоплата з минулих періодів", correct: true },
        { id: "d", text: "показники лічильника" },
      ],
      explanation: "Борг — це залишок несплаченої суми з попередніх місяців.",
    },
  },
  {
    id: "distribution",
    label: "де сума за розподіл",
    help: "Розподіл — оплата за транспортування електроенергії мережами (послуга ОСР).",
    quiz: {
      title: "За що відповідає послуга розподілу?",
      options: [
        { id: "a", text: "За продаж електроенергії" },
        { id: "b", text: "За доставку електроенергії мережами", correct: true },
        { id: "c", text: "За заміну тарифу" },
        { id: "d", text: "За передачу показників" },
      ],
      explanation: "Розподіл — це “доставка” електроенергії через мережі до твого будинку.",
    },
  },
  {
    id: "consumption",
    label: "де споживання",
    help: "Споживання — кількість кВт·год за період (поточні − попередні показники).",
    quiz: {
      title: "Як знаходять споживання за місяць?",
      options: [
        { id: "a", text: "Тариф × Сума" },
        { id: "b", text: "Поточні − Попередні", correct: true },
        { id: "c", text: "Борг − Оплата" },
        { id: "d", text: "Оплата + Пеня" },
      ],
      explanation: "Споживання = поточні показники − попередні показники.",
    },
  },
];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// ---- мінімальний "помічник" для прогресу ----
const LS_KEY = "lumen.progress.budget"; // можеш змінити під свій ключ

function safeJsonParse(str, fallback) {
  try {
    const v = JSON.parse(str);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function persistReadBillResult({ percent, badgeEarned }) {
  const now = new Date().toISOString();

  const prev = safeJsonParse(localStorage.getItem(LS_KEY), {
    sims: {},
    updatedAt: null,
  });

  const prevSim = prev?.sims?.readBillSim ?? {
    completed: false,
    bestPercent: 0,
    lastPercent: 0,
    attempts: 0,
    badgeEarned: false,
    completedAt: null,
    updatedAt: null,
  };

  const nextSim = {
    ...prevSim,
    attempts: (prevSim.attempts || 0) + 1,
    lastPercent: percent,
    bestPercent: Math.max(prevSim.bestPercent || 0, percent),
    // вважаємо симуляцію завершеною, коли дійшли до фіналу (finished=true),
    // а бейдж видаємо як і було: 80%+
    completed: true,
    badgeEarned: Boolean(prevSim.badgeEarned) || Boolean(badgeEarned),
    completedAt: prevSim.completedAt || now,
    updatedAt: now,
  };

  const next = {
    ...prev,
    sims: {
      ...(prev.sims || {}),
      readBillSim: nextSim,
    },
    updatedAt: now,
  };

  localStorage.setItem(LS_KEY, JSON.stringify(next));

  // optional: сигнал для інших компонентів (Budget/Profile), якщо вони слухають подію
  window.dispatchEvent(
    new CustomEvent("lumen:progress-updated", {
      detail: { key: "readBillSim", percent, badgeEarned, at: now },
    })
  );
}

export default function ReadBillSim({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);

  const [zoneCorrect, setZoneCorrect] = useState(0);
  const [zoneTotal, setZoneTotal] = useState(0);

  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);

  const [pickedZone, setPickedZone] = useState(null);
  const [zoneSolved, setZoneSolved] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const [optionLocked, setOptionLocked] = useState(false);

  const [feedback, setFeedback] = useState({ type: "none", text: "" });

  const step = STEPS[stepIndex];
  const finished = stepIndex >= STEPS.length;

  const percent = useMemo(() => {
    const total = zoneTotal + quizTotal;
    const correct = zoneCorrect + quizCorrect;
    if (total <= 0) return 0;
    return Math.round((correct / total) * 100);
  }, [zoneTotal, quizTotal, zoneCorrect, quizCorrect]);

  const badgeEarned = finished && percent >= 80;

  const resetQuiz = () => {
    setSelectedOption(null);
    setOptionLocked(false);
  };

  const nextStep = () => {
    setFeedback({ type: "none", text: "" });
    setPickedZone(null);
    setZoneSolved(false);
    resetQuiz();
    setStepIndex((v) => v + 1);
  };

  const onHotspotClick = (id) => {
    if (finished) return;
    if (zoneSolved) return;

    setZoneTotal((v) => v + 1);
    setPickedZone(id);

    const ok = id === step.id;
    if (ok) {
      setZoneCorrect((v) => v + 1);
      setZoneSolved(true);
      setFeedback({
        type: "ok",
        text: `Вірно! Ти знайшов(ла) "${step.label}". Тепер закріпимо коротким питанням.`,
      });
    } else {
      setFeedback({
        type: "bad",
        text: `Не зовсім. Спробуй ще раз: ${step.help}`,
      });
    }
  };

  const onOptionClick = (opt) => {
    if (!zoneSolved) return;
    if (optionLocked) return;

    setQuizTotal((v) => v + 1);
    setSelectedOption(opt.id);
    setOptionLocked(true);

    if (opt.correct) {
      setQuizCorrect((v) => v + 1);
      setFeedback({ type: "ok", text: `Правильно. ${step.quiz.explanation}` });
    } else {
      setFeedback({ type: "bad", text: `Ні. ${step.quiz.explanation}` });
    }
  };

  const safeStepIndex = clamp(stepIndex, 0, STEPS.length);
  const progressText = finished
    ? `Завершено: ${STEPS.length} з ${STEPS.length}`
    : `Прогрес: ${safeStepIndex + 1} з ${STEPS.length}`;

  // ✅ NEW: зберігаємо результат ОДИН раз, коли дійшли до фіналу
  const savedRef = useRef(false);
  useEffect(() => {
    if (!finished) return;
    if (savedRef.current) return;
    savedRef.current = true;

    persistReadBillResult({ percent, badgeEarned });

    // optional callback для інтеграції з вашим глобальним прогресом/беком
    if (typeof onComplete === "function") {
      onComplete({
        simKey: "readBillSim",
        percent,
        badgeEarned,
        completed: true,
      });
    }
  }, [finished, percent, badgeEarned, onComplete]);

  return (
    <Page>
      <Shell>
        <Header>
          <Logo>
            <span className="bulb">💡</span>
            <span className="name">lumen.ua</span>
          </Logo>

          <div>
            <Title>Симуляція: Розбери платіжку</Title>
            <Subtitle>
              Завдання: знайди, де вказано <b>тариф</b>, <b>борг</b>, <b>суму за розподіл</b> та{" "}
              <b>споживання</b>.
            </Subtitle>
          </div>
        </Header>

        <Layout>
          {/* Left: bill */}
          <BillArea>
            <BillFrame>
              <BillImg src={billMock} alt="Мокап платіжки для симуляції" />

              {!finished &&
                Object.entries(HOTSPOTS).map(([id, r]) => (
                  <Hotspot
                    key={id}
                    style={{
                      left: `${r.x}%`,
                      top: `${r.y}%`,
                      width: `${r.w}%`,
                      height: `${r.h}%`,
                    }}
                    $active={pickedZone === id}
                    $solved={zoneSolved && id === step.id}
                    onClick={() => onHotspotClick(id)}
                    aria-label={`Клікнути зону: ${id}`}
                    title="Клікни, щоб обрати елемент"
                  />
                ))}
            </BillFrame>
          </BillArea>

          {/* Right panel */}
          <RightPanel>
            {!finished ? (
              <>
                <MissionCard>
                  <MissionTitle>Поточне завдання</MissionTitle>
                  <MissionList>
                    {STEPS.map((s, idx) => {
                      const done = idx < stepIndex;
                      const current = idx === stepIndex;
                      return (
                        <MissionItem key={s.id} $done={done} $current={current}>
                          <MissionDot $done={done} $current={current} />
                          {s.label}
                        </MissionItem>
                      );
                    })}
                  </MissionList>

                  <SmallMuted>
                    Підказка: якщо не знаходиш — орієнтуйся на логіку: <b>тариф</b> біля кВт·год,{" "}
                    <b>борг</b> біля підсумку, <b>розподіл</b> — окрема послуга, <b>споживання</b> — кВт·год за
                    період.
                  </SmallMuted>
                </MissionCard>

                <QuizCard>
                  <QuizTitle>
                    {zoneSolved ? step.quiz.title : "Спочатку знайди потрібний елемент на платіжці"}
                  </QuizTitle>

                  <Options>
                    {step.quiz.options.map((opt) => {
                      const chosen = selectedOption === opt.id;
                      const isCorrect = !!opt.correct;

                      return (
                        <OptionBtn
                          key={opt.id}
                          onClick={() => onOptionClick(opt)}
                          disabled={!zoneSolved || optionLocked}
                          $chosen={chosen}
                          $locked={optionLocked}
                          $correct={optionLocked && chosen && isCorrect}
                          $wrong={optionLocked && chosen && !isCorrect}
                        >
                          <span className="radio" />
                          <span className="text">{opt.text}</span>
                          {optionLocked && chosen && isCorrect ? <span className="mark">✓</span> : null}
                        </OptionBtn>
                      );
                    })}
                  </Options>

                  <PrimaryBtn
                    onClick={() => {
                      if (!zoneSolved) {
                        setFeedback({
                          type: "bad",
                          text: "Спочатку клікни по правильному елементу на платіжці.",
                        });
                        return;
                      }
                      if (!optionLocked) {
                        setFeedback({ type: "bad", text: "Обери відповідь у питанні справа." });
                        return;
                      }
                      nextStep();
                    }}
                  >
                    Далі
                  </PrimaryBtn>
                </QuizCard>

                <FooterBar>
                  <ProgressText>{progressText}</ProgressText>

                  <Feedback>
                    {feedback.type === "ok" ? <FeedbackOk>✓</FeedbackOk> : null}
                    {feedback.type === "bad" ? <FeedbackBad>!</FeedbackBad> : null}
                    <span>{feedback.text}</span>
                  </Feedback>
                </FooterBar>
              </>
            ) : (
              <BadgeCard>
                <BadgeTitle>Результат</BadgeTitle>
                <BadgeSub>
                  Точність: <b>{percent}%</b> <span>(кліки + питання)</span>
                </BadgeSub>

                {badgeEarned ? (
                  <>
                    <BadgeSub style={{ marginTop: 10 }}>
                      🏆 Бейдж: <b>“Читач платіжок”</b>
                    </BadgeSub>
                    <SmallMuted>Вітаю! Ти набрав(ла) 80%+ правильних відповідей.</SmallMuted>
                  </>
                ) : (
                  <>
                    <BadgeSub style={{ marginTop: 10 }}>Бейдж поки не отримано 🙃</BadgeSub>
                    <SmallMuted>
                      Потрібно <b>80%+</b>. Спробуй ще раз — і звертай увагу на підказки справа.
                    </SmallMuted>
                  </>
                )}

                <PrimaryBtn
                  onClick={() => {
                    setStepIndex(0);
                    setZoneCorrect(0);
                    setZoneTotal(0);
                    setQuizCorrect(0);
                    setQuizTotal(0);
                    setPickedZone(null);
                    setZoneSolved(false);
                    setFeedback({ type: "none", text: "" });
                    resetQuiz();

                    // ✅ щоб при повторі знов зберегти фінальний результат
                    savedRef.current = false;
                  }}
                  style={{ marginTop: 14 }}
                >
                  Пройти ще раз
                </PrimaryBtn>
              </BadgeCard>
            )}
          </RightPanel>
        </Layout>
      </Shell>
    </Page>
  );
}