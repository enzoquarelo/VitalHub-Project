// Importando dependência do mapa
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// Aqui nós vamos pedir uma solicitação a permitir a localização do celular do usuário
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync, //monitorar o posicionamento
  LocationAccuracy,
} from "expo-location";

import MapViewDirections from "react-native-maps-directions";

import { mapskey } from "../../components/utils/mapsApiKey";

import { useEffect, useState, useRef } from "react";

import {
  Container,
  ContainerLocation2,
  ContainerLocation3,
  ContainerLocationText,
  ContainerTextLocation,
  ContainerTextLocation2,
  TextConsultationLocation,
  TextConsultationLocation2,
  TextLocationInput,
} from "./style";
import { ContainerInputs } from "../../components/Container/Style";
import { TextRecordPaciente2 } from "../../components/Text/Text";
import { ContentAccount } from "../../components/ContentAccount/ContentAccount";
import { LinkAccount } from "../../components/Links/Links";

import { ActivityIndicator, Image, StyleSheet, Text, View, useColorScheme } from "react-native";
import { WazeButton } from "../../components/Waze/Waze";

export const ConsultationLocation = ({ navigation }) => {
  const mapReference = useRef(null);
  const [initialPosition, setIniticalPosition] = useState(null);
  const [finalPosition, setFinalPosition] = useState({
    latitude: -23.206,
    longitude: -46.7836,
  });
  const [markerImageVisible, setMarkerImageVisible] = useState(false);

  async function CapturarLocalizacao() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const CaptureLocation = await getCurrentPositionAsync();

      setIniticalPosition(CaptureLocation);

      console.log(initialPosition);
    }
  }

  useEffect(() => {
    CapturarLocalizacao();

    //monitorar em tempo real
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      async (response) => {
        await setIniticalPosition(response);

        mapReference.current?.animatedCamera({
          picht: 60,
          center: response.coords,
        });
      }
    );
  }, [1000]);

  useEffect(() => {
    RecarregarVisualizarMapa();
  }, [initialPosition]);

  async function RecarregarVisualizarMapa() {
    if (mapReference.current && initialPosition) {
      await mapReference.current.fitToCoordinates(
        [
          {
            latitude: initialPosition.coords.latitude,
            longitude: initialPosition.coords.longitude,
          },
          {
            latitude: finalPosition.latitude,
            longitude: finalPosition.longitude,
          },
        ],
        {
          edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
          animated: true,
        }
      );
    }
  }

  const handleMarkerPress = () => {
    setMarkerImageVisible(!markerImageVisible);
  };

  // Obtém o esquema de cores atual do dispositivo (light ou dark)
  const deviceColorScheme = useColorScheme(); 

  // Define o estado do tema do mapa com base no esquema de cores do dispositivo
  const [mapTheme, setMapTheme] = useState(deviceColorScheme === 'dark' ? darkMapStyle : grayMapStyle);

  // Atualiza o tema do mapa sempre que o esquema de cores do dispositivo mudar
  useEffect(() => {
    setMapTheme(deviceColorScheme === 'dark' ? darkMapStyle : grayMapStyle);
  }, [deviceColorScheme]);


  //Chamar a função PatientConsultations
  async function PatientConsultations() {
    navigation.replace("PatientConsultations");
  }

  return (
      <Container>
          <View style={styles.container}>
              {initialPosition != null ? (
                  <MapView
                      ref={mapReference}
                      initialRegion={{
                          latitude: initialPosition.coords.latitude,
                          longitude: initialPosition.coords.longitude,
                          latitudeDelta: 0.005,
                          longitudeDelta: 0.005,
                      }}
                      provider={PROVIDER_GOOGLE}
                      customMapStyle={mapTheme}
                      style={styles.map}
                  >
                      <Marker
                          coordinate={{
                              latitude: initialPosition.coords.latitude,
                              longitude: initialPosition.coords.longitude,
                          }}
                          title="Posição inicial"
                          description=" Estou aqui"
                          pinColor="#49b3ba"
                          onPress={handleMarkerPress}
                      />

                      <MapViewDirections
                          origin={initialPosition.coords}
                          destination={{
                              latitude: -23.5329,
                              longitude: -46.7926,
                              latitudeDelta: 0.005,
                              longitudeDelta: 0.005,
                          }}
                          strokeWidth={5}
                          strokeColor="#496bba"
                          apikey={mapskey}
                      />
                  </MapView>
              ) : (
                  <View style={styles.loadingContainer}>
                      <ActivityIndicator />
                      <Text>Carregando...</Text>
                  </View>
              )}
              {markerImageVisible && (
                  <View style={styles.markerImageContainer}></View>
              )}
          </View>

          <ContainerLocationText>
              <TextConsultationLocation>
                  Clínica Natureh
              </TextConsultationLocation>
              <TextConsultationLocation2>
                  São Paulo, SP
              </TextConsultationLocation2>
          </ContainerLocationText>
          <ContainerInputs>
              <TextLocationInput>Endereço</TextLocationInput>

              <ContainerTextLocation>
                  <TextRecordPaciente2></TextRecordPaciente2>
              </ContainerTextLocation>
              <ContainerLocation2>
                  <ContainerLocation3>
                      <TextLocationInput>Número</TextLocationInput>

                      <ContainerTextLocation2>
                          <TextRecordPaciente2></TextRecordPaciente2>
                      </ContainerTextLocation2>
                  </ContainerLocation3>

                  <ContainerLocation3>
                      <TextLocationInput>Bairro</TextLocationInput>

                      <ContainerTextLocation2
                          onPress={() =>
                              NavigationPreloadManager.replace("Main")
                          }
                      >
                          <TextRecordPaciente2>Voltar</TextRecordPaciente2>
                      </ContainerTextLocation2>
                  </ContainerLocation3>
              </ContainerLocation2>
          </ContainerInputs>

          <WazeButton
              latitude={-23.5329}
              longitude={-46.7926}
              label="Clínica Natureh"
          />
          
          <ContentAccount>
              <LinkAccount onPress={() => PatientConsultations()}>
                  Voltar
              </LinkAccount>
          </ContentAccount>
      </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "43%",
    position: "absolute",
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  markerImageContainer: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
});

const grayMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#E1E0E7",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: -5,
      },
      {
        lightness: -5,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#33303E",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#66DA9F",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1B1B1B",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#C6C5CE",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ACABB7",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#8EA5D9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
];




const darkMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#242f3e", // Cor do plano de fundo do mapa
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855", // Cor do texto no mapa
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e", // Cor do contorno do texto no mapa
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563", // Cor do texto para localidades administrativas
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563", // Cor do texto para pontos de interesse
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f", // Cor do parque
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76", // Cor do texto para parques
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e", // Cor da estrada
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37", // Cor do contorno da estrada
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3", // Cor do texto para estradas
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855", // Cor da estrada principal
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835", // Cor do contorno da estrada principal
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c", // Cor do texto para estradas principais
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2f3948", // Cor da geometria do trânsito
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563", // Cor do texto para estações de trânsito
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c", // Cor da água
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#515c6d", // Cor do texto para a água
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#17263c", // Cor do contorno do texto para a água
      },
    ],
  },
];

