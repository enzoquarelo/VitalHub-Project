import React from "react";
import { Title } from "../Title/style";
import {
    ContainerDoctorCard,
    ContainerTextCard,
    TextAboutDoctor,
    ImageDoctor
} from "./style";

export const DoctorCard = ({ nameDoctor, aboutDoctor, imageDoctor }) => {
    return (
        <ContainerDoctorCard>
            <ContainerTextCard>
                <Title style={{marginTop: 8}} fontSize={20}>{nameDoctor}</Title>
                <TextAboutDoctor>{aboutDoctor}</TextAboutDoctor>
            </ContainerTextCard>

            <ImageDoctor source={{ uri: imageDoctor}}/>

        </ContainerDoctorCard>
    );
};