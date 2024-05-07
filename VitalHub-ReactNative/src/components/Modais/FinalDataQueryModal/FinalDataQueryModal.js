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
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../../service/service";
import { format } from 'date-fns';

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

    const handleConfirm = () => {
        // Fechar o modal
        setShowModalQuery(false);
        // Navegar para a tela Main
        navigation.navigate("Main");
    };

    console.log(agendamento)

    const formatDateToAmerican = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'MM/dd/yyyy');
      };
      
      async function Post() {
          try {
              const token = await userDecodeToken();
              const userId = token.jti;
      
              // Formatando a data da consulta para o formato americano
              const formattedDate = formatDateToAmerican(agendamento.dataConsulta);

      
              const response = await api.post('/Consultas/Cadastrar', {
                  situacaoId: '57ACD4ED-24F3-415F-AB42-42F0AF7506FC',
                  pacienteId: userId,
                  medicoClinicaId: agendamento.doctorId,
                  prioridadeId: agendamento.prioridadeId,
                  dataConsulta: formattedDate // Usando a data formatada
              });
      
              console.log(`cadastrou: ${response.status}`);
      
              navigation.replace("Main");
          } catch (error) {
              console.log(error);
          }
      }


    useEffect(() => {
        console.log(agendamento)
    }, [visible])

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
                            <TextDataQuery>{agendamento.dataConsulta}</TextDataQuery>
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
                                {agendamento.localizacao}
                            </TextDataQuery>
                        </ContainerDataQueryText>

                        <ContainerDataQueryText>
                            <SubTitleData>Tipo da consulta</SubTitleData>
                            <TextDataQuery>{agendamento.prioridadeLabel}</TextDataQuery>
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
