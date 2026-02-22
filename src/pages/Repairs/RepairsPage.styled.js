import styled, { keyframes, css } from "styled-components";

export const RepairsPage = styled.div`
  width: 100%;
  padding: 28px 28px 40px;
  @media (max-width: 768px) {
    padding: 18px 12px 24px;
  }
`;

export const RepairsContainer = styled.div`
  max-width: var(--container-max);
  margin: 0 auto;
`;

export const HeroCard = styled.section`
  background: var(--color-accent);
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: center;
  border: 2px solid var(--color-border);
`;

export const HeroLeft = styled.div``;

export const HeroTitle = styled.h1`
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0.2px;
  font-family: var(--font-family);
`;

export const HeroText = styled.p`
  font-size: 16px;
  font-weight: 600;
  max-width: 520px;
  font-family: var(--font-family);
`;

export const HeroIcon = styled.div`
  font-size: 48px;
`;

export const CardsGrid = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  & > :last-child:nth-child(odd) {
    grid-column: 1 / -1;
    justify-self: center;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  background: var(--color-surface);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer; 
  transition: transform 150ms ease, box-shadow 150ms ease, filter 150ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    filter: brightness(1.03);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 3px rgba(0,0,0,0.1);
  }
`;

export const InfoIcon = styled.div`
  font-size: 22px;
`;

export const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: 800;
  font-family: var(--font-family);
`;

export const InfoText = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  font-family: var(--font-family);
`;

export const MaterialsCard = styled.section`
  margin-top: 18px;
  background: var(--color-surface);
  padding: 16px;
`;

export const MaterialsList = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const MaterialItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-family);
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 4px;
  transition: transform 120ms ease, background 120ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(0, 0, 0, 0.03);
  }

  &:active {
    transform: translateY(1px);
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  margin-top: 20px;
  padding: 0;
  font-weight: 600;
  color: var(--color-text);
`;

export const PageTitle = styled.div`
  margin: 16px 0 24px;
  padding-bottom: 12px;

  font-size: 22px;
  font-weight: 700;
  color: #000000;

  border-bottom: 3px solid #000000;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  margin-bottom: 20px;

  ${({ $reverse }) =>
    $reverse &&
    `
    grid-template-columns: 1fr 220px;

    & > div:first-child {
      order: 2;
    }
  `}

  @media (max-width: 720px) {
    grid-template-columns: 1fr;

    & > div {
      order: unset !important;
    }
  }
`;

export const Media = styled.div`
  display: flex;
  flex-direction: column;
  grid-template-rows: 48px auto;
  text-align: center;
`;

export const Image = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    border-radius: 10px;
    max-width: 140px;
    width: 100%;
    height: auto;
  }
`;

export const TextCard = styled.div`
  background: var(--color-surface);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow-x: hidden;

  ${({ area }) => area && `grid-area: ${area};`}
`;

export const CardHeader = styled.div`
  display: flex;       
  padding: 8px 12px;

  background: #FFD966;
  border: 2px solid var(--color-border);
  border-radius: 8px;          

  margin-bottom: 10px;         
`;

export const Attention = styled.div`
  width: 100%;
  display: flex;
  padding: 16px;
  align-items: center;
  justify-content: center;
  background: ${props => props.$saved ? "#b9f6ca" : "#F19C99"}; 
  border-radius: 14px;

  ${({ area }) => area && `grid-area: ${area};`}
`;

export const NoteBox = styled.div`
  margin-top: 16px;
  padding: 12px 14px;

  background: #e8f7e8;        
  border: 2px dashed var(--color-border);     
  border-radius: 8px;

  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  font-family: var(--font-family);
  ${({ area }) => area && `grid-area: ${area};`}
`;

export const GreyBlock = styled.div`
  background-color: #F4F3EE; 
  padding: 8px 8px;        
  border-radius: 14px;        
  display: flex;             
  gap: 15px; 
  flex: 1;
  align-items: center;
  align-self: stretch;

  ul {
    list-style: disc;          
    padding-left: 14px;
  }

  li {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    font-family: var(--font-family);
  }
