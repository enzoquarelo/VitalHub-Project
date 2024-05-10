import { React, useState } from "react";
import { useEffect } from "react";

import { Container } from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { InputDisable, TitleInput } from "../../components/Input/styles";
import { Links } from "../../components/Links/style";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";

import { DoctorImage, RowGray } from "./style";
import { ContainerImageExame } from "../../components/Container/style";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet } from "react-native";

import ModalCamera from "../../components/Modais/CameraModal/CameraModal";
import api from "../../service/service";

export const ViewPrescription = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [capturePhoto, setCapturePhoto] = useState(null);
    const [descricaoExame, setDescricaoExame] = useState(""); // Inicializando com uma string vazia
    const [photo, setPhoto] = useState(null);
    const [photoUri, setPhotoUri] = useState("");

    // Atualizando photoUri com o valor de route.params.photoUri quando disponível
    useEffect(() => {
        if (route.params?.photoUri) {
            setPhotoUri(route.params.photoUri);

            InserirExame();
        }
    }, [route.params?.photoUri]);

    async function InserirExame() {
        const formData = new FormData();
        formData.append("consultaId", prontuario.id);
        formData.append("Imagem", {
            uri: photoUri,
            name: `image${photoUri.split(".").pop()}`,
            type: `image${photoUri.split(".").pop()}`,
        });

        try {
            const response = await api.post(`/Exame/Cadastrar`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Adicionando uma quebra de linha entre os resultados dos exames
            setDescricaoExame((prevDescricao) =>
                prevDescricao !== ""
                    ? prevDescricao + "\n" + response.data.descricao
                    : response.data.descricao
            );

            console.log(descricaoExame);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePhotoCapture = (capturedPhotoUri) => {
        setPhoto(capturedPhotoUri);
    };

    return (
        <ScrollView>
            <Container>
                <StatusBar />

                <DoctorImage
                    source={require("../../../assets/images/doctorImage_temp.png")}
                />

                <Title style={{ marginBottom: 4, marginTop: 15 }}>
                    Nome do(a) Dr.(a)
                </Title>
                <DefaultText>Área de atuação - CRM</DefaultText>

                <TitleInput style={{ marginTop: 30 }} fontSize={18}>
                    Descrição da consulta
                </TitleInput>
                <InputDisable
                    heightInput={"120px"}
                    fontSize={16}
                    textAlignVertical="top"
                    placeholder="O paciente possuí uma infecção no ouvido. Necessário repouse de 2 dias e acompanhamento médico constante"
                    editable={false}
                    multiline={true}
                    style={{ marginBottom: 20, marginTop: 8 }}
                />

                <TitleInput fontSize={18}>Diagnóstico do paciente</TitleInput>

                <InputDisable
                    heightInput={"120px"}
                    fontSize={16}
                    textAlignVertical="top"
                    placeholder="Medicamento: Advil
Dosagem: 50 mg
Frequência: 3 vezes ao dia
Duração: 3 dias"
                    editable={false}
                    multiline={true}
                    style={{ marginBottom: 20, marginTop: 8 }}
                />

                <TitleInput fontSize={18}>Prescrição médica</TitleInput>
                <InputDisable
                    heightInput={"120px"}
                    fontSize={16}
                    textAlignVertical="top"
                    placeholder="Medicamento: Advil
Dosagem: 50 mg
Frequência: 3 vezes ao dia
Duração: 3 dias"
                    editable={false}
                    multiline={true}
                    style={{ marginBottom: 20, marginTop: 8 }}
                />
                <TitleInput fontSize={18}>Exames Médicos</TitleInput>
                <ContainerImageExame>
                    {photoUri && (
                        <Image
                            source={{ uri: photoUri }}
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

                <RowGray />

                <InputDisable
                    value={descricaoExame}
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
            />
        </ScrollView>
    );
};

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
        height: "80%",

        resizeMode: "contain",
    },
});
