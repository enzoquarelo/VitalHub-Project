import { React, useState } from "react";

import { Container } from "../../components/Container/style"
import { Header } from "../../components/Header/Header"
import { StatusBar } from "expo-status-bar";
import CalendarHome from "../../components/CalendarHome/CalendarHome";
import { SelectableButton, SelectableTitleButton } from "../../components/Button/styles";
import { Cards } from "../../components/Cards/Cards";


export const Home = ({ navigation }) => {
    const [selectedAgendadas, setSelectedAgendadas] = useState(true);
    const [selectedRealizadas, setSelectedRealizadas] = useState(false);
    const [selectedCanceladas, setSelectedCanceladas] = useState(false);

    const handleButtonClick = (buttonName) => {
        setSelectedAgendadas(false);
        setSelectedRealizadas(false);
        setSelectedCanceladas(false);

        // Definir o estado do botão clicado para true
        switch (buttonName) {
            case 'Agendadas':
                setSelectedAgendadas(true);
                break;
            case 'Realizadas':
                setSelectedRealizadas(true);
                break;
            case 'Canceladas':
                setSelectedCanceladas(true);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Container justifyContent={'start'}>
                <StatusBar style="light" />
                <Header imageHeader="https://avatars.githubusercontent.com/u/29419052?v=4" profileName="Dr. Eduardo" />

                <CalendarHome />
                <Container widthContainer={"90%"} heightContainer={"40px"} flexDirection={"row"} justifyContent={"space-around"}>
                    <SelectableButton
                        widthButton={28}
                        heightButton={40}
                        selected={selectedAgendadas}
                        onPress={() => handleButtonClick('Agendadas')}
                    >
                        <SelectableTitleButton
                            fontSize={14}
                            selected={selectedAgendadas}
                        >
                            Agendadas
                        </SelectableTitleButton>
                    </SelectableButton>

                    <SelectableButton
                        widthButton={28}
                        heightButton={40}
                        selected={selectedRealizadas}
                        onPress={() => handleButtonClick('Realizadas')}
                    >
                        <SelectableTitleButton
                            fontSize={14}
                            selected={selectedRealizadas}
                        >
                            Realizadas
                        </SelectableTitleButton>
                    </SelectableButton>

                    <SelectableButton
                        widthButton={28}
                        heightButton={40}
                        selected={selectedCanceladas}
                        onPress={() => handleButtonClick('Canceladas')}
                    >
                        <SelectableTitleButton
                            fontSize={14}
                            selected={selectedCanceladas}
                        >
                            Canceladas
                        </SelectableTitleButton>
                    </SelectableButton>
                </Container>

                <Cards/>
            </Container></>
    );
}