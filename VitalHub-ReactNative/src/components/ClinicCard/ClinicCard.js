import React from "react";
import { Title } from "../Title/style";
import {
    ContainerClinicCard,
    ContainerAssessment,
    AssessmentText,
    TextLocate,
    ContainerDateClinic,
    TextDateClinic,
    ContainerRowCard
} from "./style";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from "react-native";


export const ClinicCard = ({ clinic, isSelected, onPressClinic, navigation }) => {
    const handlePress = () => {
        onPressClinic(clinic.id);
    };

    return (
        <ContainerClinicCard onPress={handlePress} style={{ borderWidth: isSelected ? 2 : 0, borderColor: isSelected ? '#49B3BA' : 'transparent' }}>
            <ContainerRowCard>
                <Title style={{ marginTop: 8, padding: 6, marginLeft: 4 }} fontSize={20}>{clinic.nomeFantasia}</Title>
                <ContainerAssessment>
                    <AntDesign name="star" size={20} color="#F9A620" />
                    <AssessmentText>5.0</AssessmentText>
                </ContainerAssessment>
            </ContainerRowCard>

            <ContainerRowCard>
                <TextLocate style={{ marginBottom: 8 }}>{clinic.endereco.cidade}</TextLocate>
                <ContainerDateClinic>
                    <MaterialCommunityIcons name="calendar" size={20} color="#49B3BA" />
                    <TextDateClinic>Seg-Sex</TextDateClinic>
                </ContainerDateClinic>
            </ContainerRowCard>
        </ContainerClinicCard>
    );
};