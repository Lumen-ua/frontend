import React, { useState } from "react"
import Payments from "./Payments/Payments"

import {
    Page,
    Header,
    HeaderIcon,
    HeaderText,
    PageTitle,
    PageSub,
    CenterHalf,
    PayCard,
    ButtonIcon
} from "./Simulations.styled"

const Simulations = () => {
    const [openPayments, setOpenPayments] = useState(false)

    if (openPayments) {
        return <Payments onBack={() => setOpenPayments(false)} />
    }

    return (
        <Page>
            <Header>
                <HeaderIcon>📊</HeaderIcon>
                <HeaderText>
                    <PageTitle>Симуляція Lumen</PageTitle>
                    <PageSub>Навчальна система для безпечної оплати</PageSub>
                </HeaderText>
            </Header>

            <CenterHalf>
                <PayCard onClick={() => setOpenPayments(true)}>
                    <ButtonIcon>💳</ButtonIcon>
                    Оплата комунальних послуг
                </PayCard>
            </CenterHalf>
        </Page>
    )
}

export default Simulations
