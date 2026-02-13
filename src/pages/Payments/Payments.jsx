import { useState, useEffect } from "react";
import {
    Page,
    Header,
    HeaderIcon,
    Grid,
    GridTwo,
    Card,
    CardIcon,
    CardTitle,
    ContentBox,
    Section,
    BackButton,
    WhenSection,
    GroupTitle,
    HighlightSection,
    CenterHalf,
    HalfSection,
    RightColumn,
    PageTitle,
    TipSection,
    TextTop,
    TextBottom,
    Hint,
    Hint1,
    PaymentsTable,
    Th,
    Td,
    StatusBadge,
    Container
} from "./Payments.styled";

import economyData from '../../mocks/economyData.json';

const topics = [
    { id: "home", title: "Головна", icon: "📄" },
    { id: "history", title: "Історія платежів (JSON)", icon: "💳" }, 
    { id: "enter", title: "Як зайти у розділ оплати", icon: "📁" },
    { id: "service", title: "Як знайти потрібну послугу", icon: "🔍" },
    { id: "meters", title: "Як вводити показники", icon: "⌨️" },
    { id: "edrpou", title: "Що таке ЄДРПОУ?", icon: "❓" },
    { id: "template", title: "Як створити шаблон", icon: "⭐" },
    { id: "refund", title: "Як повернути платіж", icon: "➡️" },
];

