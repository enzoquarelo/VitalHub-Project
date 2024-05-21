import React, { useRef, useState, useEffect } from "react";
//nativos
import { Modal, StyleSheet, StatusBar, TouchableOpacity } from "react-native";

//styles
import { ButtonDisable, CustomButton, TitleButton } from "../../Button/styles";
import { Container } from "../../Container/style";
import { ButtonGaleria, LastPhoto } from "../../../screens/Profile/style";
import {
    BtnCapture,
    BtnFlip,
    ContainerButtonsCamera,
    ConatinerImage,
    Photo,
} from "./style";

//bibliotecas
import { CameraView } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

const ModalCamera = ({
    visible,
    onClose,
    getMediaLibrary = false,
    SetUriCameraCapture,
}) => {
    const cameraRef = useRef(null);

    const [photo, setPhoto] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [cameraType, setCameraType] = useState("back");
    const [flashMode, setFlashMode] = useState("off");

    const [latestPhoto, setLatestPhoto] = useState(null);

    async function sendNotification() {
        // Personalize a mensagem da notificação
        const message = {
            title: "Foto Salva com Sucesso!",
            body: "Sua foto foi salva com sucesso.",
            icon: "././assets/images/VitalHub_logo.png",
        };

        // Agende a notificação aqui, dentro da função sendNotification
        await Notifications.scheduleNotificationAsync({
            content: message,
            trigger: null,
        });
    }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    //seleciona a imagem da galeria
    async function selectImageGallery() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (
                !result.cancelled &&
                result.assets &&
                result.assets.length > 0
            ) {
                setPhoto(result.assets[0].uri);
                // Ensure SetUriCameraCapture is called with the correct URI
                SetUriCameraCapture(result.assets[0].uri);
                setOpenModal(true);
            }
        } catch (error) {
            console.error("Error in selectImageGallery:", error);
        }
    }

    //altera o estado do tipo da camera sendo a traseira ou a frontal
    function toggleCameraFacing() {
        setCameraType((current) => (current === "back" ? "front" : "back"));
    }

    //captura a foto
    async function capturePhoto() {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 1,
            });

            if (photo) {
                setPhoto(photo.uri);
                // Ensure SetUriCameraCapture is called with the correct URI
                // SetUriCameraCapture(photo.uri);
                setOpenModal(true);
            } else {
                console.log("Failed to capture photo");
            }
        }
    }

    //salva a foto na galeria
    async function savePhoto() {
        try {
            if (photo) {
                await MediaLibrary.saveToLibraryAsync(photo);
                setOpenModal(false);
                setLatestPhoto(photo);
                onClose();

                setPhoto(photo.uri);
                SetUriCameraCapture(photo);
            } else {
            }
        } catch (error) {
            console.error("Error saving photo:", error);
        }
    }

    //altera o status do flash
    const toggleFlash = () => {
        setFlashMode(flashMode === "on" ? "off" : "on");
    };

    //pega a última foto da galeria para exibir
    async function getLastPhoto() {
        const { assets } = await MediaLibrary.getAssetsAsync({
            sortBy: [[MediaLibrary.SortBy.creationTime, false]],
            first: 1,
        });

        if (assets.length > 0) {
            const infoAssets = await MediaLibrary.getAssetInfoAsync(
                assets[0].id
            );
            setLatestPhoto(infoAssets.localUri);
        }
    }

    //ao exibir o modal ele deixa a photo com valor nulo e pega a ultima foto da galeria
    useEffect(() => {
        setPhoto(null);

        if (getMediaLibrary) {
            getLastPhoto();
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
                <CameraView
                    ref={cameraRef}
                    type={cameraType}
                    flash={flashMode}
                    style={styles.camera}
                    ratio={"16:9"}
                    facing={cameraType}
                >
                    <ContainerButtonsCamera>
                        <ButtonGaleria onPress={() => selectImageGallery()}>
                            {latestPhoto != null ? (
                                <LastPhoto source={{ uri: latestPhoto }} />
                            ) : null}
                        </ButtonGaleria>

                        <BtnCapture onPress={capturePhoto} />
                        <BtnFlip onPress={toggleCameraFacing}>
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
                            flashMode === "on"
                                ? styles.flashButtonActive
                                : styles.flashButtonInactive,
                        ]}
                        onPress={toggleFlash}
                    >
                        <Ionicons
                            name={flashMode === "on" ? "flash" : "flash-off"}
                            size={24}
                            color={flashMode === "on" ? "black" : "black"}
                        />
                    </TouchableOpacity>
                </CameraView>
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
                            style={{
                                marginTop: 50,
                                paddingLeft: 5,
                                paddingRight: 5,
                            }}
                        >
                            <ButtonDisable
                                onPress={() => setOpenModal(false)}
                                widthButton={40}
                            >
                                <TitleButton>REFAZER</TitleButton>
                            </ButtonDisable>

                            <CustomButton
                                onPress={async () => {
                                    // Chama a função para enviar notificação ao clicar em "CONFIRMAR"
                                    await sendNotification();
                                    setOpenModal(false);
                                    onClose();
                                }}
                                widthButton={45}
                            >
                                <TitleButton onPress={savePhoto}>
                                    CONFIRMAR
                                </TitleButton>
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
    flashButtonActive: {
        backgroundColor: "#F69C13",
    },
    flashButtonInactive: {
        backgroundColor: "white",
    },
});
