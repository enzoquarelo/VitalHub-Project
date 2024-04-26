import React, { useRef, useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";

import {
  BtnCapture,
  BtnFlip,
  ContainerButtonsCamera,
  ConatinerImage,
  Photo,
} from "./style";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { ButtonDisable, CustomButton, TitleButton } from "../../Button/styles";
import { Container } from "../../Container/style";
import { ButtonGaleria, LastPhoto } from "../../../screens/Profile/style";

const ModalCamera = ({
  visible,
  onClose,
  title,
  onConfirm,
  getMediaLibrary = false,
}) => {
  const cameraRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [flashOn, setFlashOn] = useState(false);
  const [latesPhoto, setLatesPhoto] = useState(null); //salva a ultima foto
  const [descricaoExame, setDescricaoExame] = useState(null);
  

  async function SelectImageGallery() {
    console.log("SelectImageGallery function called");

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Error in SelectImageGallery:", error);
    }
  }

  async function CapturePhoto() {
    
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      if (photo) {
        setPhoto(photo.uri);
        setOpenModal(true);
      } else {
        console.log("Falha ao capturar foto");
      }
    }
  }

  //salvar foto
  async function SavePhoto() {
    try {
      if (photo) {
        await MediaLibrary.saveToLibraryAsync(photo); // Salva a imagem na galeria
        alert("Foto salva na galeria"); // Exibe uma mensagem de sucesso
        setOpenModal(false); // Fecha a modal da imagem
        setDescricaoExame(photo.uri); // Atualiza o estado com o URI da foto salva
        onClose(); // Retorna para a modal anterior
        
      } else {
        alert("Nenhuma imagem capturada."); // Se não houver imagem capturada, exibe uma mensagem de erro
      }
    } catch (error) {
      console.error("Erro ao salvar a foto:", error);
      alert("Erro ao salvar a foto."); // Em caso de erro, exibe uma mensagem de erro
    }
  }

  
  // Função para alternar o estado do flash
  const toggleFlash2 = () => {
    setFlashOn(!flashOn); // Alterna o estado do flash entre ligado e desligado
    const newFlashMode = flashOn
      ? Camera.Constants.FlashMode.off
      : Camera.Constants.FlashMode.on;
    setFlashMode(newFlashMode); // Altera o modo do flash com base no estado
  };

  async function GetLastPhoto() {
    const { assets } = await MediaLibrary.getAssetsAsync({
      sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      first: 1,
    });

    console.log(assets);
    if (assets.length > 0) {
      setLatesPhoto(assets[0].uri);
    }
  }

  useEffect(() => {
    setPhoto(null);

    if (getMediaLibrary) {
      GetLastPhoto();
    }
  }, [visible]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <Camera
          ref={cameraRef}
          type={cameraType}
          flashMode={flashMode}
          style={styles.camera}
          ratio={"16:9"}
        >
          <ContainerButtonsCamera>
            <ButtonGaleria onPress={() => SelectImageGallery()}>
              {latesPhoto != null ? (
                <LastPhoto source={{ uri: latesPhoto }} />
              ) : null}
            </ButtonGaleria>

            <BtnCapture onPress={CapturePhoto} />
            <BtnFlip
              onPress={() =>
                setCameraType(
                  cameraType === CameraType.front
                    ? CameraType.back
                    : CameraType.front
                )
              }
            >
              <MaterialCommunityIcons
                name="camera-flip"
                size={35}
                color="white"
              />
            </BtnFlip>
          </ContainerButtonsCamera>

          <TouchableOpacity
            style={[
              styles.cameraButtonText,
              flashOn ? styles.flashButtonActive : styles.flashButtonInactive,
            ]}
            onPress={toggleFlash2}flash-off-sharp
          >
            <Ionicons
              name={flashOn ? "flash" : "flash-off-sharp"}
              size={24}
              color={flashOn ? "black" : "black"}
            />
          </TouchableOpacity>
        </Camera>
        <StatusBar hidden={true} />
      </Modal>

      {openModal && (
        <Modal
          animationType="slide"
          visible={openModal}
          onRequestClose={() => setOpenModal(false)}
        >
          <ConatinerImage>
            <Photo source={{ uri: photo }} />

            <Container
              heightContainer={45}
              flexDirection={"row"}
              justifyContent={"space-around"}
              style={{ marginTop: 50, paddingLeft: 5, paddingRight: 5 }}
            >
              <ButtonDisable
                onPress={() => setOpenModal(false)}
                widthButton={40}
              >
                <TitleButton>REFAZER</TitleButton>
              </ButtonDisable>

              <CustomButton
                onPress={() => {
                  setOpenModal(false);
                  onClose();
                }}
                widthButton={45}
              >
                <TitleButton onPress={SavePhoto}>CONFIRMAR</TitleButton>
              </CustomButton>
            </Container>
          </ConatinerImage>
        </Modal>
      )}
    </>
  );
};

export default ModalCamera;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  cameraButtonText: {
    width: 80,
    height: 45,
    marginTop: 20,
    marginLeft: 300,
    color: "white",
    fontSize: 18,
    backgroundColor: "#496BBA",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  // Estilo para o botão do flash quando está ativado
  flashButtonActive: {
    backgroundColor: "#F69C13", // Cor de fundo quando o flash está ativado
  },
  // Estilo para o botão do flash quando está desativado
  flashButtonInactive: {
    backgroundColor: "white", // Cor de fundo quando o flash está desativado
  },
});