`;

export const GreyBlockColumn = styled(GreyBlock)`
  flex-direction: column;
  align-items: center;
`;

export const GreenBlockColumn = styled(GreyBlockColumn)`
  background-color: #ECFFEB; 
`;

export const GreyBlocksRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const GreenBlocksRow = styled(GreyBlocksRow)`
  margin-top: 10px;
  grid-template-columns: repeat(5, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const GreyText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
`;

export const IconImage = styled.div`
  display: flex;
  align-items: center;

  img {
    max-width: 64px;
    height: auto;
  }
`;

export const IconImageMeintenance = styled(IconImage)`
  img {
    max-width: 86px;
  }
`;

export const StepArrow = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;     
  margin: 3px 0;          
  font-size: 25px;          
  color: #000;              
`;

export const GeneratorContainer = styled.div`
  background: #fff;
  border: 2px solid var(--color-border);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

export const Tabs = styled.div`
  display: flex;
  background: #f0f0f0;
  border-bottom: 2px solid var(--color-border);
`;

export const Tab = styled.button`
  flex: 1;
  padding: 8px;
  border: none;
  background: ${props => props.$active ? "#FFD966" : "transparent"};
  cursor: pointer;
  border-right: 1px solid var(--color-border);
  transition: background 0.2s;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: ${props => props.$active ? "#FFD966" : "#e0e0e0"};
  }
`;

export const PaperArea = styled.div`
  background: #555; 
  padding: 10px;
  height: 565px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #FFD966;
    border-radius: 8px;
  }
`;

export const PaperSheet = styled.div`
  background: white;
  min-height: 100%;
  padding: 40px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  line-height: 1.5;
  white-space: pre-wrap; 
  outline: none;
  color: #000;
  overflow-y: auto;
  &::-webkit-scrollbar {
    height: 10px;
  }

`;

export const Actions = styled.div`
  padding: 8px;
  display: flex;
  justify-content: center;
  gap: 16px;
  background: #fff;
  border-top: 2px solid var(--color-border);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ActionsColumn = styled(Actions)`
  padding: 0px;  
  background: none;
  border: none;    
  display: flex;
  flex-direction: column;        

  & > * {
    min-height: 56px;  
  }     
  
  ${({ area }) => area && `grid-area: ${area};`}
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  background: ${props => props.$primary ? "#FFD54F" : "#fff"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 0px #000;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0px 2px 0px #000;
  }
`;

export const CardsGridTemplate = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  grid-template-areas:
    "leftTop"
    "rightTop"
    "leftBottom"
    "rightBottom";

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows:
      minmax(230px, auto)
      minmax(160px, auto)
      minmax(auto, auto);

    grid-template-areas:
      "leftTop rightTop"
      "leftBottom rightTop"
      "leftBottom rightBottom";
  }
`;

export const CardsGridSafety = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  
  grid-template-areas:
    "leftTop"
    "main"
    "leftMid"
    "right"
    "bottom";

  @media (min-width: 1024px) {
    grid-template-columns: 220px 1fr 195px;
    grid-template-rows:
      minmax(220px, auto)
      minmax(160px, auto)
      minmax(120px, auto);

    grid-template-areas:
      "leftTop main right"
      "leftMid main right"
      "bottom bottom right";
  }
`;

export const CardsGridChecklist = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  
  grid-template-areas:
    "leftTop"
    "rightTop"
    "leftBottom"
    "mid"
    "rightMid"
    "midBottom"
    "rightBottom";

  @media (min-width: 1024px) {
    grid-template-columns: 25% 25% 50%;
    grid-template-rows:
      minmax(160px, auto)
      minmax(160px, auto)
      minmax(200px, auto)
      minmax(80px, auto);

    grid-template-areas:
      "leftTop leftTop rightTop"
      "leftBottom mid rightMid"
      "leftBottom midBottom rightMid"
      "leftBottom midBottom rightBottom";
  }
`;

export const TextCardYellow = styled.div`
  background: #FFD966;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow-x: hidden;

  ${({ area }) => area && `grid-area: ${area};`}
