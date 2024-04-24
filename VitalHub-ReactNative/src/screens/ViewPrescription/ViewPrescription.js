import { React, useState, useEffect } from "react";

import { Container } from "../../components/Container/style"
import { Title } from "../../components/Title/style";
import { InputDisable, TitleInput } from "../../components/Input/styles";
import { Links } from "../../components/Links/style";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";

import { DoctorImage, RowGray } from "./style";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ScrollView, StatusBar} from "react-native";

import ModalCamera from "../../components/Modais/CameraModal/CameraModal";
import api from "../../service/service";


export const ViewPrescription = ({ route }) => {
    const [appointment, setAppointment] = useState({ descricao: '', diagnostico: '', medicamento: '', foto: '', nome: '', crm: '', especialidade1: '' });
    const [modalVisible, setModalVisible] = useState(false);

    const { appointmentId } = route.params;

    async function SearchAppointment() {
        try {
            const response = await api.get(`/Consultas/BuscarPorId?id=${appointmentId}`);
            const { descricao, diagnostico } = response.data;
            const { medicamento } = response.data.receita;
            const {foto, nome} = response.data.medicoClinica.medico.idNavigation;
            const { crm } = response.data.medicoClinica.medico;
            const { especialidade1 } = response.data.medicoClinica.medico.especialidade;

            setAppointment({ descricao, diagnostico, medicamento, foto, nome, crm, especialidade1 });
        } catch (error) {
            console.error("Erro ao buscar os dados da consulta:", error);
        }
    }

    useEffect(() => {
        SearchAppointment();
    }, []);

    console.log(appointment.foto);
    return (
        <ScrollView>
            <Container>
            <StatusBar barStyle="light-content" />

                <DoctorImage source={{ uri: appointment.foto }} />

                <Title style={{ marginBottom: 4, marginTop: 15 }}>Dr(a) {appointment.nome}</Title>
                <DefaultText>{appointment.especialidade1}  -  CRM{appointment.crm}</DefaultText>

                <TitleInput style={{ marginTop: 30 }} fontSize={18}>Descrição da consulta</TitleInput>
                <InputDisable
                    heightInput={"120px"}
                    fontSize={16}
                    textAlignVertical="top"
                    placeholder={appointment.descricao}
                    editable={false}
                    multiline={true}
                    style={{ marginBottom: 20, marginTop: 8 }}
                />

                <TitleInput fontSize={18}>Diagnóstico do paciente</TitleInput>
                <InputDisable
                    fontSize={16}
                    textAlignVertical="top"
                    placeholder={appointment.diagnostico}
                    editable={false}
                    multiline={true}
                    style={{ marginBottom: 20, marginTop: 8 }}
                />

                <TitleInput fontSize={18}>Prescrição médica</TitleInput>
                <InputDisable
                    heightInput={"120px"}
                    fontSize={16}
                    textAlignVertical="top"
                    placeholder={appointment.medicamento}
                    editable={false}
                    multiline={true}
                    style={{ marginBottom: 20, marginTop: 8 }}
                />

                <TitleInput fontSize={18}>Exames Médicos</TitleInput>
                <InputDisable
                    heightInput={"120px"}
                    fontSize={16}
                    textAlignVertical="center"
                    placeholder=" | ! |  Nenhuma Foto Informada"
                    editable={false}
                    multiline={true}
                    style={{ marginBottom: 8, marginTop: 8 }}
                />

                <Container
                    widthContainer={"90%"}
                    heightContainer={"44px"}
                    flexDirection={"row"}
                    justifyContent={"space-around"}
                    style={{ marginBottom: 25, marginTop: 15 }}
                >
                    <CustomButton
                        widthButton={35}
                        heightButton={44}
                        backgroundBtn={"#49B3BA"}
                        showBorder={false}
                        onPress={() => setModalVisible(true)}
                    >
                        <MaterialCommunityIcons name="camera-plus-outline" size={22} color="white" style={{ marginRight: 12, marginBottom: 1 }} />
                        <TitleButton>Enviar</TitleButton>
                    </CustomButton>

                    <Links widthLink={30} colorLink={"#C81D25"}>Cancelar</Links>
                </Container>

                <RowGray />

                <InputDisable
                    heightInput={"100px"}
                    fontSize={16}
                    textAlignVertical="top"
                    placeholder="Resultado do exame de sangue : tudo normal"
                    editable={false}
                    multiline={true}
                    style={{ marginBottom: 12, marginTop: 20 }}
                />

                <Links colorLink={"#344F8F"} fontSize={18} widthLink={100} style={{ paddingBottom: 20 }}>Voltar</Links>
            </Container>

            <ModalCamera
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Título do Modal"
            />
        </ScrollView>
    );
}