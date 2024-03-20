
import { ButtonTitle } from "../Button/style";
import { ContentAccount } from "../ContentAccount/ContentAccount";
import { LinkAccount } from "../Links/Links";

import { TextPatient, TextPatient3 } from "../Text/Text";
import { Modal } from "react-native";
import { ButtonModal2, ImagePatientModal, ModalContent2, PatientModal2 } from "./style";

const InsertMedicalRecordModal = ({ visible, setShowModalAppointment, navigation, ...rest }) => {
    //Chamar a função MedicalRecord
    async function MedicalRecord() {
        navigation.replace("MedicalRecord");
    }
    return (
        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <PatientModal2>
                {/* Content */}
                <ModalContent2>
                    <ImagePatientModal
                        source={require("../../assets/imagemPaciente2.png")}
                    />

                    <TextPatient3>Niccole Sarga</TextPatient3>
                    <TextPatient>22 anos niccole.sarga@gmail.com</TextPatient>

                    <ButtonModal2 onPress={() => MedicalRecord()}>
                        <ButtonTitle>INSERIR PRONTUÁRIO</ButtonTitle>
                    </ButtonModal2>

                    <ContentAccount>
                        <LinkAccount>Cancelar</LinkAccount>
                    </ContentAccount>
                </ModalContent2>
            </PatientModal2>
        </Modal>
    );
};

export default InsertMedicalRecordModal;