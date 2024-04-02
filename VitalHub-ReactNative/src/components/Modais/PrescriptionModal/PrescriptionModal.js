import React from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import { ModalContainer, ModalView } from './style';

import { Title } from "../../Title/style"
import { DefaultText } from "../../DefaultText/DefaultText"
import { CustomButton, TitleButton } from "../../Button/styles"
import { Links } from "../../Links/style"

export const PrescriptionModal = ({ visible, onClose }) => {
 return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <ModalContainer>
        <ModalView>

          <Title>Nome Usuário</Title>
          
          <DefaultText fontSize={16} widthText={"100%"}>idade  -  email do usuário</DefaultText>
          
          <CustomButton style={{marginTop: 15}}>
            <TitleButton>Inserir Prontuário</TitleButton>
          </CustomButton>

          <Links colorLink={'#496BBA'} fontLink={'MontserratAlternates_600SemiBold'} fontSize={16} style={{marginTop: 12}} onPress={() => onClose()}>Cancelar</Links>

        </ModalView>
      </ModalContainer>
    </Modal>
 );
};

