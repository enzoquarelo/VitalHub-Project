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

export const SelectDoctor = ({ navigation, route, doctor, clinica }) => {
    const [selectedDoctorId, setselectedDoctorId] = useState(null);
    const [DoctorList, setDoctorList] = useState([]);

    const handleSelectDoctor = (doctorId) => {
        setselectedDoctorId(doctorId);
    };

    const listarDoctor = async () => {
        try {
            const response = await api
                .get(
                    `/Medicos/BuscarPorIdClinica?id=${route.params.selectedClinicId}`
                )
                .then((response) => {
                    setDoctorList(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    function handleContinue() {
        navigation.replace("SelectDate", {
            selectedDoctorId,
            ...route.params.agendamento,
            ...clinica,
            ...doctor,
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

            <ListComponent
                contentContainerStyle={{ alignItems: "center" }}
                data={DoctorList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DoctorCard
                        doctor={item}
                        isSelected={item.id === selectedDoctorId}
                        onPressDoctor={() => handleSelectDoctor(item.id)}
                        navigation={navigation}
                        onPress={() => {
                            setDoctorList({
                                medicoClinicaId: medico.id,
                                medicoLabel: medico.idNavigation.nome,
                            });
                        }}
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
                style={{ marginTop: 12,  marginBottom: 60  }}
                onPress={() => navigation.navigate("SelectClinic")}
            >
                Cancelar
            </Links>
        </Container>
    );
};
