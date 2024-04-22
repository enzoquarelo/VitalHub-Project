import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';

import { ModalContainer, ModalView, UserImage } from './style';

import { Title } from "../../Title/style"
import { DefaultText } from "../../DefaultText/DefaultText"
import { CustomButton, TitleButton } from "../../Button/styles"
import { Links } from "../../Links/style"

import { useNavigation } from '@react-navigation/native';

export const AppointmentLocalModal = ({ visible, onPressClose, userRole, doctorCRM, specialtyName, doctorName, clinicId }) => {

  const navigation = useNavigation();
  

  async function handleClose(screen) {
    onPressClose();
    navigation.replace(screen, { clinicId: clinicId });
  };


  if (userRole === "Medico") {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onPressClose}
      >
        <ModalContainer>
          <ModalView>

            <Title>Nome Usuário</Title>

            <DefaultText fontSize={16} widthText={"100%"}>idade  -  email do usuário</DefaultText>


            <CustomButton style={{ marginTop: 15 }} widthButton={100}>
              <TitleButton>Inserir Prontuário</TitleButton>
            </CustomButton>

            <Links colorLink={'#496BBA'} fontLink={'MontserratAlternates_600SemiBold'} fontSize={16} style={{ marginTop: 12 }} onPress={onPressClose}>Cancelar</Links>

          </ModalView>
        </ModalContainer>
      </Modal>
    );
  } else if (userRole === "Paciente") {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onPressClose}
      >

        <ModalContainer>
          <ModalView>

            <UserImage source={require('../../../../assets/images/doctorImage_temp.png')} />

            <Title>Dr(a) {doctorName}</Title>

            <DefaultText fontSize={16} widthText={"100%"} style={{ marginTop: 5 }}>
              CRM {doctorCRM} - {specialtyName}
            </DefaultText>

            <CustomButton style={{ marginTop: 30 }} onPress={() => handleClose("AppointmentLocation")} widthButton={100}>
              <TitleButton>VER LOCAL DA CONSULTA</TitleButton>
            </CustomButton>

            <Links colorLink={'#496BBA'} fontLink={'MontserratAlternates_600SemiBold'} fontSize={16} style={{ marginTop: 12 }} onPress={onPressClose}>Cancelar</Links>

          </ModalView>
        </ModalContainer>

      </Modal>
    );
  }
};

