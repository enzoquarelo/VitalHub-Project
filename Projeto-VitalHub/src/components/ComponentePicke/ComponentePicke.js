import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { InputPicker, SelectedHourText } from "./style";
import { Text, View } from "react-native";

const ComponenteSelecaoDeHorario = () => {
  const [selectedHour, setSelectedHour] = useState(null); // Estado para armazenar a hora selecionada
  const [appointmentText, setAppointmentText] = useState(""); // Estado para armazenar o texto da consulta agendada

  // Gerar uma lista de horários em intervalos de 30 minutos
  const hours = ["Selecionar horário"];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      hours.push(formattedHour);
    }
  }

  // Função para lidar com a seleção de horário
  const handleHourSelection = (hour) => {
    setSelectedHour(hour);
    // Aqui você pode definir o texto da consulta agendada com base no horário selecionado
    setAppointmentText("Sua consulta está agendada para este horário.");
  };

  // Função para obter o texto da consulta agendada
  const getAppointmentText = (hour) => {
    // Aqui você pode definir o texto da consulta agendada com base no horário selecionado
    return "Sua consulta está agendada para " + hour + ".";
  };

  return (
    <InputPicker>
      <Picker
        selectedValue={selectedHour}
        onValueChange={(itemValue) => handleHourSelection(itemValue)}
        prompt="Selecione um horário" // Texto para exibir na parte superior do Picker
        color="#49b3ba" // Defina a cor do texto selecionado
        style={{ flex: 1 }}
        mode="dialog" // Modo de exibição do Picker como modal
      >
        <Picker.Item label="Selecionar horário" value={null} color="#34898F" />
        {[...Array(24).keys()].map((hour) => (
          <Picker.Item
            key={hour}
            label={`${hour.toString().padStart(2, "0")}:00`}
            value={`${hour.toString().padStart(2, "0")}:00`}
          />
        ))}
      </Picker>
    </InputPicker>
  );
};

export default ComponenteSelecaoDeHorario;
