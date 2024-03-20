import styled from "styled-components";
import { TextButtonCard } from "../../components/Text/Text";
import { InputRecordInsertion2 } from "../../components/Input/Input";

export const ButtonMedicalRecord = styled.TouchableOpacity`
  flex-direction: row;
  gap: 10px;
  background-color: #49b3ba;
  width: 190px;
  height: 50px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const TextBottonRecord = styled.Text`
  color: white;
  font-size: 16px;
  font-family: "MontserratAlternates_700Bold";
`;

export const ContainerImageExame = styled.View`
  width: 100%;
  height: 204px;
  border: 2px solid #49b3ba;
  border-radius: 5px;
`;

export const TextButtonRecord = styled(TextButtonCard)`
  color: #c81d25;
  margin-right: 40px;
`;
export const ViewButtonCamera = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ViewLine = styled.View`
  border-bottom-width: 2;
  width: 100%;
  border-bottom-color: #8c8a97;
  margin-top: 20px;
`;

export const InputRecordInsertionExame = styled(InputRecordInsertion2)`
  height: 120px;
`;
