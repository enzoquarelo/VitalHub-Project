import React from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import { ModalContainer, ModalView } from './style';

import { Title } from "../../Title/style"
import { DefaultText } from "../../DefaultText/DefaultText"
import { CustomButton, TitleButton } from "../../Button/styles"
import { Links } from "../../Links/style"

export const PrescriptionModal = ({ visible, onPressClose, roleUsuario, consulta, navigation }) => {

async function handleClese(screen) {
  await setShowModalAppointment(false)

  if (screen == "Local Consulta") {
    navigation.replace(screen, {clinicaid: consulta.medicoClinica.clinicaId})
  } else {
    navigation.replace(screen)
  }
}

 return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onPressClose}

// consulta={consultaSelecionada}
// roleUsuario={profile.role}
    >
      <ModalContainer>
        <ModalView>

          <Title>Nome Usuário</Title>
          
          <DefaultText fontSize={16} widthText={"100%"}>idade  -  email do usuário</DefaultText>
          
          <CustomButton style={{marginTop: 15}}>
            <TitleButton>Inserir Prontuário</TitleButton>
          </CustomButton>

          <Links colorLink={'#496BBA'} fontLink={'MontserratAlternates_600SemiBold'} fontSize={16} style={{marginTop: 12}} onPress={onPressClose}>Cancelar</Links>

        </ModalView>
      </ModalContainer>
    </Modal>
 );
};

