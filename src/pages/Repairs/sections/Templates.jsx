import { useState } from "react";
import { TEMPLATES } from "../data/templates";
import { FaCopy, FaFileDownload } from "react-icons/fa";

import { 
  CardsGridTemplate, 
  TextCard, 
  InfoTitle, 
  GreyBlock,
  ActionButton,
  Actions,
  GeneratorContainer,
  GreyBlockColumn,
  GreyBlocksRow,
  GreyText,
  IconImage,
  InfoText,
  NoteBox,
  PaperArea,
  PaperSheet,
  StepArrow,
  Tab,
  Tabs,
} from "../RepairsPage.styled";

import { GoArrowDown } from "react-icons/go";
import calendarImg from "../../../assets/images/calendar.png";
import clockImg from "../../../assets/images/clock.png";
import document1Img from "../../../assets/images/document-1.png";
import document2Img from "../../../assets/images/document-2.png";
import envelopImg from "../../../assets/images/envelop.png";
import houseImg from "../../../assets/images/house.png";
import neighborhoodImg from "../../../assets/images/neighborhood.png";
import phone1Img from "../../../assets/images/phone-1.png";
import phone2Img from "../../../assets/images/phone-2.png";

export default function TemplatesSection() {
  const [generatorTab, setGeneratorTab] = useState("zvernennya");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = TEMPLATES[generatorTab];
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  const handleDownload = () => {
    const fileName = generatorTab === "akt" ? "Akt.docx" : "Zvernennya.docx";
    const filePath = `/documents/${fileName}`;
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
        <CardsGridTemplate>
            <TextCard area = "leftTop">
            <InfoTitle>Чому твої дзвінки часто ігноруюють?</InfoTitle>
                <GreyBlock>
                <IconImage>
                <img src={phone1Img} alt="Дзвінок" />
                </IconImage>
                <GreyText><InfoText>Ти дзвониш, кричиш, просиш, а вони кивають і забувають?</InfoText><InfoText><strong>Секрет простий:</strong> диспетчер лише фіксує дзвінок, але не приймає рішень.</InfoText></GreyText>
                </GreyBlock>
                <GreyBlock>
                <IconImage>
                <img src={document1Img} alt="Заява" />
                </IconImage>
                <GreyText><InfoText>Хочеш результату?</InfoText><InfoText>Пиши папір. Начальник ЖЕКу <strong>зобов'язаний</strong> відповісти на письмову заяву.</InfoText></GreyText>
                </GreyBlock> 
            </TextCard>

            <TextCard area = "leftBottom">
            <InfoTitle>Генератор шаблонів</InfoTitle>
            <GeneratorContainer>
                <Tabs>
                <Tab $active={generatorTab === "zvernennya"} 
                    onClick={() => setGeneratorTab("zvernennya")}>
                    <InfoText>Звернення</InfoText>
                </Tab>
                <Tab $active={generatorTab === "akt"} 
                    onClick={() => setGeneratorTab("akt")}>
                    <InfoText>Акт-претензія</InfoText>
                </Tab>
                </Tabs>

                <PaperArea>
                <PaperSheet>
                    {TEMPLATES[generatorTab]}
                </PaperSheet>
                </PaperArea>

                <Actions>
                <ActionButton $primary onClick={handleCopy}>
                    <FaCopy /> <InfoText>{isCopied ? "Скопійовано!" : "Копіювати"}</InfoText>
                </ActionButton>
                <ActionButton onClick={handleDownload}>
                    <FaFileDownload /> <InfoText>Завантажити DOC</InfoText>
                </ActionButton>
                </Actions>
            </GeneratorContainer>
            </TextCard>

            <TextCard area = "rightTop">
            <InfoTitle>Твій алгоритм дій,</InfoTitle>
            <InfoText>якщо ЖЕК ігнорує твої звернення та не усуває проблеми</InfoText>
            <GreyBlock>
                <IconImage><img src={phone2Img} alt="Виклик" /></IconImage>
                <InfoText>Викликаєш представника ЖЕКу (письмово або дзвінком з фіксацією вхідного номера).</InfoText>
            </GreyBlock>
            <StepArrow><GoArrowDown /></StepArrow>
            <GreyBlock>
                <IconImage><img src={clockImg} alt="Срок" /></IconImage>
                <InfoText>Представник виконавця має з’явитися протягом <strong>2 робочих днів</strong>.</InfoText><InfoText>Прийшли? Складаєте <strong>Акт-претензію</strong> у двох екземплярах (підписуєш ти і вони).</InfoText>
            </GreyBlock>
            <StepArrow><GoArrowDown /></StepArrow>
            <GreyBlock>
                <IconImage><img src={document2Img} alt="Заява" /></IconImage>
                <InfoText>Відносиш Акт в ЖЕК. Вимагаєш перерахунку комуналки (якщо послуга була ненадана або неякісна)</InfoText>
            </GreyBlock>
            </TextCard>

            <TextCard area = "rightBottom">
            <InfoTitle>Якщо в будинку є ОСББ</InfoTitle>
            <InfoText>ОСББ - не є надавачем послуг, як ЖЕК, а організовує їх отримання. Якщо в будинку виникли проблеми з комунальними послугами - твоя <strong>перша інстанція</strong> ОСББ.</InfoText>
            <InfoText>Ти пишеш заяву голові ОСББ і він сам повинен комунікувати з почтачальниками послуг.</InfoText>
            <InfoText>Щоб звернення було офіційним варто: </InfoText>
            <GreyBlocksRow>
                <GreyBlockColumn>
                <IconImage><img src={envelopImg} alt="Звернення" /></IconImage>
                <GreyText><InfoText>Оформити звернення письмово (від руки або надруковане).</InfoText></GreyText>
                </GreyBlockColumn>
                <GreyBlockColumn>
                <IconImage><img src={houseImg} alt="Адреса" /></IconImage>
                <GreyText><InfoText>Обов’язково вказати контакти для надання відповіді.</InfoText></GreyText>
                </GreyBlockColumn>
                <GreyBlockColumn>
                <IconImage><img src={calendarImg} alt="Дата" /></IconImage>
                <GreyText><InfoText>Підписати і датувати документ.</InfoText></GreyText>
                </GreyBlockColumn>
            </GreyBlocksRow>
            <InfoText>
                Подати одним з таких способів:<br /><br />
                1. Особисто з реєстрацією.<br /><br />
                2. Поштою з повідомленням про вручення.<br /><br />
                3. Електронною поштою на офіційну адресу ОСББ.<br /><br />
            </InfoText>
            </TextCard>
        </CardsGridTemplate>

        <NoteBox>
            <strong>💡Примітка</strong>
            <IconImage>
            <img src={neighborhoodImg} alt="Сусіди" />
            <InfoText>Лайфхак із закону: Представник виконавця не прийшов або відмовляється підписати? Не біда! Клич двох сусідів. Підписуєш Акт ти + 2 сусіди = документ має повну юридичну силу без підпису ЖЕКу.</InfoText>
            </IconImage>
        </NoteBox>
    </>
  );
}