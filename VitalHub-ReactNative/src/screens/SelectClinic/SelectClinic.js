import React, { useEffect, useState } from "react";

//import dos componentes
import { Container } from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { Links } from "../../components/Links/style";
import { ClinicCard } from "../../components/ClinicCard/ClinicCard";
import api from "../../service/service";
import { ListComponent } from "../../components/List/List";
import { StatusBar } from "expo-status-bar";
import { DefaultText } from "../../components/DefaultText/DefaultText";

export const SelectClinic = ({ navigation, route, clinica, isSelected }) => {
    const [selectedClinicId, setSelectedClinicId] = useState(null);
    const [clinicaLista, setclinicaLista] = useState([]);

    const [textWarning, setTextWarning] = useState('')

    const handleSelectClinic = (clinicId) => {
        setSelectedClinicId(clinicId);
    };

    const listarClinicas = async () => {
        const response = await api
            .get(
                `/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.location}`
            )
            .then((response) => {
                setclinicaLista(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function handleContinue() {
        // Verifica se um clínica foi selecionada
        if (!selectedClinicId) {
            setTextWarning("Por favor, selecione uma clínica."); // Exibe uma mensagem de alerta
            return; // Interrompe a execução da função se nenhum clínica estiver selecionado
        }

        navigation.replace("SelectDoctor", {
            agendamento: {
                ...route.params.agendamento,
                clinicaId: selectedClinicId,
            },
        });
    }

    useEffect(() => {
        listarClinicas();
    }, []);

    return (
        <Container>
            <StatusBar />
            <Title style={{ paddingBottom: 50, paddingTop: 100 }}>
                Selecionar Clínica
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
                data={clinicaLista}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ClinicCard
                        clinic={item}
                        isSelected={item.id === selectedClinicId}
                        onPressClinic={() => handleSelectClinic(item.id)}
                        navigation={navigation}
                    />
                )}
            />

            <CustomButton
                style={{ marginTop: 50 }}
                onPress={() => handleContinue()}
            >
                <TitleButton>Continuar</TitleButton>
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
