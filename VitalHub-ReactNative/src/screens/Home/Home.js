import React, { useState, useEffect } from "react";
import { Container } from "../../components/Container/style";
import { Header } from "../../components/Header/Header";
import { StatusBar } from "expo-status-bar";
import CalendarHome from "../../components/CalendarHome/CalendarHome";
import { SelectableButton, SelectableTitleButton } from "../../components/Button/styles";
import { Cards } from "../../components/Cards/Cards";
import { ScheduleAppointment } from "../../components/ScheduleAppointment/ScheduleAppointment";

import { QueryModalComponent } from "../../components/Modais/QueryModal/QueryModal";

import { userDecodeToken } from "../../utils/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from "moment";

import api from '../../service/service'

export const Home = ({ navigation,  appointments}) => {
    const [selectedAgendadas, setSelectedAgendadas] = useState(true);
    const [selectedRealizadas, setSelectedRealizadas] = useState(false);
    const [selectedCanceladas, setSelectedCanceladas] = useState(false);
    
    const [dataConsulta, setDataConsulta] = useState('');
    const [consultas, setConsultas] = useState([]);
    

    const [showModalQuery, setShowModalQuery] = useState(false);

    //state para guardar a role
    const [userRole, setUserRole] = useState('');

    //função para pegar a role pelo token e guarda dentro do state
    async function loadUserRole() {
        const token = await userDecodeToken();
        const userRoleToken = token.role;
        setUserRole(userRoleToken);
    }


     // Função para listar as consultas com base na data selecionada
     async function ListarConsultas() {
        try {
            // Chamada para a API para obter as consultas com base na data
            const response = await api.get(`/consultas?data=${dataConsulta}`);
            // Atualiza o estado das consultas com os dados obtidos da API
            setConsultas(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // Efeito para chamar ListarConsultas sempre que a data selecionada mudar
    useEffect(() => {
        if (dataConsulta !== '') {
            ListarConsultas();
        }
    }, [dataConsulta]);

  
    // async function ListarConsultas() {
    //     const url = (profile.role == 'Medico' ? 'Medicos' : 'Pacientes')
    //     await api.get(`/${url}/BuscarPorData?data=${dataConsulta}gid=${profile.user}`)
    //     .then(response => {
    //         setConsultas(response.data)
    //     }).catch (error => {

    //     })
    // }

    // useEffect(() => {
    //     if (dataConsulta != '') {
    //         ListarConsultas();
    //     }
        
    // }, [dataConsulta]);

    useEffect(() => {
        loadUserRole();
    }, []);



    const handleButtonClick = (buttonName) => {
        setSelectedAgendadas(false);
        setSelectedRealizadas(false);
        setSelectedCanceladas(false);

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


    //dependendo da role do usuário ele tera uma home diferente
    if (userRole === 'Medico') {
        return (
            <>
                <Container justifyContent={'start'}>
                    <StatusBar style="light" />
                    <Header imageHeader="https://avatars.githubusercontent.com/u/29419052?v=4" profileName="Dr. Eduardo" />

                    <CalendarHome onDateSelected={setdataConsulta} />
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

                    <Cards />
                </Container>
            </>
        );
    } else if (userRole === 'Paciente') {
        return (
            <>
                <Container justifyContent={'start'}>
                    <StatusBar style="light" />
                    <Header imageHeader="https://avatars.githubusercontent.com/u/29419052?v=4" profileName="Dr. Eduardo" />

                    <CalendarHome setDataConsulta={setDataConsulta} />
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

                    <Cards dataConsulta={dataConsulta} appointments={appointments} />

                    <ScheduleAppointment
                        onPress={() => {
                            setShowModalQuery(true);
                        }}
                    />

                    <QueryModalComponent
                        visible={showModalQuery}
                        setShowModalQuery={setShowModalQuery}
                    />

                </Container>
            </>
        );
    }
}
