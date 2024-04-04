import React from "react";

import { Container } from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { Links } from "../../components/Links/style";
import { ClinicCard } from "../../components/ClinicCard/ClinicCard";

export const SelectClinic = ({ navigation }) => {

    const clinicData = [
        { nameClinic: "Clínica Natureh", locate: " São Paulo, SP", assessment: "4,8", workingDays: "Seg-Sex" },
        { nameClinic: "Diamond Pró-Mulher", locate: " São Paulo, SP", assessment: "4,5", workingDays: "Seg-Sex" },
        { nameClinic: "Clinica Villa Lobos", locate: " Taboão, SP", assessment: "4,2", workingDays: "Seg-Sáb" },
        { nameClinic: "SP Oncologia Clínica", locate: " Taboão, SP", assessment: "4,2", workingDays: "Seg-Sáb" },
    ];

    return (
        <Container>
            <Title style={{paddingBottom: 50}}>Selecionar Clínica</Title>

            {clinicData.map((data, index) => (
                <ClinicCard
                    key={index}
                    nameClinic={data.nameClinic}
                    locate={data.locate}
                    assessment={data.assessment}
                    workingDays={data.workingDays}
                />
            ))}

            <CustomButton style={{marginTop: 50}} onPress={() => navigation.navigate("SelectDoctor")}>
                <TitleButton>Continuar</TitleButton>
            </CustomButton>

            <Links
                colorLink={'#344F8F'}
                fontSize={18}
                style={{ marginTop: 12 }}
                onPress={() => navigation.navigate('Home')}
            >
                Cancelar
            </Links>
        </Container>
    );
}