import { React, useState, useEffect } from "react";

import { Container, ContainerImageExame } from "../../components/Container/style"
import { Title } from "../../components/Title/style";
import { InputDisable, TitleInput } from "../../components/Input/styles";
import { Links } from "../../components/Links/style";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";

import { DoctorImage, RowGray } from "./style";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Image, ScrollView, StyleSheet, StatusBar } from "react-native";

import ModalCamera from "../../components/Modais/CameraModal/CameraModal";
import api from "../../service/service";


export const ViewPrescription = ({ route }) => {
    const [appointment, setAppointment] = useState({ descricao: '', diagnostico: '', medicamento: '', foto: '', nome: '', crm: '', especialidade1: '' });

    const [modalVisible, setModalVisible] = useState(false);
    const [capturePhoto, setCapturePhoto] = useState(null);
    const [descricaoExame, setDescricaoExame] = useState(""); // Inicializando com uma string vazia
    const [photo, setPhoto] = useState(null);
    const [photoUri, setPhotoUri] = useState("");

    const [uriCameraCapture, SetUriCameraCapture] = useState(null);


    const { appointmentId } = route.params;

    async function SearchAppointment() {
        try {
            const response = await api.get(`/Consultas/BuscarPorId?id=${appointmentId}`);
            const { descricao, diagnostico } = response.data;
            const { medicamento } = response.data.receita;
            const { foto, nome } = response.data.medicoClinica.medico.idNavigation;
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

    // useEffect(() => {
    //     if (uriCameraCapture) {
    //         InserirExame();
    //     }
    // }, [uriCameraCapture]);
    

    async function InserirExame() {
        console.log('iniciou a função');
        const formData = new FormData();
        formData.append("consultaId", appointmentId);
        formData.append("Imagem", {
            uri: uriCameraCapture,
            name: `image.${uriCameraCapture.split(".").pop()}`,
            type: `image/${uriCameraCapture.split(".").pop()}`,
        });
        console.log('arquivo da imagem');

        try {
            console.log('entrou no try');
            const response = await api.post(`Exame/Cadastrar`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log('response passou', response.data);
            // Adicionando uma quebra de linha entre os resultados dos exames
            setDescricaoExame('foi');
            console.log('inseriu', descricaoExame);
        } catch (error) {
            console.error("Erro ao inserir exame:", error);
        }
    }

    const handlePhotoCapture = (capturedPhotoUri) => {
        setPhoto(capturedPhotoUri);
    };


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
                <ContainerImageExame>
                    {uriCameraCapture && (
                        <Image
                            source={{ uri: uriCameraCapture }}
                            style={styles.capturedImage}
                        />
                    )}
                </ContainerImageExame>

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
                        <MaterialCommunityIcons
                            name="camera-plus-outline"
                            size={22}
                            color="white"
                            style={{ marginRight: 12, marginBottom: 1 }}
                        />
                        <TitleButton>Enviar</TitleButton>
                    </CustomButton>

                    <Links widthLink={30} colorLink={"#C81D25"}>
                        Cancelar
                    </Links>
                </Container>

                <CustomButton onPress={InserirExame}>
                    <TitleButton>Inserir Exame</TitleButton>
                </CustomButton>
                <RowGray />

                <InputDisable
                    value={descricaoExame}
                    placeholder="Resultado do Exame:"
                    heightInput={"100px"}
                    fontSize={16}
                    textAlignVertical="top"
                    editable={false}
                    multiline={true}
                    style={{ marginBottom: 12, marginTop: 20 }}
                />

                <Links
                    colorLink={"#344F8F"}
                    fontSize={18}
                    widthLink={100}
                    style={{ paddingBottom: 20 }}
                >
                    Voltar
                </Links>
            </Container>

            <ModalCamera
                getMediaLibrary={true}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Título do Modal"
                setCapturePhoto={setCapturePhoto}
                setModalVisible={setModalVisible}
                onPhotoCaptured={handlePhotoCapture}
                SetUriCameraCapture={SetUriCameraCapture}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    cameraButtonText: {
        color: "white",
        fontSize: 18,
        backgroundColor: "#496BBA",
        padding: 10,
        borderRadius: 5,
    },
    capturedImage: {
        width: "100%",
        height: "100%",
    },
});