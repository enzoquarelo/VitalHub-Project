import styled from "styled-components";
import { TextPatient, TextPatient3 } from "../Text/Text";
import { Button, ButtonTitle } from "../Button/style";

export const ContainerDoctorText = styled.View`
    flex-direction: row;
    gap: 20px;
`

export const TextDoctor = styled(TextPatient)`
    margin-bottom: 30px;
`;
export const TextDoctor2 = styled(TextPatient3)`
    margin-bottom: 20px;
`;

export const ButtonModalDoctor = styled(Button)`
    width: 100%;
    
`;

export const ButtonTitleDoctor = styled(ButtonTitle)`
    font-family: "MontserratAlternates_700Bold";
`;
