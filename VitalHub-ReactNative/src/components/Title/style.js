import styled from "styled-components";

export const Title = styled.Text`
    color: #33303E;

    font-family: "MontserratAlternates_600SemiBold";
    font-size: ${props => (props.fontSize ? props.fontSize + "px" : "24px")};
`;