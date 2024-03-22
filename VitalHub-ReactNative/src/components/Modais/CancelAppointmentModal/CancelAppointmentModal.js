import React from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import { ModalContainer, ModalView, ButtonContainer, CancelButton, ConfirmButton, TextStyle, ModalText, Overlay } from './style';

import { Title } from "../../Title/style"
import { DefaultText } from "../../DefaultText/DefaultText"
import { CustomButton, TitleButton } from "../../Button/styles"
import { Links } from "../../Links/style"

export const CancelAppointmentModal = ({ visible, onClose }) => {
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
          
          <CustomButton style={{marginTop: 15}}>
            <TitleButton>CONFIRMAR</TitleButton>
          </CustomButton>

          <Links colorLink={'#496BBA'} fontLink={'MontserratAlternates_600SemiBold'} fontSize={16} style={{marginTop: 12}} onPress={() => onClose()}>Voltar</Links>

        </ModalView>
      </ModalContainer>
    </Modal>
 );
};

