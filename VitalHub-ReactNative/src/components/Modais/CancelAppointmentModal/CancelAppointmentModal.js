import React from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import { ModalContainer, ModalView, ButtonContainer, CancelButton, ConfirmButton, TextStyle, ModalText, Overlay } from './style';

import { Title } from "../../Title/style"
import { DefaultText } from "../../DefaultText/DefaultText"
import { CustomButton, TitleButton } from "../../Button/styles"
import { Links } from "../../Links/style"

import { useNavigation } from '@react-navigation/native';
import * as Notifications from "expo-notifications";

import api from '../../../service/service';

export const CancelAppointmentModal = ({ visible, onClose, onConfirm, idConsulta  }) => {

  const navigation = useNavigation();

  async function sendNotification() {
    //personalizar a mensagem da notificação
    const message = {
        to: "ExpoPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
        sound: "default",
        data: {
            
        },
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

async function CancelAppointment() {
  try {
      // Atualiza o status da consulta
      await api.put(
          `/Consultas/Status?idConsulta=${idConsulta}&status=Cancelados`
      );

      // Notifica o usuário sobre o cancelamento da consulta
      await Notifications.scheduleNotificationAsync({
          content: {
              title: "Consulta Cancelada:",
              body: "Sua consulta foi cancelada com sucesso.",
              icon: "././assets/images/VitalHub_logo.png",
          },
          trigger: null, 
      });

      // Fecha a tela ou realiza outra ação necessária
      onClose();
      navigation.replace("Main");
  } catch (error) {
      console.error("Erro ao cancelar a consulta:", error);
  }
}

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <ModalContainer>
        <ModalView>
          <Title>Cancelar consulta</Title>
          <DefaultText fontSize={16} widthText={"100%"}>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</DefaultText>
          <CustomButton style={{ marginTop: 15 }} onPress={CancelAppointment}>
            <TitleButton>CONFIRMAR</TitleButton>
          </CustomButton>
          <Links colorLink={'#496BBA'} fontLink={'MontserratAlternates_600SemiBold'} fontSize={16} style={{ marginTop: 12 }} onPress={() => onClose()}>Voltar</Links>
        </ModalView>
      </ModalContainer>
    </Modal>
  );
};
