import { useState } from "react";

import noElectricityImg from "../../assets/images/no-electricity.png";
import breakerImg from "../../assets/images/breaker.png";
import smellOfGasImg from "../../assets/images/smell-of-gas.png";
import waterKeakageImg from "../../assets/images/water-keakage.png";
import brokenSocketImg from "../../assets/images/broken-socket.png";
import heatingProblemsImg from "../../assets/images/heating-problems.png";
import shortCircuitImg from "../../assets/images/short-circuit.png";
import cloggedDrainImg from "../../assets/images/clogged-drain.png";
import dirtyWaterImg from "../../assets/images/dirty-water.png";

import {
  RepairsPage,
  RepairsContainer,
  HeroCard,
  HeroLeft,
  HeroTitle,
  HeroText,
  HeroIcon,
  CardsGrid,
  InfoCard,
  InfoIcon,
  InfoTitle,
  InfoText,
  MaterialsCard,
  MaterialsList,
  MaterialItem,
  ProgressBadge,
  BackButton,
  PageTitle,
  ProblemMedia,
  ProblemImage,
  ProblemRow,
  ProblemTextCard,
} from "./RepairsPage.styled";

import { FaTools, FaBolt, FaBuilding, FaUserAlt, FaEnvelope, FaExclamationTriangle, FaHammer, FaPhoneAlt, FaFileAlt} from "react-icons/fa";

const topics = [
  { id: "home", title: "Ремонт і звернення" },
  { id: "problems", title: "Типові проблеми" },
  { id: "contacts", title: "Куди звертатися" },
  { id: "templates", title: "Шаблони звернень" },
  { id: "safety", title: "Безпека" },
  { id: "checklist", title: "Чеклист квартири" },
  { id: "landlord", title: "Орендодавець" },
  { id: "electrician", title: "Електрик" },
  { id: "emergency", title: "Аварійна служба" },
];

