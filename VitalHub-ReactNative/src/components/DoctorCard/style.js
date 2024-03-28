import styled from "styled-components/native";

export const ContainerDoctorCard = styled.TouchableOpacity`
    width: 90%;
    height: 105px;

    border-radius: 5px;

    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    background-color: white;
    elevation: 3;

    margin-bottom: 15px;
`
export const ContainerTextCard = styled.View`
    width: 75%;
    height: 60px;
    display: flex;
    align-items: start;
    justify-content: space-around;

    padding-left: 12px;
`

export const TextAboutDoctor = styled.Text`
    font-family: "Quicksand_500Medium";
    font-size: 16px;

    color: #8C8A97;
`

export const ImageDoctor = styled.Image`
    width: 77px;
    height: 80px;

    border-radius: 5px;
    margin-left: 25px;
`