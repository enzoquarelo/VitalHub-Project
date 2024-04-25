import { React, useState } from "react";

import { Container } from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { InputDisable, TitleInput } from "../../components/Input/styles";
import { Links } from "../../components/Links/style";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";

import { DoctorImage, RowGray } from "./style";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

import ModalCamera from "../../components/Modais/CameraModal/CameraModal";
import api from "../../service/service";

export const ViewPrescription = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [capturePhoto, setCapturePhoto] = useState(null);
  const [descricaoExame, setDescricaoExame] = useState(null);

  async function InserirExame() {
    const formData = new FormData();
    formData.append("consultaId", prontuario.id);
    formData.append("Imagem", {
      uri: capturePhoto,
      name: `ìmage${capturePhoto.split(".").pop()}`,
      type: `ìmage${capturePhoto.split(".").pop()}`,
    });

    await api
      .post(`/Exame/Cadastrar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }.then((response) => {
          setDescricaoExame(descricaoExame + "\n" + response.data.descricao);
        }),
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
          fontSize={16}
          textAlignVertical="top"
          placeholder="Infecção no ouvido"
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
        <InputDisable
          value={descricaoExame}
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
          placeholder="Resultado do exame de sangue : tudo normal"
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
      />
    </ScrollView>
  );
};
