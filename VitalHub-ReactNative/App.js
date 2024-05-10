import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";

// Importe das Telas
import { SplashScreen } from "./src/screens/Splash/Splash";
import { Login } from "./src/screens/Login/Login";
import { RecoverPassword } from "./src/screens/RecoverPassword/RecoverPassword";
import { VerifyEmail } from "./src/screens/VerifyEmail/VerifyEmail";
import { RedefinePassword } from "./src/screens/RedefinePassword/RedefinePassword";
import { CreateAccount } from "./src/screens/CreateAccount/CreateAccount";
import { Home } from "./src/screens/Home/Home";
import { AppointmentLocation } from "./src/screens/AppointmentLocation/AppointmentLocation";
import { ViewPrescription } from "./src/screens/ViewPrescription/ViewPrescription";
import { Profile } from "./src/screens/Profile/Profile";
import { CompleteDataProfile } from "./src/screens/CompleteDataProfile/CompleteDataProfile";
import { Main } from "./src/screens/Main/Main";
import { SelectClinic } from "./src/screens/SelectClinic/SelectClinic";
import { SelectDoctor } from "./src/screens/SelectDoctor/SelectDoctor";
import { SelectDate } from "./src/screens/SelectDate/SelectDate";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

// Importe das Fontes
import {
    useFonts,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_700Bold,
} from "@expo-google-fonts/montserrat-alternates";
import {
    Quicksand_500Medium,
    Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        MontserratAlternates_600SemiBold,
        MontserratAlternates_500Medium,
        MontserratAlternates_700Bold,
        Quicksand_500Medium,
        Quicksand_600SemiBold,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    // Ignora todos os avisos de logs
    LogBox.ignoreAllLogs();

    async function requestGaleria() {
        await MediaLibrary.requestPermissionsAsync();

        await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ViewPrescription">
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="RecoverPassword"
                    component={RecoverPassword}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="VerifyEmail"
                    component={VerifyEmail}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="RedefinePassword"
                    component={RedefinePassword}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="CreateAccount"
                    component={CreateAccount}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="CompleteDataProfile"
                    component={CompleteDataProfile}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="AppointmentLocation"
                    component={AppointmentLocation}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="ViewPrescription"
                    component={ViewPrescription}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="SelectClinic"
                    component={SelectClinic}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="SelectDoctor"
                    component={SelectDoctor}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="SelectDate"
                    component={SelectDate}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
