import { useState, useEffect } from "react";
import { APPLIANCES } from "../data/appliances";
import { repairsApi } from "../../../api/repairsApi";

import airConditionImg from "../../../assets/images/air_condition.png";
import washingMachineImg from "../../../assets/images/washing_machine.png";
import extractImg from "../../../assets/images/extract.png";
import windowImg from "../../../assets/images/window.png";
import faucetImg from "../../../assets/images/faucet.png";

import { 
    TextCard, 
    NoteBox,
    CardsGridMaintenance,
    GreyBlock,
    InfoText,
    InfoTitle,
    Media,
    IconImageMeintenance,
    GreenBlockColumn,
    GreenBlocksRow,
    FloorPlan, 
    TopRow, 
    RoomCard, 
    RoomLabel,
    IconsGroup,
    ApplianceTrigger,
    IconImg,
    StatusDot,
    ModalBackdrop,
    ActionPanel,
    PanelHeader,
    TimerBadge,
    StepBlock,
    CleanButton,
    ProgressContainer,
    ProgressBar
} from "../RepairsPage.styled";

//статус приладу, з моменту останньої чистки
const getStatusColor = (lastCleaned, intervalDays) => {
    if (!lastCleaned) return '#FF5252'; 
    
    const now = new Date();
    const diffTime = Math.abs(now - new Date(lastCleaned));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const progress = diffDays / intervalDays;

    if (progress >= 1) return '#FF5252'; 
    if (progress >= 0.7) return '#FFD740';
    return '#69F0AE'; 
};

//таймер, показує кількість днів до наступного прибирання
const getDaysLeftText = (lastCleaned, intervalDays) => {
    if (!lastCleaned) return 'Терміново!';
    const now = new Date();
    const cleanDate = new Date(lastCleaned);
    const nextDate = new Date(cleanDate.setDate(cleanDate.getDate() + intervalDays));
    const diffTime = nextDate - now;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) return 'Терміново!';
    return `${daysLeft} дн.`;
}


