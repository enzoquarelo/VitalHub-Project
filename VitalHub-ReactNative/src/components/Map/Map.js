import React, { useRef, useEffect, useState } from 'react';

import { ActivityIndicator, StyleSheet, View, Button, Text, Platform, Linking } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { mapskey } from '../../utils/mapsApiKey';

export default function Map({ setFinalPosition, finalPosition }) {
    const mapReference = useRef(null);
    const [initialPosition, setInitialPosition] = useState(null);

    useEffect(() => {
        RechargeVisuzualization()
    }, [initialPosition, finalPosition])

    async function CaptureLocation() {
        const { granted } = await requestForegroundPermissionsAsync()

        if (granted) {
            const captureLocation = await getCurrentPositionAsync()

            setInitialPosition(captureLocation);
        }
    }

    async function RechargeVisuzualization() {
        if (mapReference.current && initialPosition) {
            await mapReference.current.fitToCoordinates(
                [{
                    latitude: initialPosition.coords.latitude,
                    longitude: initialPosition.coords.longitude,
                },
                {
                    latitude: finalPosition.latitude,
                    longitude: finalPosition.longitude,
                }],
                {
                    edgePadding: { top: 60, right: 60, left: 60, bottom: 60 },
                    animated: true
                }
            )
        }
    }

    useEffect(() => {
        CaptureLocation();

        setFinalPosition({
            latitude: -23.623804,
            longitude: -46.577194,
        })
    }, [1000])


    return (
        <>{initialPosition != null ? (
            <>
                <MapView
                    ref={mapReference}
                    style={styles.map}
                    initialRegion={{
                        latitude: -23.448563,
                        longitude: -46.534352,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                    customMapStyle={grayMapStyle}
                >

                    <Marker
                        coordinate={
                            {
                                latitude: initialPosition.coords.latitude,
                                longitude: initialPosition.coords.longitude,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }
                        }
                        title='Você'
                        description='Posição atual do seu dispositivo'
                        image={require('../../../assets/images/redMarker.png')}
                    />

                    <Marker
                        coordinate={{
                            latitude: -23.623804,
                            longitude: -46.577194,
                        }}
                        image={require('../../../assets/images/grayMarker.png')}
                    />

                    <MapViewDirections
                        origin={initialPosition.coords}
                        destination={{
                            latitude: -23.623804,
                            longitude: -46.577194,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                        apikey={mapskey}
                        strokeWidth={3}
                        strokeColor='#7791cf'
                    />
                </MapView>
            </>
        ) :
            (
                <>
                    <Text>Localização não encontrada!</Text>

                    <ActivityIndicator />
                </>
            )

        }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '50%',
    },
    button: {
        marginTop: '20px'
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
                color: "#9B9FA4",
            },
        ],
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
            {
                color: "#9B9FA4",
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

