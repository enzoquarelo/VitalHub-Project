import { React, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Modal } from 'react-native';
import { Title } from '../../Title/style';
import { QueryDaraModal, ModalContent, SubTitleData, TextDataQuery, ContainerDataQueryText } from './style';
import { DefaultText } from '../../DefaultText/DefaultText';
import { CustomButton, TitleButton } from '../../Button/styles';
import { Links } from '../../Links/style';
import { Container } from '../../Container/style';

export const FinalDataQueryModal = ({ visible, setShowModalQuery, ...rest }) => {
    const navigation = useNavigation();

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <QueryDaraModal>
                <ModalContent>
                    <Title style={{ marginBottom: 30 }}>Agendar consulta</Title>

                    <DefaultText fontSize={20}>
                        Consulte os dados selecionados para a sua consulta
                    </DefaultText>


                    <Container heightContainer={"50%"} justifyContent={"space-around"} style={{marginTop: 20, marginBottom: 60}}>
                        <ContainerDataQueryText>
                            <SubTitleData>Data da Consulta</SubTitleData>
                            <TextDataQuery>1 de Novembro de 2023</TextDataQuery>
                        </ContainerDataQueryText>

                        <ContainerDataQueryText>
                            <SubTitleData>Médico(a) da consulta</SubTitleData>
                            <TextDataQuery>Dra Alessandra</TextDataQuery>
                            <TextDataQuery>Demartologa, Esteticista</TextDataQuery>
                        </ContainerDataQueryText>

                        <ContainerDataQueryText style={{marginTop: 10}}>
                            <SubTitleData>Local da consulta</SubTitleData>
                            <TextDataQuery>São Paulo, SP</TextDataQuery>
                        </ContainerDataQueryText>

                        <ContainerDataQueryText>
                            <SubTitleData>Tipo da consulta</SubTitleData>
                            <TextDataQuery>Rotina</TextDataQuery>
                        </ContainerDataQueryText>
                    </Container>


                    <CustomButton>
                        <TitleButton>CONFIRMAR</TitleButton>
                    </CustomButton>

                    <Links style={{marginTop: 15}} colorLink={"#344F8F"} fontSize={18}>Cancelar</Links>
                </ModalContent>
            </QueryDaraModal>
        </Modal>
    );
};