export default function MaintenanceSection(){
    const token = localStorage.getItem("lumen_token");
    const [maintenanceState, setMaintenanceState] = useState({});

    //завантаження з серверу
    useEffect(() => {
        const loadMaintenance = async () => {
            try {
            const data = await repairsApi.getAll(token);

            setMaintenanceState(
                JSON.parse(data.maintenanceStateJson)
            );
            } catch (err) {
            console.error(err);
            }
        };

        if (token) loadMaintenance();
    }, [token]);

    const [selectedAppliance, setSelectedAppliance] = useState(null);

    //автозбереження
    useEffect(() => {
        const saveMaintenance = async () => {
            try {
                if (!Object.keys(maintenanceState).length) return;
                
                await repairsApi.saveMaintenance(
                { maintenanceStateJson: JSON.stringify(maintenanceState) },
                token
                ).catch(() => null); 
            } catch (err) {
                console.error(err);
            }
        };

        if (token) saveMaintenance();
    }, [maintenanceState, token]);

    //оновлення статусу приладу при натисканні
    const handleClean = (id) => {
        setMaintenanceState(prev => ({
            ...prev, [id]: new Date().toISOString()
        }));
        setSelectedAppliance(null); 
    };

    const ApplianceItem = ({ id }) => {
        const data = APPLIANCES[id];
        const lastCleaned = maintenanceState[id];
        const statusColor = getStatusColor(lastCleaned, data.intervalDays);

        const isRed = statusColor === '#FF5252';

        return (
            <ApplianceTrigger onClick={() => setSelectedAppliance(id)}>
                <IconImg src={data.icon} alt={data.name} />
                <StatusDot 
                    $color={statusColor}
                    $pulse={isRed}
                />
            </ApplianceTrigger>
        );
    };

    const calculateFlatStatus = () => {
        const total = Object.keys(APPLIANCES).length;
        const greenCount = Object.keys(APPLIANCES).filter(id => {
            const lastCleaned = maintenanceState[id];
            return getStatusColor(lastCleaned, APPLIANCES[id].intervalDays) === '#69F0AE';
        }).length;

        return Math.round((greenCount / total) * 100);
    };
    const flatStatus = calculateFlatStatus();

    return(
        <>
            <CardsGridMaintenance>
                <TextCard area="left">
                    <InfoTitle>Часті проблеми</InfoTitle>
                    <GreyBlock>
                        <Media>
                            <InfoTitle>Кондиціонер</InfoTitle>
                            <IconImageMeintenance>
                                <img src={airConditionImg} alt="Кондиціонер" />
                            </IconImageMeintenance>
                        </Media>
                        <InfoText>Накопичення пилу, пилку та вологи на фільтрах і теплообміннику. Кондиціонер накопичує його у вологому середовищі.</InfoText>
                    </GreyBlock>

                    <GreyBlock>
                        <Media>
                            <InfoTitle>Пральна машина</InfoTitle>
                            <IconImageMeintenance>
                                <img src={washingMachineImg} alt="Пральна машина" />
                            </IconImageMeintenance>
                        </Media>
                        <InfoText>Застій води у зливному фільтрі та накопичення залишків мийних засобів у складках гумової манжети (люка).</InfoText>
                    </GreyBlock>

                    <GreyBlock>
                        <Media>
                            <InfoTitle>Витяжка</InfoTitle>
                            <IconImageMeintenance>
                                <img src={extractImg} alt="Витяжка" />
                            </IconImageMeintenance>
                        </Media>
                        <InfoText>Осідання мікрочасток жиру та кіптяви на алюмінієвих решітках.</InfoText>
                    </GreyBlock>

                    <GreyBlock>
                        <Media>
                            <InfoTitle>Вікно</InfoTitle>
                            <IconImageMeintenance>
                                <img src={windowImg} alt="Вікно" />
                            </IconImageMeintenance>
                        </Media>
                        <InfoText>Втрата еластичності гумових ущільнювачів та розрегулювання запірних механізмів (ексцентриків).</InfoText>
                    </GreyBlock>

                    <GreyBlock>
                        <Media>
                            <InfoTitle>Кран</InfoTitle>
                            <IconImageMeintenance>
                                <img src={faucetImg} alt="Кран" />
                            </IconImageMeintenance>
                        </Media>
                        <InfoText>Засмічення сітки-розпилювача механічними частками іржі та вапняним нальотом.</InfoText>
                    </GreyBlock>
                </TextCard>

                
                <TextCard area="right">
                    <InfoTitle>Гайд по прибиранню</InfoTitle>
                    <InfoText>Клікай на червоний індикатор, щоб почистити квартиру</InfoText>
                    <InfoText>🏠 Стан квартири: {flatStatus}%</InfoText>
                    <ProgressContainer>
                        <ProgressBar value={flatStatus} />
                    </ProgressContainer>
                    <FloorPlan>
                        <TopRow>
                            <RoomCard >
                                <RoomLabel>Ванна</RoomLabel>
                                <IconsGroup>
                                    <ApplianceItem id="washing_machine" />
                                </IconsGroup> 
                            </RoomCard>

                            <RoomCard >
                                <RoomLabel>Кухня</RoomLabel>
                                <IconsGroup>
                                    <ApplianceItem id="faucet" />
                                    <ApplianceItem id="extract" />
                                    <ApplianceItem id="cooler" />
                                </IconsGroup>
                            </RoomCard>
                        </TopRow>

                        <RoomCard $fullWidth>
                            <RoomLabel>Кімната</RoomLabel>
                            <IconsGroup>
                                <ApplianceItem id="air_condition" />
                                <ApplianceItem id="room_cleaning" />
                                <ApplianceItem id="window" />
                            </IconsGroup>
                        </RoomCard>
                    </FloorPlan>
                </TextCard>

                <NoteBox area="bottom">
                    <strong>💡 До чого це може призвести:</strong>
                    <GreenBlocksRow>

                        <GreenBlockColumn>
                            <InfoTitle>Кондиціонер</InfoTitle>
                            <ul>
                                <li><strong>Здоров’я:</strong> Пліснява й бактерії викликають алергію та кашель.</li>
                                <li><strong>Витрати:</strong> Забиті фільтри - підвтщене споживання електроенергії (до 20%) і зношують прилад.</li>
                            </ul>
                        </GreenBlockColumn>

                        <GreenBlockColumn>
                            <InfoTitle>Пральна машина</InfoTitle>
                            <ul>
                                <li><strong>Поломка:</strong> Сміття забиває помпу → зупинка та ремонт.</li>
                                <li><strong>Гігієна:</strong> Бактерії спричиняють запах затхлості.</li>
                                <li><strong>Речі:</strong> Пліснява залишає плями на одязі.</li>
                            </ul>
                        </GreenBlockColumn>

                        <GreenBlockColumn>
                            <InfoTitle>Кухонна витяжка</InfoTitle>
                            <ul>
                                <li><strong>Небезпека:</strong> Жирний фільтр може спалахнути.</li>
                                <li><strong>Ефективність:</strong> Знижується тяга, запахи лишаються в квартирі.</li>
                                <li><strong>Інтер’єр:</strong> Жир осідає на меблях і стелі.</li>
                            </ul>
                        </GreenBlockColumn>

                        <GreenBlockColumn>
                            <InfoTitle>Вікна</InfoTitle>
                            <ul>
                                <li><strong>Мікроклімат:</strong> Протяги знижують температуру.</li>
                                <li><strong>Пліснява:</strong> Конденсат руйнує укоси та шпалери.</li>
                                <li><strong>Знос:</strong> Поломка фурнітури через перекоси.</li>
                            </ul>
                        </GreenBlockColumn>

                        <GreenBlockColumn>
                            <InfoTitle>Кран</InfoTitle>
                            <ul>
                                <li><strong>Дискомфорт:</strong> Нерівний струмінь і бризки.</li>
                                <li><strong>Тиск:</strong> Забитий аератор може спричинити протікання.</li>
                                <li><strong>Витрати:</strong> Більше води через слабкий напір.</li>
                            </ul>
                        </GreenBlockColumn>

                    </GreenBlocksRow>
                </NoteBox>

            </CardsGridMaintenance>

            {selectedAppliance && (
                <ModalBackdrop onClick={() => setSelectedAppliance(null)}>
                    <ActionPanel onClick={e => e.stopPropagation()}>
                        <PanelHeader>
                            <InfoTitle>{APPLIANCES[selectedAppliance].name}</InfoTitle>
                            <TimerBadge>
                                ⏱ {getDaysLeftText(maintenanceState[selectedAppliance], APPLIANCES[selectedAppliance].intervalDays)}
                            </TimerBadge>
                        </PanelHeader>

                        {APPLIANCES[selectedAppliance].steps.map((step, index) => (
                            <StepBlock key={index}>
                                <strong>{step.title}:</strong> {step.desc}
                            </StepBlock>
                        ))}

                        <CleanButton onClick={() => handleClean(selectedAppliance)}>
                            Провести прибирання
                        </CleanButton>
                    </ActionPanel>
                </ModalBackdrop>
            )}
        </>
    );
}