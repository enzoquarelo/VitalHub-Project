import { Modal } from "react-native";
import {
  ContainerConfirm2,
  ContainerConfirm3,
  ContainerTextConfirm,
  ConteinerConfirm,
  TextConfirm,
  TextConfirm2,
  TextConfirm3,
} from "./style";
import { ButtonModalDoctor, ButtonTitleDoctor } from "../DoctorModal/style";
import { ContentAccount } from "../ContentAccount/ContentAccount";
import { LinkAccount } from "../Links/Links";
import { ModalContent2 } from "../InsertMedicalRecordModal/style";

export const ConfirmAppointment = ({
    visible,
    navigation,
    setShowModalConfirm,
    ...rest
}) => {

    //Chamar a função PatientConsultations
  async function PatientConsultations() {
    navigation.replace("PatientConsultations");
  }

    return (
        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <ConteinerConfirm>
                <ModalContent2>
                    <ContainerTextConfirm>
                        <TextConfirm>Agendar consulta</TextConfirm>
                        <TextConfirm2>
                            Consulte os dados selecionados para a sua consulta
                        </TextConfirm2>
                    </ContainerTextConfirm>
                    <ContainerConfirm2>
                        <ContainerConfirm3>
                            <TextConfirm3>Data da consulta</TextConfirm3>
                        </ContainerConfirm3>
                        <ContainerConfirm3>
                            <TextConfirm3>Médico(a) da consulta</TextConfirm3>
                        </ContainerConfirm3>
                        <ContainerConfirm3>
                            <TextConfirm3>Local da consulta</TextConfirm3>
                        </ContainerConfirm3>
                        <ContainerConfirm3>
                            <TextConfirm3>Tipo da consulta</TextConfirm3>
                        </ContainerConfirm3>
                    </ContainerConfirm2>
                    <ButtonModalDoctor
                        onPress={() => PatientConsultations()}
                    >
                        <ButtonTitleDoctor>Confirmar</ButtonTitleDoctor>
                    </ButtonModalDoctor>
                    <ContentAccount>
                        <LinkAccount>Cancelar</LinkAccount>
                    </ContentAccount>
                </ModalContent2>
            </ConteinerConfirm>
        </Modal>
    );
};
