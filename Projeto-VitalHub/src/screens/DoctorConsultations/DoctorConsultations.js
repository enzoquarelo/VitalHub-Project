import { useState } from "react";
import {
  ButtonTabsStyle,
  ButtonTabsStyle2,
  TextButton,
  TextButton2,
} from "../../components/Button/style";
import CalendarList from "../../components/CalendarStrip/CalendarList";
import {
  Container,
  Container2,
  Container3,
  Container4,
  Container5,
  Container6,
  Container7,
  ContainerHeader,
  ContainerIconPatient,
  ContainerIconPatient2,
  ContainerImageTextPatient,
  ContainerRecordInsertion,
  ContainerTextPatient,
  ContainerTextPatient2,
} from "../../components/Container/Style";
import { LinkRecordInsertion2 } from "../../components/Links/Links";
import { ImageDoctor, ImagePatient } from "../../components/Logo/Style";
import {
  TextAgenda,
  TextHora,
  TextPatient,
  TextPatient2,
  TextPatient3,
} from "../../components/Text/Text";

//Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ListComponent } from "../../components/List/List";
import { ApointmentCard } from "../../components/ApointmentCard/ApointmentCard";
import CancelationModal from "../../components/CancelationModal/CancelationModal";
import InsertMedicalRecordModal from "../../components/InsertMedicalRecordModal/InsertMedicalRecordModal";

const Consultas = [
  { id: 1, nome: "Lucas Lacerda", situacao: "pendente" },
  { id: 2, nome: "Uiara Ambrosio", situacao: "cancelado" },
  { id: 3, nome: "Silvia Ribeiro", situacao: "realizado" },
  { id: 4, nome: "Tadeu LACERDA", situacao: "pendente" },
];

export const DoctorConsultations = () => {
  const [statusLista, setStatusLista] = useState("pendente");
  const [activeIcon, setActiveIcon] = useState("agenda"); // Estado para armazenar o ícone ativo

  //states para os Modais
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAppointment, setShowModalAppointment] = useState(false);

  return (
    <Container>
      <ContainerHeader>
        <ContainerImageTextPatient>
          <ImagePatient source={require("../../assets/imgLucas.jpg")} />

          <ContainerTextPatient>
            <TextPatient>Bem vindo</TextPatient>
            <TextPatient2>Dr. Lucas Lacerda</TextPatient2>
          </ContainerTextPatient>

          <ContainerIconPatient2>
            <MaterialCommunityIcons name="bell" size={30} color="#FFFFFF" />
          </ContainerIconPatient2>
        </ContainerImageTextPatient>
      </ContainerHeader>

      <CalendarList />

      <Container2>
        <ButtonTabsStyle
          textButton={"pendente"}
          clickButton={statusLista === "pendente"}
          onPress={() => {
            setStatusLista("pendente");
          }}
        >
          <TextButton clickButton={statusLista === "pendente"}>
            Agendadas
          </TextButton>
        </ButtonTabsStyle>

        <ButtonTabsStyle
          textButton={"realizado"}
          clickButton={statusLista === "realizado"}
          onPress={() => {
            setStatusLista("realizado");
          }}
        >
          <TextButton clickButton={statusLista === "realizado"}>
            Realizadas
          </TextButton>
        </ButtonTabsStyle>

        <ButtonTabsStyle
          textButton={"cancelado"}
          clickButton={statusLista === "cancelado"}
          onPress={() => {
            setStatusLista("cancelado");
          }}
        >
          <TextButton clickButton={statusLista === "cancelado"}>
            Canceladas
          </TextButton>
        </ButtonTabsStyle>
      </Container2>

      <ListComponent
        data={Consultas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          statusLista == item.situacao && (
            <ApointmentCard
              situacao={item.situacao}
              onPressCancel={() => setShowModalCancel(true)}
              onPressAppointment={() => setShowModalAppointment(true)}
            />
          )
        }
      />

      <CancelationModal
        visible={showModalCancel}
        setShowModalCancel={setShowModalCancel}
      />

      <InsertMedicalRecordModal
        visible={showModalAppointment}
        setShowModalAppointment={setShowModalAppointment}
      />

      <Container6>
        <ButtonTabsStyle2
          textButton={"Agenda"}
          clickButton={statusLista === "Agenda"}
          onPress={() => {
            setStatusLista("Agenda");
            setActiveIcon("Agenda");
          }}
        >
          <MaterialCommunityIcons
            name="notebook"
            size={24}
            color={activeIcon === "Agenda" ? "#607ec5" : "#4E4B59"} // Cor condicional
          />

          <TextButton2 clickButton={statusLista === "Agenda"}>
            Agenda
          </TextButton2>
        </ButtonTabsStyle2>

        <ButtonTabsStyle2
          textButton={"Clinicas"}
          clickButton={statusLista === "Clinicas"}
          onPress={() => {
            setStatusLista("Clinicas");
            setActiveIcon("Clinicas");
          }}
        >
          <FontAwesome6
            name="hospital"
            size={24}
            color={activeIcon === "Clinicas" ? "#607ec5" : "#4E4B59"}
          />
          <TextButton2 clickButton={statusLista === "Clinicas"}>
            Clínicas
          </TextButton2>
        </ButtonTabsStyle2>
        <ButtonTabsStyle2
          textButton={"Perfil"}
          clickButton={statusLista === "Perfil"}
          onPress={() => {
            setStatusLista("Perfil");
            setActiveIcon("Perfil");
          }}
        >
          <Ionicons
            name="person-circle-outline"
            size={30}
            color={activeIcon === "Perfil" ? "#607ec5" : "#4E4B59"}
          />
          <TextButton2 clickButton={statusLista === "Perfil"}>
            Perfil
          </TextButton2>
        </ButtonTabsStyle2>
      </Container6>
    </Container>
  );
};
