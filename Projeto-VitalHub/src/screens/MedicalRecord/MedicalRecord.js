import {
  Container,
  ContainerInputs,
  ContainerRecordInsertion,
} from "../../components/Container/Style";
import { ImageRecordInsertion } from "../../components/Logo/Style";
import {
  TextRecordInsertion,
  TextRecordPaciente,
} from "../../components/Text/Text";

import { TitleRecordInsertion } from "../../components/Title/Style";
import {
  InputRecordInsertion,
  InputRecordInsertion2,
} from "../../components/Input/Input";
import { LinkRecordInsertion } from "../../components/Links/Links";

//expo Camera
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome } from "@expo/vector-icons";

//icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ButtonMedicalRecord,
  ContainerImageExame,
  InputRecordInsertionExame,
  TextBottonRecord,
  TextButtonRecord,
  ViewButtonCamera,
  ViewLine,
} from "./style";
import { useEffect, useRef, useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

import { StyleSheet } from "react-native";
import { ButtonCard } from "../../components/Button/style";

export const MedicalRecord = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  //camera frontal etraseira
  const [type, setType] = useState(Camera.Constants.Type.back);
  //ModalCamera
  const [modalVisible, setModalVisible] = useState(false);
  // Estado para controlar a visibilidade da segunda modal
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  // Estado para controlar a visibilidade dos botões de capturar a imagem e de filmar
  const [captureButtonsVisible, setCaptureButtonsVisible] = useState(true);
  //Captura da imagem
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  //flash camera
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  // Estado para controlar se o flash está ligado ou desligado
  const [flashOn, setFlashOn] = useState(false);
  //gravar vídeo
  const [isRecording, setIsRecording] = useState(false);
  //audio
  const [audioPermission, setAudioPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync();
      const { status: audioStatus } = await Audio.requestPermissionsAsync();

      setHasPermission(
        cameraStatus === "granted" &&
          mediaStatus === "granted" &&
          audioStatus === "granted"
      );
    })();
  }, []);

  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  // Função para exibir a segunda modal
  const showSecondModal = () => {
    setSecondModalVisible(true);
    hideCaptureButtons(); // Oculta os botões de capturar a imagem e de filmar
  };
  // Função para ocultar a segunda modal
  const hideSecondModal = () => {
    setSecondModalVisible(false);
    showCaptureButtons(); // Mostra os botões de capturar a imagem e de filmar
  };

  // Função para ocultar os botões de capturar a imagem e de filmar
  const hideCaptureButtons = () => {
    setCaptureButtonsVisible(false);
  };

  // Função para mostrar os botões de capturar a imagem e de filmar
  const showCaptureButtons = () => {
    setCaptureButtonsVisible(true);
  };

  // Estilo condicional para o botão do flash
  const flashButtonStyle = flashOn
    ? styles.flashButtonActive
    : styles.flashButtonInactive;

  //função de vídeo camera
  const toggleRecording = async () => {
    if (isRecording) {
      // Se já estiver gravando, pare a gravação
      await cameraRef.current.stopRecording(); // Espera a gravação parar antes de definir isRecording como false
      setIsRecording(false);
    } else {
      // Se não estiver gravando, comece a gravação
      const videoRecord = await cameraRef.current.recordAsync();
      setCapturedVideo(videoRecord.uri); // Salva o vídeo capturado
      setIsRecording(true); // Define isRecording como true para indicar que a gravação está ocorrendo
    }
  };

  // Função para alternar o estado do flash
  const toggleFlash2 = () => {
    setFlashOn(!flashOn); // Alterna o estado do flash entre ligado e desligado
    const newFlashMode = flashOn
      ? Camera.Constants.FlashMode.off
      : Camera.Constants.FlashMode.on;
    setFlashMode(newFlashMode); // Altera o modo do flash com base no estado
  };

  // Função para capturar a foto
  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo.uri); // Atualiza o estado com a URI da foto capturada
        showSecondModal(); // Exibe a segunda modal após capturar a foto
      } else {
        console.log("Referência da câmera não está definida corretamente.");
      }
    } catch (error) {
      console.error("Erro ao capturar a imagem:", error);
    }
  };

  //limpar foto
  function ClearPhoto() {
    setCapturedImage(null);
    hideSecondModal(); // Oculta a segunda modal após excluir a foto
  }

  //salvar foto
  async function SavePhoto() {
    try {
      if (capturedImage) {
        await MediaLibrary.saveToLibraryAsync(capturedImage); // Salva a imagem na galeria
        alert("Foto salva na galeria"); // Exibe uma mensagem de sucesso
        setModalVisible(false); // Fecha a primeira modal
        setSecondModalVisible(false); // Fecha a segunda modal
      } else {
        alert("Nenhuma imagem capturada."); // Se não houver imagem capturada, exibe uma mensagem de erro
      }
    } catch (error) {
      console.error("Erro ao salvar a foto:", error);
      alert("Erro ao salvar a foto."); // Em caso de erro, exibe uma mensagem de erro
    }
  }

  const cancelCapture = () => {
    setCapturedImage(null); // Redefine o estado da imagem capturada
    setModalVisible(false); // Fecha o modal
  };

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();

      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  return (
    <Container>
      <ContainerRecordInsertion>
        <ImageRecordInsertion source={require("../../assets/imgLucas.jpg")} />

        <TitleRecordInsertion>Dr. Lucas Lacerda</TitleRecordInsertion>

        <TextRecordPaciente>Cliníco geral - CRM-15286</TextRecordPaciente>

        <ContainerInputs>
          <TextRecordInsertion>Descrição da consulta</TextRecordInsertion>

          <InputRecordInsertion />

          <TextRecordInsertion>Diagnóstico do paciente</TextRecordInsertion>

          <InputRecordInsertion2 />
          <TextRecordInsertion>Prescrição médica</TextRecordInsertion>

          <InputRecordInsertion />
          <TextRecordInsertion>Exames médicos</TextRecordInsertion>

          <ContainerImageExame>
            {capturedImage && (
              <Image
                source={{ uri: capturedImage }}
                style={styles.capturedImage}
              />
            )}
          </ContainerImageExame>

          <ViewButtonCamera>
            <ButtonMedicalRecord onPress={() => setModalVisible(true)}>
              <MaterialCommunityIcons
                name="camera-plus-outline"
                size={28}
                color="white"
              />
              <TextBottonRecord>Enviar</TextBottonRecord>
            </ButtonMedicalRecord>

            <ButtonCard onPress={cancelCapture}>
              <TextButtonRecord>Cancelar</TextButtonRecord>
            </ButtonCard>
          </ViewButtonCamera>

          <View style={{ flex: 1 }}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Camera
                  style={{ width: "90%", aspectRatio: 3 / 5 }}
                  type={type}
                  ref={cameraRef}
                  ratio={"16:9"}
                  flashMode={flashMode}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 20,
                    }}
                  >
                    <TouchableOpacity
                      style={styles.cameraButtonText}
                      onPress={toggleCameraType}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "MontserratAlternates_600SemiBold",
                        }}
                      >
                        Trocar Câmera
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.cameraButtonText,
                        flashOn
                          ? styles.flashButtonActive
                          : styles.flashButtonInactive,
                      ]}
                      onPress={toggleFlash2}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "MontserratAlternates_600SemiBold",
                        }}
                      >
                        Flash
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Camera>
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: "white",
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    style={styles.btnCaptura}
                    onPress={() => takePicture()}
                  >
                    <FontAwesome name="camera" size={23} color={"#fff"} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={toggleRecording}
                    style={{
                      alignSelf: "center",
                      backgroundColor: "#496BBA",
                      padding: 14,
                      borderRadius: 10,
                    }}
                  >
                    <FontAwesome
                      name={isRecording ? "stop" : "video-camera"}
                      size={35}
                      color={isRecording ? "red" : "white"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={secondModalVisible}
            onRequestClose={hideSecondModal}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: capturedImage }}
                style={{ width: "90%", height: 653, marginBottom: 20 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  width: "100%",
                  backgroundColor: "white",
                  padding: 20,
                }}
              >
                <TouchableOpacity onPress={ClearPhoto} style={styles.btnCancel}>
                  <FontAwesome name="trash" size={30} color={"#fff"} />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 16,
                      color: "white",
                      fontFamily: "MontserratAlternates_700Bold",
                    }}
                  >
                    Refazer
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={SavePhoto} style={styles.btnUpload}>
                  <FontAwesome name="save" size={30} color={"#fff"} />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 16,
                      color: "white",
                      fontFamily: "MontserratAlternates_700Bold",
                    }}
                  >
                    Confirmar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <ViewLine></ViewLine>

          <InputRecordInsertionExame placeholder="Descrição do exame:  " />

          <LinkRecordInsertion onPress={() => navigation.replace("Main")}>
            Voltar
          </LinkRecordInsertion>
        </ContainerInputs>
      </ContainerRecordInsertion>
    </Container>
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
    height: 200,
    resizeMode: "cover",
  },
  btnCaptura: {
    marginRight: 50,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#496BBA",
    alignItems: "center",
    justifyContent: "center",
  },
  btnCancel: {
    flexDirection: "row",
    width: 150,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#496BBA",
    alignItems: "center",
    justifyContent: "center",
  },
  btnUpload: {
    flexDirection: "row",
    marginLeft: 40,
    width: 150,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#496BBA",
    alignItems: "center",
    justifyContent: "center",
  },
  // Estilo para o botão do flash quando está ativado
  flashButtonActive: {
    backgroundColor: "#F69C13", // Cor de fundo quando o flash está ativado
  },
  // Estilo para o botão do flash quando está desativado
  flashButtonInactive: {
    backgroundColor: "#496BBA", // Cor de fundo quando o flash está desativado
  },
});
