import React from "react";
import { Title } from "../Title/style";
import {
    ContainerDoctorCard,
    ContainerTextCard,
    TextAboutDoctor,
    ImageDoctor
} from "./style";

export const DoctorCard = ({ doctor, imageDoctor, isSelected, onPressDoctor }) => {
    const handlePress = () => {
        console.log(doctor.id);
        onPressDoctor(doctor.id);
    };
    return (
        <ContainerDoctorCard onPress={handlePress} style={{ borderWidth: isSelected ? 2 : 0, borderColor: isSelected ? '#49B3BA' : 'transparent' }}>
            <ContainerTextCard>
                <Title style={{marginTop: 8}} fontSize={20}>{doctor.idNavigation.nome}</Title>
                
                <TextAboutDoctor>{doctor.especialidade.especialidade1}</TextAboutDoctor>
            </ContainerTextCard>

            <ImageDoctor source={{ uri: imageDoctor}}/>

        </ContainerDoctorCard>
    );
};