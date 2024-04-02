import React, { useState } from 'react';
import { DefaultText } from '../DefaultText/DefaultText';
import { Title } from '../Title/style';
import { Container } from '../Container/style';
import { Links } from '../Links/style';
import { CardContainer, ImagePerson, AppointmentTime, TimeTxt, ButtonLinkCancel } from './style';
import { CancelAppointmentModal } from '../Modais/CancelAppointmentModal/CancelAppointmentModal';

import { AntDesign } from '@expo/vector-icons';

export const Cards = ({ imageHeader, profileName, appointments  }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCancelPress = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    // Verificando se appointments é válido antes de iterá-lo
    if (!appointments) {
        return null; // ou qualquer outra lógica para lidar com appointments sendo undefined
    }

    return (
        <>

{appointments.map(appointment => (
                <CardContainer key={appointment.id}>
                    {/* Adicione a foto do médico se disponível */}
                    <ImagePerson source={require('../../../assets/images/doctorImage_temp.png')} />
                    <Container widthContainer={'65%'} heightContainer={80}>
                        <Container heightContainer={43} alignItems={'start'}>
                            {/* Nome do médico */}
                            <Title fontSize={16}>{appointment.idNavigation.nome}</Title>
                            {/* Especialidade do médico */}
                            <DefaultText textAlign={'start'}>{appointment.especialidade.especialidade1}</DefaultText>
                        </Container>
                        <Container heightContainer={30} flexDirection={'row'} justifyContent={'space-between'} style={{ marginTop: 8 }}>
                            <AppointmentTime>
                                {/* Ícone de relógio */}
                                <AntDesign name="clockcircle" size={14} color="#49B3BA" style={{ paddingTop: 3 }} />
                                {/* Horário da consulta */}
                                <TimeTxt>Horário da Consulta</TimeTxt>
                            </AppointmentTime>
                            {/* Botão para cancelar a consulta */}
                            <ButtonLinkCancel onPress={handleCancelPress}>
                                <Links colorLink={'#C81D25'} fontSize={16} underline={true}>Cancelar</Links>
                            </ButtonLinkCancel>
                        </Container>
                    </Container>
                </CardContainer>
            ))}
            {/* Modal para confirmar o cancelamento da consulta */}
            <CancelAppointmentModal visible={isModalVisible} onClose={handleCloseModal} />



            {/* <CardContainer>
                <ImagePerson source={require('../../../assets/images/doctorImage_temp.png')} />
                <Container widthContainer={'65%'} heightContainer={80}>

                    <Container
                        heightContainer={43}
                        alignItems={'start'}
                    >
                        <Title fontSize={16}>{doctorName}</Title>
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
            <CancelAppointmentModal visible={isModalVisible} onClose={handleCloseModal} /> */}
        </>
    );
}
