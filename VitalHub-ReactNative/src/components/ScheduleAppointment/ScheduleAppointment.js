import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { ScheduleAppointmentContainer } from './style';

export const ScheduleAppointment = ({ onPress }) => {
    return (
        <ScheduleAppointmentContainer onPress={onPress}>
            <FontAwesome6 name="stethoscope" size={28} color="white" />
        </ScheduleAppointmentContainer>
    );
};