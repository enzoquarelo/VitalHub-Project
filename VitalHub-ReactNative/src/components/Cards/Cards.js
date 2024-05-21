import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { DefaultText } from '../DefaultText/DefaultText';
import { Title } from '../Title/style';
import { Container } from '../Container/style';
import { Links } from '../Links/style';
import { CardContainer, ImagePerson, AppointmentTime, TimeTxt, ButtonLinkCancel } from './style';
import { CancelAppointmentModal } from '../Modais/CancelAppointmentModal/CancelAppointmentModal';

import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";

export const Cards = ({ imageHeader, profileName, profileData, appointmentHour, onCardPress, buttonSelected, appointmentId, idConsulta, profileEmail }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const navigation = useNavigation();

    const handleCancelPress = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    let buttonText, colorTxt, clockColor, timeColor, boxColor;
    if (buttonSelected === 'Realizadas') {
        buttonText = 'Ver Prontuário';
        colorTxt = '#344F8F'

        clockColor = '#4E4B59'
        timeColor = '#4E4B59'
        boxColor = '#F1F0F5'
    }
    else if (buttonSelected === 'Canceladas') {
        buttonText = null;

        clockColor = '#4E4B59'
        timeColor = '#4E4B59'
        boxColor = '#F1F0F5'
    }
    else {
        buttonText = 'Cancelar'
        colorTxt = '#C81D25'

        clockColor = '#49B3BA' 
    }

    const handleButtonPress = (screen) => {
        if (buttonText === 'Cancelar') {
            handleCancelPress();
        } else if (buttonText === 'Ver Prontuário') {
            navigation.navigate('ViewPrescription', { appointmentId: appointmentId });
        }
    };

    return (
        <>
            <CardContainer onPress={onCardPress}>
                <ImagePerson source={{ uri: imageHeader }} />
                <Container widthContainer={'65%'} heightContainer={80}>

                    <Container
                        heightContainer={43}
                        alignItems={'start'}
                    >
                        <Title fontSize={16}>{profileName}</Title>
                        <DefaultText textAlign={'start'}>{profileData}</DefaultText>
                    </Container>

                    <Container heightContainer={30} flexDirection={'row'} justifyContent={'space-between'} style={{ marginTop: 8 }}>
                        <AppointmentTime backgrounColor={boxColor}>
                            <AntDesign name="clockcircle" size={14} color={clockColor} style={{ paddingTop: 3 }} />
                            <TimeTxt color={timeColor}>{appointmentHour}</TimeTxt>
                        </AppointmentTime>

                        {buttonText && (
                            <ButtonLinkCancel onPress={handleButtonPress}>
                                <Links colorLink={colorTxt} fontSize={16} underline={true}>{buttonText}</Links>
                            </ButtonLinkCancel>
                        )}

                    </Container>

                </Container>
            </CardContainer>

            <CancelAppointmentModal visible={isModalVisible} onClose={handleCloseModal} idConsulta={idConsulta}/>
        </>
    );
}