export default function Payments() {
    const [activeTopic, setActiveTopic] = useState("home");
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        setPayments(economyData.payments);
    }, []);

    return (
        <Page>
            {/* HEADER */}
            <Header>
                <HeaderIcon>📄</HeaderIcon>
                <div>
                    <h2>Оплата комунальних послуг</h2>
                    <p>
                        Тут ти знаходиш оплачувані рахунки та бачиш історію транзакцій.
                    </p>
                </div>
            </Header>

            {}
            {activeTopic === "home" && (
                <Grid>
                    {topics
                        .filter(t => t.id !== "home")
                        .map(t => (
                            <Card key={t.id} onClick={() => setActiveTopic(t.id)}>
                                <CardIcon>{t.icon}</CardIcon>
                                <CardTitle>{t.title}</CardTitle>
                            </Card>
                        ))}
                </Grid>
            )}

            {}
            {activeTopic !== "home" && (
                <BackButton onClick={() => setActiveTopic("home")}>
                    ← Назад до меню
                </BackButton>
            )}

            {}
            {activeTopic !== "home" && (
                <ContentBox>
                    <PageTitle>
                        {topics.find(t => t.id === activeTopic)?.title}
                    </PageTitle>

                    {/}
                    {activeTopic === "history" && (
                        <Container>
                            <HighlightSection>
                                Дані автоматично завантажені з файлу <code>mocks/economyData.json</code>
                            </HighlightSection>
                            {payments.length > 0 ? (
                                <PaymentsTable>
                                    <thead>
                                        <tr>
                                            <Th>Дата</Th>
                                            <Th>Послуга</Th>
                                            <Th>Сума</Th>
                                            <Th>Статус</Th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map((payment) => (
                                            <tr key={payment.id}>
                                                <Td>{payment.date}</Td>
                                                <Td>{payment.service}</Td>
                                                <Td>{payment.amount} UAH</Td>
                                                <Td>
                                                    <StatusBadge status={payment.status}>
                                                        {payment.status === 'paid' ? 'Сплачено' : 'Очікує'}
                                                    </StatusBadge>
                                                </Td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </PaymentsTable>
                            ) : (
                                <p>Завантаження даних...</p>
                            )}
                        </Container>
                    )}

                    {}
                    
                    {/* ENTER */}
                    {activeTopic === "enter" && (
                        <>
                            <Section>
                                <HighlightSection>
                                    Покрокова інструкція
                                </HighlightSection>
                                <ol>
                                    <li>Відкрий застосунок або сайт, де ти здійснюєш платежі.</li>
                                    <li>
                                        На головній сторінці знайди розділ <b>«Платежі»</b>.
                                    </li>
                                    <li>Перейди у підрозділ <b>«Комунальні платежі»</b>.</li>
                                    <li>Тут ти побачиш список доступних послуг.</li>
                                    <li>Обери потрібну — і система перенаправить тебе.</li>
                                </ol>
                                <TipSection>
                                    💡 <b>Поради</b>
                                    <ul>
                                        <li>Збережи цей розділ у «вибране».</li>
                                    </ul>
                                </TipSection>
                            </Section>

                            <GroupTitle>
                                <b>Розділ «Платежі»</b>
                            </GroupTitle>
                            <GridTwo>
                                <Section>
                                    <b>Меню</b>
                                    <ul>
                                        <li>Головна</li>
                                        <li>Перекази</li>
                                        <li>Платежі</li>
                                        <li>Комунальні послуги</li>
                                    </ul>
                                </Section>
                                <RightColumn>
                                    <TextTop> <Hint>це місце, де можна швидко оплачувати послуги.</Hint></TextTop>
                                    <TextBottom><Hint1>натисни, щоб перейти до списку послуг.</Hint1></TextBottom>
                                </RightColumn>
                            </GridTwo>
                        </>
                    )}

                    {/* SERVICE */}
                    {activeTopic === "service" && (
                        <>
                            <GroupTitle><b>Основні способи пошуку</b></GroupTitle>
                            <GridTwo>
                                <Section>
                                    <HighlightSection>Пошуковий рядок</HighlightSection>
                                    <ul>
                                        <li>Введи точну назву компанії з квитанції.</li>
                                    </ul>
                                    <WhenSection>Підходить коли:</WhenSection>
                                    <ul>
                                        <li>любиш точність</li>
                                    </ul>
                                </Section>

                                <Section>
                                    <HighlightSection>Через категорії</HighlightSection>
                                    Обираєш категорію → список компаній → твоя компанія.
                                    <WhenSection>Підходить коли:</WhenSection>
                                    <ul>
                                        <li>не пам’ятаєш назву, але знаєш тип послуги</li>
                                    </ul>
                                </Section>
                            </GridTwo>

                            <GridTwo>
                                <Section>
                                    <HighlightSection>Пошук за адресою</HighlightSection>
                                    Введи місто, вулицю, будинок.
                                    <WhenSection>Підходить коли:</WhenSection>
                                    <ul>
                                        <li>щойно переїхав</li>
                                        <li>не знаєш назви компанії</li>
                                    </ul>
                                </Section>

                                <Section>
                                    <HighlightSection>Пошук за кодом ЄДРПОУ</HighlightSection>
                                    <p>Введи 8 цифр коду з квитанції.</p>
                                    <WhenSection>Підходить коли:</WhenSection>
                                    <ul>
                                        <li>хочеш 100% гарантії</li>
                                    </ul>
                                </Section>
                            </GridTwo>
                        </>
                    )}

                    {/* METERS */}
                    {activeTopic === "meters" && (
                        <>
                            <GridTwo>
                                <Section>
                                    <HighlightSection>Де взяти показники?</HighlightSection>
                                    <ul>
                                        <li>На приладах обліку.</li>
                                        <li>У квитанції за минулий місяць.</li>
                                    </ul>
                                </Section>

                                <Section>
                                    <HighlightSection>Як правильно вводити?</HighlightSection>
                                    <ul>
                                        <li>Тільки чорні цифри (без червоних).</li>
                                        <li>Без дробів.</li>
                                    </ul>
                                </Section>
                            </GridTwo>
                            <CenterHalf>
                                <HalfSection>
                                    <Section>
                                        <HighlightSection>⚠ Типові помилки</HighlightSection>
                                        <ul>
                                            <li>вводять червоні цифри</li>
                                            <li>плутають старі та нові показники</li>
                                        </ul>
                                    </Section>
                                </HalfSection>
                            </CenterHalf>
                        </>
                    )}

                    {/* EDRPOU */}
                    {activeTopic === "edrpou" && (
                        <>
                            <Section>
                                <p>ЄДРПОУ — це унікальний ідентифікаційний код організації (8 цифр).</p>
                            </Section>
                            <TipSection>
                                <p>Це як ID в грі — унікальний номер постачальника.</p>
                            </TipSection>
                            <GridTwo>
                                <Section>
                                    <HighlightSection>Навіщо потрібен?</HighlightSection>
                                    <ul>
                                        <li>Щоб гроші пішли саме твій водоканал, а не сусіднього міста.</li>
                                    </ul>
                                </Section>
                                <Section>
                                    <HighlightSection>Де знайти?</HighlightSection>
                                    <ul>
                                        <li>У квитанції.</li>
                                        <li>В договорі.</li>
                                        <li>В інтернеті на сайті постачальника.</li>
                                    </ul>
                                </Section>
                            </GridTwo>
                        </>
                    )}

                    {/* TEMPLATE */}
                    {activeTopic === "template" && (
                        <>
                            <TipSection>
                                <p>Шаблон — це збережена квитанція, щоб не вводити дані щоразу.</p>
                            </TipSection>
                            <GridTwo>
                                <Section>
                                    <HighlightSection>Обери тип послуги</HighlightSection>
                                    <ul>
                                        <li>Світло, Газ, Вода тощо.</li>
                                    </ul>
                                </Section>
                                <Section>
                                    <HighlightSection>Введи дані</HighlightSection>
                                    <ul>
                                        <li>Особовий рахунок, ЄДРПОУ.</li>
                                    </ul>
                                </Section>
                            </GridTwo>
                        </>
                    )}

                    {/* REFUND */}
                    {activeTopic === "refund" && (
                        <>
                            <TipSection>
                                <p>Помилковий платіж часто можна повернути.</p>
                            </TipSection>
                            <GridTwo>
                                <Section>
                                    <HighlightSection>Коли можливо?</HighlightSection>
                                    <ul>
                                        <li>Платіж ще в обробці.</li>
                                        <li>Сервіс має кнопку "Скасувати".</li>
                                    </ul>
                                </Section>
                                <Section>
                                    <HighlightSection>Як зробити?</HighlightSection>
                                    <ul>
                                        <li>Зайди в історію, знайди платіж, натисни "Скасувати".</li>
                                    </ul>
                                </Section>
                            </GridTwo>
                            <Section>
                                <HighlightSection>Якщо кнопки немає</HighlightSection>
                                <p>Треба звертатися до постачальника (водоканал, обленерго) із заявою та чеком.</p>
                            </Section>
                        </>
                    )}

                </ContentBox>
            )}
        </Page>
    );
}