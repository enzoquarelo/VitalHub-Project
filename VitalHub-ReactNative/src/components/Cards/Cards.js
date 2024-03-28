import React, { useState } from 'react';
import { DefaultText } from '../DefaultText/DefaultText';
import { Title } from '../Title/style';
import { Container } from '../Container/style';
import { Links } from '../Links/style';
import { CardContainer, ImagePerson, AppointmentTime, TimeTxt, ButtonLinkCancel } from './style';
import { CancelAppointmentModal } from '../Modais/CancelAppointmentModal/CancelAppointmentModal';

import { AntDesign } from '@expo/vector-icons';

export const Cards = ({ imageHeader, profileName }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCancelPress = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <CardContainer>
                <ImagePerson source={require('../../../assets/images/doctorImage_temp.png')} />
                <Container widthContainer={'65%'} heightContainer={80}>

                    <Container
                        heightContainer={43}
                        alignItems={'start'}
                    >
                        <Title fontSize={16}>Nome Doutor(a)</Title>
                        <DefaultText textAlign={'start'}>20 anos . Urgência</DefaultText>
                    </Container>

                    <Container heightContainer={30} flexDirection={'row'} justifyContent={'space-between'} style={{ marginTop: 8 }}>
                        <AppointmentTime>
                            <AntDesign name="clockcircle" size={14} color="#49B3BA" style={{ paddingTop: 3 }} />
                            <TimeTxt>15:00</TimeTxt>
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
