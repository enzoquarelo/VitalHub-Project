import styled from "styled-components";

export const DefaultText = styled.Text`
    font-family:${props => (props.fontFamily ? props.fontFamily : "Quicksand_500Medium")};
    font-size: ${props => (props.fontSize ? props.fontSize + "px" : "14px")};
    color: ${(props) => props.colorText ? props.colorText : "#5F5C6B"};
    text-align: ${(props) => props.textAlign ? props.textAlign : "center"};

    width: ${props => (props.widthText ? props.widthText : null)};

`