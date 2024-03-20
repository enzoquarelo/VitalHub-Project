import {
    ButtonRecordInsertion,
    ButtonTitle,
} from "../../components/Button/style";
import {
    Container,
    ContainerInputs,
    ContainerRecordInsertion,
    ContainerText,
    ContainerText2,
} from "../../components/Container/Style";
import { LinkRecordInsertion } from "../../components/Links/Links";
import { ImageRecordInsertion } from "../../components/Logo/Style";
import {
    TextRecordInsertion,
    TextRecordPaciente,
    TextRecordPaciente2,
} from "../../components/Text/Text";
import { TitleRecordInsertion } from "../../components/Title/Style";

export const PatientRecordInsertion = () => {
    return (
        <Container>
            <ContainerRecordInsertion>
                <ImageRecordInsertion
                    source={require("../../assets/imagemPaciente.png")}
                />

                <TitleRecordInsertion>Richard Kosta</TitleRecordInsertion>

                <TextRecordPaciente>
                    36 anos richard.kosta@gmail.com
                </TextRecordPaciente>

                <ContainerInputs>
                    <TextRecordInsertion>
                        Descrição da consulta
                    </TextRecordInsertion>

                    <ContainerText>
                        <TextRecordPaciente2>
                           
                        </TextRecordPaciente2>
                    </ContainerText>

                    <TextRecordInsertion>
                        Diagnóstico do paciente
                    </TextRecordInsertion>

                    <ContainerText2>
                        <TextRecordPaciente2>
                           
                        </TextRecordPaciente2>
                    </ContainerText2>

                    <TextRecordInsertion>Prescrição médica</TextRecordInsertion>

                    <ContainerText>
                        <TextRecordPaciente2>
                     
                        </TextRecordPaciente2>
                    </ContainerText>

                    <ButtonRecordInsertion>
                        <ButtonTitle>SALVAR</ButtonTitle>
                    </ButtonRecordInsertion>

                    <ButtonRecordInsertion>
                        <ButtonTitle>EDITAR</ButtonTitle>
                    </ButtonRecordInsertion>

                    <LinkRecordInsertion>Cancelar</LinkRecordInsertion>
                </ContainerInputs>
            </ContainerRecordInsertion>
        </Container>
    );
};
