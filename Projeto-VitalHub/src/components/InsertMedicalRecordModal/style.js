import styled from "styled-components";
import { Button } from "../Button/style";


export const ImagePatientModal = styled.Image`
width: 100%;
height: 190px;
border-radius: 10px;
margin-bottom: 20px;
`

export const PatientModal2 = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalContent2 = styled.View`
  width: 90%;
  padding: 30px 30px 10px;
  border-radius: 10px;
  background-color: #fff;
  align-items: center;
`;

export const ModalText2 = styled.Text`
width: 270px;
font-size: 16px;
color: #5f5c6b;
line-height: 22px;
text-align: center;
margin-top: 10px; 
font-family: "Quicksand_500Medium";
`
export const ButtonModal2 = styled(Button)`
    width: 80%;
`