import { TouchableOpacity } from "react-native";
import { Container3, ContainerTextPatient4 } from "../Container/Style";
import { ImageDoctor } from "../Logo/Style";
import { TextPatient, TextPatient3 } from "../Text/Text";
import { useState } from "react";

export const ApointmentSelectDoctor = ({
  doctor,
  selectedDoctorId,
  onSelectDoctor,
  onPressCancel,
  onPressAppointment,
}) => {
  const [isSelected, setIsSelected] = useState(false); // Estado para controlar se o item está selecionado

  const handlePress = () => {
    setIsSelected(!isSelected); // Inverte o estado de isSelected quando o item é clicado
    onSelectDoctor(doctor.id); // Chama a função onSelectDoctor com o ID do médico quando é clicado
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      {/* Utilize TouchableOpacity */}
      <Container3
        style={{
          borderColor: selectedDoctorId === doctor.id ? "#496BBA" : "transparent", // Altera a cor da borda se o item estiver selecionado
          borderWidth: 2,
          borderRadius: 5,
        }}
      >
        <ImageDoctor source={doctor.image} />
        <ContainerTextPatient4>
          <TextPatient3>{doctor.name}</TextPatient3>
          <TextPatient>{doctor.specialty}</TextPatient>
        </ContainerTextPatient4>
      </Container3>
    </TouchableOpacity>
  );
};
