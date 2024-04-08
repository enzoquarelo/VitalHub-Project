import React, { useEffect, useState } from "react";

import { Container } from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { Links } from "../../components/Links/style";
import { ClinicCard } from "../../components/ClinicCard/ClinicCard";
import api from "../../service/service";
import { ListComponent } from "../../components/List/List";
import { StatusBar } from "expo-status-bar";

export const SelectClinic = ({ navigation }) => {
  const [selectedClinicId, setSelectedClinicId] = useState(null);
  const [clinicaLista, setclinicaLista] = useState([]);

  const handleSelectClinic = (clinicId) => {
    setSelectedClinicId(clinicId);
  };

  useEffect(() => {
    const listarClinicas = async () => {
      try {
        const response = await api.get("/Clinica/ListarTodas");
        setclinicaLista(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    listarClinicas();
  }, []);

  return (
    <Container>
      <StatusBar />
      <Title style={{ paddingBottom: 50, paddingTop: 100 }}>
        Selecionar Clínica
      </Title>

      <ListComponent
        contentContainerStyle={{ alignItems: "center" }}
        data={clinicaLista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClinicCard
            clinic={item}
            isSelected={item.id === selectedClinicId}
            onPressClinic={() => handleSelectClinic(item.id)}
            navigation={navigation}
          />
        )} // Verifica se é o primeiro item da lista
      />

      <CustomButton
        style={{ marginTop: 50 }}
        onPress={() => navigation.navigate("SelectDoctor")}
      >
        <TitleButton>Continuar</TitleButton>
      </CustomButton>

      <Links
        colorLink={"#344F8F"}
        fontSize={18}
        style={{ marginTop: 12 }}
        onPress={() => navigation.navigate("Home")}
      >
        Cancelar
      </Links>
    </Container>
  );
};