export default function Repairs() {
  const [activeTopic, setActiveTopic] = useState("home");

  return (
    <RepairsPage>
      <RepairsContainer>

        {/* HEADER */}
        <HeroCard>
          <HeroLeft>
            <HeroTitle>Ремонт і звернення</HeroTitle>
            <HeroText>
              Дізнайся, що робити при побутових несправностях і кому писати
            </HeroText>
          </HeroLeft>
          <HeroIcon><FaTools /></HeroIcon>
          <ProgressBadge>Прогрес 0%</ProgressBadge>
        </HeroCard>

        {/* HOME */}
        {activeTopic === "home" && (
          <>
            <CardsGrid>
              <InfoCard onClick={() => setActiveTopic("problems")}>
                <InfoIcon><FaBolt /></InfoIcon>
                <InfoTitle>Типові проблеми</InfoTitle>
                <InfoText>Світло, газ, вода</InfoText>
              </InfoCard>

              <InfoCard onClick={() => setActiveTopic("contacts")}>
                <InfoIcon><FaBuilding /></InfoIcon>
                <InfoTitle>Куди звертатися</InfoTitle>
                <InfoText>ОСББ, орендодавець, аварійна служба, постачальники</InfoText>
              </InfoCard>

              <InfoCard onClick={() => setActiveTopic("templates")}>
                <InfoIcon><FaEnvelope /></InfoIcon>
                <InfoTitle>Приклади текстів звернень</InfoTitle>
                <InfoText>Готові шаблони: електрика, скарги і т.д.</InfoText>
              </InfoCard>

              <InfoCard onClick={() => setActiveTopic("safety")}>
                <InfoIcon><FaExclamationTriangle /></InfoIcon>
                <InfoTitle>Інструкції з безпеки</InfoTitle>
                <InfoText>Як максимально уникнути побутових проблем</InfoText>
              </InfoCard>
            </CardsGrid>

            <MaterialsCard>
              <InfoTitle>Корисні матеріали</InfoTitle>
              <MaterialsList>
                <MaterialItem onClick={() => setActiveTopic("checklist")}>
                  <FaFileAlt /> Чеклист перевірки квартири
                </MaterialItem>
                <MaterialItem onClick={() => setActiveTopic("landlord")}>
                  <FaUserAlt /> Що має робити орендодавець
                </MaterialItem>
                <MaterialItem onClick={() => setActiveTopic("electrician")}>
                  <FaHammer /> Коли потрібен електрик
                </MaterialItem>
                <MaterialItem onClick={() => setActiveTopic("emergency")}>
                  <FaPhoneAlt /> Коли викликати аварійну службу
                </MaterialItem>
              </MaterialsList>
            </MaterialsCard>
          </>
        )}

        {/* BACK */}
        {activeTopic !== "home" && (
          <BackButton onClick={() => setActiveTopic("home")}>
            ← Назад
          </BackButton>
        )}

        {/* CONTENT */}
        {activeTopic !== "home" && (
          <>
            <PageTitle>
              {topics.find(t => t.id === activeTopic)?.title}
            </PageTitle>

            {activeTopic === "problems" && (
              <>
                {/* ЗНЕСТРУМЛЕННЯ */}
                <ProblemRow>
                  <ProblemMedia>
                    <InfoTitle>Знеструмлення</InfoTitle>
                    <ProblemImage>
                      <img src={noElectricityImg} alt="Знеструмлення" />
                    </ProblemImage>
                  </ProblemMedia>

                  <ProblemTextCard as="div">
                    <InfoText>
                      1. Перевірте, чи немає світла у сусідів – це допоможе зрозуміти, чи проблема в будинку чи у всьому районі.<br /><br />
                      2. Подивіться щиток – чи не вибив автомат.<br /><br />
                      3. Включіть запасне освітлення: ліхтарик, павербанк, свічки (обережно – далеко від паперу та одягу).<br /><br />
                      4. Відключіть важливу техніку: холодильник, комп’ютер, телевізор – щоб уникнути стрибків напруги при поверненні світла.<br /><br />
                      5. Слідкуйте за повідомленнями від електропостачальної компанії (Telegram, сайт, Viber).
                    </InfoText>
                  </ProblemTextCard>
                </ProblemRow>

                {/* ВИБИЛО АВТОМ */}
                <ProblemRow reverse>
                  <ProblemMedia>
                    <InfoTitle>Вибило автомат</InfoTitle>
                    <ProblemImage>
                      <img src={breakerImg} alt="Вибило автомат" />
                    </ProblemImage>
                  </ProblemMedia>

                  <ProblemTextCard as="div">
                    <InfoText>
                      <strong>Автомат</strong> — це пристрій у електрощитку, який захищає проводку та техніку від перевантаження або короткого замикання. Простіше: це “запобіжник”, який сам вимикає електрику, коли виникає небезпека.<br /><br />
                      1. Не вмикайте автомат повторно багато разів без перевірки.<br /><br />
                      2. Відключіть усі прилади в у домі.<br /><br />
                      3. Спробуйте увімкнути автомат – якщо знову вибило → викликайте електрика.
                    </InfoText>
                  </ProblemTextCard>
                </ProblemRow>

                {/* ЗАПАХ ГАЗУ */}
                <ProblemRow>
                  <ProblemMedia>
                    <InfoTitle>Запах газу</InfoTitle>
                    <ProblemImage>
                      <img src={smellOfGasImg} alt="Газ" />
                    </ProblemImage>
                  </ProblemMedia>

                  <ProblemTextCard as="div">
                    <InfoText>
                      1. Не вмикайте світло, не запалюйте сірники, не вмикайте електроприлади – будь-яка іскра може спричинити вибух.<br /><br />
                      2. Перекрий газ (кран на плиті або загальний).<br /><br />
                      3. Відкрийте всі вікна та двері для провітрювання.<br /><br />
                      4. Негайно вийдіть із приміщення та не залишайтеся в квартирі до приїзду аварійної служби. Викличте аварійну газову службу за номером 104.<br /><br />
                      5. Не намагайтеся самостійно ремонтувати труби чи прилади.
                    </InfoText>
                  </ProblemTextCard>
                </ProblemRow>

                {/* ПРОТІКАННЯ ВОДИ */}
                <ProblemRow reverse>
                  <ProblemMedia>
                    <InfoTitle>Протікання води</InfoTitle>
                    <ProblemImage>
                      <img src={waterKeakageImg} alt="Протікає вода" />
                    </ProblemImage>
                  </ProblemMedia>

                  <ProblemTextCard as="div">
                    <InfoText>
                      1. Негайно перекрийте воду у квартирі або на стояку.<br /><br />
                      2. Попередьте сусідів, якщо вода може затопити їхні квартири.<br /><br />
                      3. З’ясуй джерело (кран, труба, бачок), оглянь наявність тріщин, іржі, ослаблених з’єднань. <br /><br />
                      4. Відсуньте від місця протікання меблі та техніку, використовуйте ганчірки або тазики для збору води.<br /><br />
                      5. Викличте сантехніка або комунальну службу відповідно до вашого міста.
                    </InfoText>
                  </ProblemTextCard>
                </ProblemRow>

                {/* НЕСПРАВНА РОЗЕТКА */}
                <ProblemRow>
                  <ProblemMedia>
                    <InfoTitle>Несправна розетка</InfoTitle>
                    <ProblemImage>
                      <img src={brokenSocketImg} alt="Несправна розетка" />
                    </ProblemImage>
                  </ProblemMedia>

                  <ProblemTextCard as="div">
                    <InfoText>
                      1. Вимкніть живлення у щитку перед оглядом розетки.<br /><br />
                      2. Не користуйтеся розеткою, якщо вона іскрить, плавиться, смердить або нагрівається.<br /><br />
                      3. Викличте кваліфікованого електрика для заміни або ремонту. <br /><br />
                      4. Не підключайте одночасно багато потужних приладів через трійники або подовжувачі; не використовуйте розетки, які тріскаються або погано тримають вилку.
                    </InfoText>
                  </ProblemTextCard>
                </ProblemRow>

                {/* ПРОБЛЕМИ З ОПАЛЕННЯМ */}
                <ProblemRow reverse>
                  <ProblemMedia>
                    <InfoTitle>Проблеми з опаленням</InfoTitle>
                    <ProblemImage>
                      <img src={heatingProblemsImg} alt="Проблеми з опаленням" />
                    </ProblemImage>
                  </ProblemMedia>

                  <ProblemTextCard as="div">
                    <InfoText>
                      1. Подивіться, чи ввімкнений котел (на панелі має світитися лампочка або цифровий екран).<br /><br />
                      2. Переконайтеся, що він підключений до розетки або є подача газу (Якщо не впевнені, не відкривайте котел самостійно).<br /><br />
                      3. Пройдіться по кімнатах: батареї мають бути теплі на дотик. Якщо холодні можливо, повітря в системі або котел не працює. Не намагайтеся самі відкручувати крани або труби, якщо ніколи цього не робили.<br /><br />
                      4. Якщо опалення централізоване, дізнайся, чи підключене опалення в будинку: можливо, подача ще не включена або є аварія. Звернися у ЖЕК або на гарячу лінію теплокомуненерго.<br /><br />
                      5. Якщо котел не запускається або батареї холодні → викликайте професіонала.<br /><br />
                      6. Використовуйте обігрівачі або грілки. Закривайте штори, накривайте диван та ліжко ковдрами, щоб мінімізувати втрати тепла. Закрий двері та щілини, щоб тепло не виходило.
                    </InfoText>
                  </ProblemTextCard>
                </ProblemRow>

                {/* КОРОТКЕ ЗАМИКАННЯ */}
                <ProblemRow>
                  <ProblemMedia>
                    <InfoTitle>Коротке замикання</InfoTitle>
                    <ProblemImage>
                      <img src={shortCircuitImg} alt="Коротке замикання" />
                    </ProblemImage>
                  </ProblemMedia>

                  <ProblemTextCard as="div">
                    <InfoText>
                      1. Відразу вимкніть живлення у щитку.<br /><br />
                      2. Не торкайтеся пошкоджених проводів, іскрящихся приладів чи розеток. Не гасіть іскри чи дроти водою. Вода - це провідник електрики!<br /><br />
                      3. Викличте кваліфікованого електрика. Перевіряйте стан проводки і не накривайте дроти ковдрами чи тканинами.<br /><br />
                      4. Якщо є маленький вогонь у приладі, спробуй засипати його змемлею з горщика або сіллю. Якщо вогонь хоч трохи виходить із під контролю негайно телефонуй у пожежнну службу 101.
                    </InfoText>
                  </ProblemTextCard>
                </ProblemRow>

                {/* ЗАСМІЧЕНА КАНАЛІЗАЦІЯ */}
                <ProblemRow reverse>
                  <ProblemMedia>
                    <InfoTitle>Засмічена каналізація</InfoTitle>
                    <ProblemImage>
                      <img src={cloggedDrainImg} alt="Засмічена каналізація" />
                    </ProblemImage>
                  </ProblemMedia>

                  <ProblemTextCard as="div">
                    <InfoText>
                      1. Не заливайте воду у забиту трубу – ризик затоплення.<br /><br />
                      2. Спробуйте прочистити вантузом, сантехнічним тросом або засобом для прочистки труб (тільки якщо впевнені у своїх силах).<br /><br />
                      3. Якщо проблема не вирішена – викличте сантехніка.<br /><br />
                      4. Не зливайте жир, залишки їжі, пакети, серветки та ватні диски у каналізацію. Бажано мати сітку для волосся у ванні та раз на місяць промивати труби оцтом з содою.
                    </InfoText>
                  </ProblemTextCard>
                </ProblemRow>

                {/* НАЯВНІСТЬ ОСАДУ АБО РЖАВЧИНИ У ВОДІ */}
                <ProblemRow>
                  <ProblemMedia>
                    <InfoTitle>Засмічена каналізація</InfoTitle>
                    <ProblemImage>
                      <img src={dirtyWaterImg} alt="Засмічена каналізація" />
                    </ProblemImage>
                  </ProblemMedia>

                  <ProblemTextCard as="div">
                    <InfoText>
                      1. Не використовуйте воду для пиття та приготування їжі, поки не перевірите якість. Використовуйте бутильовану воду або перевірені фільтри.<br /><br />
                      2. Відкрийте кран холодної та гарячої води в кількох точках квартири. Якщо осад є тільки у гарячій воді, проблема може бути у бойлері або водонагрівачі. Якщо осад є у всіх кранах, причина, ймовірно, у трубах у будинку або у міському водопроводі.<br /><br />
                      3. Якщо осад постійно з’являється, зверніться до водоканалу або місцевого ЖЕКу, бо це може бути ознакою: старих або іржавих труб у будинку, ремонтних робіт у водопроводі, підвищеного вмісту заліза у воді.<br /><br />
                      4. Якщо проблема в будинку, можна спробувати промити систему водопостачання: відкрити всі крани на кілька хвилин, щоб вода змусила осад піти.
                    </InfoText>
                  </ProblemTextCard>
                </ProblemRow>
              </>
            )}

            {activeTopic === "contacts" && (
              <p>Кому писати залежно від ситуації.</p>
            )}

            {activeTopic === "templates" && (
              <p>Готові шаблони повідомлень.</p>
            )}

            {activeTopic === "safety" && (
              <p>Інструкції з безпеки.</p>
            )}

            {activeTopic === "checklist" && (
              <p>Чеклист перевірки житла.</p>
            )}

            {activeTopic === "landlord" && (
              <p>Обов’язки орендодавця.</p>
            )}

            {activeTopic === "electrician" && (
              <p>Коли викликати електрика.</p>
            )}

            {activeTopic === "emergency" && (
              <p>Коли дзвонити в аварійну.</p>
            )}
          </>
        )}

      </RepairsContainer>
    </RepairsPage>
  );
}
