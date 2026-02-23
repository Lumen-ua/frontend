import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Page,
  Container,
  TopHeader,
  TopBadge,
  TopTitle,
  TopSubTitle,
  Lead,
  BackBtn,
  Grid,
  Card,
  CardHeader,
  Badge,
  CardTitle,
  CardBody,
  Paragraph,
  Muted,
  Section,
  ThreeCols,
  MiniCard,
  MiniHead,
  MiniIcon,
  MiniTitle,
  MiniTag,
  BulletList,
  Pill,
  PieWrap,
  Pie,
  PieLegend,
  LegendItem,
  CheckList,
  NoteRow,
  NoteIcon,
  NoteText,
  Divider,
} from "./MonthlyBudgeting.styled";

import SurviveBudgetGame from "../../simulations/SurviveBudgetGame/SurviveBudgetGame";

export default function MonthlyBudgeting() {
  
  const navigate = useNavigate();
  return (
    <Page>
      <Container>
        <BackBtn type="button" onClick={() => navigate("/budget")}>
          ← Назад до “Бюджет та рахунки”
        </BackBtn>
        {/* Header */}
        <TopHeader>
          <div>
            <TopTitle>
              <TopBadge>6</TopBadge> Місячне бюджетування
            </TopTitle>
            <TopSubTitle>Як планувати витрати, щоб рахунки не були шоком</TopSubTitle>

            <Lead>
              Місячне бюджетування — це <b>система розподілу доходу</b> так, щоб: покривати обов’язкові
              витрати, уникати боргів, формувати резерв і стабілізувати комунальні платежі.
            </Lead>

            <Paragraph>
              <b>Комунальні платежі</b> — регулярні, але змінні витрати, тому вони потребують окремого планування.
            </Paragraph>
          </div>
        </TopHeader>

        <Grid>
          {/* 1. Структура бюджету */}
          <Card $span2>
            <CardHeader>
              <Badge>1</Badge>
              <CardTitle>Структура особистого бюджету</CardTitle>
            </CardHeader>

            <CardBody>
              <Paragraph>
                Бюджет зручно розділити на блоки. Так легше контролювати витрати і зрозуміти, що саме можна
                коригувати, якщо комуналка зростає.
              </Paragraph>

              <ThreeCols>
                <MiniCard>
                  <MiniHead>
                    <MiniIcon>📄</MiniIcon>
                    <div>
                      <MiniTitle>Обов’язкові витрати</MiniTitle>
                      <MiniTag>комунальні — тут</MiniTag>
                    </div>
                  </MiniHead>

                  <BulletList>
                    <li>оренда / іпотека</li>
                    <li>комунальні платежі</li>
                    <li>транспорт до роботи</li>
                    <li>мінімальні продукти</li>
                    <li>зв’язок</li>
                  </BulletList>

                  <Pill $tone="warn">Це перша пріоритетність</Pill>
                </MiniCard>

                <MiniCard>
                  <MiniHead>
                    <MiniIcon>☕</MiniIcon>
                    <div>
                      <MiniTitle>Змінні витрати</MiniTitle>
                      <MiniTag>це можна регулювати</MiniTag>
                    </div>
                  </MiniHead>

                  <BulletList>
                    <li>кафе</li>
                    <li>одяг</li>
                    <li>розваги</li>
                    <li>підписки</li>
                    <li>таксі</li>
                  </BulletList>

                  <Pill $tone="good">Гнучкий блок</Pill>
                </MiniCard>

                <MiniCard>
                  <MiniHead>
                    <MiniIcon>🏦</MiniIcon>
                    <div>
                      <MiniTitle>Накопичення</MiniTitle>
                      <MiniTag>резерв і подушка</MiniTag>
                    </div>
                  </MiniHead>

                  <BulletList>
                    <li>фінансова подушка (3–6 міс.)</li>
                    <li>великі покупки</li>
                    <li>резерв на сезонний “пік”</li>
                  </BulletList>

                  <Pill $tone="info">Додає стабільність</Pill>
                </MiniCard>
              </ThreeCols>

              <Divider />

              <Paragraph>
                Окремо можна тримати невеликий блок “непередбачені витрати” — це страховка від перерахунків,
                поломок або різкого зростання комуналки.
              </Paragraph>
            </CardBody>
          </Card>

          {/* 2. 50/30/20 */}
          <Card>
            <CardHeader>
              <Badge>2</Badge>
              <CardTitle>Модель 50 / 30 / 20 (адаптована)</CardTitle>
            </CardHeader>

            <CardBody>
              <Paragraph>
                Класичний розподіл доходу допомагає не “з’їдати” все в нуль і завжди мати резерв.
              </Paragraph>

              <PieWrap>
                <Pie>
                  <span>50%</span>
                  <span>30%</span>
                  <span>20%</span>
                </Pie>

                <PieLegend>
                  <LegendItem>
                    <b>50%</b> — обов’язкові витрати
                  </LegendItem>
                  <LegendItem>
                    <b>30%</b> — змінні витрати
                  </LegendItem>
                  <LegendItem>
                    <b>20%</b> — накопичення
                  </LegendItem>
                </PieLegend>
              </PieWrap>

              <Section>
                <Paragraph>
                  <b>Порада:</b> якщо комуналка сильно “стрибає”, можна адаптувати:
                </Paragraph>
                <Pill $tone="warn">50 / 25 / 25</Pill>
                <Muted>Зменшення змінних витрат до 25% дає резерв на комунальні піки.</Muted>
              </Section>
            </CardBody>
          </Card>

          {/* 3. Чому нестабільно */}
          <Card>
            <CardHeader>
              <Badge>3</Badge>
              <CardTitle>Чому комунальні витрати нестабільні</CardTitle>
            </CardHeader>

            <CardBody>
              <Paragraph>
                Комунальні платежі залежать не лише від тарифу — на них впливають умови споживання та розрахунку.
              </Paragraph>

              <CheckList>
                <li>сезон (зима/літо)</li>
                <li>кількість мешканців</li>
                <li>робота приладів (обігрівач, бойлер, кондиціонер)</li>
                <li>зміна тарифу</li>
                <li>передані/непередані показники</li>
              </CheckList>

              <Pill $tone="info">Краще планувати: середнє + буфер</Pill>
            </CardBody>
          </Card>

          {/* Note */}
          <Card $span2>
            <CardBody>
              <NoteRow>
                <NoteIcon>💡</NoteIcon>
                <NoteText>
                  Нотатка: якщо в тебе є <b>борг</b> або <b>переплата</b> — врахуй це додатково при плануванні.
                  Бюджетування працює найкраще, коли ти бачиш “чисту” суму споживання і фінансову історію окремо.
                </NoteText>
              </NoteRow>
            </CardBody>
          </Card>
        </Grid>

        <Card $span2>
            <CardHeader>
                <Badge>🎮</Badge>
                <CardTitle>Практика: “Виживи з бюджетом”</CardTitle>
            </CardHeader>
            <CardBody>
                <SurviveBudgetGame />
            </CardBody>
            </Card>
      </Container>
    </Page>
  );
}