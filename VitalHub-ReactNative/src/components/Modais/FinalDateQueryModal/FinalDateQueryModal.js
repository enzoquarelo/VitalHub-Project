import { React, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Modal } from "react-native";
import { Title } from "../../Title/style";
import {
    QueryDaraModal,
    ModalContent,
    SubTitleData,
    TextDataQuery,
    ContainerDataQueryText,
} from "./Style";
import { DefaultText } from "../../DefaultText/DefaultText";
import { CustomButton, TitleButton } from "../../Button/styles";
import { Links } from "../../Links/style";
import { Container } from "../../Container/style";

export const FinalDataQueryModal = ({
    visible,
    setShowModalQuery,
    agendamento,
    clinica,
    doctor,
    date,
    ...rest
}) => {

    console.log('Clinica:', clinica); 
    console.log('Doctor:', doctor); 
    console.log('Date:', date); 


    const navigation = useNavigation();

    const handleConfirm = () => {
        // Fechar o modal
        setShowModalQuery(false);
        // Navegar para a tela Main
        navigation.navigate("Main");
    };

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
                            <TextDataQuery>{date}</TextDataQuery>
                        </ContainerDataQueryText>

                        <ContainerDataQueryText>
                            <SubTitleData>Médico(a) da consulta</SubTitleData>
                            {doctor && (
                                <TextDataQuery>
                                    {doctor.idNavigation.nome}
                                </TextDataQuery>
                            )}

                            <TextDataQuery>
                                Demartologa, Esteticista
                            </TextDataQuery>
                        </ContainerDataQueryText>

                        <ContainerDataQueryText style={{ marginTop: 10 }}>
                            <SubTitleData>Local da consulta</SubTitleData>

                            {clinica && (
                                <TextDataQuery>
                                    {clinica.endereco.logradouro}
                                </TextDataQuery>
                            )}
                        </ContainerDataQueryText>

                        <ContainerDataQueryText>
                            <SubTitleData>Tipo da consulta</SubTitleData>
                            <TextDataQuery>Rotina</TextDataQuery>
                        </ContainerDataQueryText>
                    </Container>

                    <CustomButton onPress={handleConfirm}>
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
