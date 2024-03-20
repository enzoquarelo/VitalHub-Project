import styled from "styled-components";

export const Textbasic = styled.Text`
  font-size: 18px;
  font-family: "Quicksand_500Medium";
  text-align: center;
  padding: 24px;
  color: gray;
  line-height: 24px;
`;

export const TextRecordPaciente = styled.Text`
  font-size: 14px;
  font-family: "Quicksand_600SemiBold";
  text-align: center;
  color: gray;
  margin-top: 1px;
  margin-bottom: -60px;
`;

export const TextRecordPaciente2 = styled(TextRecordPaciente)`
  text-align: left;
  padding: 16px;
`;

export const TextRecordInsertion = styled.Text`
  font-size: 16px;
  font-family: "Quicksand_600SemiBold";
  align-self: flex-start;
  margin-top: 20px;
`;

export const TextRecordInsertion2 = styled.Text`
  font-size: 16px;
  font-family: "Quicksand_600SemiBold";
  align-self: flex-start;
`;

export const TextPatient = styled.Text`
  font-size: 16px;
  text-align: start;
  font-family: "Quicksand_500Medium";
  margin-bottom: 5px;
  color: #6a696e;
`;

export const TextPatient2 = styled.Text`
  font-family: "MontserratAlternates_600SemiBold";
  font-size: 18px;
  color: #fbfbfb;
`;
export const TextPatient3 = styled.Text`
  font-family: "MontserratAlternates_600SemiBold";
  font-size: 18px;
  color: black;
  margin-bottom: 5px;
`;
export const TextHora = styled.Text`
  color: ${({ situacao }) => (situacao === "pendente" ? "#49b3ba" : "#8C8A97")};
  font-family: "Quicksand_600SemiBold";
  font-size: 14px;
  margin-left: 6px;
`;

export const TextAgenda = styled(TextHora)`
  color: #607ec5;
`;

export const TextButtonCard = styled.Text`
  color: ${(props) => props.situacao == "pendente" ? "#c81d25" : "#344f8f"} ;
  font-size: 14px;
  text-decoration: none;
  font-family: "MontserratAlternates_500Medium";
  margin-left: -10px;
`;

export const TextIcon = styled.Text`
  color: #F9A620;
  font-family: "Quicksand_600SemiBold";
  font-size: 14px;
`
