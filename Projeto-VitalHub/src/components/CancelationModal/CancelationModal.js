import { Modal } from "react-native";
import { Title } from "../Title/Style";
import { ButtonTitle } from "../Button/style";
import { ContentAccount } from "../ContentAccount/ContentAccount";
import { LinkAccount } from "../Links/Links";
import { ButtonModal, ModalContent, ModalText, PatientModal } from "./style";

import { Notifications } from 'expo';

async function sendNotification() {
  //personalizar a mensagem da notificação
  const message = {
    to: 'ExpoPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
    sound: 'default',
    title: 'Consulta Cancelada',
    body: 'Sua consulta foi cancelada com sucesso.',
    data: { /* Dados adicionais, se necessário */ },
  };

  // Envia a notificação
  await Notifications.scheduleNotificationAsync({
    content: message,
    trigger: null, // Enviar imediatamente
  });
}

const CancelationModal = ({ visible, setShowModalCancel, ...rest }) => {
  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      <PatientModal>
        {/* Content */}
        <ModalContent>
          <Title>Cancelar Consulta</Title>

          <ModalText>
            Ao cancelar essa consulta, abrirá uma possível disponibilidade no
            seu horário, deseja mesmo cancelar essa consulta?
          </ModalText>

          <ButtonModal onPress={async () => {
            // Chama a função para enviar notificação ao clicar em "CONFIRMAR"
            await sendNotification();
            // Fecha o modal
            setShowModalCancel(false);
          }}>
            <ButtonTitle>CONFIRMAR</ButtonTitle>
          </ButtonModal>

          <ContentAccount>
            <LinkAccount>Cancelar</LinkAccount>
          </ContentAccount>
        </ModalContent>
      </PatientModal>
    </Modal>
  );
};

export default CancelationModal;
