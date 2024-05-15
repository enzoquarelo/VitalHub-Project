import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import { Container } from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { DoctorCard } from "../../components/DoctorCard/DoctorCard";
import { Links } from "../../components/Links/style";
import api from "../../service/service";
import { ListComponent } from "../../components/List/List";
import { DefaultText } from "../../components/DefaultText/DefaultText";

export const SelectDoctor = ({ navigation, route }) => {
    const [selectedDoctorId, setselectedDoctorId] = useState(null);
    const [DoctorList, setDoctorList] = useState([]);
    const [selectedDoctorName, setSelectedDoctorName] = useState([]);
    const [agendamento, setAgendamento] = useState([]);
    const [textWarning, setTextWarning] = useState('')

    const handleSelectDoctor = (doctorId, doctorName) => {
        setselectedDoctorId(doctorId);
        setSelectedDoctorName(doctorName);
        setAgendamento(prevState => ({
            ...prevState,
            idMedicoClinica: doctorId,
            doctorName: doctorName,
        }));
    };

    const listarDoctor = async () => {
        try {
            const response = await api
                .get(
                    `/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`
                )
                .then((response) => {
                    setDoctorList(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    function handleContinue() {
        if (!selectedDoctorId) {
            setTextWarning("Por favor, selecione um médico."); // Exibe uma mensagem de alerta
            return; // Interrompe a execução da função se nenhum clínica estiver selecionado
        }

        navigation.replace("SelectDate", {
            agendamento: {
                ...route.params.agendamento,
                idMedicoClinica: selectedDoctorId,
                doctorName: selectedDoctorName,

            },
        });
    }

    useEffect(() => {
        listarDoctor();
    }, []);

    return (
        <Container>
            <StatusBar />

            <Title style={{ marginBottom: 45, paddingTop: 100 }} fontSize={24}>
                Selecionar Médico
            </Title>

            <DefaultText
                fontSize={18}
                colorText={"#C81D25"}
                widthText={"90%"}
            >
                {textWarning}
            </DefaultText>

            <ListComponent
                contentContainerStyle={{ alignItems: "center" }}
                data={DoctorList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DoctorCard
                        doctor={item}
                        isSelected={item.id === selectedDoctorId}
                        onPressDoctor={() => handleSelectDoctor(item.id, item.idNavigation.nome)}
                        navigation={navigation}
                    />
                )}
            />

            <CustomButton
                style={{ marginTop: 60 }}
                onPress={() => handleContinue()}
            >
                <TitleButton colorTxt={false} onPress={() => handleContinue()}>
                    CONTINUAR
                </TitleButton>
            </CustomButton>

            <Links
                colorLink={"#344F8F"}
                fontSize={18}
                style={{ marginTop: 12, marginBottom: 60 }}
                onPress={() => navigation.replace("Main")}
            >
                Cancelar
            </Links>
        </Container>
    );
};
