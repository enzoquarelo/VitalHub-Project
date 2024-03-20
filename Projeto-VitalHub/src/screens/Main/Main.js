import { ContentIcon, TextIcon } from "./style";

//Import o recurso Botton Tabs
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PatientConsultations } from "../PatientConsultations/PatientConsultations";

import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { PatientProfile } from "../PatientProfile/PatientProfile";

const BottomTab = createBottomTabNavigator();

export const Main = () => {
  return (
    <BottomTab.Navigator
      //Definir rota Inicial
      initialRouteName="PatientConsultations"
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#FFFFFF", height: 80, paddingTop: 10 },
        tabBarActiveBackgroundColor: "transparent",
        tabBarShowLabel: false,
        headerShown: false,

        tabBarIcon: ({ focused }) => {
          if (route.name === "PatientConsultations") {
            return (
              <ContentIcon
                tabBarActiveBackgroundColor={
                  focused ? "#ECF2FF" : "transparent"
                }
              >
                <FontAwesome name="calendar" size={20} color="#4E4B59" />
                {focused && <TextIcon>Agenda</TextIcon>}
              </ContentIcon>
            );
          } else {
            return (
              <ContentIcon
                tabBarActiveBackgroundColor={
                  focused ? "#ECF2FF" : "transparent"
                }
              >
                <FontAwesome5 name="user" size={22} color="#4E4B59" />
                {focused && <TextIcon>Perfil</TextIcon>}
              </ContentIcon>
            );
          }
        },
      })}
    >
      <BottomTab.Screen
        name="PatientConsultations"
        component={PatientConsultations}
      />

      <BottomTab.Screen name="PatientProfile" component={PatientProfile} />
    </BottomTab.Navigator>
  );
};
