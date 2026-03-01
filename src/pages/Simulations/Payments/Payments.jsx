import React, { useEffect, useState } from "react";
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
  StatusBadge,
  TimerText,
  TabsRow,
  LevelSection,
  ProgressBarWrapper,
  ProgressFillBar
} from "./Payments.styled";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

import { useAuth } from "../../../context/AuthContext";
import { paymentsApi, dashboardApi, templatesApi } from "../../../api/payments";

const REFUND_WINDOW = 30;

const round2 = (num) => Math.round(num * 100) / 100;

const SERVICE_COLORS = {
  electricity: "#FFE066",
  water: "#4DA6FF",
  gas: "#42ff68",
  internet: "#9B5DE5"
};

const TARIFFS = {
  electricity: 4.32,
  water: 30.5,
  gas: 7.96
};

const METER_SERVICES = ["electricity", "water", "gas"];

const mapStatus = (status) => {
  if (status === 0) return "processing";
  if (status === 1) return "approved";
  if (status === 2) return "refunded";
  if (status === 3) return "redirected";
  return "processing";
};

const Payments = ({ onBack }) => {
  const { token } = useAuth();

  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [templates, setTemplates] = useState([]);

  const [tab, setTab] = useState("pay");

  const [service, setService] = useState("electricity");
  const [payType, setPayType] = useState("account");
  const [identifier, setIdentifier] = useState("");
  const [amount, setAmount] = useState("");

  const [templateName, setTemplateName] = useState("");

  const [address, setAddress] = useState({
    region: "",
    district: "",
    street: "",
    house: ""
  });

  const [prevMeter, setPrevMeter] = useState("");
  const [currentMeter, setCurrentMeter] = useState("");
  const [generatedAmount, setGeneratedAmount] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [redirectId, setRedirectId] = useState(null);
  const [newIdentifier, setNewIdentifier] = useState("");

  const [userLevel, setUserLevel] = useState("Без досвіду");
  const [approvedCount, setApprovedCount] = useState(0);

  const hasMeter = METER_SERVICES.includes(service);

  // INIT FROM BACKEND 
  useEffect(() => {
    if (!token) return;

    async function load() {
      try {
            const historyData = await paymentsApi.getHistory(token);
            
            const paymentsArray = Array.isArray(historyData)
            ? historyData
            : historyData?.payments || [];

            const mapped = paymentsArray.map(p => {
          const secondsPassed = Math.floor(
            (Date.now() - new Date(p.createdAt)) / 1000
          );

          return {
            id: p.id,
            service: p.service,
            identifier: p.identifier,
            amount: p.amount,
            status: mapStatus(p.status),
            secondsLeft:
              p.status === 0
                ? Math.max(0, REFUND_WINDOW - secondsPassed)
                : 0
          };
        });

        setHistory(mapped);

        const templatesData = await templatesApi.get(token);
        setTemplates(templatesData);

        const dashboard = await dashboardApi.get(token);

        setBalance(dashboard.balance);
        setApprovedCount(dashboard.approvedCount);
        setUserLevel(dashboard.level);

      } catch (e) {
        setError(e.message);
      }
    }

    load();
  }, [token]);

  // GLOBAL TIMER 
  useEffect(() => {
    const interval = setInterval(() => {
      setHistory(prev => {
        let needsRefresh = false;

        const updatedHistory = prev.map(p => {
          if (p.status === "processing" && p.secondsLeft > 0) {
            return { ...p, secondsLeft: p.secondsLeft - 1 };
          }
          if (p.status === "processing" && p.secondsLeft === 0) {
            needsRefresh = true; 
            return { ...p, status: "approved" };
          }

          return p;
        });

        if (needsRefresh) {
          refreshDashboard();
        }

        return updatedHistory;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [token]); 

  async function refreshDashboard() {
    try {
      const dashboard = await dashboardApi.get(token);
      setBalance(dashboard.balance);
      setApprovedCount(dashboard.approvedCount);
      setUserLevel(dashboard.level);
    } catch (e) {
      console.error("Sync error", e);
    }
  }

  // METER CALC 
  useEffect(() => {
    if (!hasMeter) return;

    if (prevMeter && currentMeter && Number(currentMeter) >= Number(prevMeter)) {
      const diff = Number(currentMeter) - Number(prevMeter);
      const price = diff * TARIFFS[service];
      setGeneratedAmount(price.toFixed(2));
      setAmount(price.toFixed(2));
    }
  }, [prevMeter, currentMeter, service]);

  const nextLevelTarget =
    approvedCount < 1 ? 1 :
    approvedCount < 5 ? 5 :
    approvedCount < 10 ? 10 : 10;

  const progressPercent = Math.min(
    (approvedCount / nextLevelTarget) * 100,
    100
  );

  const dashboardData = Object.values(
    history
      .filter(p => p.status === "approved")
      .reduce((acc, p) => {
        if (!acc[p.service]) {
          acc[p.service] = { service: p.service, total: 0 };
        }
        acc[p.service].total = round2(
            acc[p.service].total + Number(p.amount)
        );

        return acc;
      }, {})
  );

  const isFormValid = () => {
    if (payType !== "address" && !identifier) return false;

    if (payType === "address") {
      const { region, district, street, house } = address;
      if (!region || !district || !street || !house) return false;
    }

    if (hasMeter) {
      if (!prevMeter || !currentMeter) return false;
    } else {
      if (!amount || Number(amount) <= 0) return false;
    }

    return true;
  };

  // PAY 
  const handlePay = async () => {
    setError("");
    setSuccess("");

    if (!isFormValid()) {
      setError("Заповніть всі поля");
      return;
    }

    try {
      const finalIdentifier =
        payType === "address"
          ? `${address.region}, ${address.district}, ${address.street}, буд. ${address.house}`
          : identifier;

      const payment = await paymentsApi.create(token, {
        service,
        identifier: finalIdentifier,
        amount: Number(amount)
      });

      setBalance(b => b - Number(amount));

      setHistory(prev => [
        {
          id: payment.id,
          service: payment.service,
          identifier: payment.identifier,
          amount: payment.amount,
          status: "processing",
          secondsLeft: REFUND_WINDOW
        },
        ...prev
      ]);

      setSuccess("Платіж відправлено в банк");

    } catch (e) {
      setError(e.message);
    }
  };

  // REFUND 
  const refundPayment = async (p) => {
    try {
      await paymentsApi.refund(token, p.id);

      setBalance(b => b + p.amount);

      setHistory(prev =>
        prev.map(x =>
          x.id === p.id
            ? { ...x, status: "refunded", secondsLeft: 0 }
            : x
        )
      );

      setSuccess("Кошти повернено");

    } catch (e) {
      setError(e.message);
    }
  };

  const redirectPayment = (p) => {
    if (!newIdentifier) {
      setError("Введіть нові реквізити");
      return;
    }

    setHistory(prev =>
      prev.map(x =>
        x.id === p.id
          ? { ...x, identifier: newIdentifier, status: "redirected" }
          : x
      )
    );

    setRedirectId(null);
    setNewIdentifier("");
    setSuccess("Платіж перенаправлено");
  };

  const statusText = (s) => {
    if (s === "processing") return "В обробці";
    if (s === "approved") return "Підтверджено";
    if (s === "refunded") return "Повернено";
    if (s === "redirected") return "Перенаправлено";
  };

  const saveTemplate = async () => {
    if (!templateName) {
      setError("Введіть назву шаблону");
      return;
    }

    try {
      const tpl = await templatesApi.create(token, {
        name: templateName,
        service,
        type: payType,
        value:
          payType === "address"
            ? JSON.stringify(address)
            : identifier
      });

      setTemplates(prev => [...prev, tpl]);
      setTemplateName("");
      setSuccess("Шаблон збережено");
    } catch (e) {
      setError(e.message);
    }
  };

  const applyTemplate = (tpl) => {
    setService(tpl.service);
    setPayType(tpl.type);

    if (tpl.type === "address") {
      setAddress(JSON.parse(tpl.value));
      setIdentifier("");
    } else {
      setIdentifier(tpl.value);
    }

    setTab("pay");
  };

  const deleteTemplate = async (id) => {
    try {
      await templatesApi.delete(token, id);
      setTemplates(prev => prev.filter(t => t.id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div style={{ padding: 30 }}>

      <BackButton onClick={onBack}>← Назад</BackButton>

      <h1>{balance.toFixed(2)} ₴</h1>
          <LevelSection>
            <p>🎮 Рівень: <b>{userLevel}</b></p>
            <p>Підтверджених платежів: {approvedCount}</p>

            <ProgressBarWrapper>
              <ProgressFillBar width={progressPercent} />
            </ProgressBarWrapper>
          </LevelSection>

          {error && <ErrorBox>{error}</ErrorBox>}
          {success && <SuccessBox>{success}</SuccessBox>}
          <TabsRow>
            <Button $tab $active={tab === "pay"} onClick={() => setTab("pay")}>
              Оплата
            </Button>

            <Button $tab $active={tab === "templates"} onClick={() => setTab("templates")}>
              Шаблони
            </Button>

            <Button $tab $active={tab === "history"} onClick={() => setTab("history")}>
              Історія
            </Button>

            <Button $tab $active={tab === "refunds"} onClick={() => setTab("refunds")}>
              Повернення
            </Button>

            <Button $tab $active={tab === "dashboard"} onClick={() => setTab("dashboard")}>
              Dashboard
            </Button>

          </TabsRow>

      {/* PAY */}
      {tab === "pay" && (
        <PayCard>
          <Select value={service} onChange={e => setService(e.target.value)}>
            <option value="electricity">Електроенергія</option>
            <option value="water">Вода</option>
            <option value="gas">Газ</option>
            <option value="internet">Інтернет</option>
          </Select>

          <Select value={payType} onChange={e => setPayType(e.target.value)}>
            <option value="account">Особовий рахунок</option>
            <option value="address">Адреса</option>
            <option value="edrpou">ЄДРПОУ</option>
          </Select>

          {payType !== "address" && (
            <Field
              placeholder={payType === "edrpou" ? "ЄДРПОУ" : "Особовий рахунок"}
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
            />
          )}

          {payType === "address" && (
            <>
              <Field placeholder="Область" value={address.region}
                onChange={e => setAddress(p => ({ ...p, region: e.target.value }))} />
              <Field placeholder="Район" value={address.district}
                onChange={e => setAddress(p => ({ ...p, district: e.target.value }))} />
              <Field placeholder="Вулиця" value={address.street}
                onChange={e => setAddress(p => ({ ...p, street: e.target.value }))} />
              <Field placeholder="Будинок" value={address.house}
                onChange={e => setAddress(p => ({ ...p, house: e.target.value }))} />
            </>
          )}

          {hasMeter && (
            <>
              <Field type="number" placeholder="Попередні" value={prevMeter}
                onChange={e => setPrevMeter(e.target.value)} />
              <Field type="number" placeholder="Поточні" value={currentMeter}
                onChange={e => setCurrentMeter(e.target.value)} />
              {generatedAmount && <p>Нараховано: <b>{generatedAmount} ₴</b></p>}
            </>
          )}

          {!hasMeter && (
            <Field type="number" placeholder="Сума ₴"
              value={amount} onChange={e => setAmount(e.target.value)} />
          )}

          <Field placeholder="Назва шаблону"
            value={templateName}
            onChange={e => setTemplateName(e.target.value)} />

          <Button onClick={saveTemplate}>Зберегти шаблон</Button>
          <Button onClick={handlePay}>Оплатити</Button>
        </PayCard>
      )}

      {/* TEMPLATES */}
      {tab === "templates" && (
        <PayCard>
          {templates.map(tpl => (
            <Template key={tpl.id} onClick={() => applyTemplate(tpl)}>
              <strong>{tpl.name}</strong>
              <div>{tpl.service}</div>
              <Button onClick={() => deleteTemplate(tpl.id)}>🗑</Button>
            </Template>
          ))}
        </PayCard>
      )}

      {/* HISTORY */}
      {tab === "history" && (
        <HistoryCard>
          {history.map(p => (
            <HistoryItem key={p.id}>
              <div>
                <b>{p.service}</b>
                <div>{p.identifier}</div>
                <StatusBadge $status={p.status}>
                  {statusText(p.status)}
                </StatusBadge>
              </div>

              <div>
                <b>-{p.amount.toFixed(2)} ₴</b>
                {p.status === "processing" && (
                  <TimerText>{p.secondsLeft} сек</TimerText>
                )}
              </div>
            </HistoryItem>
          ))}
        </HistoryCard>
      )}

      {/* REFUNDS */}
      {tab === "refunds" && (
        <HistoryCard>
          {history
            .map(p => (
              <HistoryItem key={p.id} $status={p.status}>
                <div>
                  <b
                    style={{
                      textDecoration:
                        p.status === "refunded"
                          ? "line-through"
                          : "none"
                    }}
                  >
                    {p.service}
                  </b>

                  <div
                    style={{
                      textDecoration:
                        p.status === "refunded"
                          ? "line-through"
                          : "none"
                    }}
                  >
                    {p.identifier}
                  </div>

                  <StatusBadge $status={p.status}>
                    {statusText(p.status)}
                  </StatusBadge>

                  {p.status === "processing" && (
                    <TimerText>
                      Залишилось: {p.secondsLeft} сек
                    </TimerText>
                  )}
                </div>

                <div>
                  {p.status === "processing" && (
                    <Button onClick={() => refundPayment(p)}>
                      ↩ Повернути
                    </Button>
                  )}

                  {p.status !== "refunded" && (
                    <Button onClick={() => setRedirectId(p.id)}>
                      🔁 Перенаправити
                    </Button>
                  )}
                  {redirectId === p.id && (
                    <>
                      <Field
                        placeholder="Нові реквізити"
                        value={newIdentifier}
                        onChange={e => setNewIdentifier(e.target.value)}
                      />
                      <Button onClick={() => redirectPayment(p)}>
                        OK
                      </Button>
                    </>
                  )}
                </div>
              </HistoryItem>
            ))}
        </HistoryCard>
      )}

      {tab === "dashboard" && (
        <PayCard>
          <h2>📊 Аналітика витрат</h2>

          {dashboardData.length === 0 && (
            <p>Немає підтверджених платежів</p>
          )}

          {dashboardData.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboardData}>
            <XAxis dataKey="service" />
            <YAxis />
            <Tooltip formatter={(value) => `${value.toFixed(2)} ₴`} />
            <Bar dataKey="total">
              {dashboardData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={SERVICE_COLORS[entry.service] || "#8884d8"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      </PayCard>
    )}

    </div>
  );
};

export default Payments;
