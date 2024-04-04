import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { DefaultText } from '../DefaultText/DefaultText';
import { Title } from '../Title/style';
import { Container } from '../Container/style';
import { Links } from '../Links/style';
import { CardContainer, ImagePerson, AppointmentTime, TimeTxt, ButtonLinkCancel } from './style';
import { CancelAppointmentModal } from '../Modais/CancelAppointmentModal/CancelAppointmentModal';

import { AntDesign } from '@expo/vector-icons';

export const Cards = ({ imageHeader, profileName, profileData, appointmentHour, onCardPress }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCancelPress = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
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
                        <AppointmentTime>
                            <AntDesign name="clockcircle" size={14} color="#49B3BA" style={{ paddingTop: 3 }} />
                            <TimeTxt>{appointmentHour}</TimeTxt>
                        </AppointmentTime>

                        <ButtonLinkCancel onPress={handleCancelPress}>
                            <Links colorLink={'#C81D25'} fontSize={16} underline={true}>Cancelar</Links>
                        </ButtonLinkCancel>

                    </Container>

                </Container>
            </CardContainer>
            <CancelAppointmentModal visible={isModalVisible} onClose={handleCloseModal} />
        </>
    );
}
