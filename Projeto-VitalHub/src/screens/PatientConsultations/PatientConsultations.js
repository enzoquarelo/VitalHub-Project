import { useState } from "react";

import {
    Container,
    Container2,
    ContainerHeader,
    ContainerIconPatient2,
    ContainerImageTextPatient,
    ContainerTextPatient,
} from "../../components/Container/Style";
import { TextPatient, TextPatient2 } from "../../components/Text/Text";
import CalendarList from "../../components/CalendarStrip/CalendarList";
import {
    Button4,
    ButtonTabsStyle,
    TextButton,
} from "../../components/Button/style";
import { ListComponent } from "../../components/List/List";
import CancelationModal from "../../components/CancelationModal/CancelationModal";
import InsertMedicalRecordModal from "../../components/InsertMedicalRecordModal/InsertMedicalRecordModal";
import { ImagePatient } from "../../components/Logo/Style";
import { ApointmentCardDoctor } from "../../components/ApointmentCard/ApointmentCardDoctor";

//Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ScheduleConsultationModal from "../../components/ScheduleConsultationModal/ScheduleConsultationModal";
import DoctorModal from "../../components/DoctorModal/DoctorModal";
import { TouchableOpacity } from "react-native";

const Consultas = [
    { id: 1, nome: "Lucas Lacerda", situacao: "pendente" },
    { id: 2, nome: "Uiara Ambrosio", situacao: "cancelado" },
    { id: 3, nome: "Silvia Ribeiro", situacao: "realizado" },
    { id: 4, nome: "Tadeu LACERDA", situacao: "pendente" },
];

export const PatientConsultations = ({ navigation }) => {
    const [statusLista, setStatusLista] = useState("pendente");

    //states para os Modais
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [showModalAppointment, setShowModalAppointment] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showModalDoctor, setShowModalDoctor] = useState(false);

    const [activeIcon, setActiveIcon] = useState("agenda"); // Estado para armazenar o ícone ativo

    const [profile, setProfile] = useState("paciente");

    //Chamar a função PatientProfile
    async function PatientProfile() {
        navigation.replace("PatientProfile");
    }

    return (
        <Container>
            <ContainerHeader>
                <ContainerImageTextPatient>
                    <TouchableOpacity onPress={() => PatientProfile()}>
                        <ImagePatient
                            source={require("../../assets/imagemPaciente.png")}
                        />
                    </TouchableOpacity>
                    <ContainerTextPatient>
                        <TextPatient>Bem vindo</TextPatient>
                        <TextPatient2 onPress={() => PatientProfile()}>
                            Richard Kosta
                        </TextPatient2>
                    </ContainerTextPatient>

                    <ContainerIconPatient2>
                        <MaterialCommunityIcons
                            name="bell"
                            size={30}
                            color="#FFFFFF"
                        />
                    </ContainerIconPatient2>
                </ContainerImageTextPatient>
            </ContainerHeader>

            <CalendarList />

            <Container2>
                <ButtonTabsStyle
                    textButton={"Agendadas"}
                    clickButton={statusLista === "pendente"}
                    onPress={(e) => {
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
                    onPress={(e) => {
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
                    onPress={(e) => {
                        setStatusLista("cancelado");
                    }}
                >
                    <TextButton clickButton={statusLista === "cancelado"}>
                        Canceladas
                    </TextButton>
                </ButtonTabsStyle>
            </Container2>

            {/* cria o mapeamento da lista de consultas (cards) */}
            <ListComponent
                data={Consultas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    statusLista == item.situacao && (
                        // cria card de consulta da tela PatientConsultations
                        <ApointmentCardDoctor
                            situacao={item.situacao}
                            navigation={navigation}
                            onPressCancel={() => setShowModalCancel(true)}
                            onPressAppointment={() =>
                                setShowModalAppointment(true)
                            }
                            onPressDoctor={() => setShowModalDoctor(true)}
                        />
                    )
                }
                showsVerticalScrollIndicator={false}
            />

            {profile === "paciente" && (
                <Button4 onPress={() => setShowScheduleModal(true)}>
                    <FontAwesome5
                        name="stethoscope"
                        size={32}
                        color="#FBFBFB"
                    />
                </Button4>
            )}

            <DoctorModal
                visible={showModalDoctor}
                setShowModalDoctor={setShowModalDoctor}
                navigation={navigation}
            />

            <CancelationModal
                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}
                navigation={navigation}
            />

            <InsertMedicalRecordModal
                situacao={statusLista}
                visible={showModalAppointment}
                setShowModalAppointment={setShowModalAppointment}
                navigation={navigation}
            />

            <ScheduleConsultationModal
                visible={showScheduleModal}
                setScheduleConsultation={setShowScheduleModal}
                navigation={navigation}
            />
        </Container>
    );
};
