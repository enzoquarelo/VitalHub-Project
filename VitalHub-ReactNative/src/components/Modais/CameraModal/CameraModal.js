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
  // const [capturePhoto, setCapturePhoto] = useState(null)
  const [latesPhoto, setLatesPhoto] = useState(null); //salva a ultima foto

  async function SelectImageGallery() {
    console.log("SelectImageGallery function called"); 
  
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1
      });
  
      if (!result.canceled) {
        setPhoto(result.uri);
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

  async function GetLastPhoto() {
    const {assets} = await MediaLibrary.getAssetsAsync({
      sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      first: 1,
    });

    console.log(assets);
    if (assets.lenght > 0) {
      setLatesPhoto(assets[0].uri);
    }
  }

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

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
          <ButtonGaleria onPress={() => SelectImageGallery()}>
          {latesPhoto != null ? (
            <LastPhoto source={{ uri: latesPhoto }} />
          ) : null}
        </ButtonGaleria>
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
                <TitleButton>CONFIRMAR</TitleButton>
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
});
