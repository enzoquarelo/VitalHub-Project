import styled from "styled-components/native";

export const ContainerClinicCard = styled.TouchableOpacity`
    width: 100%;
    height: 90px;

    border-radius:5px;
    background-color: white;

    display: flex;
    align-items: center;
    justify-content: space-around;

    elevation: 10;

    margin-bottom:25px;
`

export const ContainerRowCard = styled.View`
   width: 86%;
   display: flex;
    flex-direction: row;
    align-items:center;
    justify-content: space-between;
`

export const ContainerAssessment = styled.View`
    width: 48px;
    height: 20px;

    display:flex;
    flex-direction: row;
    align-items:center;
    justify-content: space-around;

    margin-right: 10px;
`

export const AssessmentText = styled.Text`
    font-family: "Quicksand_600SemiBold";
    font-size: 16px;

    color: #F9A620;
`

export const TextLocate = styled(AssessmentText)`
    color: #4E4B59;
    margin-left: 10px;
`

export const ContainerDateClinic = styled.View`
    width: 100px;
    height: 26px;

    border-radius: 5px;
    background-color: #E8FCFD;

    display:flex;
    flex-direction: row;
    align-items:center;
    justify-content: space-evenly;
    margin-right: 5px;
    margin-bottom: 5px;
`

export const TextDateClinic = styled(AssessmentText)`
    color: #49B3BA;
`