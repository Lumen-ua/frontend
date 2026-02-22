import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Page,
  Container,
  TopTitle,
  TopSubTitle,
  Grid,
  Card,
  CardHeader,
  Badge,
  CardTitle,
  BackBtn,
  CardBody,
  Paragraph,
  MiniTitle,
  BulletList,
  NoteBox,
  NoteTitle,
  NoteList,
  ExampleBox,
  ExampleTitle,
  ExampleRow,
  ExampleCell,
  Pill,
  FormulaBar,
  FormulaTitle,
  FormulaText,
  IconChip,
  TwoCols,
  Divider,
} from "./ForecastCalculator.styled";


import WhatIfSim from "../../simulations/WhatIfSim/WhatIfSim";

export default function ForecastCalculator() {
  const navigate = useNavigate();
  return (
    <Page>
      <Container>
         <BackBtn type="button" onClick={() => navigate("/budget")}>
                  ← Назад до “Бюджет та рахунки”
          </BackBtn>


        <TopTitle>
          Калькулятор прогнозу витрат <span>(як оцінити майбутню суму)</span>
        </TopTitle>

        <TopSubTitle>
          Прогноз — це оцінка майбутнього рахунку на основі твого споживання, тарифу та очікуваних
          змін (сезон, техніка, кількість людей). Це допомагає планувати бюджет і уникати “сюрпризів”.
        </TopSubTitle>

        <Grid>
          {/* 1 */}
          <Card>
            <CardHeader>
              <Badge>1</Badge>
              <CardTitle>Базовий прогноз</CardTitle>
            </CardHeader>
            <CardBody>
              <MiniTitle>
                <IconChip>⚡</IconChip> Логіка
              </MiniTitle>
              <Paragraph>
                Найпростіший прогноз будується від середнього споживання за останні <b>3 місяці</b>,
                помноженого на тариф.
              </Paragraph>

              <NoteBox>
                <NoteTitle>Кроки:</NoteTitle>
                <NoteList>
                  <li>Знайди кВт·год за 3 місяці</li>
                  <li>Порахуй середнє: (кВт₁ + кВт₂ + кВт₃) ÷ 3</li>
                  <li>Помнож на тариф</li>
                </NoteList>
              </NoteBox>

              <ExampleBox>
                <ExampleTitle>Міні-приклад</ExampleTitle>
                <ExampleRow>
                  <ExampleCell $muted>Середнє</ExampleCell>
                  <ExampleCell>
                    <b>183</b> кВт
                  </ExampleCell>
                </ExampleRow>
                <ExampleRow>
                  <ExampleCell $muted>Тариф</ExampleCell>
                  <ExampleCell>2.64 грн</ExampleCell>
                </ExampleRow>
                <Divider />
                <ExampleRow>
                  <ExampleCell $muted>Прогноз</ExampleCell>
                  <ExampleCell $bold>≈ 483 грн</ExampleCell>
                </ExampleRow>
              </ExampleBox>
            </CardBody>
          </Card>

          {/* 2 */}
          <Card>
            <CardHeader>
              <Badge>2</Badge>
              <CardTitle>Потужність приладів</CardTitle>
            </CardHeader>
            <CardBody>
              <Paragraph>
                Вплив техніки на рахунок залежить від її <b>потужності (кВт)</b> та часу роботи.
                Потужність можна знайти на шильдику/інструкції або в характеристиках.
              </Paragraph>

              <MiniTitle>
                <IconChip>🔌</IconChip> Орієнтири
              </MiniTitle>
              <BulletList>
                <li>Обігрівач: <b>2 кВт</b></li>
                <li>Бойлер: <b>1.5–2 кВт</b></li>
                <li>Кондиціонер: <b>1–2.5 кВт</b></li>
                <li>Чайник: <b>~2 кВт</b> (але працює недовго)</li>
              </BulletList>

              <NoteBox>
                <NoteTitle>Порада:</NoteTitle>
                <NoteList>
                  <li>Потужні прилади + багато годин → найбільший вплив на суму</li>
                </NoteList>
              </NoteBox>
            </CardBody>
          </Card>

          {/* 3 */}
          <Card>
            <CardHeader>
              <Badge>3</Badge>
              <CardTitle>Формула</CardTitle>
            </CardHeader>
            <CardBody>
              <Paragraph>
                Щоб оцінити споживання конкретного приладу, використовують просту формулу:
              </Paragraph>

              <NoteBox>
                <NoteTitle>Формула приладу:</NoteTitle>
                <NoteList>
                  <li>
                    <b>Потужність (кВт) × Години × Дні = кВт·год</b>
                  </li>
                </NoteList>
              </NoteBox>

              <ExampleBox>
                <ExampleTitle>Приклад</ExampleTitle>
                <Paragraph>
                  Обігрівач <b>2 кВт</b> працює <b>4 год/день</b> протягом <b>30 днів</b>:
                </Paragraph>
                <ExampleRow>
                  <ExampleCell $muted>кВт·год</ExampleCell>
                  <ExampleCell $bold>2 × 4 × 30 = 240</ExampleCell>
                </ExampleRow>
                <Divider />
                <Paragraph>
                  Якщо тариф 2.64 грн → <b>240 × 2.64 ≈ 633 грн</b>
                </Paragraph>
              </ExampleBox>
            </CardBody>
          </Card>

          {/* 4 */}
          <Card>
            <CardHeader>
              <Badge>4</Badge>
              <CardTitle>Сезонний прогноз</CardTitle>
            </CardHeader>
            <CardBody>
              <Paragraph>
                Одна й та сама квартира може мати дуже різне споживання в різні пори року.
                Це нормально: змінюються прилади та кількість годин освітлення.
              </Paragraph>

              <TwoCols>
                <div>
                  <MiniTitle>
                    <IconChip>❄️</IconChip> Зима
                  </MiniTitle>
                  <BulletList>
                    <li>обігрівачі / тепла підлога</li>
                    <li>бойлер</li>
                    <li>більше освітлення</li>
                  </BulletList>
                  <Pill>Типово: +30–70% до середнього</Pill>
                </div>

                <div>
                  <MiniTitle>
                    <IconChip>☀️</IconChip> Літо
                  </MiniTitle>
                  <BulletList>
                    <li>кондиціонер</li>
                    <li>вентилятори</li>
                  </BulletList>
                  <Pill>Типово: +20–50% до середнього</Pill>
                </div>
              </TwoCols>
            </CardBody>
          </Card>

          {/* 5 */}
          <Card>
            <CardHeader>
              <Badge>5</Badge>
              <CardTitle>Двоставковий тариф (день/ніч)</CardTitle>
            </CardHeader>
            <CardBody>
              <Paragraph>
                Якщо лічильник двозонний, споживання ділиться на <b>день</b> та <b>ніч</b>.
                Тоді рахунок залежить не тільки від кВт·год, а й від того, <b>коли</b> вони спожиті.
              </Paragraph>

              <NoteBox>
                <NoteTitle>Формула:</NoteTitle>
                <NoteList>
                  <li>
                    <b>Сума = (День × Тариф_день) + (Ніч × Тариф_ніч)</b>
                  </li>
                </NoteList>
              </NoteBox>

              <NoteBox>
                <NoteTitle>Порада:</NoteTitle>
                <NoteList>
                  <li>Прання/бойлер можна переносити на нічну зону (якщо це зручно)</li>
                </NoteList>
              </NoteBox>
            </CardBody>
          </Card>

          {/* 6 */}
          <Card>
            <CardHeader>
              <Badge>6</Badge>
              <CardTitle>Чому прогноз може не співпасти</CardTitle>
            </CardHeader>
            <CardBody>
              <Paragraph>
                Прогноз — це модель. В реальній платіжці можуть бути фактори, яких немає в “ідеальному”
                розрахунку кВт × тариф.
              </Paragraph>

              <BulletList>
                <li>змінився тариф</li>
                <li>перерахунок / коригування</li>
                <li>нарахування “по середньому” (якщо не передані показники)</li>
                <li>пільги / субсидія</li>
                <li>борг або переплата</li>
              </BulletList>

              <Pill>Висновок: прогноз найкраще працює для “базової” суми.</Pill>
            </CardBody>
          </Card>

          {/* 7 */}
          <Card>
            <CardHeader>
              <Badge>7</Badge>
              <CardTitle>Як зробити прогноз точнішим</CardTitle>
            </CardHeader>
            <CardBody>
              <BulletList>
                <li>Бери середнє за <b>6 місяців</b>, якщо є дані</li>
                <li>Окремо рахуй <b>великі прилади</b> (обігрівач/бойлер/кондиціонер)</li>
                <li>Враховуй сезонність (зима/літо)</li>
                <li>Додавай <b>борг</b> або віднімай <b>переплату</b>, якщо вони є</li>
              </BulletList>

              <NoteBox>
                <NoteTitle>Порада:</NoteTitle>
                <NoteList>
                  <li>
                    Найбільшу точність дає комбінація: середнє + великі прилади + борг/переплата.
                  </li>
                </NoteList>
              </NoteBox>
            </CardBody>
          </Card>

          {/* 8 */}
          <Card>
            <CardHeader>
              <Badge>8</Badge>
              <CardTitle>Практичний приклад</CardTitle>
            </CardHeader>
            <CardBody>
              <Paragraph>
                Є середнє споживання і додаткове навантаження (наприклад, обігрівач). Також є борг.
              </Paragraph>

              <ExampleBox>
                <ExampleTitle>Розрахунок</ExampleTitle>
                <ExampleRow>
                  <ExampleCell $muted>Середнє</ExampleCell>
                  <ExampleCell>
                    <b>180</b> кВт
                  </ExampleCell>
                </ExampleRow>
                <ExampleRow>
                  <ExampleCell $muted>Додатково</ExampleCell>
                  <ExampleCell>
                    <b>200</b> кВт
                  </ExampleCell>
                </ExampleRow>
                <ExampleRow>
                  <ExampleCell $muted>Тариф</ExampleCell>
                  <ExampleCell>2.64 грн</ExampleCell>
                </ExampleRow>
                <ExampleRow>
                  <ExampleCell $muted>Борг</ExampleCell>
                  <ExampleCell>150 грн</ExampleCell>
                </ExampleRow>

                <Divider />

                <ExampleRow>
                  <ExampleCell $muted>Сума</ExampleCell>
                  <ExampleCell $bold>(180 + 200) × 2.64 = 1003 грн</ExampleCell>
                </ExampleRow>
                <ExampleRow>
                  <ExampleCell $muted>Разом</ExampleCell>
                  <ExampleCell $bold>≈ 1153 грн</ExampleCell>
                </ExampleRow>
              </ExampleBox>
            </CardBody>
          </Card>

          {/* 9 */}
          <Card>
            <CardHeader>
              <Badge>9</Badge>
              <CardTitle>Чому це корисно</CardTitle>
            </CardHeader>
            <CardBody>
              <BulletList>
                <li>планувати бюджет на місяць</li>
                <li>передбачати сезонні “піки”</li>
                <li>оцінити вплив нової техніки</li>
                <li>уникнути “шокової” платіжки</li>
              </BulletList>

              <Pill>Це інструмент контролю: ти розумієш, звідки береться сума.</Pill>
            </CardBody>
          </Card>

          {/* bottom formula bar */}
          <FormulaBar>
            <FormulaTitle>Ключова формула</FormulaTitle>
            <FormulaText>
              <b>(Середнє + Додаткове)</b> × <b>Тариф</b> ± <b>Борг / Переплата</b>
            </FormulaText>
          </FormulaBar>
        </Grid>

        <Card>
  <CardHeader>
    <Badge>🎮</Badge>
    <CardTitle>Практика: “Що буде якщо…”</CardTitle>
  </CardHeader>
  <CardBody>
    <WhatIfSim />
  </CardBody>
</Card>
      </Container>
    </Page>
  );
}