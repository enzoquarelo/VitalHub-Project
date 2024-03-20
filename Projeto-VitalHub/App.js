import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./src/screens/Login/Login";
import { ForgotPassword } from "./src/screens/ForgotPassword/ForgotPassword";
import { Register } from "./src/screens/Register/Register";

//instancia do stackNavigator
const Stack = createNativeStackNavigator();

//import das fonts
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
import { EmailCode } from "./src/screens/EmailCode/EmailCode";
import { NewPassword } from "./src/screens/NewPassword/NewPassword";
import { RecordInsertion } from "./src/screens/RecordInsertion/RecordInsertion";
import { PatientRecordInsertion } from "./src/screens/PatientRecordInsertion/PatientRecordInsertion";
import { PatientConsultations } from "./src/screens/PatientConsultations/PatientConsultations";
import { PatientProfile } from "./src/screens/PatientProfile/PatientProfile";
import { DoctorConsultations } from "./src/screens/DoctorConsultations/DoctorConsultations";
import { PatientProfile2 } from "./src/screens/PatientProfile2/PatientProfile2";
import { SelectDoctor } from "./src/screens/SelectDoctor/SelectDoctor";
import { SelectClinic } from "./src/screens/SelectClinic/SelectClinic";
import { SelectDate } from "./src/screens/SelectDate/SelectDate";
import { ConsultationLocation } from "./src/screens/ConsultationLocation/ConsultationLocation";
import { MedicalRecord } from "./src/screens/MedicalRecord/MedicalRecord";
import { Main } from "./src/screens/Main/Main";
import { SplashScreen } from "./src/screens/Splash/Splash";


export default function App() {
  

    const [fontsLoaded, fontsError] = useFonts({
        MontserratAlternates_600SemiBold,
        MontserratAlternates_500Medium,
        MontserratAlternates_700Bold,
        Quicksand_500Medium,
        Quicksand_600SemiBold,
    });

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        //Navegação
        //Container
        //StackNavigator
        //StackScreen

        //envolve a estrutura da navegação
        <NavigationContainer>
            {/* //componente de navegação */}
            <Stack.Navigator
                initialRouteName="Splash"
                //esconder o header a borda de cima
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ title: "Splash" }}
                ></Stack.Screen>

                {/* Tela */}
                <Stack.Screen
                    //nome da tela
                    name="Login"
                    //componente que sera chamado
                    component={Login}
                    //titulo da tela
                    options={{ title: "Login" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="Main"
                    //componente que sera chamado
                    component={Main}
                    options={{ title: "Main" }}
                />
                {/* <Stack.Screen
          //nome da tela
          name="Navegacao"
          //componente que sera chamado
          component={Navegacao}
          //titulo da tela
          options={{ title: "Navegacao" }}
        /> */}

                <Stack.Screen
                    //nome da tela
                    name="ForgotPassword"
                    //componente que sera chamado
                    component={ForgotPassword}
                    //titulo da tela
                    options={{ Title: "ForgotPassword" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="EmailCode"
                    //componente que sera chamado
                    component={EmailCode}
                    //titulo da tela
                    options={{ Title: "EmailCode" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="NewPassword"
                    //componente que sera chamado
                    component={NewPassword}
                    //titulo da tela
                    options={{ Title: "NewPassword" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="Register"
                    //componente que sera chamado
                    component={Register}
                    //titulo da tela
                    options={{ Title: "Register" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="RecordInsertion"
                    //componente que sera chamado
                    component={RecordInsertion}
                    //titulo da tela
                    options={{ Title: "RecordInsertion" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="PatientRecordInsertion"
                    //componente que sera chamado
                    component={PatientRecordInsertion}
                    //titulo da tela
                    options={{ Title: "PatientRecordInsertion" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="PatientConsultations"
                    //componente que sera chamado
                    component={PatientConsultations}
                    //titulo da tela
                    options={{ Title: "PatientConsultations" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="PatientProfile"
                    //componente que sera chamado
                    component={PatientProfile}
                    //titulo da tela
                    options={{ Title: "PatientProfile" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="PatientProfile2"
                    //componente que sera chamado
                    component={PatientProfile2}
                    //titulo da tela
                    options={{ Title: "PatientProfile2" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="DoctorConsultations"
                    //componente que sera chamado
                    component={DoctorConsultations}
                    //titulo da tela
                    options={{ Title: "DoctorConsultations" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="SelectDoctor"
                    //componente que sera chamado
                    component={SelectDoctor}
                    //titulo da tela
                    options={{ Title: "SelectDoctor" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="SelectClinic"
                    //componente que sera chamado
                    component={SelectClinic}
                    //titulo da tela
                    options={{ Title: "SelectClinic" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="SelectDate"
                    //componente que sera chamado
                    component={SelectDate}
                    //titulo da tela
                    options={{ Title: "SelectDate" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="ConsultationLocation"
                    //componente que sera chamado
                    component={ConsultationLocation}
                    //titulo da tela
                    options={{ Title: "ConsultationLocation" }}
                />
                <Stack.Screen
                    //nome da tela
                    name="MedicalRecord"
                    //componente que sera chamado
                    component={MedicalRecord}
                    //titulo da tela
                    options={{ Title: "MedicalRecord" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
