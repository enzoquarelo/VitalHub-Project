import styled from "styled-components/native";

export const CustomButton = styled.TouchableOpacity`
    width: ${props => (props.widthButton ? props.widthButton + "%" : "88%")};
    height: ${props => (props.heightButton ? props.heightButton + "px" : "55px")};

    ${props => props.showBorder !== false && `
    border-width: 2px;
    border-color: #496BBA;
    `}
    border-radius: 5px;
    background-color: ${(props) => props.backgroundBtn ? props.backgroundBtn : "#496BBA"};

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export const ButtonDisable = styled(CustomButton)`
    border: none;
    background-color: #ACABB7;
`

export const TitleButton = styled.Text`
    color: ${(props) => props.colorTxt ? props.colorTxt : "#FFFFFF"};

    font-family: "MontserratAlternates_700Bold";
    font-size: ${props => (props.fontSize ? props.fontSize + "px" : "18px")};
`;

export const SelectableButton = styled(CustomButton)`
    background-color: #FFFFFF;

    ${(props) => props.selected && `
        background-color: #496BBA; 
        border: 2px solid #496BBA; 
    `}
`;

export const SelectableTitleButton = styled(TitleButton)`
    color: #496BBA;
    ${(props) => props.selected && `
        color: white;
    `}
`;

export const SelectableButtonAppointment = styled(CustomButton)`
    border-radius: 5px;
    border: 2px solid #60BFC5;

    ${(props) => props.selected && `
        background-color: #60BFC5; 
        border: 2px solid #60BFC5; 
    `}

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SelectableTitleButtonAppointment = styled(TitleButton)`
    color: #34898F;
    ${(props) => props.selected && `
        color: #FFFFFF;
    `}
`;