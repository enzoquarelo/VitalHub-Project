import { React, useState, useEffect } from "react";

import { Container } from "../../components/Container/style"
import { StatusBar } from "expo-status-bar";

import Map from "../../components/Map/Map";
import { Title } from "../../components/Title/style";
import { DefaultText } from "../../components/DefaultText/DefaultText";
import { InputDisable, TitleInput } from "../../components/Input/styles";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { Links } from "../../components/Links/style";

import { userDecodeToken } from "../../utils/auth";
import api from "../../service/service";

import { Linking } from "react-native";


export const AppointmentLocation = ({ navigation, route }) => {
    const [finalPosition, setFinalPosition] = useState({ latitude: null, longitude: null });

    const { clinicId } = route.params;


    function updateFinalPosition(latitude, longitude) {
        setFinalPosition({ latitude, longitude });
    }

    async function SearchAddress() {
        const token = await userDecodeToken();
    
        try {
            const response = await api.get(`/Clinica/BuscarPorId?id=${clinicId}`, {
                headers: { Authorization: `Bearer ${token}` } 
            });
    
            const { latitude, longitude } = response.data.endereco;
            setFinalPosition({ latitude, longitude });
        } catch (error) {
            console.error("Erro ao buscar os dados da clínica:", error);
        }
    }

    function openGoogleMaps(finalPosition) {
        const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${finalPosition.latitude},${finalPosition.longitude}`;
        const playStoreURL = 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps';
        const appStoreURL = 'https://apps.apple.com/app/id585777434';

        Linking.openURL(googleMapsURL)
            .catch((error) => {
                console.error("Erro ao abrir o Google Maps:", error);

                const OS = Platform.OS;
                if (OS === 'android') {
                    return Linking.openURL(playStoreURL);
                } else if (OS === 'ios') {
                    return Linking.openURL(appStoreURL);
                }
            });
    }

    useEffect(() => {
        SearchAddress();
    }, []);

    return (
        <Container justifyContent={"start"}>
            <Map setFinalPosition={setFinalPosition} finalPosition={finalPosition} />

            <Title style={{ marginTop: 30 }}>Clínica Natureh</Title>
            <DefaultText>São Paulo,SP</DefaultText>

            <TitleInput style={{ marginTop: 30 }} fontSize={18}>Endereço</TitleInput>
            <InputDisable placeholder="Rua Vicenso Silva, 987" />

            <Container heightContainer={"80px"} flexDirection={"row"} justifyContent={"space-around"} style={{ marginTop: 8 }}>
                <Container widthContainer={"40%"} heightContainer={"80px"} alignItems={"start"}>
                    <TitleInput fontSize={18}>Número</TitleInput>
                    <InputDisable
                        placeholder="578"
                    />
                </Container>

                <Container widthContainer={"40%"} heightContainer={"80px"} alignItems={"start"}>
                    <TitleInput fontSize={18}>Bairro</TitleInput>
                    <InputDisable
                        placeholder="Moema - SP"
                    />
                </Container>
            </Container>

            <CustomButton onPress={() => openGoogleMaps(finalPosition)} style={{ marginTop: "15%" }}>
                <TitleButton>Iniciar Trajeto</TitleButton>
            </CustomButton>

            <Links
                colorLink={"#344F8F"}
                fontLink={"MontserratAlternates_600SemiBold"}
                fontSize={15}
                style={{ textAlign: 'center', marginTop: 12 }}
                onPress={() => (navigation.navigate("Home"))}
            >
                Cancelar
            </Links>

        </Container>
    );
}