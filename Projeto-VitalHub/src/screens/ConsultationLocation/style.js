import styled from "styled-components";
import { TextRecordInsertion } from "../../components/Text/Text";
import { ContainerText2 } from "../../components/Container/Style";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #fafafa;
`;

export const ContainerLocationText = styled.View`
  width: 90%;
  margin-top: 380px;
  align-items: center;
  margin-bottom: -60px;
`;

export const TextLocationInput = styled(TextRecordInsertion)`

`
export const ContainerTextLocation = styled(ContainerText2)`

`
export const ContainerTextLocation2 = styled(ContainerText2)`
  width: 170px;
`

export const ContainerLocation2 = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ContainerLocation3 = styled.View``;



export const TextConsultationLocation = styled.Text`
  font-size: 20px;
  font-family: "MontserratAlternates_600SemiBold";
  margin-bottom: 10px;
  margin-top: 20px;
`;
export const TextConsultationLocation2 = styled.Text`
  font-size: 14px;
  font-family: "Quicksand_600SemiBold";
`;
