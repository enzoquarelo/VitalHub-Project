import styled from "styled-components/native";

export const CardContainer = styled.TouchableOpacity`
    width: 90%;
    height: 100px;

    background-color: #FFFFFF;
    border-radius: 5px;
    elevation: 8;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    margin-top: 5%;
`

export const ImagePerson = styled.Image`
    width: 80px;
    height: 80%;

    border-radius: 5px;
`
export const AppointmentTime = styled.View`
    width: 80px;
    height:26px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    background-color: ${props => props.backgrounColor || '#E8FCFD'};
    border-radius: 5px;
`

export const TimeTxt = styled.Text`
    color: ${props => props.color || '#49B3BA'};

    font-family: "Quicksand_600SemiBold";
    font-size: 16px;
`

export const ButtonLinkCancel = styled.TouchableOpacity`
    width: 100%;
    height: 80%;
    padding: 3px;
`