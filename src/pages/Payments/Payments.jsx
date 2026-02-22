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
    BackButton,
    WhenSection,
    GroupTitle,
    HighlightSection,
    CenterHalf,
    PageTitle,
    TipSection,
    StepList,
    StepCard,
    StepNumber,
    StepText,
    ScreenBox,
    ModeGrid,
    ModeCard,
    ModeTitle,
    ModeDesc,
    MeterGrid,
    MeterIcon,
    MeterTitle,
    InfoGrid,
    InfoCard,
    InfoIcon,
    InfoTitle,
    InfoDesc,
    Matrix,
    MatrixCell,
    RefundMap,
    RefundStep,
    RefundIcon,
    RefundTitle,
    RefundDesc,
    StatusBar,
    Status,
    Path,
    StepIcon,
    StepTitle,
    BottomNavigator,
    ChainRow,
    ChainItem,
    ChainButton,
    ChainDot,
    ChainLabel,
    ChainLine,
    ProgressTrack,
    ProgressFill,
    ControlPanel,
    RemoteBody,
    Led,
    RemoteScreen,
    ScreenMain,
    ScreenSub,
    MainButton,
    NavGrid,
    RemoteButton,
    HomeLayout,
    HomeMain,
    HomeRemote, 
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

const enterSteps = [
    "Відкрий застосунок або сайт, де ти здійснюєш платежі (банк, Google Pay, Apple Pay тощо).",
    "На головній сторінці знайди розділ «Платежі» / «Послуги» / «Оплата комуналки» — зазвичай він містить іконку з будиночком, квитанцією або батареєю.",
    "Перейди у підрозділ «Комунальні платежі».",
    "Обери потрібну послугу (вода, світло, газ тощо).",
    "Система перенаправить тебе на сторінку введення даних."
];

const enterTips = [
    "Якщо сервіс просить місто — обирай те, де зареєстрована послуга.",
    "Додай розділ у вибране, щоб наступного разу заходити швидше."
];

const enterMenu = [
    "Головна",
    "Перекази",
    "Платежі",
    "Комунальні послуги",
    "Налаштування"
];

