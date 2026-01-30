import React, { useState, useEffect } from "react"
import {
    PayCard,
    Field,
    Select,
    Button,
    HistoryItem,
    Template,
    BackButton,
    HistoryCard,
    ErrorBox,
    SuccessBox,
} from "./Payments.styled"

const TARIFFS = {
    electricity: 4.32,
    water: 30.5,
    gas: 7.96,
}

const METER_SERVICES = ["electricity", "water", "gas"]

const Payments = ({ onBack }) => {
    const [balance, setBalance] = useState(5000)
    const [tab, setTab] = useState("pay")

    const [service, setService] = useState("electricity")
    const [payType, setPayType] = useState("account")
    const [identifier, setIdentifier] = useState("")
    const [amount, setAmount] = useState("")
    const [history, setHistory] = useState([])

    const [address, setAddress] = useState({
        region: "",
        district: "",
        street: "",
        house: "",
    })

    const [prevMeter, setPrevMeter] = useState("")
    const [currentMeter, setCurrentMeter] = useState("")
    const [generatedAmount, setGeneratedAmount] = useState(0)

    const [templates, setTemplates] = useState([])
    const [templateName, setTemplateName] = useState("")

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const hasMeter = METER_SERVICES.includes(service)

    useEffect(() => {
        if (!hasMeter) return

        if (prevMeter !== "" && currentMeter !== "" && currentMeter >= prevMeter) {
            const consumption = currentMeter - prevMeter
            const price = consumption * TARIFFS[service]
            setGeneratedAmount(price.toFixed(2))
            setAmount(price.toFixed(2))
        }
    }, [prevMeter, currentMeter, service, hasMeter])

    const isFormValid = () => {
        if (payType === "account" || payType === "edrpou") {
            if (!identifier) return false
        }

        if (payType === "address") {
            if (!address.region || !address.district || !address.street || !address.house)
                return false
        }

        if (hasMeter) {
            if (prevMeter === "" || currentMeter === "") return false
            if (currentMeter < prevMeter) return false
        } else {
            if (!amount || amount <= 0) return false
        }

        return true
    }

    const handlePay = () => {
        setError("")
        setSuccess("")

        if (!isFormValid()) {
            setError("Заповніть всі обовʼязкові поля")
            return
        }

        if (Number(amount) > balance) {
            setError("Недостатньо коштів на рахунку")
            return
        }

        const finalIdentifier =
            payType === "address"
                ? `${address.region}, ${address.district}, ${address.street}, буд. ${address.house}`
                : identifier

        setBalance(prev => prev - Number(amount))
        setHistory([
            {
                service,
                identifier: finalIdentifier,
                amount,
                date: new Date().toLocaleString(),
            },
            ...history,
        ])

        setIdentifier("")
        setAddress({ region: "", district: "", street: "", house: "" })
        setPrevMeter("")
        setCurrentMeter("")
        setAmount("")

        setSuccess("Оплата успішна 🎉")
        setTimeout(() => setSuccess(""), 3000)
    }

    const saveTemplate = () => {
        if (!templateName) {
            setError("Введіть назву шаблону")
            return
        }

        setTemplates(prev => [
            ...prev,
            { name: templateName, service, payType, identifier, address },
        ])

        setTemplateName("")
        setSuccess("Шаблон збережено 💾")
        setTimeout(() => setSuccess(""), 2500)
    }

    const applyTemplate = tpl => {
        setService(tpl.service)
        setPayType(tpl.payType)
        setIdentifier(tpl.identifier)
        setAddress(tpl.address)
        setTab("pay")
    }

    return (
        <div style={{ padding: 32 }}>
            <BackButton onClick={onBack}>← Назад до симуляцій</BackButton>

            <h1 style={{ fontSize: 32, fontWeight: 800 }}>{balance} ₴</h1>

            {success && <SuccessBox>{success}</SuccessBox>}

            <PayCard style={{ display: "flex", gap: 8 }}>
                <Button onClick={() => setTab("pay")}>Оплата</Button>
                <Button onClick={() => setTab("templates")}>Шаблони</Button>
            </PayCard>

            {tab === "pay" && (
                <PayCard>
                    {error && <ErrorBox>{error}</ErrorBox>}

                    <Select value={service} onChange={e => setService(e.target.value)}>
                        <option value="electricity">Електроенергія</option>
                        <option value="water">Вода</option>
                        <option value="gas">Газ</option>
                        <option value="internet">Інтернет</option>
                        <option value="heating">Опалення</option>
                    </Select>

                    <Select value={payType} onChange={e => setPayType(e.target.value)}>
                        <option value="account">За особовим рахунком</option>
                        <option value="address">За адресою</option>
                        <option value="edrpou">За ЄДРПОУ</option>
                    </Select>

                    {payType !== "address" && (
                        <Field
                            $invalid={!identifier}
                            placeholder={payType === "account" ? "Особовий рахунок" : "ЄДРПОУ"}
                            value={identifier}
                            onChange={e => setIdentifier(e.target.value)}
                        />
                    )}

                    {payType === "address" && (
                        <>
                            <Field $invalid={!address.region} placeholder="Область" value={address.region} onChange={e => setAddress(p => ({ ...p, region: e.target.value }))} />
                            <Field $invalid={!address.district} placeholder="Район" value={address.district} onChange={e => setAddress(p => ({ ...p, district: e.target.value }))} />
                            <Field $invalid={!address.street} placeholder="Вулиця" value={address.street} onChange={e => setAddress(p => ({ ...p, street: e.target.value }))} />
                            <Field $invalid={!address.house} placeholder="Будинок" value={address.house} onChange={e => setAddress(p => ({ ...p, house: e.target.value }))} />
                        </>
                    )}

                    {hasMeter && (
                        <>
                            <Field $invalid={prevMeter === ""} type="number" placeholder="Попередні показники" value={prevMeter} onChange={e => setPrevMeter(Number(e.target.value))} />
                            <Field $invalid={currentMeter === "" || currentMeter < prevMeter} type="number" placeholder="Поточні показники" value={currentMeter} onChange={e => setCurrentMeter(Number(e.target.value))} />
                            {generatedAmount > 0 && <p>Нараховано: <strong>{generatedAmount} ₴</strong></p>}
                        </>
                    )}

                    {!hasMeter && (
                        <Field
                            $invalid={!amount || amount <= 0}
                            type="number"
                            placeholder="Сума, ₴"
                            value={amount}
                            onChange={e => setAmount(Number(e.target.value))}
                        />
                    )}

                    <Field
                        placeholder="Назва шаблону"
                        value={templateName}
                        onChange={e => setTemplateName(e.target.value)}
                    />

                    <Button onClick={saveTemplate}>Зберегти шаблон</Button>

                    <Button onClick={handlePay} disabled={!isFormValid()}>
                        Оплатити
                    </Button>
                </PayCard>
            )}

            {tab === "templates" && (
                <PayCard>
                    {templates.length === 0 && <p>Шаблонів ще немає</p>}
                    {templates.map((tpl, i) => (
                        <Template key={i} onClick={() => applyTemplate(tpl)}>
                            <strong>{tpl.name}</strong>
                            <div style={{ fontSize: 12 }}>{tpl.service}</div>
                        </Template>
                    ))}
                </PayCard>
            )}

            <HistoryCard>
                <h4>Історія платежів</h4>
                {history.length === 0 && <p>Платежів ще немає</p>}
                {history.map((p, i) => (
                    <HistoryItem key={i}>
                        <div>
                            <strong>{p.service}</strong>
                            <div style={{ fontSize: 12 }}>{p.identifier}</div>
                        </div>
                        <div>
                            <strong>-{p.amount} ₴</strong>
                            <div style={{ fontSize: 12 }}>{p.date}</div>
                        </div>
                    </HistoryItem>
                ))}
            </HistoryCard>
        </div>
    )
}

export default Payments
