import React, { useState, useEffect } from "react";
import { Container } from "../../components/Container/style";
import { Header } from "../../components/Header/Header";
import { StatusBar } from "expo-status-bar";
import CalendarHome from "../../components/CalendarHome/CalendarHome";
import { SelectableButton, SelectableTitleButton } from "../../components/Button/styles";
import { Cards } from "../../components/Cards/Cards";
import { ScheduleAppointment } from "../../components/ScheduleAppointment/ScheduleAppointment";

import { QueryModalComponent } from "../../components/Modais/QueryModal/QueryModal";
import { PrescriptionModal } from "../../components/Modais/PrescriptionModal/PrescriptionModal";

import { userDecodeToken } from "../../utils/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment"
import api from "../../service/service"

export const Home = ({ navigation }) => {
    const [selectedAgendadas, setSelectedAgendadas] = useState(true);
    const [selectedRealizadas, setSelectedRealizadas] = useState(false);
    const [selectedCanceladas, setSelectedCanceladas] = useState(false);

    const [showModalQuery, setShowModalQuery] = useState(false);
    const [showModalPrescription, setShowPrescription] = useState(false);

    const [userRole, setUserRole] = useState('');

    const [diaSelecionado, setDiaSelecionado] = useState(moment().format(""));
    const [consultas, setConsultas] = useState([]);
    const [consultaSelecionada, setConsultaSelecionada] = useState(null); // Adicionado para armazenar a consulta selecionada

    async function loadUserRole() {
        const token = await userDecodeToken();
        const userRoleToken = token.role;
        setUserRole(userRoleToken);
    }

    async function ListarConsulta() {
        const token = await userDecodeToken();
        const userRoleToken = token.role;
        const userId = token.jti;
    
        const url = (userRoleToken === "Medico" ? "Medicos" : "Pacientes");
    
        await api.get(`/${url}/BuscarPorData?data=${diaSelecionado}&id=${userId}`)
            .then(response => {
                let filteredConsultas = response.data;
    
                if (selectedAgendadas) {
                    filteredConsultas = response.data.filter(consulta => consulta.situacao.situacao === "Pendentes");
                } else if (selectedRealizadas) {
                    filteredConsultas = response.data.filter(consulta => consulta.situacao.situacao === "Realizadas");
                } else if (selectedCanceladas) {
                    filteredConsultas = response.data.filter(consulta => consulta.situacao.situacao === "Canceladas");
                }
    
                setConsultas(filteredConsultas);
            }).catch(error => {
                console.log(error);
            });
    }
    


    useEffect(() => {
        loadUserRole();
    }, [])
    useEffect(() => {
        ListarConsulta();
    }, [diaSelecionado, selectedAgendadas, selectedRealizadas, selectedCanceladas])

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

    const handleCardPress = (consulta) => {
        setConsultaSelecionada(consulta); // Atualiza a consulta selecionada
        setShowPrescription(true); // Mostra o modal de prescrição
    };

    if (userRole === 'Medico') {
        return (
            <>
                <Container justifyContent={'start'}>
                    <StatusBar style="light" />
                    <Header imageHeader="https://avatars.githubusercontent.com/u/29419052?v=4" profileName="Dr. Eduardo" />

                    <CalendarHome setDiaSelecionado={setDiaSelecionado} />
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

                    {consultas.map((consulta, index) => {
                        const idadePaciente = moment().diff(consulta.paciente.dataNascimento, 'years');
                        const situacaoConsulta = consulta.situacao.situacao;

                        return (
                            <Cards
                                key={index}
                                imageHeader={consulta.medicoClinica.medico.idNavigation.foto}
                                profileName={consulta.paciente.idNavigation.nome}
                                profileData={`${idadePaciente} anos . ${situacaoConsulta}`}
                                appointmentHour={moment(consulta.dataConsulta).format('HH:mm')}
                                onCardPress={() => handleCardPress(consulta)}
                            />
                        );
                    })}

                    <PrescriptionModal
                        visible={showModalPrescription}
                        setShowPrescription={setShowPrescription}
                        onPressClose={() => setShowPrescription(false)}
                        userRole={userRole}
                        consulta={consultaSelecionada} // Passa a consulta selecionada para o modal
                    />
                </Container>
            </>
        );
    } else if (userRole === 'Paciente') {
        return (
            <>
                <Container justifyContent={'start'}>
                    <StatusBar style="light" />
                    <Header imageHeader="https://avatars.githubusercontent.com/u/29419052?v=4" profileName="Dr. Eduardo" />

                    <CalendarHome setDiaSelecionado={setDiaSelecionado} />

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

                    {consultas.map((consulta, index) => {
                        const crmDoctor = consulta.medicoClinica.medico.crm;
                        const doctorName = consulta.medicoClinica.medico.idNavigation.nome;

                        return (
                            <Cards
                                key={index}
                                imageHeader={'imageHeader'} // Substitua 'imageHeader' pela imagem real do médico, se disponível
                                profileName={`Dr(a) ${doctorName}`}
                                profileData={`CRM ${crmDoctor} `}
                                appointmentHour={moment(consulta.dataConsulta).format('HH:mm')}
                                onCardPress={() => handleCardPress(consulta)}
                            />
                        );
                    })}

                    <ScheduleAppointment
                        onPress={() => {
                            setShowModalQuery(true);
                        }}
                    />

                    <QueryModalComponent
                        visible={showModalQuery}
                        setShowModalQuery={setShowModalQuery}
                    />

                    <PrescriptionModal
                        visible={showModalPrescription}
                        setShowPrescription={setShowPrescription}
                        onPressClose={() => setShowPrescription(false)}
                        userRole={userRole}
                        doctorCRM={consultaSelecionada?.medicoClinica?.medico?.crm}
                        specialtyName={consultaSelecionada?.medicoClinica?.medico?.especialidade?.especialidade1}
                        doctorName={consultaSelecionada?.medicoClinica?.medico?.idNavigation?.nome}
                        consulta={consultaSelecionada}
                        clinicId={consultaSelecionada?.medicoClinica?.clinicaId}
                    />

                </Container>
            </>
        );
    }
}
