import React, { useEffect, useMemo, useState } from "react";
import {
  Wrap,
  Header,
  Title,
  Sub,
  Grid,
  Left,
  Right,
  Card,
  CardTitle,
  BillGrid,
  BillCard,
  BillTop,
  BillMonth,
  BillSum,
  BillBody,
  Row,
  Label,
  Value,
  TagRow,
  Tag,
  Divider,
  ReasonsCard,
  ReasonsTitle,
  ReasonList,
  ReasonItem,
  Check,
  ReasonText,
  Controls,
  Btn,
  BtnSecondary,
  Hint,
  HintIcon,
  HintTitle,
  HintText,
  Evidence,
  EvidenceTitle,
  EvidenceList,
  MiniNote,
} from "./BillDetectiveSim.styled";

import { useAuth } from "../../../../context/AuthContext.jsx";
import { budgetContentApi } from "../../../../api/budgetContent";

const REASONS = [
  { id: "consumptionUp", text: "Збільшилось споживання" },
  { id: "noReadings", text: "Не передані показники" },
  { id: "debtAdded", text: "Доданий борг" },
  { id: "tariffChanged", text: "Змінився тариф" },
  { id: "recalc", text: "Є перерахунок / коригування" },
  { id: "subsidy", text: "Змінились пільги / субсидія" },
  { id: "overpay", text: "Є переплата" },
  { id: "distribution", text: "Змінилась частина розподілу" },
];

const CORRECT = new Set(["consumptionUp", "noReadings", "debtAdded"]);

