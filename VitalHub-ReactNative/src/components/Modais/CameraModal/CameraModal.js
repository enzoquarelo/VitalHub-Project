import React, { useRef, useState, useEffect } from "react";
import {
    Modal,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Text,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import {
    BtnCapture,
    BtnFlip,
    ContainerButtonsCamera,
    ConatinerImage,
    Photo,
} from "./style";

import { CameraView, useCameraPermissions } from "expo-camera";

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
    onPhotoConfirmed,
    getMediaLibrary = false,
    onPhotoCaptured,
}) => {

    const navigation = useNavigation();

    const cameraRef = useRef(null);

    const [photo, setPhoto] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [cameraType, setCameraType] = useState("back");
    const [flashMode, setFlashMode] = useState("off");

    const [latestPhoto, setLatestPhoto] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();


    async function selectImageGallery() {
        console.log("selectImageGallery function called");
    
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });
    
            if (!result.cancelled && result.assets && result.assets.length > 0) {
                setPhoto(result.assets[0].uri);
                setOpenModal(true);
            }
        } catch (error) {
            console.error("Error in selectImageGallery:", error);
        }
    }
    

    function toggleCameraFacing() {
        setCameraType((current) => (current === "back" ? "front" : "back"));
    }

    async function capturePhoto() {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 1,
            });

            if (photo) {
                setPhoto(photo.uri);
                setOpenModal(true);
            } else {
                console.log("Failed to capture photo");
            }
        }
    }

    async function savePhoto() {
        try {
            if (photo) {
                await MediaLibrary.saveToLibraryAsync(photo);
                alert("Photo saved to gallery");
                setOpenModal(false);
                setLatestPhoto(photo.uri);
                onClose();
                
                onPhotoCaptured(photo.uri); // Chamando a função de callback com o URI da foto]
            
                setPhoto(photo.uri);

                navigation.navigate("ViewPrescription", { photoUri: photo });
            } else {
                alert("No image captured.");
            }
        } catch (error) {
            console.error("Error saving photo:", error);
            alert("Error saving photo.");
        }
    }

    const toggleFlash = () => {
        setFlashMode(flashMode === "on" ? "off" : "on");
    };

    async function getLastPhoto() {
        const { assets } = await MediaLibrary.getAssetsAsync({
            sortBy: [[MediaLibrary.SortBy.creationTime, false]],
            first: 1,
        });

        console.log(assets);
        if (assets.length > 0) {
            setLatestPhoto(assets[0].uri);
        }
    }

    useEffect(() => {
        setPhoto(null);

        if (getMediaLibrary) {
            getLastPhoto();
        }
    }, [visible]);

    if (!permission) {
    }

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
                                onPress={() => {
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