`;

export const TextCardBlue = styled(TextCardYellow)`
  background: #DAE8FC;
  ${({ area }) => area && `grid-area: ${area};`}
`;

export const ProgressContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  height: 25px;
  width: 100%;
  margin: 5px 0;
  border: 2px solid var(--color-border);
`;

export const ProgressBar = styled.div`
  background-color: ${({ value }) => 
    value >= 80 ? "#5ab85f" :  
    value >= 50 ? "#FFD966" :    
    "#e15353"                    
  };
  height: 100%;
  width: ${({ value }) => value}%;
  border-radius: 6px;
  transition: width 0.3s ease, background-color 0.3s ease;
`;

export const ProgressText = styled.div`
  color: ${({ status }) =>
    status === "danger" ? "#d32f2f" :
    status === "warning" ? "#f57c00" :
    "#2e7d32"};
  font-weight: bold;
  font-size: 16px;
`;

export const CheckItem = styled.label`
  display: flex;
  cursor: pointer;
  user-select: none;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  height: 0;
  width: 0;
`;

export const Checkmark = styled.span`
  height: 22px;
  width: 22px;
  background-color: #fff;
  border: 2px solid #999;
  border-radius: 4px;
  margin-right: 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${HiddenCheckbox}:checked + & {
    background-color: #FFD966;
    border-color: #000000;
  }

  &:after {
    content: "✔";
    display: none;
  }

  ${HiddenCheckbox}:checked + &:after {
    display: block;
  }
`;

export const Description = styled.p`
  color: #666;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
  font-family: var(--font-family);
`;

export const CardsGridElectrician = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  
  grid-template-areas:
    "leftTop"
    "leftLeft"
    "Mid"
    "leftMid"
    "leftBottom"
    "rightTop"
    "rightMid"
    "rightMid2"
    "rightBottom"
    "Bottom1"
    "Bottom2";

  @media (min-width: 1024px) {
    grid-template-columns: 25% 25% 50%;
    grid-template-rows:
      minmax(160px, auto)
      minmax(160px, auto)
      minmax(80px, auto)
      minmax(160px, auto)
      minmax(220px, auto)
      minmax(220px, auto)
      minmax(200px, auto);

    grid-template-areas:
      "leftTop leftTop rightTop"
      "leftLeft Mid rightMid"
      "leftMid leftMid rightMid"
      "leftMid leftMid rightMid2"
      "leftBottom leftBottom rightBottom"
      "Bottom1 Bottom1 Bottom1"
      "Bottom2 Bottom2 Bottom2";
  }
`;

export const CardsGridMaintenance = styled.div`
  display: grid;
  gap: 16px; 
  grid-template-columns: 1fr;
  
  grid-template-areas:
    "left"
    "right"
    "bottom";

  @media (min-width: 1024px) {
    grid-template-columns: 40% 60%;
    grid-template-rows:
      minmax(480px, auto)
      minmax(200px, auto);

    grid-template-areas:
      "left right"
      "bottom bottom";
  }
`;

export const FloorPlan = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 12px;
  padding: 16px;
  background: #e0e0e0;
  border: 2px solid var(--color-border);
  border-radius: 18px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

export const TopRow = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const RoomCard = styled.div`
  flex: 1;
  background: #fff;
  border: 2px solid var(--color-border);
  border-radius: 18px;
  min-height: 256px auto;
  padding: 18px;

  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;

  ${props => props.$fullWidth && css`
    width: 100%;
    box-sizing: border-box;
  `}
`;

export const RoomLabel = styled.span`
  background: #FFD966;
  border: 2px solid #000;
  padding: 4px 12px;
  border-radius: 18px;
  font-weight: 700;
  font-family: var(--font-family);
  font-size: 16px;
  justify-self: start; 
`;

export const IconsGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const ApplianceTrigger = styled.button`
  display: grid;
  grid-template-columns: 1fr; 
  grid-template-rows: 1fr;
  
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const IconImg = styled.img`
  grid-area: 1 / 1 / 2 / 2; 
  width: 96px;
  height: 96px;
  object-fit: contain;
`;

