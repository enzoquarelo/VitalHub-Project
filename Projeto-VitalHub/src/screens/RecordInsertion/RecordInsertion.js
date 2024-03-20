import {
  Container,
  ContainerInputs,
  ContainerRecordInsertion,
} from "../../components/Container/Style";
import { ImageRecordInsertion } from "../../components/Logo/Style";
import { TitleRecordInsertion } from "../../components/Title/Style";
import {
  TextRecordInsertion,
  TextRecordPaciente,
} from "../../components/Text/Text";
import {
  InputRecordInsertion,
  InputRecordInsertion2,
} from "../../components/Input/Input";
import {
  ButtonRecordInsertion,
  ButtonTitle,
} from "../../components/Button/style";
import { LinkRecordInsertion } from "../../components/Links/Links";

export const RecordInsertion = () => {
  return (
    <Container>
      <ContainerRecordInsertion>
        <ImageRecordInsertion
          source={require("../../assets/imagemPaciente.png")}
        />

        <TitleRecordInsertion>Richard Kosta</TitleRecordInsertion>

        <TextRecordPaciente>36 anos richard.kosta@gmail.com</TextRecordPaciente>

        <ContainerInputs>
          <TextRecordInsertion>Descrição da consulta</TextRecordInsertion>

          <InputRecordInsertion placeholder="Descrição" />

          <TextRecordInsertion>Diagnóstico do paciente</TextRecordInsertion>

          <InputRecordInsertion2 placeholder="Diagnóstico" />
          <TextRecordInsertion>Prescrição médica</TextRecordInsertion>

          <InputRecordInsertion placeholder="Prescrição medica" />

          <ButtonRecordInsertion>
            <ButtonTitle>SALVAR</ButtonTitle>
          </ButtonRecordInsertion>

          <LinkRecordInsertion>Cancelar</LinkRecordInsertion>
        </ContainerInputs>
      </ContainerRecordInsertion>
    </Container>
  );
};
