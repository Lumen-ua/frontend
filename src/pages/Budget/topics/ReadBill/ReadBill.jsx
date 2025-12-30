import React from "react";
import {
  ReadBillPage,
  ReadBillContainer,
  ReadBillHeader,
  ReadBillHeaderTop,
  ReadBillTitle,
  ReadBillSubTitle,
  ReadBillProgress,
  ReadBillOrangeBar,
  ReadBillBillImageWrap,
  ReadBillBillImage,
  ReadBillMainGrid,
  ReadBillSectionCard,
  ReadBillSectionHeader,
  ReadBillSectionTitle,
  ReadBillCardText,
  ReadBillList,
  ReadBillDivider,
  ReadBillMiniCard,
  ReadBillMiniCardTitle,
  ReadBillMiniCardText,
  ReadBillCalcBox,
  ReadBillCalcTitle,
  ReadBillCalcRow,
  ReadBillInput,
  ReadBillButton,
  ReadBillFootnote,
  ReadBillTable,
  ReadBillTableHead,
  ReadBillTableRow,
  ReadBillTableCell,
  ReadBillMuted,
} from "./ReadBill.styled";

import billPhoto from "../../../../assets/images/bill-photo.webp";

export default function ReadBill() {
  const progress = 10;

  return (
    <ReadBillPage>
      <ReadBillContainer>
        <ReadBillHeader>
          <ReadBillHeaderTop>
            <div>
              <ReadBillTitle>Як читати платіжку</ReadBillTitle>
              <ReadBillSubTitle>
                Розберемо покроково, що означає кожен пункт платіжки за електроенергію
              </ReadBillSubTitle>
            </div>

            <ReadBillProgress aria-label={`Прогрес ${progress}%`}>
              прогрес {progress}%
            </ReadBillProgress>
          </ReadBillHeaderTop>

          <ReadBillOrangeBar $big>Структура платіжки</ReadBillOrangeBar>

          <ReadBillBillImageWrap>
            <ReadBillBillImage
              src={billPhoto}
              alt="Приклад платіжки за електроенергію з позначеними полями"
              loading="lazy"
            />
          </ReadBillBillImageWrap>
        </ReadBillHeader>

        {/* ✅ Новий layout: 3 колонки grid + секції як окремі “items” */}
        <ReadBillMainGrid>
          {/* 1) Тарифікація */}
          <ReadBillSectionCard>
            <ReadBillSectionHeader>
              <ReadBillSectionTitle>Тарифікація</ReadBillSectionTitle>
            </ReadBillSectionHeader>

            <ReadBillMiniCard>
              <ReadBillMiniCardTitle>Одноставковий тариф</ReadBillMiniCardTitle>
              <ReadBillMiniCardText>
                <ReadBillList>
                  <li>Тариф один для всієї доби.</li>
                  <li>Ціна за 1 кВт·год однакова незалежно від часу.</li>
                  <li>
                    У платіжці зазвичай позначено як <b>“Тариф”</b> або <b>“Ціна”</b>.
                  </li>
                </ReadBillList>
              </ReadBillMiniCardText>
            </ReadBillMiniCard>

            <ReadBillDivider />

            <ReadBillMiniCard>
              <ReadBillMiniCardTitle>Двоставковий тариф (денний/нічний)</ReadBillMiniCardTitle>
              <ReadBillMiniCardText>
                <ReadBillList>
                  <li>Є два тарифи: денний і нічний.</li>
                  <li>Потрібні окремі показники або лічильник з розподілом.</li>
                  <li>
                    У платіжці можуть бути рядки <b>“День”</b> / <b>“Ніч”</b>.
                  </li>
                </ReadBillList>
              </ReadBillMiniCardText>
            </ReadBillMiniCard>

            <ReadBillFootnote>
              Коротко про тариф: <ReadBillMuted>споживання × тариф = сума</ReadBillMuted>
            </ReadBillFootnote>
          </ReadBillSectionCard>

          {/* 2) Пеня, борг, переплата */}
          <ReadBillSectionCard>
            <ReadBillSectionHeader>
              <ReadBillSectionTitle>Пеня, борг, переплата</ReadBillSectionTitle>
            </ReadBillSectionHeader>

            <ReadBillMiniCard>
              <ReadBillMiniCardTitle>Пеня</ReadBillMiniCardTitle>
              <ReadBillMiniCardText>
                Нараховується за прострочення платежу. У платіжці може бути окремим рядком або
                включатися в загальну суму.
              </ReadBillMiniCardText>
            </ReadBillMiniCard>

            <ReadBillMiniCard>
              <ReadBillMiniCardTitle>Борг</ReadBillMiniCardTitle>
              <ReadBillMiniCardText>
                Це сума, яку не сплатили раніше. Може з’являтися після перерахунку або якщо
                попередній рахунок не оплачено повністю.
              </ReadBillMiniCardText>
            </ReadBillMiniCard>

            <ReadBillMiniCard>
              <ReadBillMiniCardTitle>Переплата</ReadBillMiniCardTitle>
              <ReadBillMiniCardText>
                Якщо сплатили більше, ніж було нараховано — з’явиться переплата й вона піде в
                рахунок наступних платежів.
              </ReadBillMiniCardText>
            </ReadBillMiniCard>

            <ReadBillFootnote>
              Порада: якщо цифри “стрибають” — спочатку перевір <b>період</b> і <b>показники</b>.
            </ReadBillFootnote>
          </ReadBillSectionCard>

          {/* 3) Підсумкова сума */}
          <ReadBillSectionCard>
            <ReadBillSectionHeader>
              <ReadBillSectionTitle>Підсумкова сума</ReadBillSectionTitle>
            </ReadBillSectionHeader>

            <ReadBillTable role="table" aria-label="Розрахунок підсумкової суми">
              <thead>
                <ReadBillTableHead>
                  <ReadBillTableCell as="th">Елемент</ReadBillTableCell>
                  <ReadBillTableCell as="th" $right>
                    Значення
                  </ReadBillTableCell>
                </ReadBillTableHead>
              </thead>

              <tbody>
                <ReadBillTableRow>
                  <ReadBillTableCell>Споживання</ReadBillTableCell>
                  <ReadBillTableCell $right>XX</ReadBillTableCell>
                </ReadBillTableRow>
                <ReadBillTableRow>
                  <ReadBillTableCell>кВт·год</ReadBillTableCell>
                  <ReadBillTableCell $right>XX</ReadBillTableCell>
                </ReadBillTableRow>
                <ReadBillTableRow>
                  <ReadBillTableCell>Сума за електроенергію</ReadBillTableCell>
                  <ReadBillTableCell $right>XX</ReadBillTableCell>
                </ReadBillTableRow>
                <ReadBillTableRow>
                  <ReadBillTableCell>Абонплата</ReadBillTableCell>
                  <ReadBillTableCell $right>XX</ReadBillTableCell>
                </ReadBillTableRow>
                <ReadBillTableRow>
                  <ReadBillTableCell>Борг / Переплата</ReadBillTableCell>
                  <ReadBillTableCell $right>XX</ReadBillTableCell>
                </ReadBillTableRow>
                <ReadBillTableRow>
                  <ReadBillTableCell>Пеня (якщо є)</ReadBillTableCell>
                  <ReadBillTableCell $right>XX</ReadBillTableCell>
                </ReadBillTableRow>

                <ReadBillTableRow $total>
                  <ReadBillTableCell>Разом до сплати</ReadBillTableCell>
                  <ReadBillTableCell $right>XX</ReadBillTableCell>
                </ReadBillTableRow>
              </tbody>
            </ReadBillTable>

            <ReadBillFootnote>
              <ReadBillMuted>
                Споживання, кВт·год = Нові показники − Старі показники (за період)
              </ReadBillMuted>
            </ReadBillFootnote>
          </ReadBillSectionCard>

          {/* 4) Порахуємо суму (✅ стоїть під 1-ою секцією як новий ряд) */}
          <ReadBillSectionCard $span1>
            <ReadBillSectionHeader>
              <ReadBillSectionTitle>Порахуємо суму</ReadBillSectionTitle>
            </ReadBillSectionHeader>

            <ReadBillCalcBox aria-label="Калькулятор суми">
              <ReadBillCalcTitle>Міні-калькулятор</ReadBillCalcTitle>

              <ReadBillCalcRow>
                <ReadBillInput type="number" inputMode="decimal" placeholder="Старі показники" />
              </ReadBillCalcRow>
              <ReadBillCalcRow>
                <ReadBillInput type="number" inputMode="decimal" placeholder="Нові показники" />
              </ReadBillCalcRow>
              <ReadBillCalcRow>
                <ReadBillInput type="number" inputMode="decimal" placeholder="Тариф (грн/кВт·год)" />
              </ReadBillCalcRow>

              <ReadBillButton type="button">Порахувати</ReadBillButton>

              <ReadBillFootnote>
                Алгоритм: <ReadBillMuted>(Нові − Старі) × Тариф</ReadBillMuted>
              </ReadBillFootnote>
            </ReadBillCalcBox>

            <ReadBillCardText style={{ marginTop: 10 }}>
              Якщо у тебе <b>денний/нічний</b> тариф — рахуємо окремо:
              <ReadBillList>
                <li>(День: Нові − Старі) × Тариф_день</li>
                <li>(Ніч: Нові − Старі) × Тариф_ніч</li>
                <li>Потім додаємо обидві суми.</li>
              </ReadBillList>
            </ReadBillCardText>
          </ReadBillSectionCard>
        </ReadBillMainGrid>
      </ReadBillContainer>
    </ReadBillPage>
  );
}
