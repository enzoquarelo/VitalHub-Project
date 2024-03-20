import { Modal } from "react-native";
import { PatientModal } from "../ScheduleConsultationModal/Style";
import {
  ImagePatientModal,
  ModalContent2,
} from "../InsertMedicalRecordModal/style";
import {
  ButtonModalDoctor,
  ButtonTitleDoctor,
  ContainerDoctorText,
  TextDoctor,
  TextDoctor2,
} from "./style";
import { ContentAccount } from "../ContentAccount/ContentAccount";
import { LinkAccount } from "../Links/Links";

const DoctorModal = ({
  visible,
  setShowModalDoctor,
  situacao,
  navigation,
  ...rest
}) => {
  
  //Chamar a função ConsultationLocation
  async function ConsultationLocation() {
    navigation.replace("ConsultationLocation");
  }

  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      <PatientModal>
        <ModalContent2>
          <ImagePatientModal source={require("../../assets/imgLucas.jpg")} />

          <TextDoctor2>Dr. Lucas Lacerda</TextDoctor2>
          <ContainerDoctorText>
            <TextDoctor>Oncologista</TextDoctor>
            <TextDoctor>CRM-232106</TextDoctor>
          </ContainerDoctorText>

          <ButtonModalDoctor onPress={() => ConsultationLocation()}>
            <ButtonTitleDoctor>Ver local da consulta</ButtonTitleDoctor>
          </ButtonModalDoctor>
          <ContentAccount>
            <LinkAccount onPress={() => navigation.replace("Main")}>Cancelar</LinkAccount>
          </ContentAccount>
        </ModalContent2>
      </PatientModal>
    </Modal>
  );
};

export default DoctorModal;
