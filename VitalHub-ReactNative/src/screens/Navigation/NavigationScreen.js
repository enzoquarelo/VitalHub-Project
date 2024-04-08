import { React, useState } from "react";

import { Container } from "../../components/Container/style"
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Text } from "react-native";


export const NavigationScreen = ({ navigation }) => {
    return (
        <>
            <Container>
                <StatusBar style="light" />

                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{padding: 30}}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("AppointmentLocation")} style={{padding: 30}}>
                    <Text>Maps</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("ViewPrescription")} style={{padding: 30}}>
                    <Text>ViewPrescription</Text>
                </TouchableOpacity>
            </Container></>
    );
}