export default function Payments({ onBack }) {
    const [activeTopic, setActiveTopic] = useState("home");
    const [visitedTopics, setVisitedTopics] = useState(["home"]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        setPayments(economyData.payments);
    }, []);

    const openTopic = (id) => {
        setActiveTopic(id);
        setVisitedTopics(prev =>
            prev.includes(id) ? prev : [...prev, id]
        );
    };

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

            {/* HOME */}
            {activeTopic === "home" && (
                <HomeLayout>
                    <HomeMain>
                        <Grid>
                            {topics
                                .filter(t => t.id !== "home")
                                .map(t => (
                                    <Card key={t.id} onClick={() => openTopic(t.id)}>
                                        <CardIcon>{t.icon}</CardIcon>
                                        <CardTitle>{t.title}</CardTitle>
                                    </Card>
                                ))}
                        </Grid>
                    </HomeMain>

                    {/* ПУЛЬТ */}
                    <HomeRemote>
                        <ControlPanel>
                            <RemoteBody>
                                <Led active />
                                <RemoteScreen>
                                    <ScreenMain>ПУЛЬТ ОПЛАТИ КОМУНАЛЬНИХ ПОСЛУГ</ScreenMain>
                                    <ScreenSub>Активно: {activeTopic}</ScreenSub>
                                </RemoteScreen>

                                <MainButton onClick={() => window.location.href = "../../Simulations"}>
                                    ОПЛАТА
                                </MainButton>

                                <NavGrid>
                                    <RemoteButton onClick={() => openTopic("meters")}>ПОКАЗНИКИ</RemoteButton>
                                    <RemoteButton onClick={() => openTopic("template")}>ШАБЛОНИ</RemoteButton>
                                    <RemoteButton onClick={() => openTopic("refund")}>ПОВЕРНЕННЯ</RemoteButton>
                                    <RemoteButton onClick={() => openTopic("enter")}>ЯК ЗАЙТИ</RemoteButton>
                                </NavGrid>
                            </RemoteBody>
                        </ControlPanel>
                    </HomeRemote>
                </HomeLayout>
            )}

            {/* BACK BUTTON */}
            {activeTopic !== "home" && (
                <BackButton onClick={() => openTopic("home")}>
                    ← Назад до меню
                </BackButton>
            )}

            {/* CONTENT */}
            {activeTopic !== "home" && (
                <ContentBox>
                    <PageTitle>
                        {topics.find(t => t.id === activeTopic)?.title}
                    </PageTitle>

                    {/* HISTORY (JSON) */}
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

                    {/* ENTER */}
                    {activeTopic === "enter" && (
                        <>
                            <GroupTitle>🧭 Як знайти оплату в додатку</GroupTitle>
                            <GridTwo>
                                <InfoCard>
                                    <ModeTitle>Покроковий маршрут</ModeTitle>
                                    <StepList>
                                        {enterSteps.map((step, i) => (
                                            <StepCard key={step}>
                                                <StepNumber>{i + 1}</StepNumber>
                                                <StepText>{step}</StepText>
                                            </StepCard>
                                        ))}
                                    </StepList>
                                </InfoCard>

                                <InfoCard>
                                    <ModeTitle>Як це виглядає на екрані</ModeTitle>
                                    <ScreenBox>
                                        {enterMenu.map(item => (
                                            <div key={item}>
                                                {item === "Платежі" ? "👉 " : "   "}
                                                {item}
                                            </div>
                                        ))}
                                    </ScreenBox>
                                </InfoCard>
                            </GridTwo>

                            <TipSection>
                                💡 <b>Порада</b>
                                <ul>
                                    {enterTips.map(tip => (
                                        <li key={tip}>{tip}</li>
                                    ))}
                                </ul>
                            </TipSection>
                        </>
                    )}

                    {/* SERVICE */}
                    {activeTopic === "service" && (
                        <>
                            <GroupTitle>🔍 Обери спосіб пошуку</GroupTitle>

                            <ModeGrid>
                                <ModeCard>
                                    <ModeTitle>Пошук за назвою</ModeTitle>
                                    <ModeDesc>
                                        <ul>
                                            <li>Знайди вгорі (або інколи посередині) рядок пошуку.</li>
                                            <li>Клікай всередину — курсор почне блимати, означає: система готова слухати твої команди</li>
                                            <li>Введи точну назву компанії з квитанції.</li>
                                        </ul>
                                    </ModeDesc>
                                    <WhenSection>Коли знаєш назву постачальника та не хочеш клацати зайві кнопки</WhenSection>
                                </ModeCard>

                                <ModeCard>
                                    <ModeTitle>Через категорії</ModeTitle>
                                    <ModeDesc>
                                        У більшості сервісів категорії знаходяться:
                                        <ul>
                                            <li>або зверху списком,</li>
                                            <li>або великими плитками на головному екрані.</li>
                                        </ul>
                                        Ти обираєш категорію → з'являється список компаній → натискаєш на свою → переходиш до форми заповнення.
                                    </ModeDesc>
                                    <WhenSection>Коли не пам’ятаєш точну назву постачальника, але знаєш, що тобі потрібно заплатити “за газ” або “за світло”</WhenSection>
                                </ModeCard>

                                <ModeCard>
                                    <ModeTitle>За адресою</ModeTitle>
                                    <ModeDesc>
                                        Знайди кнопку “Пошук за адресою” або “Знайти за місцем”. Введи:
                                        <ul>
                                            <li>місто</li>
                                            <li>вулицю</li>
                                            <li>номер будинку</li>
                                        </ul>
                                        Система покаже список постачальників, які обслуговують цю адресу.
                                    </ModeDesc>
                                    <WhenSection>Коли платиш за новою адресою або не знаєш назви компанії взагалі</WhenSection>
                                </ModeCard>

                                <ModeCard>
                                    <ModeTitle>За ЄДРПОУ</ModeTitle>
                                    <ModeDesc>
                                        Це як ввести ID монстра в грі — і відразу отримати потрібну ціль.
                                        <ul>
                                            <li>У квитанції знайди рядок “ЄДРПОУ”.</li>
                                            <li>Скопіюй його або перепиши (це 8 цифр).</li>
                                            <li>Встав у пошукове поле в супутньому розділі.</li>
                                        </ul>
                                    </ModeDesc>
                                    <WhenSection>Коли боїтесь вибрати “не ту” компанію та потрібна 100% точність</WhenSection>
                                </ModeCard>
                            </ModeGrid>
                        </>
                    )}

                    {/* METERS */}
                    {activeTopic === "meters" && (
                        <>
                            <GroupTitle>📟 Які показники ти вводиш?</GroupTitle>
                            <MeterGrid>
                                <InfoCard>
                                    <MeterIcon>💡</MeterIcon>
                                    <MeterTitle>Електроенергія</MeterTitle>
                                </InfoCard>
                                <InfoCard>
                                    <MeterIcon>🚿</MeterIcon>
                                    <MeterTitle>Вода</MeterTitle>
                                </InfoCard>
                                <InfoCard>
                                    <MeterIcon>🔥</MeterIcon>
                                    <MeterTitle>Газ</MeterTitle>
                                </InfoCard>
                            </MeterGrid>

                            <GridTwo>
                                <ModeCard>
                                    <ModeTitle>Де взяти показники?</ModeTitle>
                                    <ModeDesc>
                                        <ul>
                                            <li>Лічильники газу, світла, води — на своїх приладах обліку.</li>
                                            <li>Якщо немає можливості зняти показники — використовуй квитанцію за минулий місяць.</li>
                                            <li>З особистого кабінету.</li>
                                        </ul>
                                    </ModeDesc>
                                </ModeCard>
                                <ModeCard>
                                    <ModeTitle>Як правильно вводити?</ModeTitle>
                                    <ModeDesc>
                                        <ul>
                                            <li>Пиши тільки чорні цифри, без червоних і без дробів.</li>
                                            <li>Якщо у тебе тариф “день/ніч” — вводиш дві цифри.</li>
                                        </ul>
                                        Коли вводиш нове значення, програма сама рахує різницю.
                                    </ModeDesc>
                                </ModeCard>
                            </GridTwo>

                            <CenterHalf>
                                <ModeCard>
                                    <ModeTitle>⚠ Типові помилки</ModeTitle>
                                    <ModeDesc>
                                        <ul>
                                            <li>вводять червоні цифри</li>
                                            <li>плутають старі та нові показники</li>
                                        </ul>
                                    </ModeDesc>
                                </ModeCard>
                            </CenterHalf>
                        </>
                    )}

                    {/* EDRPOU */}
                    {activeTopic === "edrpou" && (
                        <>
                            <GroupTitle>🧾 Що таке ЄДРПОУ?</GroupTitle>
                            <InfoGrid>
                                <InfoCard>
                                    <InfoIcon>🏢</InfoIcon>
                                    <InfoTitle>Код компанії</InfoTitle>
                                    <InfoDesc>Унікальний номер постачальника</InfoDesc>
                                </InfoCard>
                                <InfoCard>
                                    <InfoIcon>🧩</InfoIcon>
                                    <InfoTitle>ID у системі</InfoTitle>
                                    <InfoDesc>Допомагає точно знайти організацію</InfoDesc>
                                </InfoCard>
                                <InfoCard>
                                    <InfoIcon>🔒</InfoIcon>
                                    <InfoTitle>Захист від помилок</InfoTitle>
                                    <InfoDesc>Не дає оплатити “не туди”</InfoDesc>
                                </InfoCard>
                            </InfoGrid>

                            <TipSection>
                                <p>ЄДРПОУ — це унікальний ідентифікаційний код організації (8 цифр). Це як ID в грі — унікальний номер постачальника.</p>
                            </TipSection>

                            <GridTwo>
                                <ModeCard>
                                    <HighlightSection>Навіщо потрібен?</HighlightSection>
                                    <ul>
                                        <li>Щоб гроші пішли саме у твій водоканал, а не сусіднього міста.</li>
                                    </ul>
                                    <p>Без цього коду сервіс не розуміє, з яким підприємством ти працюєш.</p>
                                </ModeCard>

                                <ModeCard>
                                    <HighlightSection>Де знайти?</HighlightSection>
                                    <ul>
                                        <li>У квитанції.</li>
                                        <li>В договорі.</li>
                                        <li>В інтернеті на сайті постачальника.</li>
                                    </ul>
                                    <p>Правильний код = правильні показники + правильні нарахування.</p>
                                </ModeCard>
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
                                <ModeCard>
                                    <HighlightSection>Обери тип послуги</HighlightSection>
                                    <ul>
                                        <li>Світло, Газ, Вода тощо.</li>
                                    </ul>
                                    <p>Кожна послуга має свої унікальні поля, тому вибір важливий.</p>
                                </ModeCard>

                                <ModeCard>
                                    <HighlightSection>Введи дані постачальника</HighlightSection>
                                    <ul>
                                        <li>назву підприємства</li>
                                        <li>ЄДРПОУ (той магічний код із вкладки 4)</li>
                                        <li>адресу/ділянку обслуговування</li>
                                        <li>особовий рахунок (якщо є)</li>
                                    </ul>
                                    <p>Це потрібно, щоб система знала, «хто з ким працює».</p>
                                </ModeCard>
                            </GridTwo>
                        </>
                    )}

                    {/* REFUND */}
                    {activeTopic === "refund" && (
                        <>
                            <TipSection>
                                <p>Помилковий платіж часто можна повернути.</p>
                            </TipSection>

                            <RefundMap>
                                <RefundStep color="#8e24aa">
                                    <RefundIcon>💳</RefundIcon>
                                    <RefundTitle>Гроші</RefundTitle>
                                    <RefundDesc>Кошти йдуть на картку</RefundDesc>
                                </RefundStep>
                            </RefundMap>

                            <StatusBar>
                                <Status active>🕒 В обробці</Status>
                                <Status>🏦 У банку</Status>
                                <Status>🏢 У компанії</Status>
                                <Status>✔ Підтверджено</Status>
                                <Status>💳 Зараховано</Status>
                            </StatusBar>

                            <GridTwo>
                                <ModeCard>
                                    <ModeTitle>Коли можливо?</ModeTitle>
                                    <ul>
                                        <li>Платіж ще в обробці.</li>
                                        <li>Сервіс має кнопку "Скасувати".</li>
                                    </ul>
                                    <p>Якщо платіж уже у системі постачальника - повернення робить тільки сама комунальна організація.</p>
                                </ModeCard>

                                <ModeCard>
                                    <ModeTitle>Як скасувати?</ModeTitle>
                                    <ul>
                                        <li>Зайди в історію, знайди платіж, натисни "Скасувати" або "Повернути".</li>
                                        <li>Гроші повернуться на твій рахунок/картку.</li>
                                        <li>Статус зміниться на «Скасовано».</li>
                                    </ul>
                                </ModeCard>
                            </GridTwo>
                        </>
                    )}

                    {/* BOTTOM NAVIGATOR */}
                    <BottomNavigator>
                        <ProgressTrack>
                            <ProgressFill
                                style={{
                                    width: `${((visitedTopics.length - 1) / (topics.length - 1)) * 100}%`
                                }}
                            />
                        </ProgressTrack>

                        <ChainRow>
                            {topics.map((t, i) => (
                                <ChainItem key={t.id}>
                                    <ChainButton
                                        active={activeTopic === t.id}
                                        visited={visitedTopics.includes(t.id)}
                                        onClick={() => openTopic(t.id)}
                                    >
                                        <ChainDot
                                            active={activeTopic === t.id}
                                            visited={visitedTopics.includes(t.id)}
                                        />
                                        <ChainLabel>{t.title}</ChainLabel>
                                    </ChainButton>
                                    {i !== topics.length - 1 && <ChainLine />}
                                </ChainItem>
                            ))}
                        </ChainRow>
                    </BottomNavigator>
                </ContentBox>
            )}
        </Page>
    );
}