const fmt = (n) =>
  new Intl.NumberFormat("uk-UA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

export default function BillDetectiveSim() {
  const { token } = useAuth();
  const [achievementSent, setAchievementSent] = useState(false);

  const [picked, setPicked] = useState(() => new Set());
  const [result, setResult] = useState({ type: "none", title: "", text: "" });

  const bills = useMemo(() => {
    return {
      oct: {
        month: "Жовтень",
        date: "10.2023",
        sum: 900,
        kwh: 300,
        tariff: 3.0,
        debt: 0,
        note: "Показники передані вчасно",
        tags: ["стабільний місяць", "без боргу"],
      },
      nov: {
        month: "Листопад",
        date: "11.2023",
        sum: 1600,
        kwh: 470,
        tariff: 3.0,
        debt: 200,
        note: "Показники не передані → розрахунок + уточнення",
        tags: ["стрибок суми", "є борг"],
      },
    };
  }, []);

  const toggleReason = (id) => {
    setResult({ type: "none", title: "", text: "" });
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const reset = () => {
    setPicked(new Set());
    setResult({ type: "none", title: "", text: "" });
    setAchievementSent(false);
  };

  const check = () => {
    let correctCount = 0;
    let wrongCount = 0;

    for (const id of picked) {
      if (CORRECT.has(id)) correctCount += 1;
      else wrongCount += 1;
    }

    const missed = [...CORRECT].filter((id) => !picked.has(id));

    if (correctCount === 3 && wrongCount === 0) {
      setResult({
        type: "ok",
        title: "✅ Вірно! Ти знайшов(ла) причини стрибка суми",
        text:
          "У листопаді: (1) більше кВт·год, (2) показники не передані вчасно, тому сума могла бути розрахунковою, " +
          "(3) доданий борг попереднього періоду. Саме поєднання цих факторів дає різкий стрибок.",
      });
      return;
    }

    const parts = [];

    if (wrongCount > 0) {
      parts.push(
        `Є зайві обрані причини (${wrongCount}). Спробуй обирати лише те, що підтверджується “доказами” у платіжках.`
      );
    }

    if (missed.length > 0) {
      const names = missed
        .map((id) => REASONS.find((r) => r.id === id)?.text)
        .filter(Boolean)
        .join(", ");
      parts.push(`Не вистачає: ${names}.`);
    }

    setResult({
      type: "bad",
      title: "❗ Не зовсім",
      text:
        parts.join(" ") +
        " Порада: порівняй кВт·год, перевір рядок про показники та наявність боргу.",
    });
  };

  // ✅ Досягнення: “чому приходять різні суми”
  const success = result.type === "ok";
  useEffect(() => {
    const send = async () => {
      if (!token) return;
      if (!success) return;
      if (achievementSent) return;

      try {
        await budgetContentApi.complete(token, "budget_why_different_sums");
        setAchievementSent(true);
      } catch (_) {}
    };
    send();
  }, [token, success, achievementSent]);

  return (
    <Wrap>
      <Header>
        <div>
          <Title>Симуляція: “Детектив рахунків”</Title>
          <Sub>
            Маєш 2 платіжки: <b>Жовтень — 900 грн</b> і <b>Листопад — 1600 грн</b>.
            Твоє завдання — знайти причини, чому сума так зросла.
          </Sub>
        </div>
      </Header>

      <Grid>
        <Left>
          <Card>
            <CardTitle>Порівняй платіжки</CardTitle>

            <BillGrid>
              <BillCard>
                <BillTop>
                  <BillMonth>{bills.oct.month}</BillMonth>
                  <BillSum>{fmt(bills.oct.sum)} грн</BillSum>
                </BillTop>

                <BillBody>
                  <Row>
                    <Label>Період</Label>
                    <Value>{bills.oct.date}</Value>
                  </Row>
                  <Row>
                    <Label>Споживання</Label>
                    <Value>
                      <b>{bills.oct.kwh}</b> кВт·год
                    </Value>
                  </Row>
                  <Row>
                    <Label>Тариф</Label>
                    <Value>{fmt(bills.oct.tariff)} грн/кВт·год</Value>
                  </Row>
                  <Row>
                    <Label>Борг</Label>
                    <Value>{fmt(bills.oct.debt)} грн</Value>
                  </Row>

                  <Divider />

                  <MiniNote>{bills.oct.note}</MiniNote>
                  <TagRow>
                    {bills.oct.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </TagRow>
                </BillBody>
              </BillCard>

              <BillCard $highlight>
                <BillTop>
                  <BillMonth>{bills.nov.month}</BillMonth>
                  <BillSum $big>{fmt(bills.nov.sum)} грн</BillSum>
                </BillTop>

                <BillBody>
                  <Row>
                    <Label>Період</Label>
                    <Value>{bills.nov.date}</Value>
                  </Row>
                  <Row>
                    <Label>Споживання</Label>
                    <Value>
                      <b>{bills.nov.kwh}</b> кВт·год
                    </Value>
                  </Row>
                  <Row>
                    <Label>Тариф</Label>
                    <Value>{fmt(bills.nov.tariff)} грн/кВт·год</Value>
                  </Row>
                  <Row>
                    <Label>Борг</Label>
                    <Value>
                      <b>{fmt(bills.nov.debt)}</b> грн
                    </Value>
                  </Row>

                  <Divider />

                  <MiniNote>{bills.nov.note}</MiniNote>
                  <TagRow>
                    {bills.nov.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </TagRow>
                </BillBody>
              </BillCard>
            </BillGrid>
          </Card>

          <Evidence>
            <EvidenceTitle>Підказка “докази”</EvidenceTitle>
            <EvidenceList>
              <li>
                У листопаді <b>кВт·год більше</b> (470 vs 300) → базова сума зростає.
              </li>
              <li>
                У листопаді є позначка про <b>непередані показники</b> → нарахування могло бути розрахунковим.
              </li>
              <li>
                У листопаді з’явився <b>борг 200 грн</b> → додається до підсумку.
              </li>
            </EvidenceList>
          </Evidence>
        </Left>

        <Right>
          <ReasonsCard>
            <ReasonsTitle>Обери причини стрибка суми</ReasonsTitle>

            <ReasonList>
              {REASONS.map((r) => (
                <ReasonItem key={r.id} onClick={() => toggleReason(r.id)}>
                  <Check
                    type="checkbox"
                    checked={picked.has(r.id)}
                    onChange={() => toggleReason(r.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <ReasonText>{r.text}</ReasonText>
                </ReasonItem>
              ))}
            </ReasonList>

            <Controls>
              <Btn onClick={check}>Перевірити</Btn>
              <BtnSecondary onClick={reset}>Скинути</BtnSecondary>
            </Controls>

            {result.type !== "none" ? (
              <Hint $type={result.type}>
                <HintIcon>{result.type === "ok" ? "✅" : "❗"}</HintIcon>
                <div>
                  <HintTitle>{result.title}</HintTitle>
                  <HintText>{result.text}</HintText>
                </div>
              </Hint>
            ) : null}
          </ReasonsCard>
        </Right>
      </Grid>
    </Wrap>
  );
}