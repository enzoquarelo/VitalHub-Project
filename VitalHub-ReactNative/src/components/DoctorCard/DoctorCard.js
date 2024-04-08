import React from "react";
import { Title } from "../Title/style";
import {
    ContainerDoctorCard,
    ContainerTextCard,
    TextAboutDoctor,
    ImageDoctor
} from "./style";

export const DoctorCard = ({ doctor, imageDoctor }) => {
    return (
        <ContainerDoctorCard>
            <ContainerTextCard>
                <Title style={{marginTop: 8}} fontSize={20}>{doctor.idNavigation.nome}</Title>
                
                <TextAboutDoctor>{doctor.especialidade.especialidade1}</TextAboutDoctor>
            </ContainerTextCard>

            <ImageDoctor source={{ uri: imageDoctor}}/>

        </ContainerDoctorCard>
    );
};