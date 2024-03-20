import { useState } from "react";
import { ApointmentSelectDoctor } from "../../components/ApointmentCard/ApointmentSelectDoctor";
import { ButtonRegister, ButtonTitle } from "../../components/Button/style";
import { ContainerSelectDoctor } from "../../components/Container/Style";
import { ContentAccount } from "../../components/ContentAccount/ContentAccount";
import { LinkAccount } from "../../components/Links/Links";
import { TitleSelectDoctor } from "../../components/Title/Style";
import { ListComponent } from "../../components/List/List";

export const SelectDoctor = ({ navigation }) => {
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);

    // Função para atualizar o estado do item selecionado
    const handleSelectDoctor = (doctorId) => {
        setSelectedDoctorId(doctorId);
    };

    // Lista de médicos
    const doctors = [
        {
            id: 1,
            name: "Dr. Dra Alessandra",
            specialty: "Dermatologista, Esteticista",
            image: require("../../assets/imagemDoctor1.png"),
        },
        {
            id: 2,
            name: "Dr. Lucas",
            specialty: "Cardiologista",
            image: require("../../assets/imgLucas.jpg"),
        },
        {
            id: 3,
            name: "Dra. Maria",
            specialty: "Pediatra",
            image: require("../../assets/imgdoctor2.png"),
        },
        // Adicione mais médicos conforme necessário
    ];

    //Chamar a função PatientConsultations
    async function PatientConsultations() {
        navigation.replace("PatientConsultations");
    }
    //Chamar a função SelectDate
    async function SelectDate() {
        navigation.replace("SelectDate");
    }

    return (
        <ContainerSelectDoctor>
            <TitleSelectDoctor>Selecionar médico</TitleSelectDoctor>
            <ListComponent
                data={doctors}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ApointmentSelectDoctor
                        doctor={item}
                        selectedDoctorId={selectedDoctorId}
                        onSelectDoctor={handleSelectDoctor}
                    />
                )}
            />
            <ButtonRegister onPress={() => SelectDate()}>
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </ButtonRegister>

            <ContentAccount>
                <LinkAccount onPress={() => PatientConsultations()}>
                    Cancelar
                </LinkAccount>
            </ContentAccount>
        </ContainerSelectDoctor>
    );
};
