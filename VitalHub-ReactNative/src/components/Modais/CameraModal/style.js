import styled from 'styled-components/native';

export const CloseButton = styled.TouchableOpacity`
 background-color: #2196F3;
 border-radius: 20px;
 padding: 10px;
 elevation: 2;
`;

export const ContainerButtonsCamera = styled.View`
    width: 100%;
    height: 10%;

    background-color: rgba(14, 11, 11, 0.6);

    position: absolute;
    bottom: 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around
`

export const BtnCapture = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    padding: 10px;
    border-radius: 50px;

    background-color: white;
    border: 5px solid white;

    margin-left: 35%;

    align-items: 'center';
    justify-content: 'center';
`

export const BtnFlip = styled.TouchableOpacity`
    width: 60px;
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const ConatinerImage = styled.View`
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
`

export const Photo = styled.Image`
    width: 90%;
    height: 80%;

    border-radius: 5px;

    margin-top: 5%;
`