import { Image, Text } from "react-native";
import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';

export const WazeButton = ({ latitude, longitude, label }) => {
    const openWaze = () => {
        const url = `https://www.waze.com/ul?ll=${latitude},${longitude}&navigate=yes&zoom=17&${
            label ? `q=${label}` : ""
        }`;
        Linking.openURL(url);
    };

    return (
        <TouchableOpacity
            onPress={openWaze}
            style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#34cbfb",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
            }}
        >
            <Image
                source={require("../../assets/waze.png")}
                style={{ width: 35, height: 24, marginRight: 10 }}
            />
            <Text
                style={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: "MontserratAlternates_600SemiBold",
                }}
            >
                Abrir no Waze
            </Text>
        </TouchableOpacity>
    );
}
