import React, { useEffect, useState } from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import { ModalContainer, ModalView } from './style';

import { Title } from "../../Title/style"
import { DefaultText } from "../../DefaultText/DefaultText"
import { CustomButton, TitleButton } from "../../Button/styles"
import { Links } from "../../Links/style"

import { userDecodedToken } from "../../../utils/auth"
import api from "../../../service/service"

import { useNavigation } from '@react-navigation/native';

export const PrescriptionModal = ({ visible, onPressClose, userRole }) => {

  const navigation = useNavigation();


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


            <CustomButton style={{ marginTop: 15 }}>
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

            <Title>Nome Usuário</Title>

            <DefaultText fontSize={16} widthText={"100%"}>clinica  -  crm do usuário</DefaultText>


            <CustomButton style={{ marginTop: 15 }} onPress={() => navigation.navigate("AppointmentLocation")}>
              <TitleButton>VER LOCAL DA CONSULTA</TitleButton>
            </CustomButton>

            <Links colorLink={'#496BBA'} fontLink={'MontserratAlternates_600SemiBold'} fontSize={16} style={{ marginTop: 12 }} onPress={onPressClose}>Cancelar</Links>

          </ModalView>
        </ModalContainer>
      </Modal>
    );
  }
};

