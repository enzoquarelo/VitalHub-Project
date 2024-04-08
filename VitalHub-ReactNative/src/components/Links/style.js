import styled from "styled-components";

export const Links = styled.Text`
    width: ${props => (props.widthLink ? props.widthLink + "%" : "88%")};
    height: 2dvb;
    text-align: center;

    font-size: ${props => (props.fontSize ? props.fontSize + "px" : "16px")};
    font-family: ${props => (props.fontLink ? props.fontLink : "MontserratAlternates_500Medium")};

    color: ${props => (props.colorLink ? props.colorLink : "#8C8A97")};

    text-decoration: ${props => (props.underline ? "none" : "underline")};
`;
