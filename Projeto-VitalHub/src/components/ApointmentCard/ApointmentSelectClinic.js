import { useState } from "react";
import {
  Container3,
  Container9,
  ContainerIcon2,
  ContainerSelectClinicIcon,
  ContainerTextPatient3,
  ContainerTextPatient5,
} from "../Container/Style";
import { TextHora, TextIcon, TextPatient, TextPatient3 } from "../Text/Text";

//icon
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const ApointmentSelectClinic = ({
  clinic,
  isSelected,
  onPressClinic,
  onPressCancel,
  onPressAppointment,
  navigation,
}) => {

  //Chamar a função PatientProfile
  async function PatientProfile() {
    navigation.replace("PatientProfile")
  }


  return (
    <TouchableOpacity onPress={onPressClinic}>
      {/* Utilize TouchableOpacity */}
      <Container3
        style={{
          borderColor: isSelected ? "#496BBA" : "transparent", // Altera a cor da borda se o item estiver selecionado
          borderWidth: 2,
          borderRadius: 5,
        }}
      >
        <ContainerTextPatient5>
          <ContainerTextPatient3>
            <TextPatient3>{clinic.name}</TextPatient3>
            <TextPatient>{clinic.location}</TextPatient>
          </ContainerTextPatient3>

          <ContainerSelectClinicIcon>
            <ContainerIcon2>
              <AntDesign name="star" size={24} color="#F9A620" />
              <TextIcon>4,5</TextIcon>
            </ContainerIcon2>

            <Container9>
              <MaterialCommunityIcons
                name="calendar"
                size={24}
                color="#49B3BA"
              />
              <TextHora>Seg-Sex</TextHora>
            </Container9>
          </ContainerSelectClinicIcon>
        </ContainerTextPatient5>
      </Container3>
    </TouchableOpacity>
  );
};
