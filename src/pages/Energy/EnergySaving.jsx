
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiZap,
  FiThermometer,
  FiDroplet,
  FiHome,
  FiCpu,
  FiArrowRight,
} from "react-icons/fi";

import {
  Page,
  Container,
  HeroSection,
  HeroTextContent,
  HeroTitle,
  HeroDescription,
  Grid,
  CardLink,
  CardIconWrapper,
  CardTitle,
  CardText,
  ArrowLink,
  EnergyProgressBadge,
} from "./EnergySavingPage.styled";

import { energyContentApi } from "../../api/energyContent";

const LS_ENERGY_PROGRESS_KEY = "lumen.progress.energy";

const TOPICS = [
  {
      id: "lighting",
      title: "Освітлення",
      text: "Як обрати LED лампи, зонування світла та датчики руху.",
      icon: <FiZap />,
      path: "/energy/lighting"
    },
    {
      id: "heating",
      title: "Збереження тепла",
      text: "Утеплення вікон, терморегулятори та правильне провітрювання.",
      icon: <FiThermometer />,
      path: "/energy/heating"
    },
    {
      id: "appliances",
      title: "Побутова техніка",
      text: "Що таке класи енергоефективності (A+++) та еко-режими.",
      icon: <FiCpu />,
      path: "/energy/appliances"
    },
    {
      id: "water",
      title: "Вода та бойлер",
      text: "Як економити на підігріві води та обрати аератори.",
      icon: <FiDroplet />,
      path: "/energy/water"
    },
    {
      id: "smart-home",
      title: "Розумний дім",
      text: "Розумні розетки та автоматичне вимкнення приладів.",
      icon: <FiHome />,
      path: "/energy/smart-home"
    },
  ];

function safeParseJson(str, fallback) {
  try {
    const v = JSON.parse(str);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function readEnergyProgressFromLS() {
  const raw = localStorage.getItem(LS_ENERGY_PROGRESS_KEY);
  return safeParseJson(raw, { topics: {} });
}

function calculateEnergyPercent() {
  const data = readEnergyProgressFromLS();
  const topics = data?.topics || {};

  const total = TOPICS.length;
  const completed = TOPICS.reduce(
    (acc, t) => acc + (topics?.[t.id]?.visited ? 1 : 0),
    0
  );

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { percent, completed, total };
}

export default function EnergySaving() {
  const topicsUi = useMemo(
    () => [
      {
        id: "lighting",
        title: "Освітлення",
        text: "Як обрати LED лампи, зонування світла та датчики руху.",
        icon: <FiZap />,
        path: "/energy/lighting",
      },
      {
        id: "heating",
        title: "Збереження тепла",
        text: "Утеплення вікон, терморегулятори та правильне провітрювання.",
        icon: <FiThermometer />,
        path: "/energy/heating",
      },
      {
        id: "appliances",
        title: "Побутова техніка",
        text: "Що таке класи енергоефективності (A+++) та еко-режими.",
        icon: <FiCpu />,
        path: "/energy/appliances",
      },
      {
        id: "water",
        title: "Вода та бойлер",
        text: "Як економити на підігріві води та обрати аератори.",
        icon: <FiDroplet />,
        path: "/energy/water",
      },
      {
        id: "smart-home",
        title: "Розумний дім",
        text: "Розумні розетки та автоматичне вимкнення приладів.",
        icon: <FiHome />,
        path: "/energy/smart-home",
      },
    ],
    []
  );

  const [{ percent }, setProgress] = useState(() => calculateEnergyPercent());

  useEffect(() => {
    const token = localStorage.getItem("lumen_token");
    if (!token) return;

    (async () => {
      try {
        await energyContentApi.get(token);
      } catch (e) {
        console.warn("[Energy] get() failed:", e);
      }
    })();
  }, []);

  useEffect(() => {
    const sync = () => setProgress(calculateEnergyPercent());

    const onCustom = () => sync();
    const onStorage = (e) => {
      if (e.key === LS_ENERGY_PROGRESS_KEY) sync();
    };

    window.addEventListener("lumen:progress-updated", onCustom);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("lumen:progress-updated", onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <Page>
      <Container>
        <HeroSection>
          <HeroTextContent>
            <HeroTitle>
              Енерго<span>ефективність</span>
            </HeroTitle>
            <HeroDescription>
              Зменшуй суми в платіжках, не втрачаючи комфорту. 
              Тут зібрані прості поради, які реально працюють.
            </HeroDescription>
          </HeroTextContent>
          <EnergyProgressBadge>Прогрес {percent}%</EnergyProgressBadge>
        </HeroSection>

        <Grid>
          {topicsUi.map((topic) => (
            <CardLink key={topic.id} as={Link} to={topic.path}>
            <CardIconWrapper className="icon-wrapper">
                {topic.icon}
              </CardIconWrapper>
              
              <CardTitle>{topic.title}</CardTitle>
              <CardText>{topic.text}</CardText>
              
              <ArrowLink>
                Читати далі <FiArrowRight />
              </ArrowLink>
            </CardLink>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}