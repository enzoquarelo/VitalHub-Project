import styled from "styled-components";
import { Button } from "../Button/style";
import { Textbasic } from "../Text/Text";
import { Input } from "../Input/Input";

export const PatientModal = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalContent2 = styled.View`
  width: 100%;
  padding: 30px 30px 10px;
  border-radius: 10px;
  background-color: #fff;
  align-items: center;
`;

export const ModalText = styled.Text`
  width: 270px;
  font-size: 16px;
  color: #5f5c6b;
  line-height: 22px;
  text-align: center;
  margin-top: 10px;
  font-family: "Quicksand_500Medium";
`;
export const ButtonModal = styled(Button)`
  width: 100%;
`;
export const TextbasicModal2 = styled.Text`
  font-family: "Quicksand_600SemiBold";
  font-size: 16px;
  color: black;
  align-self: flex-start;
  margin-top: 20px;
`;

export const ContainerInputModal = styled.View`
  flex-direction: row;
  gap: 15px;
`;
export const InputModal = styled(Input)`
  width: 108px;
  height: 60px;
  text-align: center;
`;
export const InputModal2 = styled(Input)`
  width: 100%;
  height: 70px;
  margin-bottom: 20px;
`;
