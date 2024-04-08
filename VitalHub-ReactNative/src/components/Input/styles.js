import styled from "styled-components/native";

export const Input = styled.TextInput.attrs(props => ({
    placeholderTextColor: "#34898F"
}))`
    width: ${props => (props.widthInput ? props.widthInput : "90%")};
    height: ${props => (props.heightInput ? props.heightInput : "53px")};

    border: 2px #49B3BA solid;
    border-radius: 5px;
    padding: ${props => (props.paddingInput ? props.paddingInput : "16px")};

    color: #34898F;
    font-family: ${props => (props.fontInput ? props.fontInput : "MontserratAlternates_600SemiBold")};
    font-size: ${props => (props.fontSize ? props.fontSize + "px" : "18px")};
`;

export const InputDisable = styled(Input).attrs(props => ({
    placeholderTextColor: "#33303E",
}))`
    border: none;
    background-color: #F5F3F3;
    color: #33303E;

    font-family: ${props => (props.fontInput ? props.fontInput : "MontserratAlternates_500Medium")};
`;

export const TitleInput = styled.Text`
    width: 90%;
    color: "#000000";

    font-family: "Quicksand_600SemiBold";
    font-size: ${props => (props.fontSize ? props.fontSize + "px" : "20px")};

    display: flex;
    align-items: flex-start;
`
