import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Page,
  Container,
  TopTitle,
  TopSubTitle,
  ContentGrid,
  Card,
  CardHeader,
  Badge,
  BackBtn,
  CardTitle,
  CardBody,
  Paragraph,
  MiniTitle,
  BulletList,
  NoteBox,
  NoteTitle,
  NoteList,
  TwoCols,
  Bubble,
  FormulaBox,
  BigFormula,
  ExampleBox,
  ExampleRow,
  Divider,
  StepsList,
  TagsRow,
  Tag,
} from "./FinalSum.styled";


export default function FinalSum() {
  const navigate = useNavigate();
  return (
    <Page>
      <Container>
        <BackBtn type="button" onClick={() => navigate("/budget")}>
                  ← Назад до “Бюджет та рахунки”
                </BackBtn>
        
        <TopTitle>
          Як формується кінцева сума <span>(чому “Разом” ≠ просто тариф × кВт·год)</span>
        </TopTitle>

        <TopSubTitle>
          Кінцева сума в платіжці — це результат кількох кроків: базове нарахування за споживання +
          додаткові складові (розподіл/абонплата) + фінансові коригування (борг/переплата/перерахунок).
        </TopSubTitle>

        <ContentGrid>
          {/* 1) Структура */}
          <Card $span2>
            <CardHeader>
              <Badge>1</Badge>
              <CardTitle>Базова структура кінцевої суми</CardTitle>
            </CardHeader>

            <CardBody>
              <Paragraph>
                “Разом до сплати” формується з кількох складових. У різних платіжках назви можуть
                трохи відрізнятися, але логіка однакова.
              </Paragraph>

              <TwoCols>
                <div>
                  <MiniTitle>Основні складові</MiniTitle>
                  <BulletList>
                    <li>
                      <b>Електроенергія (товар)</b> — вартість спожитих кВт·год:{" "}
                      <b>Споживання × Тариф</b>.
                    </li>
                    <li>
                      <b>Розподіл</b> — плата за доставку електроенергії мережами (ОСР).
                    </li>
                    <li>
                      <b>Абонплата</b> (якщо є) — фіксована щомісячна складова.
                    </li>
                  </BulletList>

                  <MiniTitle style={{ marginTop: 12 }}>Фінансові коригування</MiniTitle>
                  <BulletList>
                    <li>
                      <b>Борг</b> — якщо минулий рахунок оплачено не повністю.
                    </li>
                    <li>
                      <b>Переплата</b> — якщо раніше сплатили більше (зменшує суму).
                    </li>
                    <li>
                      <b>Перерахунок / коригування</b> — уточнення попередніх нарахувань.
                    </li>
                    <li>
                      <b>Пеня</b> — нарахування за прострочення (за наявності).
                    </li>
                  </BulletList>
                </div>

                <div>
                  <FormulaBox>
                    <NoteTitle>Узагальнена формула</NoteTitle>
                    <BigFormula>
                      Разом = (Електроенергія + Розподіл + Абонплата) + Борг − Переплата ± Перерахунок + Пеня
                    </BigFormula>
                  </FormulaBox>

                  <NoteBox>
                    <NoteTitle>Що важливо:</NoteTitle>
                    <NoteList>
                      <li>“Електроенергія” — це лише базова частина.</li>
                      <li>“Разом” включає історію оплат: борг/переплату.</li>
                      <li>Перерахунок може додати або відняти суму.</li>
                    </NoteList>
                  </NoteBox>

                  <TagsRow>
                    <Tag>товар</Tag>
                    <Tag>послуги</Tag>
                    <Tag>коригування</Tag>
                    <Tag>підсумок</Tag>
                  </TagsRow>
                </div>
              </TwoCols>
            </CardBody>
          </Card>

          {/* 2) Чому Разом ≠ тариф×кВт */}
          <Card $span2>
            <CardHeader>
              <Badge>2</Badge>
              <CardTitle>Чому “Разом” ≠ просто тариф × кВт·год</CardTitle>
            </CardHeader>

            <CardBody>
              <Paragraph>
                Часто люди перевіряють рахунок так: <b>кВт·год × тариф</b>. Це правильна перевірка
                лише для базового нарахування, але не для фінальної суми.
              </Paragraph>

              <TwoCols>
                <div>
                  <MiniTitle>Найчастіші причини різниці</MiniTitle>
                  <BulletList>
                    <li>
                      <b>Є розподіл</b> — окремий рядок або окрема частина в структурі платежу.
                    </li>
                    <li>
                      <b>Є борг</b> — минулі недоплати додаються до поточного рахунку.
                    </li>
                    <li>
                      <b>Є переплата</b> — зменшує суму “Разом до сплати”.
                    </li>
                    <li>
                      <b>Є перерахунок</b> — уточнення після реальних показників чи перевірки.
                    </li>
                  </BulletList>

                  <Bubble>
                    Найпростіше правило: “кВт·год × тариф” — це база, а “Разом” — база + коригування.
                  </Bubble>
                </div>

                <div>
                  <ExampleBox>
                    <NoteTitle>Міні-приклад логіки</NoteTitle>

                    <ExampleRow>
                      <span>Електроенергія</span>
                      <b>448.80 грн</b>
                    </ExampleRow>
                    <ExampleRow>
                      <span>Розподіл</span>
                      <b>+ 120.00 грн</b>
                    </ExampleRow>
                    <ExampleRow>
                      <span>Борг</span>
                      <b>+ 200.00 грн</b>
                    </ExampleRow>
                    <ExampleRow>
                      <span>Переплата</span>
                      <b>− 0.00 грн</b>
                    </ExampleRow>
                    <ExampleRow>
                      <span>Перерахунок</span>
                      <b>+ 30.00 грн</b>
                    </ExampleRow>

                    <Divider />

                    <ExampleRow>
                      <span>Разом до сплати</span>
                      <b>798.80 грн</b>
                    </ExampleRow>
                  </ExampleBox>

                  <Paragraph>
                    <b>Висновок:</b> навіть якщо база (448.80) правильна, фінальний підсумок може бути інший,
                    бо додаються інші рядки.
                  </Paragraph>
                </div>
              </TwoCols>
            </CardBody>
          </Card>

          {/* 3) Перерахунок */}
          <Card>
            <CardHeader>
              <Badge>3</Badge>
              <CardTitle>Перерахунок / коригування</CardTitle>
            </CardHeader>

            <CardBody>
              <Paragraph>
                <b>Перерахунок</b> — це уточнення попередньої суми, коли з’явилися точні дані або
                знайшли помилку.
              </Paragraph>

              <MiniTitle>Коли це трапляється</MiniTitle>
              <BulletList>
                <li>після подачі реальних показників замість “по середньому”</li>
                <li>після перевірки лічильника</li>
                <li>при виявленні технічної/облікової помилки</li>
                <li>при застосуванні компенсації або коригування нарахувань</li>
              </BulletList>

              <NoteBox>
                <NoteTitle>Як читати:</NoteTitle>
                <NoteList>
                  <li>перерахунок може бути “+” або “−”</li>
                  <li>це не штраф, а уточнення попереднього розрахунку</li>
                </NoteList>
              </NoteBox>
            </CardBody>
          </Card>

          {/* 4) Борг/переплата */}
          <Card>
            <CardHeader>
              <Badge>4</Badge>
              <CardTitle>Борг і переплата</CardTitle>
            </CardHeader>

            <CardBody>
              <MiniTitle>Борг</MiniTitle>
              <Paragraph>
                Якщо минулого місяця оплатили не повністю, залишок переноситься в наступний рахунок
                і додається до “Разом”.
              </Paragraph>

              <MiniTitle>Переплата</MiniTitle>
              <Paragraph>
                Якщо раніше сплатили більше, ця сума зменшить поточний рахунок (фактично це “мінус”).
              </Paragraph>

              <Bubble>Коли “сума завелика” — перше, що перевіряють: борг/переплата.</Bubble>
            </CardBody>
          </Card>

          {/* 5) Пеня */}
          <Card>
            <CardHeader>
              <Badge>5</Badge>
              <CardTitle>Пеня</CardTitle>
            </CardHeader>

            <CardBody>
              <Paragraph>
                <b>Пеня</b> — нарахування за прострочення оплати. Вона залежить від умов договору та
                законодавчих норм.
              </Paragraph>

              <NoteBox>
                <NoteTitle>Важливо:</NoteTitle>
                <NoteList>
                  <li>пеня нараховується лише при простроченні</li>
                  <li>якщо бачиш пеню — перевір строк оплати та факт прострочення</li>
                  <li>
                    під час воєнного стану діють особливі правила (в т.ч. обмеження/незастосування пені
                    для побутових споживачів залежно від чинних норм)
                  </li>
                </NoteList>
              </NoteBox>

              <Paragraph>
                <b>Практика:</b> якщо пеня з’явилась — перевір, чи точно було прострочення, і звір з поточними правилами.
              </Paragraph>
            </CardBody>
          </Card>

          {/* 6) Алгоритм перевірки */}
          <Card $span2>
            <CardHeader>
              <Badge>6</Badge>
              <CardTitle>Як швидко перевірити фінальну суму</CardTitle>
            </CardHeader>

            <CardBody>
              <Paragraph>
                Якщо підсумок здається незвичним, перевір його по кроках — так найшвидше знайдеш причину.
              </Paragraph>

              <StepsList>
                <li>Перевір споживання (різниця показників) і тариф → порахуй базову суму.</li>
                <li>Перевір, чи є рядок/частина “розподіл” та/або “абонплата”.</li>
                <li>Знайди “борг” або “переплата” — вони часто змінюють підсумок найбільше.</li>
                <li>Переглянь “перерахунок/коригування” — уточнення за попередні періоди.</li>
                <li>За потреби перевір “пеню” і строк оплати.</li>
              </StepsList>

              <Bubble>
                Порада: коли “Разом” не сходиться — не починай з тарифу. Почни з боргу/переплати і перерахунку.
              </Bubble>
            </CardBody>
          </Card>

        </ContentGrid>
      </Container>
    </Page>
  );
}