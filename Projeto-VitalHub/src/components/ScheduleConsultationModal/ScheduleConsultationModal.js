import { Modal } from "react-native";
import { Title } from "../Title/Style";
import { ButtonTitle } from "../Button/style";
import { ContentAccount } from "../ContentAccount/ContentAccount";
import { LinkAccount } from "../Links/Links";
import {
    ButtonModal,
    ContainerInputModal,
    InputModal,
    InputModal2,
    ModalContent2,
    PatientModal,
    TextbasicModal2,
} from "./Style";

const ScheduleConsultationModal = ({
    visible,
    setScheduleConsultation,
    navigation,
    ...rest
}) => {
    //Chamar a função SelectClinic
    async function SelectClinic() {
        navigation.replace("SelectClinic");
    }

    return (
        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <PatientModal>
                {/* Content */}
                <ModalContent2>
                    <Title>Agendar consulta</Title>

                    <TextbasicModal2>Qual o nível da consulta</TextbasicModal2>
                    <ContainerInputModal>
                        <InputModal placeholder="Rotina" />
                        <InputModal placeholder="Exame" />
                        <InputModal placeholder="Urgência" />
                    </ContainerInputModal>

                    <TextbasicModal2>
                        Informe a localização desejada
                    </TextbasicModal2>

                    <InputModal2 placeholder="Informe a localização" />

                    <ButtonModal onPress={() => SelectClinic()}>
                        <ButtonTitle>CONTINUAR</ButtonTitle>
                    </ButtonModal>

                    <ContentAccount>
                        <LinkAccount>Cancelar</LinkAccount>
                    </ContentAccount>
                </ModalContent2>
            </PatientModal>
        </Modal>
    );
};

export default ScheduleConsultationModal;
