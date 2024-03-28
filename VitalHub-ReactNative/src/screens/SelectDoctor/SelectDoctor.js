import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import { Container } from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { DoctorCard } from "../../components/DoctorCard/DoctorCard";
import { Links } from "../../components/Links/style"

export const SelectDoctor = ({ navigation }) => {
    const doctorData = [
        { nameDoctor: "Lucas Gonsalvez", aboutDoctor: "Dermatoloista, Urologista", imageDoctor: "https://media.licdn.com/dms/image/D4D03AQFiDTm-w3_4wg/profile-displayphoto-shrink_400_400/0/1696638603566?e=1714003200&v=beta&t=1AFKZjWrgNhAM-xBLP-nKaKLOPoPp1GG--maNLCvmZA" },
        { nameDoctor: "Evelyn dos Santos", aboutDoctor: "Terapeuta, Socioemocional", imageDoctor: "https://avatars.githubusercontent.com/u/125275736?v=4" },
        { nameDoctor: "Paulo Gonsalvez", aboutDoctor: "Cardiologista, Cirurgião Geral", imageDoctor: "https://avatars.githubusercontent.com/u/125275514?v=4" }
    ];

    return (
        <Container>
            <StatusBar />

            <Title style={{ marginBottom: 45 }} fontSize={24}>Selecionar Médico</Title>

            {doctorData.map((data, index) => (
                <DoctorCard
                    key={index}
                    nameDoctor={data.nameDoctor}
                    aboutDoctor={data.aboutDoctor}
                    imageDoctor={data.imageDoctor}
                />
            ))}

            <CustomButton style={{ marginTop: 60 }}  >
                <TitleButton colorTxt={false}>CONTINUAR</TitleButton>
            </CustomButton>

            <Links 
                colorLink={'#344F8F'}
                fontSize={18}
                style={{ marginTop: 12 }}
                onPress={() => navigation.navigate('SelectClinic')}
            >
                Cancelar
            </Links>
        </Container>
    );
}