const pulse = keyframes`
    0%{
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }
    
    70%{
      transform: scale(1.2);
      box-shadow: 0 0 0 8px rgba(255, 82, 82, 0);
    }
    
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
`;

export const StatusDot = styled.div`
  grid-area: 1 / 1 / 2 / 2; 
  justify-self: end;  
  align-self: start;  
  
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.$color || '#ddd'};
  border: 2px solid #fff;
  margin: -5px -5px 0 0; 

  ${props => props.$pulse && css`
    animation: ${pulse} 1.5s infinite;
  `}
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ModalBackdrop = styled.div`
  position: fixed; 
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ActionPanel = styled.div`
  background: var(--color-surface);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  border: 2px solid #000000;
  animation: ${fadeIn} 0.3s ease-out;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F4F3EE; 
  padding: 8px 8px;        
  border-radius: 14px; 
`;

export const TimerBadge = styled.div`
  padding: 6px 12px;
  font-size: 14px;
  font-weight: bold;
  color: #555;
`;

export const StepBlock = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  
  strong {
    display: block;
    margin-bottom: 4px;
    color: #000;
  }
`;

export const CleanButton = styled.button`
  background: #FFD966;
  padding: 12px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 20px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 0px #000;
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0px 2px 0px #000;
  }
`;

export const CardsGridEmergency = styled.div`
  display: grid;
  gap: 16px; 
  grid-template-columns: 1fr;
  
  grid-template-areas:
    "top"
    "leftTop"
    "rightTop"
    "leftBottom"
    "rightBottom"
    "bottom"
    "buttons";

  @media (min-width: 1024px) {
    grid-template-columns: 50% 50%;
    grid-template-rows:
      minmax(80px, auto)
      minmax(280px, auto)
      minmax(30px, auto)
      minmax(220px, auto)
      minmax(140px, auto)
      minmax(100px, auto);

    grid-template-areas:
      "top top"
      "leftTop rightTop"
      "leftTop rightBottom"
      "leftBottom rightBottom"
      "leftBottom buttons"
      "bottom bottom";
  }
`;

export const InputWrapper = styled.div`
  border: 1px solid #777;
  border-radius: 10px;
  background: #fff;
  padding: 10px;
`;

export const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #888;
    transition: color 0.2s;
  }
  &:focus::placeholder {
    color: transparent;
  }
  &:focus {
    outline: none;
    border: none;
  }
`;

export const ExpandableWrapper = styled.div`
  background: #fff;
  border: 1px solid #777;
  border-radius: 10px;
  overflow: hidden;
`;

export const ExpandableHeader = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  
  &:hover {
    background: #f5f5f5;
  }
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Arrow = styled.span`
  font-size: 14px;
  color: #333;
`;

export const ExpandableBody = styled.div`
  padding: 0 10px 10px;
  border-top: 1px solid #eee;
`;

export const StyledTextArea = styled.textarea`
  font-family: var(--font-family);
  width: 100%;
  min-height: 50px;
  border: none;
  outline: none;
  resize: vertical;
  margin-top: 5px;

  &:focus {
    outline: none;
    border: none;
  }
`;

export const GreyFrame = styled.div`
  background-color: #F4F3EE; 
  padding: 12px 12px;        
  border-radius: 14px;        
  display: flex;             
  flex-direction: column; 
  gap: 15px; 
  align-items: stretch;
  align-self: stretch;
`;

export const ProgressBadge = styled.div`
  background-color: #9ceaff;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 6px 16px;
  font-weight: 700;
  font-size: 14px;
  color: #000;
  width: fit-content;
  font-family: var(--font-family);

  margin-left: auto;    
  margin-right: 32px;    
  
  margin-top: -20px;      
  margin-bottom: 10px;   
  
  @media (max-width: 768px) {
    margin-right: 16px;
    font-size: 12px;
    margin-top: -16px;
  }
`;

export const AnimatedSection = styled.div`
  animation: ${fadeIn} 0.3s ease;
`;
