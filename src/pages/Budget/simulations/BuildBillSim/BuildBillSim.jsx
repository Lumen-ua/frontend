import React, { useMemo, useState } from "react";
import {
  Wrap,
  Header,
  Title,
  Sub,
  Grid,
  Card,
  CardTitle,
  PillRow,
  Pill,
  BlocksArea,
  BlocksTitle,
  BlocksGrid,
  Block,
  BlockIcon,
  BlockName,
  BlockValue,
  DropZone,
  DropTitle,
  DropHint,
  Slots,
  Slot,
  SlotLabel,
  SlotBox,
  SlotEmpty,
  SlotFilled,
  SlotRemove,
  Divider,
  Summary,
  SummaryRow,
  SumBig,
  BtnRow,
  Btn,
  BtnSecondary,
  Hint,
  HintIcon,
  HintTitle,
  HintText,
  SmallMuted,
  CalcLine,
} from "./BuildBillSim.styled";

const fmt = (n) =>
  new Intl.NumberFormat("uk-UA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

const BASE_CONSUMPTION = 150; 
const TARIF_OPTIONS = [
  { id: "t1", label: "2.64 грн/кВт·год", value: 2.64 },
  { id: "t2", label: "3.00 грн/кВт·год", value: 3.0 },
  { id: "t3", label: "1.68 грн/кВт·год", value: 1.68 },
];

const makeBlocks = ({ energy, debt, overpay }) => [
  {
    id: "energy",
    name: "Електроенергія",
    slot: "energy",
    sign: "+",
    value: energy,
    icon: "⚡",
  },
  {
    id: "debt",
    name: "Борг",
    slot: "adjust",
    sign: "+",
    value: debt,
    icon: "📦",
  },
  {
    id: "overpay",
    name: "Переплата",
    slot: "adjust",
    sign: "−",
    value: overpay,
    icon: "💙",
  },
];

export default function BuildBillSim() {
  const [tariffId, setTariffId] = useState("t1");

  const tariffValue = useMemo(() => {
    const t = TARIF_OPTIONS.find((x) => x.id === tariffId);
    return t ? t.value : 2.64;
  }, [tariffId]);

  const energyCost = useMemo(() => {
    return Math.round(BASE_CONSUMPTION * tariffValue * 100) / 100;
  }, [tariffValue]);

  const blocks = useMemo(
    () => makeBlocks({ energy: energyCost, debt: 200, overpay: -100 }),
    [energyCost]
  );

  const slotDefs = [
    { id: "energy", label: "1) Електроенергія" },
    { id: "distribution", label: "2) Розподіл (не обов’язково в цій задачі)" },
    { id: "adjust", label: "3) Борг / Переплата" },
    { id: "abon", label: "4) Абонплата (не обов’язково в цій задачі)" },
  ];

  const [slotState, setSlotState] = useState({
    energy: null,
    distribution: null,
    adjust: null,
    abon: null,
  });

  const [feedback, setFeedback] = useState({ type: "none", title: "", text: "" });
  const [checked, setChecked] = useState(false);

  const usedBlockIds = useMemo(() => {
    return new Set(Object.values(slotState).filter(Boolean));
  }, [slotState]);

  const availableBlocks = useMemo(() => {
    return blocks.filter((b) => !usedBlockIds.has(b.id));
  }, [blocks, usedBlockIds]);

  const placedBlocks = useMemo(() => {
    const byId = Object.fromEntries(blocks.map((b) => [b.id, b]));
    const placed = {};
    for (const slot of slotDefs) {
      placed[slot.id] = slotState[slot.id] ? byId[slotState[slot.id]] : null;
    }
    return placed;
  }, [blocks, slotDefs, slotState]);

  const currentSum = useMemo(() => {
    let sum = 0;
    for (const v of Object.values(slotState)) {
      if (!v) continue;
      const block = blocks.find((b) => b.id === v);
      if (block) sum += block.value;
    }
    return Math.round(sum * 100) / 100;
  }, [slotState, blocks]);

  const expectedSum = useMemo(() => {
    const energy = blocks.find((b) => b.id === "energy")?.value ?? 0;
    const debt = blocks.find((b) => b.id === "debt")?.value ?? 0;
    const over = blocks.find((b) => b.id === "overpay")?.value ?? 0;
    return Math.round((energy + debt + over) * 100) / 100;
  }, [blocks]);

  const onDragStartBlock = (e, blockId) => {
    e.dataTransfer.setData("text/plain", blockId);
    e.dataTransfer.effectAllowed = "move";
  };

  const allowDrop = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const dropToSlot = (e, slotId) => {
    e.preventDefault();
    const blockId = e.dataTransfer.getData("text/plain");
    if (!blockId) return;

    const next = { ...slotState };
    for (const k of Object.keys(next)) {
      if (next[k] === blockId) next[k] = null;
    }

    next[slotId] = blockId;

    setSlotState(next);
    setFeedback({ type: "none", title: "", text: "" });
    setChecked(false);
  };

  const removeFromSlot = (slotId) => {
    setSlotState((prev) => ({ ...prev, [slotId]: null }));
    setFeedback({ type: "none", title: "", text: "" });
    setChecked(false);
  };

  const showOk = (text, title = "Вірно") =>
    setFeedback({ type: "ok", title, text });

  const showBad = (text, title = "Помилка") =>
    setFeedback({ type: "bad", title, text });

  const check = () => {
    setChecked(true);

    const energyInRightSlot = slotState.energy === "energy";
    const debtPlaced = usedBlockIds.has("debt");
    const overPlaced = usedBlockIds.has("overpay");

    if (!energyInRightSlot) {
      showBad(
        "Блок “Електроенергія” має бути в слоті 1) Електроенергія. Це база рахунку.",
        "Крок 1 не зібрано"
      );
      return;
    }

    if (!debtPlaced || !overPlaced) {
      showBad(
        "Додай обидва коригування: і “Борг”, і “Переплата”. Вони змінюють фінальну суму.",
        "Не всі блоки використані"
      );
      return;
    }

    if (currentSum !== expectedSum) {
      showBad(
        `Сума не зійшлася. Перевір, чи всі потрібні блоки додані. Очікувана сума: ${fmt(
          expectedSum
        )} грн.`,
        "Підсумок не збігається"
      );
      return;
    }

    showOk(
      `Готово! Ти правильно зібрав(ла) “Разом до сплати”: ${fmt(expectedSum)} грн.`,
      "✅ Рахунок зібрано"
    );
  };

  const reset = () => {
    setSlotState({
      energy: null,
      distribution: null,
      adjust: null,
      abon: null,
    });
    setFeedback({ type: "none", title: "", text: "" });
    setChecked(false);
  };

  return (
    <Wrap>
      <Header>
        <div>
          <Title>Симуляція: “Збери рахунок сам”</Title>
          <Sub>
            Перетягни блоки в зони рахунку й зберіть підсумкову суму “Разом до сплати”.
            У цій вправі важливо використати <b>усі потрібні блоки</b>.
          </Sub>
        </div>
      </Header>

      <Grid>
        {/* LEFT: умови */}
        <Card>
          <CardTitle>Твої умови</CardTitle>

          <PillRow>
            <Pill>
              <b>Споживання:</b> {BASE_CONSUMPTION} кВт·год
            </Pill>
          </PillRow>

          <PillRow>
            <Pill>
              <b>Тариф:</b>
              <select
                value={tariffId}
                onChange={(e) => setTariffId(e.target.value)}
                style={{
                  marginLeft: 8,
                  borderRadius: 10,
                  padding: "7px 10px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  fontWeight: 900,
                  background: "rgba(255,255,255,0.95)",
                }}
              >
                {TARIF_OPTIONS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Pill>
          </PillRow>

          <Divider />

          <CalcLine>
            <span>База:</span>
            <b>
              {BASE_CONSUMPTION} × {tariffValue} = {fmt(energyCost)} грн
            </b>
          </CalcLine>

          <SmallMuted>
            Після зміни тарифу блок “Електроенергія” автоматично оновлює значення.
          </SmallMuted>
        </Card>

        {/* CENTER: блоки */}
        <Card>
          <BlocksArea>
            <BlocksTitle>Додаткові складові (перетягни)</BlocksTitle>
            <BlocksGrid>
              {availableBlocks.map((b) => (
                <Block
                  key={b.id}
                  draggable
                  onDragStart={(e) => onDragStartBlock(e, b.id)}
                  title="Перетягни у слот праворуч"
                >
                  <BlockIcon>{b.icon}</BlockIcon>
                  <div>
                    <BlockName>{b.name}</BlockName>
                    <BlockValue>
                      {b.sign} {fmt(Math.abs(b.value))} грн
                    </BlockValue>
                  </div>
                </Block>
              ))}
            </BlocksGrid>

            {availableBlocks.length === 0 ? (
              <SmallMuted>Усі блоки вже розміщені у рахунку.</SmallMuted>
            ) : null}
          </BlocksArea>
        </Card>

        {/* RIGHT: drop zones */}
        <Card>
          <DropZone>
            <DropTitle>Збери “Разом до сплати”</DropTitle>
            <DropHint>Перетягни блок у відповідний рядок. Можна замінювати блоки місцями.</DropHint>

            <Slots>
              {slotDefs.map((s) => {
                const placed = placedBlocks[s.id];
                const isActive = checked && s.id === "energy" && slotState.energy !== "energy";

                return (
                  <Slot key={s.id}>
                    <SlotLabel>{s.label}</SlotLabel>

                    <SlotBox
                      onDragOver={allowDrop}
                      onDrop={(e) => dropToSlot(e, s.id)}
                      $warn={isActive}
                    >
                      {!placed ? (
                        <SlotEmpty>Перетягни сюди</SlotEmpty>
                      ) : (
                        <SlotFilled>
                          <span>
                            {placed.icon} <b>{placed.name}</b> —{" "}
                            <b>
                              {placed.sign} {fmt(Math.abs(placed.value))} грн
                            </b>
                          </span>
                          <SlotRemove onClick={() => removeFromSlot(s.id)}>×</SlotRemove>
                        </SlotFilled>
                      )}
                    </SlotBox>
                  </Slot>
                );
              })}
            </Slots>

            <Divider />

            <Summary>
              <SummaryRow>
                <span>Проміжний підсумок</span>
                <b>{fmt(currentSum)} грн</b>
              </SummaryRow>

              <SumBig>
                Разом до сплати: <b>{fmt(currentSum)} грн</b>
              </SumBig>

              <BtnRow>
                <Btn onClick={check}>Перевірити</Btn>
                <BtnSecondary onClick={reset}>Скинути</BtnSecondary>
              </BtnRow>

              {feedback.type !== "none" ? (
                <Hint $type={feedback.type}>
                  <HintIcon>{feedback.type === "ok" ? "✅" : "❗"}</HintIcon>
                  <div>
                    <HintTitle>{feedback.title}</HintTitle>
                    <HintText>{feedback.text}</HintText>
                  </div>
                </Hint>
              ) : null}

              <SmallMuted>
                Очікувана сума (для викладача/перевірки): <b>{fmt(expectedSum)} грн</b>
              </SmallMuted>
            </Summary>
          </DropZone>
        </Card>
      </Grid>
    </Wrap>
  );
}