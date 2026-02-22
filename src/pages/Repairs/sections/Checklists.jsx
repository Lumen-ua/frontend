import { useState, useMemo } from "react";

import dangerImg from "../../../assets/images/danger.png";
import document1Img from "../../../assets/images/document-1.png";
import shieldImg from "../../../assets/images/shield.png";

import { 
    CardsGridChecklist, 
    TextCardYellow, 
    IconImage, 
    InfoTitle, 
    GreyBlock, 
    InfoText, 
    TextCard, 
    GreyBlockColumn, 
    ProgressContainer, 
    ProgressBar, 
    ProgressText, 
    CardHeader, 
    CheckItem, 
    HiddenCheckbox, 
    Checkmark, 
    Description, 
    NoteBox 
} from "../RepairsPage.styled";

export default function CheckListsSection() {
    const [checkedItems, setCheckedItems] = useState({});
    const TOTAL_ITEMS = 10;

    const handleToggle = (id) => {
    setCheckedItems((prev) => ({
        ...prev,
        [id]: !prev[id]
    }));
    };

    const stats = useMemo(() => {
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const percentage = Math.round((checkedCount / TOTAL_ITEMS) * 100);

    let status = "danger";
    let text = "Потрібна увага";

    if (percentage ===100){
        status = "ideally";
        text = "Ідеально🎉";
    } else if(percentage >= 80) {
        status = "success";
        text = "Цілком безпечно";
    } else if (percentage >= 50) {
        status = "warning";
        text = "Допустимо";
    }
    
    return { percentage, status, text };
    }, [checkedItems]);

    return(
        <CardsGridChecklist>
            <TextCardYellow area="leftTop">
                <IconImage><img src={dangerImg} alt="<Небезпека>"/><InfoTitle>Інструкція з безпеки</InfoTitle></IconImage>
                <GreyBlock>
                    <InfoText>При купівлі або оренді квартири ретельно перевір кожен із вказаних пунктів.</InfoText>
                </GreyBlock>
            </TextCardYellow>

            <TextCard area="rightTop">
                <GreyBlockColumn>
                <InfoText>Допоможи собі не пропустити приховані "косяки", які потім стануть твоїми проблемами.</InfoText>
                <ProgressContainer>
                    <ProgressBar value={stats.percentage}/>
                </ProgressContainer>
                <ProgressText status={stats.status}>{stats.text} ({stats.percentage}%)</ProgressText>
                </GreyBlockColumn>
            </TextCard>

            <TextCard area="leftBottom">
                <CardHeader>
                <IconImage><img src={shieldImg} alt="<Безпека>"/><InfoTitle>Критичні фактори</InfoTitle></IconImage>
                </CardHeader>
                <CheckItem>
                    <HiddenCheckbox checked={!!checkedItems['smell']} onChange={() => handleToggle('smell')}/>
                    <Checkmark />
                    <div>
                    <InfoTitle>У під'їзді немає запаху сирості</InfoTitle>
                    <Description>Якщо відчутно сирістю, можливо з підвалом є проблеми. Це впливає на шанс появи тарганів та інших паразитів.</Description>
                    </div>
                </CheckItem>

                <CheckItem>
                    <HiddenCheckbox checked={!!checkedItems['bugs']} onChange={() => handleToggle('bugs')}/>
                    <Checkmark />
                    <div>
                    <InfoTitle>Відсутні таргани та інші маленькі друзі</InfoTitle>
                    </div>
                </CheckItem>

                <CheckItem>
                    <HiddenCheckbox checked={!!checkedItems['gas']} onChange={() => handleToggle('gas')}/>
                    <Checkmark />
                    <div>
                    <InfoTitle>Наявність газу</InfoTitle>
                    <Description>Є критичним фактором, особливо під час відключень електроенергії.</Description>
                    </div>
                </CheckItem>

                <CheckItem>
                    <HiddenCheckbox checked={!!checkedItems['infra']} onChange={() => handleToggle('infra')}/>
                    <Checkmark />
                    <div>
                    <InfoTitle>Наявність інфраструктури</InfoTitle>
                    <Description>Перевірте наявність продуктових магазинів та пунктів розливу чистої води поруч (особливо у великих містах, де вода з крана непридатна для пиття).</Description>
                    </div>
                </CheckItem>

                <CheckItem>
                    <HiddenCheckbox checked={!!checkedItems['parks']} onChange={() => handleToggle('parks')}/>
                    <Checkmark />
                    <div>
                    <InfoTitle>Наявність місць для рекреації</InfoTitle>
                    <Description>Зверніть увагу, чи є поблизу парки, сквери або місця для прогулянок.</Description>
                    </div>
                </CheckItem>
            </TextCard>

            <TextCard area="mid">
                <CardHeader>
                <IconImage><img src={document1Img} alt="<Договір>"/><InfoTitle>Юридичний щит</InfoTitle></IconImage>
                </CardHeader>
                <CheckItem>
                    <HiddenCheckbox checked={!!checkedItems['contract']} onChange={() => handleToggle('contract')}/>
                    <Checkmark />
                    <div>
                    <InfoTitle>Договір</InfoTitle>
                    <Description>Договір — це єдиний документ, який захистить вас від раптового виселення.</Description>
                    </div>
                </CheckItem>
            </TextCard>

            <TextCard area="midBottom">
                <InfoTitle>Договір та фінанси</InfoTitle>
                <GreyBlockColumn>
                <InfoText>
                    Юридична сила: Документ має повну юридичну силу навіть без участі ріелтора; головне - чітко прописати відповідальність сторін.
                </InfoText>

                <InfoText>
                    Золоте правило оплати: Ніколи не давайте передоплату або завдаток, доки особисто не побачили квартиру.
                </InfoText>

                <InfoText>
                    Безпека платежів: Не передавайте великі суми грошей без підписаного договору.
                </InfoText>
                </GreyBlockColumn>
            </TextCard>

            <TextCard area="rightMid">
                <InfoTitle>Не менш важливі аспекти</InfoTitle>
                <br></br>
                <CheckItem>
                    <HiddenCheckbox checked={!!checkedItems['photos']} onChange={() => handleToggle('photos')}/>
                    <Checkmark />
                    <div>
                    <InfoTitle>Фотофіксація</InfoTitle>
                    <Description>Щойно ви приїдете на заселення - зразу сфотографуйте все навколо. Потім зможете довести, що зламали не ви.</Description>
                    </div>
                </CheckItem>
                <br></br>
                <CheckItem>
                    <HiddenCheckbox checked={!!checkedItems['meters']} onChange={() => handleToggle('meters')}/>
                    <Checkmark />
                    <div>
                    <InfoTitle>Зафіксуй показники лічильників</InfoTitle>
                    <Description>Попроси показати останні квитанції. Там може бути борг, щоб не платити за те, що було нараховано до вас - цей пункт фіксують у договорі.</Description>
                    </div>
                </CheckItem>
                <br></br>
                <CheckItem>
                    <HiddenCheckbox checked={!!checkedItems['visits']} onChange={() => handleToggle('visits')}/>
                    <Checkmark />
                    <div>
                    <InfoTitle>Контроль після заселення</InfoTitle>
                    <Description>Власник може регулярно перевіряти квартиру, що породжує дискомфорт. Зарання проговоріть цей момент та узгодьте в договорі.</Description>
                    </div>
                </CheckItem>
                <br></br>
                <CheckItem>
                    <HiddenCheckbox checked={!!checkedItems['keys']} onChange={() => handleToggle('keys')}/>
                    <Checkmark />
                    <div>
                    <InfoTitle>Квартира не здається паралельно ще комусь</InfoTitle>
                    <Description>Перевір чи не має часом чужих речей в квартирі. Запитай чи можна замінити замок після заселення. Це гарантує, що у сторонніх осіб немає дублікатів ключа.</Description>
                    </div>
                </CheckItem>
            </TextCard>

            <NoteBox area="rightBottom">
                <strong>💡Примітка</strong>
                <InfoText>Не бійтеся здатися прискіпливим. Ви купуєте свій спокій на найближчі місяці. Якщо власник дратується через те, що ви перевіряєте або задаєте багато питань - це «червоний прапорець».</InfoText>
            </NoteBox>
        </CardsGridChecklist>
    );
}