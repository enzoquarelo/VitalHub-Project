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




export const ClinicCard = ({ nameClinic, locate, assessment, workingDays }) => {
    return (
        <ContainerClinicCard>
            <ContainerRowCard>
                <Title style={{marginTop: 8}} fontSize={20}>{nameClinic}</Title>
                <ContainerAssessment>
                    <AntDesign name="star" size={20} color="#F9A620" />
                    <AssessmentText>{assessment}</AssessmentText>
                </ContainerAssessment>
            </ContainerRowCard>

            <ContainerRowCard>
                <TextLocate style={{marginBottom: 8}}>{locate}</TextLocate>
                <ContainerDateClinic>
                    <MaterialCommunityIcons name="calendar" size={20} color="#49B3BA" />
                    <TextDateClinic>{workingDays}</TextDateClinic>
                </ContainerDateClinic>
            </ContainerRowCard>
        </ContainerClinicCard>
    );
};