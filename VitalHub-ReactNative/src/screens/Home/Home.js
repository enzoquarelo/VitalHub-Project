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

    //state para guardar a role
    const [userRole, setUserRole] = useState('');

    const [diaSelecionado, setDiaSelecionado] = useState(moment().format(""));
    const [consultas, setConsultas] = useState([]);
    const [idEncontrado, setIdEncontrado] = useState("");

    //função para pegar a role pelo token e guarda dentro do state
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
                setConsultas(response.data);
                console.log("consultas, exito:");
                console.log(response.data);
            }).catch(error => {
                console.log("consultas, erro:");
                console.log(error);
            });
    }



    useEffect(() => {
        loadUserRole();
    }, [])
    useEffect(() => {
        ListarConsulta();
    }, [diaSelecionado])

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

                                onCardPress={() => setShowPrescription(true)}
                            />
                        );
                    })}

                    <PrescriptionModal
                        visible={showModalPrescription}
                        setShowPrescription={setShowPrescription}

                        onPressClose={() => setShowPrescription(false)}
                        userRole={userRole} 
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
                        const doctorName = consulta.medicoClinica.medico.idNavigation.nome

                        return (
                            <Cards
                                key={index}
                                imageHeader={'imageHeader'}
                                profileName={`Dr(a) ${doctorName}`}
                                profileData={`CRM ${crmDoctor} `}
                                appointmentHour={moment(consulta.dataConsulta).format('HH:mm')}

                                onCardPress={() => setShowPrescription(true)}
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
                    />

                </Container>
            </>
        );
    }
}
