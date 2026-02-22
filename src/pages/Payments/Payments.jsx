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
    HomeRemote
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

            {}
            {activeTopic === "home" && (
            <HomeLayout>

                {}
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

                <MainButton
                onClick={() => window.location.href = "../../Simulations"}
                >
                ОПЛАТА
                </MainButton>

                <NavGrid>
                <RemoteButton onClick={() => openTopic("meters")}>
                    ПОКАЗНИКИ
                </RemoteButton>

                <RemoteButton onClick={() => openTopic("template")}>
                    ШАБЛОНИ
                </RemoteButton>

                <RemoteButton onClick={() => openTopic("refund")}>
                    ПОВЕРНЕННЯ
                </RemoteButton>

                <RemoteButton onClick={() => openTopic("enter")}>
                    ЯК ЗАЙТИ
                </RemoteButton>
                </NavGrid>

            </RemoteBody>
            </ControlPanel>

                </HomeRemote>

            </HomeLayout>
            )}

            {}
            {activeTopic !== "home" && (
                <BackButton onClick={() => openTopic("home")}>
                    ← Назад
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
                            <GroupTitle>🧭 Як знайти оплату в додатку</GroupTitle>
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
                                            <li>Клікай всередину — курсор почне блимати, означає: система готова слухати твої команди </li>
                                            <li>Введи точну назву компанії з квитанції.</li>
                                        </ul>
                                    </ModeDesc>
                                    <WhenSection> Коли знаєш назву постачальника та не хочеш клацати зайві кнопки </WhenSection>
                                </ModeCard>
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

                                <ModeCard>
                                    <ModeTitle>Через категорії</ModeTitle>
                                    <ModeDesc>  У більшості сервісів категорії знаходяться:
                                        <ul>
                                            <li>або зверху списком,</li>
                                            <li>або великими плитками на головному екрані.</li>
                                        </ul>
                                        Ти обираєш категорію → з'являється список компаній → натискаєш на свою → переходиш до форми заповнення.
                                    </ModeDesc>
                                    <WhenSection>Коли не пам’ятаєш точну назву постачальника, але знаєш, що тобі потрібно заплатити “за газ” або “за світло”</WhenSection>
                                </ModeCard>
                                <Section>
                                    <HighlightSection>Через категорії</HighlightSection>
                                    Обираєш категорію → список компаній → твоя компанія.
                                    <WhenSection>Підходить коли:</WhenSection>
                                    <ul>
                                        <li>не пам’ятаєш назву, але знаєш тип послуги</li>
                                    </ul>
                                </Section>
                            </GridTwo>

                                <ModeCard>
                                    <ModeTitle>За адресою</ModeTitle>
                                    <ModeDesc>
                                        Знайди кнопку “Пошук за адресою” або “Знайти за місцем” (не всі сервіси мають, але більшість так). Введи:
                                        <ul>
                                            <li>місто</li>
                                            <li>вулицю</li>
                                            <li>номер будинку</li>
                                        </ul>Система покаже список постачальників, які обслуговують цю адресу.
                                    </ModeDesc>
                                    <WhenSection>Коли платиш за новою адресою або не знаєш назви компанії взагалі</WhenSection>
                                </ModeCard>
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
                                    <WhenSection>Коли  боїтесь вибрати “не ту” компанію та потрібна 100% точність</WhenSection>
                                </ModeCard>
                            </ModeGrid>

                            <TipSection>
                                💡 <b>Порада</b>
                                <p>
                                    Найнадійніший спосіб — ЄДРПОУ.
                                    Це як вводити серійний номер, а не імʼя.
                                </p>
                            </TipSection>
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
                                            <li>Якщо немає можливості зняти показники — використовуй квитанцію за минулий місяць і введи орієнтовне значення.</li>
                                            <li>З особистого кабінету</li>
                                        </ul></ModeDesc>
                                </ModeCard>
                                <ModeCard>
                                    <ModeTitle>
                                        Як правильно вводити?
                                    </ModeTitle>
                                    <ModeDesc>
                                        <ul>
                                            <li>Пиши тільки чорні цифри, без червоних і без дробів.</li>
                                            <li>Якщо у тебе тариф “день/ніч” — вводиш дві цифри.</li>
                                        </ul>
                                        Коли вводиш нове значення, програма сама рахує різницю.
                                    </ModeDesc>
                                </ModeCard>
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

                            <Section>
                                <p>ЄДРПОУ — це унікальний ідентифікаційний код організації (8 цифр).</p>
                            </Section>
                            <TipSection>
                                <p>Це як ID в грі — унікальний номер постачальника.</p>
                            </TipSection>
                            <GridTwo>
                                <ModeCard>
                                    <HighlightSection>Навіщо потрібен?</HighlightSection>
                                    <ul>
                                        <li>Щоб гроші пішли саме твій водоканал, а не сусіднього міста.</li>
                                    </ul>
                                    <p>
                                        Без цього коду сервіс не розуміє, з яким підприємством ти працюєш.
                                    </p>
                                </ModeCard>

                                <ModeCard>
                                </Section>
                                <Section>
                                    <HighlightSection>Де знайти?</HighlightSection>
                                    <ul>
                                        <li>У квитанції.</li>
                                        <li>В договорі.</li>
                                        <li>В інтернеті на сайті постачальника.</li>
                                    </ul>
                                    <p>
                                        Правильний код = правильні показники + правильні нарахування.
                                    </p>
                                </ModeCard>

                                <ModeCard>
                                    <HighlightSection>Важливо пам’ятати!</HighlightSection>
                                    <ul>
                                        <p>
                                            Водоканал → свій ЄДРПОУ
                                        </p>
                                        <p>
                                            Тепломережа → свій
                                        </p>
                                        <p>
                                            Обленерго → свій
                                        </p>
                                        <p>
                                            Газ → свій
                                        </p>
                                        <p>
                                            ОСББ/ЖЕК → свій
                                        </p>
                                    </ul>
                                    <p>
                                        ЄДРПОУ — це номер твоєї комунальної організації, який допомагає системі точно визначити, з ким ти працюєш і куди надсилати твій облік.
                                    </p>
                                    <p>
                                        Вводиш правильно → система працює без збоїв → комуналка не нервує і ти теж.
                                    </p>

                                </ModeCard>
                                </Section>
                            </GridTwo>
                            <Matrix>
                                <MatrixCell header>Функція</MatrixCell>
                                <MatrixCell header>ЄДРПОУ</MatrixCell>
                                <MatrixCell header>Шаблон</MatrixCell>

                                <MatrixCell>Пошук отримувача</MatrixCell>
                                <MatrixCell>✅</MatrixCell>
                                <MatrixCell>❌</MatrixCell>

                                <MatrixCell>Збереження</MatrixCell>
                                <MatrixCell>❌</MatrixCell>
                                <MatrixCell>✅</MatrixCell>

                                <MatrixCell>Швидкий платіж</MatrixCell>
                                <MatrixCell>⚠️</MatrixCell>
                                <MatrixCell>🚀</MatrixCell>
                            </Matrix>
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
                                    <p>
                                        Кожна послуга має свої унікальні поля, тому вибір важливий.
                                    </p>
                                </ModeCard>

                                <ModeCard>
                                    <HighlightSection>Введи дані постачальника</HighlightSection>
                                    <p>
                                        Тут ти вказуєш:
                                    </p>
                                </Section>
                                <Section>
                                    <HighlightSection>Введи дані</HighlightSection>
                                    <ul>
                                        <li>назву підприємства</li>
                                        <li>ЄДРПОУ (той магічний код із вкладки 4)</li>
                                        <li>адресу/ділянку обслуговування</li>
                                        <li>особовий рахунок (якщо є)</li>
                                    </ul>
                                    <p>
                                        Це потрібно, щоб система знала, «хто з ким працює».
                                    </p>
                                </ModeCard>
                            </GridTwo>
                            <GridTwo>
                                <ModeCard>
                                    <HighlightSection>Вкажи параметри лічильника</HighlightSection>
                                    <p>
                                        Кожна комунальна послуга має свій тип рахування:
                                    </p>
                                    <ul>
                                        <li>електрика → одно- чи двозонний лічильник</li>
                                        <li>вода → окремо холодна й гаряча</li>
                                        <li>газ → куби</li>
                                        <li>тепло → Гкал або показники будинкового</li>
                                        <li>лічильника</li>
                                    </ul>
                                    <p>
                                        Тут ти можеш:
                                    </p>
                                    <ul>
                                        <li>обрати кількість лічильників</li>
                                        <li>дати їм назви («Кухня», «Ванна», «День/Ніч»)</li>
                                        <li>ввести стартові показники (якщо треба)</li>
                                    </ul>
                                </ModeCard>

                                <ModeCard>
                                    <HighlightSection>Додай фіксовані дані</HighlightSection>
                                    <p>
                                        Це те, що не буде змінюватися щомісяця:
                                    </p>
                                    <ul>
                                        <li>тариф(якщо система не підтягне автоматично)</li>
                                        <li>коефіцієнти</li>
                                        <li>площу опалення</li>
                                        <li>Дім/Квартира</li>
                                        <li>номер особового рахунку</li>
                                    </ul>
                                    <p>
                                        Чим точніше вкажеш — тим менше вводити вручну.
                                    </p>
                                </ModeCard>
                            </GridTwo>
                            <GridTwo>
                                <ModeCard>
                                    <HighlightSection>Придумай назву шаблону</HighlightSection>
                                    <p>
                                        Назви можуть бути такі:
                                    </p>
                                    <ul>
                                        <li>«Квартира — електрика»</li>
                                        <li>«Будинок — вода»</li>
                                        <li>«Газ на дачу»</li>
                                        <li>«Лічильник кухня»</li>
                                    </ul>
                                    <p>
                                        Головне — щоб ти сам потім не дивився на це з питанням: «А що це було?»
                                    </p>
                                </ModeCard>

                                <ModeCard>
                                    <HighlightSection>Збережи шаблон</HighlightSection>
                                    <p>
                                        Після цього шаблон лягає у твою бібліотеку. Далі ти можеш:
                                    </p>
                                    <ul>
                                        <li>швидко відкривати його щомісяця</li>
                                        <li>вводити тільки нові показники</li>
                                        <li>відправляти в один клік</li>
                                        <li>копіювати або редагувати шаблон, якщо щось змінилося</li>
                                        <li>Особовий рахунок, ЄДРПОУ.</li>
                                    </ul>
                                    <p>
                                        Шаблон = мінімум рухів + максимум зручності.
                                    </p>
                                </ModeCard>
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
                                    <ModeTitle>Перевір, чи можливо повернення</ModeTitle>
                                    <p>
                                        Повернення можливе, якщо:
                                    </p>
                                <Section>
                                    <HighlightSection>Коли можливо?</HighlightSection>
                                    <ul>
                                        <li>Платіж ще в обробці.</li>
                                        <li>Сервіс має кнопку "Скасувати".</li>
                                    </ul>
                                    <p>
                                        Якщо платіж уже у системі постачальника - повернення робить тільки сама комунальна організація.
                                    </p>
                                </ModeCard>

                                <ModeCard>
                                    <ModeTitle>Зайди в історію платежів</ModeTitle>
                                    <p>
                                        У твоєму особистому кабінеті (чи додатку) відкрий розділ:
                                    </p>
                                    <p>
                                        «Історія» / «Мої платежі» / «Операції»
                                    </p>
                                    <p>
                                        Там шукай оплату, яку хочеш скасувати.
                                    </p>
                                </ModeCard>
                            </GridTwo>
                            <GridTwo>
                                <ModeCard>
                                    <ModeTitle>Обери потрібний платіж</ModeTitle>
                                    <p>
                                        Ти побачиш:
                                    </p>
                                </Section>
                                <Section>
                                    <HighlightSection>Як зробити?</HighlightSection>
                                    <ul>
                                        <li>Зайди в історію, знайди платіж, натисни "Скасувати".</li>
                                    </ul>
                                    <p>
                                        Натисни на операцію, щоб її відкрити.
                                    </p>
                                </ModeCard>

                                <ModeCard>
                                    <ModeTitle>Натисни «Повернути» або «Скасувати»</ModeTitle>
                                    <p>
                                        Якщо сервіс підтримує повернення: </p>
                                    <p>
                                        ти побачиш кнопку «Скасувати платіж», «Повернути кошти» або «Стоп, я передумав» (у деяких сервісах так і пише)
                                    </p>
                                    <p>
                                        Після натискання:
                                    </p>
                                    <ul>
                                        <li>платіж зупиняється</li>
                                        <li>гроші повертаються на твій рахунок/картку</li>
                                        <li>статус змінюється на «Скасовано»</li>
                                    </ul>
                                    <p>
                                        Повернення може займати до 1–3 банківських днів, це нормально.
                                    </p>
                                </ModeCard>
                                </Section>
                            </GridTwo>
                            <GridTwo>
                                <ModeCard>
                                    <ModeTitle>Якщо кнопки «Повернути» немає</ModeTitle>
                                    <p>
                                        Таке трапляється, якщо:
                                    </p>
                                    <ul>
                                        <li>платіж уже зараховано</li>
                                        <li>постачальник не підтримує автоматичні повернення</li>
                                        <li>це комунальна установа, яка працює через бюджетні системи (там усе суворіше)</li>
                                    </ul>
                                    <p>
                                        У цьому випадку тобі треба:
                                    </p>
                                    <ol>
                                        <li>Зателефонувати в постачальника(Водоканал, Обленерго, Газмережа, ОСББ…).</li>
                                        <li>Надати чек або скрин платежу. Щоб вони бачили, що це справді ти платив.</li>
                                        <li>Написати заяву на повернення.У деяких установах її треба подати особисто або онлайн.</li>
                                    </ol>
                                    <p>
                                        Такий тип повернення може зайняти 5–30 днів — залежить від організації.
                                    </p>
                                </ModeCard>

                                <ModeCard>
                                    <ModeTitle>Якщо ти просто переплутав дані</ModeTitle>
                                    <p>
                                        Наприклад:
                                    </p>
                                    <ul>
                                        <li>вказав не той особовий рахунок</li>
                                        <li>неправильно написав адресу</li>
                                        <li>ввів зайві куби/кВт</li>
                                        <li>відправив показники іншій організації</li>
                                    </ul>
                                    <p>
                                        То інколи платіж можна не повертати, а просто  перенаправити.
                                    </p>
                                    <p>
                                        Можна:
                                    </p>
                                    <ul>
                                        <li>зарахувати його на правильний особовий рахунок</li>
                                        <li>перенести в інший підрозділ</li>
                                        <li>виправити помилку вручну</li>
                                    </ul>
                                    <p>
                                        Головне — повідомити якомога швидше.
                                    </p>
                                </ModeCard>
                            </GridTwo>
                            <Section>
                                <HighlightSection>Якщо кнопки немає</HighlightSection>
                                <p>Треба звертатися до постачальника (водоканал, обленерго) із заявою та чеком.</p>
                            </Section>
                        </>
                    )}
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