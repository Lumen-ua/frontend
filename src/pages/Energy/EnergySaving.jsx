import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiZap, 
  FiThermometer, 
  FiDroplet, 
  FiHome, 
  FiCpu, 
  FiArrowRight 
} from "react-icons/fi";

import {
  Page,
  Container,
  HeroSection,
  HeroTextContent,
  HeroTitle,
  HeroDescription,
  Grid,
  Card,
  CardIconWrapper,
  CardTitle,
  CardText,
  ArrowLink
} from "./EnergySavingPage.styled";

export default function EnergySaving() {
  const navigate = useNavigate();

  const topics = [
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

  const handleCardClick = (path) => {
    console.log(`Maps to: ${path}`);
  };

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
        </HeroSection>

        <Grid>
          {topics.map((topic) => (
            <Card key={topic.id} onClick={() => handleCardClick(topic.path)}>
              <CardIconWrapper className="icon-wrapper">
                {topic.icon}
              </CardIconWrapper>
              
              <CardTitle>{topic.title}</CardTitle>
              <CardText>{topic.text}</CardText>
              
              <ArrowLink>
                Читати далі <FiArrowRight />
              </ArrowLink>
            </Card>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}