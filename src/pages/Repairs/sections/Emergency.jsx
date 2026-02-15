import React, { useState } from "react";
import { HiDocumentDuplicate } from "react-icons/hi";
import { FaSave } from "react-icons/fa";

import { 
    CardsGridEmergency,
    TextCard,
    TextCardYellow,
    InfoTitle, 
    InfoText,  
    InfoIcon,
    Attention,
    ActionButton,
    ActionsColumn,
    TextCardBlue,
    InputWrapper,
    StyledInput,
    ExpandableWrapper,
    ExpandableHeader,
    HeaderText,
    ExpandableBody,
    StyledTextArea,
    Arrow,
    GreyFrame,
} from "../RepairsPage.styled";

const SimpleInput = ({ label, name, value, onChange }) => {
  return (
    <InputWrapper>
      <StyledInput
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        autoComplete="off"
      />
    </InputWrapper>
  );
};

const ExpandableInput = ({ title, placeholder, name, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ExpandableWrapper>
      <ExpandableHeader onClick={() => setIsOpen(!isOpen)}>
        <HeaderText>
          <InfoTitle style={{fontSize: "14px"}}>{title}</InfoTitle>
          <InfoText style={{ fontSize: "12px", color: value ? "#000" : "#666" }}>
            {value ? value : placeholder}
          </InfoText>
        </HeaderText>
        <Arrow>{isOpen ? "▲" : "▼"}</Arrow>
      </ExpandableHeader>

      {isOpen && (
        <ExpandableBody>
          <StyledTextArea
            name={name}
            value={value}
            onChange={onChange}
            placeholder="Введіть текст тут..."
            autoFocus
          />
        </ExpandableBody>
      )}
    </ExpandableWrapper>
  );
};

export default function EmergencySection(){

    const [form, setForm] = useState({
        owner: "", jek: "", plumber: "", electric: "",     
        shield: "", gas: "", waterCold: "", waterHot: "",   
        clinic: "", pharmacy: "", bank: "", admin: "",      
        keys: "", docs: "", meds: "",                       
        inet: "", provider: "", code: ""                    
    });

    const [isSaved, setIsSaved] = useState(false);

    //оновлює дані форми
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setIsSaved(false);
    };

    //зберігає дані із форми 
    const handleSave = () => {
        localStorage.setItem("emergencyForm", JSON.stringify(form));
        setIsSaved(true);
    };

    //зчитує дані із форми
    const handleLoad = () => {
        const data = localStorage.getItem("emergencyForm");
        if (data) {
        setForm(JSON.parse(data));
        alert("Дані успішно завантажено!");
        } else {
        alert("Збережених даних немає. Спочатку заповніть і збережіть форму.");
        }
    };

    return (
    <CardsGridEmergency>
      <Attention area="top" $saved={isSaved}>
        <InfoTitle>
          {isSaved
            ? "✅ Тривожна валіза успішно зібрана. Ти в безпеці!"
            : "⚠️ Завдання: Заповни блоки нижче прямо зараз"}
        </InfoTitle>
      </Attention>

      <TextCard area="leftTop">
        <InfoTitle>Контакти відповідальних осіб</InfoTitle>
        <GreyFrame>
            <InfoText>📞 Власник квартири</InfoText>
            <SimpleInput name="owner" value={form.owner} onChange={handleChange} label="(Ім'я, тел.)" />
            <InfoText>🏢 ОСББ/ЖЕК</InfoText>
            <SimpleInput name="jek" value={form.jek} onChange={handleChange} label="(тел.)" />
            <InfoText>🔧 Сантехнік</InfoText>
            <SimpleInput name="plumber" value={form.plumber} onChange={handleChange} label="(тел.)" />
            <InfoText>⚡️ Електрик</InfoText>
            <SimpleInput name="electric" value={form.electric} onChange={handleChange} label="(тел.)" />
        </GreyFrame>
      </TextCard>
    

      <TextCardYellow area="rightTop">
        <InfoTitle>Технічні точки керування</InfoTitle>
        <InfoText>Розташування елементів для негайного припинення аварії</InfoText>
        
        <ExpandableInput 
          title="Електричний щиток" 
          placeholder="У коридорі біля дверей..." 
          name="shield" value={form.shield} onChange={handleChange} 
        />
        <ExpandableInput 
          title="Газовий вентиль" 
          placeholder="На кухні за мікрохвильовкою..." 
          name="gas" value={form.gas} onChange={handleChange} 
        />
        <ExpandableInput 
          title="Перекриття холодної води" 
          placeholder="У туалеті за бачком..." 
          name="waterCold" value={form.waterCold} onChange={handleChange} 
        />
        <ExpandableInput 
          title="Перекриття гарячої води" 
          placeholder="Там же, червоний кран..." 
          name="waterHot" value={form.waterHot} onChange={handleChange} 
        />
      </TextCardYellow>

      <TextCardYellow area="leftBottom">
        <InfoTitle>Адреси важливих пунктів</InfoTitle>
        <InfoText>Найближча клініка</InfoText>
        <SimpleInput name="clinic" value={form.clinic} onChange={handleChange} label="(адреса)" />
        <InfoText>Найближча аптека</InfoText>
        <SimpleInput name="pharmacy" value={form.pharmacy} onChange={handleChange} label="(адреса)" />
        <InfoText>Найближче відділення банку</InfoText>
        <SimpleInput name="bank" value={form.bank} onChange={handleChange} label="(адреса)" />
        <InfoText>Районна адміністрація / ЦНАП</InfoText>
        <SimpleInput name="admin" value={form.admin} onChange={handleChange} label="(адреса)" />
      </TextCardYellow>

      <TextCard area="rightBottom">
        <InfoTitle>Важливі речі</InfoTitle>
        <InfoText>Впиши розташування предметів, упевнись, що все на місці</InfoText>
        <GreyFrame>
          <ExpandableInput title="🔑 Запасні ключі" placeholder="Місце зберігання..." name="keys" value={form.keys} onChange={handleChange} />
          <ExpandableInput title="📑 Документи" placeholder="Паспорт, договір..." name="docs" value={form.docs} onChange={handleChange} />
          <ExpandableInput title="💊 Аптечка" placeholder="Ліки, спирт, бинти..." name="meds" value={form.meds} onChange={handleChange} />
        </GreyFrame>
      </TextCard>

      <ActionsColumn area="buttons">
        <ActionButton $primary onClick={handleSave}>
          <InfoTitle>Зберегти форму </InfoTitle> <InfoIcon><FaSave /></InfoIcon>
        </ActionButton>
        <ActionButton onClick={handleLoad}>
          <InfoTitle>Переглянути існуючу </InfoTitle> <InfoIcon><HiDocumentDuplicate /></InfoIcon>
        </ActionButton>
      </ActionsColumn>

      <TextCardBlue area="bottom">
        <InfoTitle>Цифрова безпека</InfoTitle>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{flex: 1}}>
              <InfoText>🌐 Номер Інтернет договору</InfoText>
              <SimpleInput name="inet" value={form.inet} onChange={handleChange} />
            </div>
            <div style={{flex: 1}}>
              <InfoText>🛜 Тел. провайдера</InfoText>
              <SimpleInput name="provider" value={form.provider} onChange={handleChange} />
            </div>
            <div style={{flex: 1}}>
              <InfoText>📟 Код під'їзду</InfoText>
              <SimpleInput name="code" value={form.code} onChange={handleChange} />
            </div>
        </div>
      </TextCardBlue>
    </CardsGridEmergency>
  );
}