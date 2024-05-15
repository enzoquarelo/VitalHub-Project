import { React, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Modal } from "react-native";
import { Title } from "../../Title/style";
import {
    QueryDaraModal,
    ModalContent,
    SubTitleData,
    TextDataQuery,
    ContainerDataQueryText,
} from "./style";
import { DefaultText } from "../../DefaultText/DefaultText";
import { CustomButton, TitleButton } from "../../Button/styles";
import { Links } from "../../Links/style";
import { Container } from "../../Container/style";

import { userDecodeToken } from "../../../utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../service/service";
import * as Notifications from "expo-notifications";

export const FinalDataQueryModal = ({
    visible,
    setShowModalQuery,
    agendamento,
    clinica,
    doctor,
    date,
    ...rest
}) => {
    const navigation = useNavigation();

    async function sendNotification() {
        //personalizar a mensagem da notificação
        const message = {
            to: "ExpoPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
            sound: "default",
            data: {},
        };

        // Agende a notificação aqui, dentro da função sendNotification
        await Notifications.scheduleNotificationAsync({
            content: message,
            trigger: null,
        });
    }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    const handleConfirm = () => {
        // Fechar o modal
        setShowModalQuery(false);
        // Navegar para a tela Main
        navigation.navigate("Main");
    };

    console.log(agendamento);

    async function Post() {
        try {
            const token = await userDecodeToken();
            const userId = token.jti;

             // Agende a notificação aqui, dentro da função Post
             await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Consunta:",
                    body: " Sua Consulta foi Agendada com Sucesso",
                    icon: '././assets/images/VitalHub_logo.png',
                },
                trigger: null, 
            });

            const response = await api.post("/Consultas/Cadastrar", {
                situacaoId: "57ACD4ED-24F3-415F-AB42-42F0AF7506FC",
                pacienteId: userId,
                medicoClinicaId: agendamento.idMedicoClinica,
                prioridadeId: agendamento.idPriority,
                dataConsulta: agendamento.dataConsulta,
            });

            console.log(`cadastrou: ${response.status}`);

            navigation.replace("Main");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(agendamento);
    }, [visible]);

    return (
        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <QueryDaraModal>
                <ModalContent>
                    <Title style={{ marginBottom: 30 }}>Agendar consulta</Title>

                    <DefaultText fontSize={20}>
                        Consulte os dados selecionados para a sua consulta
                    </DefaultText>

                    <Container
                        heightContainer={"50%"}
                        justifyContent={"space-around"}
                        style={{ marginTop: 20, marginBottom: 60 }}
                    >
                        <ContainerDataQueryText>
                            <SubTitleData>Data da Consulta</SubTitleData>
                            <TextDataQuery>
                                {agendamento.dataConsulta}
                            </TextDataQuery>
                        </ContainerDataQueryText>

                        <ContainerDataQueryText>
                            <SubTitleData>Médico(a) da consulta</SubTitleData>
                            <TextDataQuery>
                                {agendamento.doctorName}
                            </TextDataQuery>
                        </ContainerDataQueryText>

                        <ContainerDataQueryText style={{ marginTop: 10 }}>
                            <SubTitleData>Local da consulta</SubTitleData>

                            <TextDataQuery>
                                {agendamento.location}
                            </TextDataQuery>
                        </ContainerDataQueryText>

                        <ContainerDataQueryText>
                            <SubTitleData>Tipo da consulta</SubTitleData>
                            <TextDataQuery>
                                {agendamento.priorityLabel}
                            </TextDataQuery>
                        </ContainerDataQueryText>
                    </Container>

                    <CustomButton onPress={Post}>
                        <TitleButton>CONFIRMAR</TitleButton>
                    </CustomButton>

                    <Links
                        style={{ marginTop: 15 }}
                        colorLink={"#344F8F"}
                        fontSize={18}
                        onPress={() => navigation.navigate("SelectDate")}
                    >
                        Cancelar
                    </Links>
                </ModalContent>
            </QueryDaraModal>
        </Modal>
    );
};
